# Deploying Docker Compose Payment Manager

## Objective
Deploy the Payment Manager using Docker Compose to enable seamless integration with the Mojaloop system, ensuring secure and reliable payment processing.

---

## Prerequisites
Before deploying the Payment Manager using Docker Compose, ensure the following requirements are met:

### Minimum Machine Requirements
- **CPU:** 4 cores (8 cores recommended for optimal performance)
- **Memory:** 8GB RAM (16GB recommended for large deployments)
- **Storage:** At least 50GB of free space (more may be needed depending on transaction volume)
- **OS Version:** Ubuntu 20.04+ / CentOS 8+ / Windows Server 2019+
- **Docker Version:** Docker Engine 20.10+ (Check Docker's version page for the latest)
- **Docker Compose:** Version 1.29+ (Check Docker Compose release notes for details)

---

## Installing Docker and Docker Compose

### Ubuntu/Linux Installation

#### 1. Update the System
Before installing any software, update the system to the latest version to ensure all dependencies and packages are up to date.
```sh
sudo apt update && sudo apt upgrade -y
```

#### 2. Install Docker
Install Docker using the following command:
```sh
sudo apt install docker.io -y
```

#### 3. Enable Docker to Start on Boot
Ensure that Docker starts automatically when your system boots:
```sh
sudo systemctl enable --now docker
```

#### 4. Install Docker Compose
```sh
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
```

##### Note: If the Above URL is Not Working
- Visit the Docker Compose Releases Page to find the latest version.
- Copy the appropriate URL for your system (OS and architecture).
- Run the following command with the new URL:
```sh
sudo curl -L "<new-url>" -o /usr/local/bin/docker-compose
```

##### Make the Binary Executable
```sh
sudo chmod +x /usr/local/bin/docker-compose
```

#### 5. Verify Installation
```sh
docker --version
docker-compose --version
```

---

### Windows Installation (Using Docker Desktop)

#### 1. Download and Install Docker Desktop
- Visit [Docker's official website](https://www.docker.com/products/docker-desktop/) and download Docker Desktop for Windows.

#### 2. Enable WSL Backend (if required)
Docker Desktop on Windows relies on WSL 2. If not enabled, follow these steps:
- Open PowerShell as an administrator and run:
```sh
dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart
```

#### 3. Enable Virtual Machine Feature
Enable the Virtual Machine Platform optional feature:
```sh
dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart
```

#### 4. Download and Install WSL2 Linux Kernel Update
[Download the latest package here](https://learn.microsoft.com/en-us/windows/wsl/install-manual/)

#### 5. Set WSL 2 as Default Version
```sh
wsl --set-default-version 2
wsl.exe --update
```

#### 6. Restart Your System
After completing the installation, restart your system to finalize the setup.

---

## Clone the Payment Manager Repository

If you have an existing Payment Manager project hosted on GitHub/GitLab, clone it:
```sh
git clone https://github.com/pm4ml/on-premise-deploy
cd payment-manager
```

Or, manually create a new directory:
```sh
mkdir payment-manager && cd payment-manager
```

---

## Build & Run the Containers

#### 1. Start the Services
```sh
docker-compose up -d
```
This will:
- Pull the required images (PostgreSQL and your payment service).
- Create & start the containers.

#### 2. Check Running Containers
```sh
docker ps
```

#### 3. Verify the Deployment
Check logs to ensure services are running correctly:
```sh
docker-compose logs -f
```

Access the payment service:
- If running locally: **http://localhost:5000**
- If deployed on a server: **http://server-ip:5000**

#### 4. Managing the Deployment
- **Stop the services:**
```sh
docker-compose down
```
- **Restart the services:**
```sh
docker-compose up -d
```
- **Rebuild after changes:**
```sh
docker-compose up --build -d
```
- **Remove all containers & volumes (for a fresh setup):**
```sh
docker-compose down -v
```

---

## (Optional) Run on a Remote Server

If deploying on AWS, DigitalOcean, or another cloud server, follow these steps:

#### 1. SSH into Your Server
```sh
ssh user@your-server-ip
```

#### 2. Install Docker & Docker Compose (if not installed)
Follow the Linux installation steps above.

#### 3. Clone Your Payment Manager Project
```sh
git clone https://github.com/yourusername/payment-manager.git
cd payment-manager
```

#### 4. Run the Service
```sh
docker-compose up -d
```

#### 5. Configure Firewall (if needed)
```sh
sudo ufw allow 5000
```

---

## Setup Environment Variables (Best Practice)
Instead of hardcoding values in `docker-compose.yml`, use an `.env` file.

#### 1. Create an `.env` File
```sh
nano .env
```

#### 2. Add Environment Variables
```sh
POSTGRES_USER=user
POSTGRES_PASSWORD=password
POSTGRES_DB=payments
```

#### 3. Modify `docker-compose.yml` to Use `.env`
```sh
environment:
  - POSTGRES_USER=${POSTGRES_USER}
  - POSTGRES_PASSWORD=${POSTGRES_PASSWORD}
  - POSTGRES_DB=${POSTGRES_DB}
```

Now, Docker Compose will load variables from `.env` for security.

---