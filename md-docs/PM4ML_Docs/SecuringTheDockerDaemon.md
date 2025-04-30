# Securing the Docker Daemon

Securing the Docker Daemon is crucial to protect containerized applications from unauthorized access and potential security threats. This guide will walk you through the necessary steps to harden Docker Daemon.

## 1. Enable TLS for Secure Communication

### Generate a TLS Certificate and Key
To enable secure communication, generate a TLS certificate and key. The `.key` file is for the private key, and the `.crt` file is for the certificate.

```sh
openssl genrsa -out /etc/docker/certs/server.key 2048
openssl req -new -key /etc/docker/certs/server.key -out /etc/docker/certs/server.csr
openssl x509 -req -in /etc/docker/certs/server.csr -signkey /etc/docker/certs/server.key -out /etc/docker/certs/server.crt
```

### Configure Docker to Use the Certificate
Edit the Docker daemon configuration file `/etc/docker/daemon.json` to use the generated TLS certificate.

```json
{
  "tlsverify": true,
  "tlscert": "/etc/docker/certs/server.crt",
  "tlskey": "/etc/docker/certs/server.key",
  "hosts": ["tcp://0.0.0.0:2376", "unix:///var/run/docker.sock"]
}
```

### Restart Docker Service
After updating the configuration, restart Docker to apply the changes.

```sh
sudo systemctl restart docker
```

## 2. Restrict Docker API Access

### Open Docker Configuration File
Modify the Docker configuration file to restrict the API to only be accessible via Unix socket, preventing external access over TCP.

```sh
sudo nano /etc/docker/daemon.json
```

### Ensure Docker is Only Accessible via Unix Socket
Update `daemon.json` to ensure Docker listens only on the Unix socket.

```json
{
  "hosts": ["unix:///var/run/docker.sock"]
}
```

### Restart Docker Service
Restart Docker to apply the changes.

```sh
sudo systemctl restart docker
```

## 3. Implement User Access Control

### Create a Docker Group
Create a Docker group to manage access to Docker commands securely.

```sh
sudo groupadd docker
```

### Add a User to the Docker Group
Grant a user access to Docker without needing `sudo`.

```sh
sudo usermod -aG docker username
```

### Restart the Session for Changes to Take Effect
After adding the user to the Docker group, restart the session.

```sh
newgrp docker
```

## 4. Limit Container Privileges

### Run a Container with Dropped Capabilities
Limit the container's capabilities to minimize the risk of privilege escalation.

```sh
docker run --cap-drop=ALL --cap-add=NET_BIND_SERVICE my_container
```

### Prevent Privilege Escalation
Ensure that containers cannot escalate their privileges.

```sh
docker run --security-opt=no-new-privileges my_container
```

## 5. Configure Seccomp and AppArmor Profiles

### Use the Default Seccomp Profile
Ensure Docker containers use the default Seccomp profile to limit the available system calls.

```sh
docker run --security-opt seccomp=default my_container
```

### Apply AppArmor Profiles
Apply the default AppArmor profile to containers for additional security.

```sh
docker run --security-opt apparmor=docker-default my_container
```

## 6. Enable Logging and Monitoring

### Configure Docker Logging Driver
Set up logging for Docker containers by configuring the Docker logging driver and enabling log rotation.

```json
{
  "log-driver": "json-file",
  "log-opts": {
    "max-size": "10m",
    "max-file": "3"
  }
}
```

### Restart Docker Service
Restart Docker to apply logging configurations.

```sh
sudo systemctl restart docker
```

### Install Falco for Real-Time Security Monitoring
Install Falco, a tool for monitoring security events in real time.

```sh
curl -s https://falco.org/install | sudo bash
```

## 7. Keep Docker Updated

### Update Docker to the Latest Stable Version
Keep Docker up to date to ensure all security patches and bug fixes are applied.

```sh
sudo apt-get update
```

### Verify the Installed Version
After updating Docker, check the version to confirm the update was successful.

```sh
docker --version
```

## 8. Restrict Container Networking

### Create a User-Defined Network
Isolate containers for more secure communication between them.

```sh
docker network create --driver bridge my_network
```

### Run Containers on the User-Defined Network

```sh
docker run --network my_network my_container
```

## 9. Scan Images for Vulnerabilities

### Install Trivy for Image Scanning
Install Trivy, a vulnerability scanner for Docker images.

```sh
sudo apt install trivy
```

### Scan an Image for Vulnerabilities
Use Trivy to scan Docker images for known vulnerabilities.

```sh
trivy image my_image
```

### Enable Docker Content Trust (DCT)
Ensure only signed images are used.

```sh
export DOCKER_CONTENT_TRUST=1
docker pull my_image
```

## 10. Enable Cgroup Resource Limits

### Run a Container with Memory and CPU Limits
Limit the memory and CPU usage for containers to avoid resource exhaustion.

```sh
docker run --memory="1g" --cpus="1.0" my_container
```