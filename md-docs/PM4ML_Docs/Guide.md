# PM4ML Documentation Guide

## Objective

This document provides a comprehensive overview of several key processes: setting up a development environment for a Core Connector, deploying a Payment Manager using Docker Compose, configuring custom core connectors, securing the Docker Daemon, connecting to a live Mojaloop hub, managing firewall configurations, and performing test transfers.


### 1: Core Connector Setup

The "CoreConnectorSetup.md" file details the configuration and deployment of a Core Connector, a crucial middleware component that facilitates communication between a DFSP's Core Banking System and the Mojaloop platform.
#### **Key Concepts:**
- It explains the Core Connector's roles, including transaction processing and routing, API transformation, security and compliance, error handling, and performance optimization.

#### **Development Environment Setup:**
- The document provides step-by-step instructions for setting up a development environment, covering prerequisites like installing necessary tools (Docker, Node.js, TypeScript, Git), configuring environment variables, and running the Core Connector

### 2: Deploying Docker Compose Payment Manager

The "DeployingDockerComposePayment.md" file focuses on deploying a Payment Manager using Docker Compose, streamlining its integration with the Mojaloop system for secure payment processing.
#### **Deployment Process:**
- It outlines the prerequisites, including minimum machine requirements and software dependencies (Docker, Docker Compose).

#### **Installation and Configuration:**
- The document provides detailed instructions for installing Docker and Docker Compose on both Ubuntu/Linux and Windows systems. It also covers cloning the Payment Manager repository, building and running containers, managing deployments, and optional steps for remote server deployment.

#### **Best Practices:**
- The guide emphasizes the importance of using environment variables for secure configuration.

### 3: Configuring a Custom Core Connector

The "ConfiguringACustomCoreConnector.md" file guides users through the process of replacing a mock backend ("sim-backend") with a real DFSP implementation (Core Connector) within the Mojaloop environment. It also details how to create custom configurations for managing shared and DFSP-specific environment variables and integrate them into docker-compose.yml.
#### **Key Actions:**
- Replacing the sim-backend, creating shared environment blocks for common variables (like FSP_ID and CONNECTOR_NAME), and customizing DFSP-specific configurations.

#### **Objective:**
- Streamlining the configuration and deployment of core connectors for different institutions (MNOs, Banks) within the Mojaloop ecosystem.

### 4: Securing the Docker Daemon

The "SecuringTheDockerDaemon.md" file provides essential security best practices for protecting the Docker Daemon and containerized applications.
#### **Security Measures:**
- It covers enabling TLS for secure communication, restricting Docker API access, implementing user access control, limiting container privileges, configuring Seccomp and AppArmor profiles, enabling logging and monitoring, keeping Docker updated, restricting container networking, scanning images for vulnerabilities, and enabling resource limits.

#### **Goal:**
- To harden the Docker environment against unauthorized access and potential security threats.

### 5: Connecting the Payment Manager to a Live Hub
The "connectToLiveHub.md" file outlines the process of connecting the Mojaloop Payment Manager to a live hub using Docker Compose.
- Prerequisites: It lists requirements such as Docker and Docker Compose installation, the Payment Manager repository, hub access credentials and endpoint details, and network access on specific ports.
- Configuration: It details how to configure common and management API environment variables (e.g., `DFSP_ID`, `AUTH_CLIENT_ID`, `HUB_IAM_PROVIDER_URL`).
- Troubleshooting & Security: The document also covers troubleshooting connection errors and using "Recreate" buttons to revoke and recreate TLS and JWS certificates for security updates.
### 6: Firewall Configuration
The "firewallConfig.md" file provides a comprehensive guide to configuring firewalls in Ubuntu and AWS EC2 instances.
- Ubuntu (UFW): It explains how to install, enable, and use Uncomplicated Firewall (UFW) to allow and deny specific ports, IP addresses, and manage rules.
- AWS (Security Groups): It describes how to configure AWS Security Groups to control inbound and outbound traffic for EC2 instances.
- Interaction: The document highlights the interaction between UFW and AWS Security Groups and provides troubleshooting tips for common firewall issues.
### 6: Test Transfer Process
The "TestTransfer.md" file outlines the process for sending test transfers to verify connectivity across different transfer types: Outbound, Inbound, and FXP Transfers.
- Prerequisites: It notes that the Mojaloop Testing Toolkit (TTK) should be running and required test collection files should be available.
- Test Execution Workflow: The document provides steps for executing tests using the TTK Admin UI, including navigating to the Test Runner, using the Collection Manager to select test cases, and reviewing results.
- Optional Configuration: It includes instructions for configuring the ISO 20022 message format if applicable.
- Troubleshooting: It offers guidance on accessing logs via both the UI and CLI for troubleshooting failures.
```

In summary, these documents collectively provide a robust framework for setting up, deploying, securing, and integrating a Payment Manager and Core Connector within the Mojaloop ecosystem, with a clear path towards connecting to live hubs and ensuring system integrity.

