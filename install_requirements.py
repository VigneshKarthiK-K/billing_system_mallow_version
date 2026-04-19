import os, sys, subprocess

class BackendInstaller:

    def __init__(self):
        super().__init__()
        self.backend_path = os.path.join(os.getcwd(), "api")

    def run_command(self, command, cwd=None, errorMsg=''):
        try:
            subprocess.check_call(command, shell=True, cwd=cwd)
        except subprocess.CalledProcessError as e:
            if errorMsg:
                print(f'{errorMsg}')
            print(f"Error executing: {command}")
            sys.exit(1)

    def create_virtualenv(self):
        if not os.path.exists(os.path.join(self.backend_path, "venv")):
            self.run_command("python -m venv venv", cwd=self.backend_path, errorMsg='virtualenv creation failed')

    def get_virtualenv_path(self):
        if os.name == "nt":
            self.pip_path = os.path.join(self.backend_path, "venv", "Scripts", "pip")
        else:
            self.pip_path = os.path.join(self.backend_path, "venv", "bin", "pip")        

    def install_api_requirements(self):
        print("Installing backend requirements...")
        self.run_command(f"{self.pip_path} install -r requirements.txt", cwd=self.backend_path, errorMsg='Backend requirement installation failed')
        print('Successfully Installed backend requirements')

    def run_migrations(self):
        print("Running database migrations...")
        self.run_command(f"{self.python_path} manage.py migrate", cwd=self.backend_path, errorMsg='Migration failed')
        print("✅ Migrations applied successfully")

    def install_backend(self):
        self.create_virtualenv()
        self.get_virtualenv_path()
        self.install_api_requirements()
        self.run_migrations()

class FrontendInstaller:

    def __init__(self):
        super().__init__()
        self.frontend_path = os.path.join(os.getcwd(), "ui")

    def check_node_installed(self):
        node_status = True
        try:
            subprocess.check_output("node -v", shell=True)
            subprocess.check_output("npm -v", shell=True)
            node_status = True
        except subprocess.CalledProcessError:
            node_status = False
        except FileNotFoundError:
            node_status = False

        if node_status:
            print("Node is exist ✅")
        else:
            print("❌ Node.js or npm is not installed.")
            print("👉 Please install Node.js from: https://nodejs.org/")
            sys.exit(1)

    def install_ui_requirements(self):
        print("Installing frontend dependencies...")
        try:
            subprocess.check_call("npm install", cwd=self.frontend_path, shell=True)
            print("✅ Frontend dependencies installed")
        except subprocess.CalledProcessError:
            print("❌ npm install failed")
            sys.exit(1)

    def install_frontend(self):
        print("Checking Node.js installation...")
        self.check_node_installed()
        self.install_ui_requirements()

class ProjectRequirementInstaller(BackendInstaller, FrontendInstaller):
    def __init__(self):
        super().__init__()
        
    def install(self):
        self.install_backend()
        self.install_frontend()

if __name__ == "__main__":
    installer = ProjectRequirementInstaller()
    installer.install()
    print("All dependencies installed successfully ✅")