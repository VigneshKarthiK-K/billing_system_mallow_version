import os, sys, time, subprocess, threading, itertools

import socket
import time


class SpinnerLoader:
    
    def __init__(self, host="127.0.0.1", port=8000):
        self.host = host
        self.port = port
        self.stop_event = threading.Event()
        self.spinner_thread = threading.Thread(target=self.spinner)

    def wait_for_server(self, timeout=(3 * 60)):
        start = time.time()
        while time.time() - start < timeout:
            with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as sock:
                sock.settimeout(1)
                if sock.connect_ex((self.host, self.port)) == 0:
                    return True
            time.sleep(0.5)
        return False

    def spinner(self):
        for char in itertools.cycle(['⠋','⠙','⠹','⠸','⠼','⠴','⠦','⠧','⠇','⠏']):
            if self.stop_event.is_set():
                break
            sys.stdout.write(f'\r📦 Starting {char}')
            sys.stdout.flush()
            time.sleep(0.1)

    
    def run_with_spinner(self, process, stop_event, server_name=''):
        self.spinner_thread.start()
        first_time = True
        for line in process.stdout:
            if stop_event.is_set():
                break
            if self.wait_for_server() and first_time:
                self.stop_event.set()
                self.spinner_thread.join()
                sys.stdout.write("\r" + " " * 100 + "\r")
                sys.stdout.flush()
                print(f"✅ {server_name} Server Started Successfully!\n")
                first_time = False
            print(line)
                
class StartProject:

    def start_backend(self):
        print('Initiating Backend API')

        backend_path = os.path.join(os.getcwd(), "api")

        if os.name == "nt":
            python_path = os.path.join(backend_path, "venv", "Scripts", "python")
        else:
            python_path = os.path.join(backend_path, "venv", "bin", "python")

        process =  subprocess.Popen(
            f"{python_path} manage.py runserver",
            cwd=backend_path,
            shell=True,
            stdout=subprocess.PIPE,
            stderr=subprocess.STDOUT,
            text=True
        )

        return process

    def start_frontend(self):
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

        return process

if __name__ == "__main__":
    print("Starting backend and frontend...")
    starter = StartProject()
    backend_process = starter.start_backend()
    frontend_process = starter.start_frontend()

    api_loader = SpinnerLoader()
    ui_loader = SpinnerLoader(port=3000)

    api_stop_event = threading.Event()
    ui_stop_event = threading.Event()

    api_thread = threading.Thread(
        target=api_loader.run_with_spinner, 
        args=(backend_process, api_stop_event, 'Backend'), 
        daemon=True
    )
    ui_thread = threading.Thread(
        target=ui_loader.run_with_spinner, 
        args=(frontend_process, ui_stop_event, 'Frontend'), 
        daemon=True
    )

    api_thread.start()
    ui_thread.start()
    api_thread.join()
    ui_thread.join()

    try:
        backend_process.wait()
        frontend_process.wait()
    except KeyboardInterrupt:
        print("Shutting down...")
        backend_process.terminate()
        frontend_process.terminate()
        api_stop_event.set()
        ui_stop_event.set()
        api_thread.join()
        ui_thread.join()