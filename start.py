import os, sys, time, subprocess, threading, itertools

def spinner(stop_event):
    for char in itertools.cycle(['⠋','⠙','⠹','⠸','⠼','⠴','⠦','⠧','⠇','⠏']):
        if stop_event.is_set():
            break
        sys.stdout.write(f'\r📦 Starting {char}')
        sys.stdout.flush()
        time.sleep(0.1)
    sys.stdout.write('\r✅ Started!             \n')

def start_backend():
    print('Initiating Backend API')

    backend_path = os.path.join(os.getcwd(), "api")

    if os.name == "nt":
        python_path = os.path.join(backend_path, "venv", "Scripts", "python")
    else:
        python_path = os.path.join(backend_path, "venv", "bin", "python")

    return subprocess.Popen(
        f"{python_path} manage.py runserver",
        cwd=backend_path,
        shell=True
    )

def start_frontend():
    print('Initiating Frontend UI')

    frontend_path = os.path.join(os.getcwd(), "ui")

    process = subprocess.Popen(
        "npm start",
        cwd=frontend_path,
        shell=True,
        stdout=subprocess.PIPE,
        stderr=subprocess.STDOUT,
        text=True
    )

    stop_event = threading.Event()
    spinner_thread = threading.Thread(target=spinner, args=(stop_event,))
    spinner_thread.start()

    for line in process.stdout:
        # Stop spinner when React is starting
        if (("Starting the development server" in line) or ("Something is already running on port 3000" in line)):
            stop_event.set()
            spinner_thread.join()

        print(line, end="")

    return process

if __name__ == "__main__":
    print("Starting backend and frontend...")

    backend_process = start_backend()
    frontend_process = start_frontend()

    try:
        backend_process.wait()
        frontend_process.wait()
    except KeyboardInterrupt:
        print("Shutting down...")
        backend_process.terminate()
        frontend_process.terminate()