# Investigate Steps to Configure and Deploy a Core Connector

## Understanding the Core Connector Role
The Core Connector acts as middleware between the DFSP (Digital Financial Services Provider) Core Banking System and Mojaloop, ensuring smooth transaction processing, security, and compliance.

### Key Roles:

#### 1. Transaction Processing & Routing
- **Outbound Transactions (DFSP → Mojaloop)**
  - Receives send money requests from the Core Banking API.
  - Validates the request and ensures compliance with Mojaloop API standards.
  - Forwards the request to the Mojaloop Connector which forwards it to the Mojaloop Scheme for processing.

- **Inbound Transactions (Mojaloop → DFSP)**
  - Listens for incoming fund transfer or account lookup requests from the Mojaloop Connector.
  - Validates the request and forwards it to the Core Banking API.
  - Receives the response and sends it back to the Mojaloop Connector.

#### 2. API Transformation & Interoperability
- Converts data between the DFSP's Core Banking System API format and Mojaloop’s FSPIOP API format.
- Ensures message structure, encoding, and data formatting match the required standards (ISO20021).
- Handles currency conversion if needed for multi-currency transactions.

#### 3. Security & Compliance Management
- Ensures secure authentication (OAuth 2.0, JWT, API Keys).
- Encrypts sensitive financial data during transmission.
- Implements fraud detection mechanisms and transaction validation.
- Enforces regulatory compliance (e.g., AML/KYC checks).

#### 4. Error Handling & Logging
- Catches and logs failed transactions, providing detailed error responses.
- Implements retry mechanisms for temporary failures.
- Maintains an audit trail for financial transactions.

#### 5. Performance Optimization & Monitoring
- Load balances transaction requests to handle high traffic.
- Implements caching for frequently accessed data (e.g., customer details).
- Integrates with monitoring tools (Grafana, Prometheus) for real-time tracking.

### Summary of Core Connector’s Roles
| Function                  | Description |
|---------------------------|-------------|
| Transaction Processing    | Handles outbound/inbound payments between a DFSP and Mojaloop. |
| API Transformation       | Converts messages between DFSP APIs and Mojaloop FSPIOP API. |
| Security & Compliance    | Implements authentication, encryption, and regulatory checks. |
| Error Handling & Logging | Manages transaction failures, logging, and retries. |
| Performance Optimization | Uses caching, load balancing, and monitoring tools. |
| Message Queue Processing | Handles high-volume transactions asynchronously. |
| Reconciliation & Settlement | Assists in transaction tracking and dispute resolution. |

---

## Setting Up a Development Environment for the Core Connector
Before building the Core Connector, ensure you have the required prerequisites and set up a development environment.

### Prerequisites
- CBS Sandbox API – A test environment for the Core Banking System (CBS) API.
- Access Credentials – API keys, OAuth tokens, or any required authentication for Mojaloop and CBS.
- TypeScript Knowledge – The Core Connector is often developed in TypeScript for maintainability.
- Beginner Docker Knowledge – Understanding how to containerize and deploy services using Docker.
- Git Knowledge – Version control with GitHub/GitLab.
- Mojaloop Knowledge – Understanding FSPIOP API, Mojaloop scheme, and transaction flows.
- Windows Subsystem for Linux (WSL) – Required for Windows users to run Ubuntu efficiently.

### Step 1: Install Development Tools
#### For Linux/macOS Users
```bash
sudo apt update && sudo apt install -y curl git docker.io docker-compose nodejs npm
```

#### For Windows Users (Using WSL)
```powershell
wsl --install -d Ubuntu
```
Inside WSL, install dependencies:
```bash
sudo apt update && sudo apt install -y curl git docker.io docker-compose nodejs npm
```

### Step 2: Install Node.js and TypeScript
```bash
# Install Node.js and npm
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Install TypeScript globally
npm install -g typescript
```
Verify the installation:
```bash
node -v    # Should output Node.js version
npm -v     # Should output npm version
tsc -v     # Should output TypeScript version
```

### Step 3: Install Docker & Docker Compose
#### For Linux/macOS Users
```bash
sudo apt install -y docker.io docker-compose
sudo systemctl enable --now docker
sudo usermod -aG docker $USER  # Allows running docker without sudo
```
Log out and back in for changes to take effect.

#### For Windows Users (Using WSL)
- Install Docker Desktop for Windows.
- Enable WSL 2 Backend in Docker settings.

Verify Docker installation:
```bash
docker -v         # Should output Docker version
docker-compose -v # Should output Docker Compose version
```

### Step 4: Clone an Existing Core Connector Repository
#### 1️⃣ Clone the Existing Repository
```bash
git clone https://github.com/YOUR-ORG/core-connector.git
cd core-connector
```

#### 2️⃣ Set Up a New Branch (Optional but Recommended)
```bash
git checkout -b feature-core-connector
```

#### 3️⃣ Initialize the Node.js Project (If Not Already Initialized)
Check if a `package.json` file exists:
```bash
ls package.json
```
If it doesn't exist, initialize the project:
```bash
npm init -y
```

#### 4️⃣ Install Required Dependencies
```bash
npm install express dotenv axios cors
npm install --save-dev typescript ts-node nodemon @types/node @types/express
```

#### 5️⃣ Verify the Setup
```bash
npm list
```

---

## Next Steps After Cloning the Core Connector Repository

### Step 1: Navigate to the Project Directory
```bash
cd core-connector
```

### Step 2: Install Dependencies
Since the project is cloned, you just need to install all dependencies:
```bash
npm install
```

### Step 3: Configure Environment Variables
Check if there's a `.env.example` file. If so, create a `.env` file:
```bash
cp .env.example .env
```
Then, open it and configure the necessary values (e.g., API keys, database URLs, Mojaloop connection details).

##  Running the Core Connector

### Step 4: Build the Project
```bash
npm run build
```
This will compile TypeScript files into JavaScript.

### Step 5: Start the Server
**Development Mode:**
```bash
npm run dev
```
**Production Mode:**
```bash
npm start
```

## Testing If It's Running
Open your browser or use Postman and send a request to:
```bash
http://localhost:3000/
```
You should see:
🚀 "Core Connector API is running"
