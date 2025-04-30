# Configuring a custom core connectors

## Objective
This guide documents the step-by-step process of:
- Replacing the sim-backend (a mock backend) with actual Core Connector, a real DFSP implementation.
- Creating a custom configuration for managing shared environment variables used by all core connectors (MNOs, Banks, etc).
- Integrating all configurations into docker-compose.yml for clean and maintainable deployments. 
---


### Step 1: Removing sim-backend (Mock DFSP)

#### **Background:**
sim-backend was a simulated DFSP used for testing purposes within the Mojaloop environment.
#### **Action Taken:**
- The sim-backend service was deprecated and removed from docker-compose.yml
- Any references to sim-backend in test scripts, routes, or Mojaloop SDK configurations should also be eliminated or adjusted accordingly.

---

### Step 2: Introducing The Core Connector (Airtel Zambia)

#### **Background:**
Airtel Zambia serves as a real DFSP integration. We replaced the mock simulation with a live core connector that interacts with Airtel’s APIs.
#### **Configuraton:**
A new service named airtel-zambia-connector was introduced in docker-compose.yml:

```sh
services:
  airtel-zambia-connector:
    image: mojaloop/mifos-core-connector:latest
    ports:
      - "3003:3003"
      - "3004:3004"
    command:
      - sh
      - -c
      - "npm start"
    environment:
      FSP_ID: 'airtelzambia'
      LEI: 'airtelzambia'
      SDK_BASE_URL: 'http://localhost:4010'
      ...

```
---
### Step 3: Creating a Shared Environment Block

#### **Problem:**
Each core connector (MTN, Airtel, etc.) required similar configurations like:

- Server host/port settings
- HTTP timeouts
- API spec paths
- Common transaction settings

#### **Solution:**
We identified these shared variables and defined them as part of a shared environment config.

### Shared/Common Variables:

| Variable                  | Purpose |
|---------------------------|-------------|
| SUPPORTED_ID_TYPE    | Identifier type (usually MSISDN) |
| SERVICE_CHARGE       | Default charge (e.g., 0). |
| EXPIRATION_DURATION    | Duration (in minutes) before a transaction expires |
| HTTP_TIMEOUT| HTTP request timeout in milliseconds. |
| SDK_SERVER_HOST / PORT | 	Host and port for SDK server |
| DFSP_SERVER_HOST / PORT | Host and port for DFSP server |
| DFSP_API_SPEC_FILE / SDK_API_SPEC_FILE | Paths to OpenAPI spec files. |
---

### Final Shared Configuration Block:
```sh
environment:
  # Shared config
  SUPPORTED_ID_TYPE: 'MSISDN'
  SERVICE_CHARGE: 0
  EXPIRATION_DURATION: 1
  HTTP_TIMEOUT: 5000

  SDK_SERVER_HOST: '0.0.0.0'
  SDK_SERVER_PORT: 3003
  DFSP_SERVER_HOST: '0.0.0.0'
  DFSP_SERVER_PORT: 3004

  DFSP_API_SPEC_FILE: './src/api-spec/core-connector-api-spec-dfsp.yml'
  SDK_API_SPEC_FILE: './src/api-spec/core-connector-api-spec-sdk.yml'

```

This block was embedded directly in the docker-compose.yml for each core connector instead of depending on .env files.

---
### Step 4: Customizing DFSP-Specific Configuration
Each DFSP also required unique values such as:
| Variable                  | Purpose |
|---------------------------|-------------|
| FSP_ID   | DFSP Identifier |
| SDK_BASE_URL       | The internal SDK service URL |
| LEI    | Legal Entity Identifier (DFSP specific) |
---
These were added below the shared variables in each core connector’s environment: section.

### Step 5: Final Docker Compose Example (Airtel Zambia)
```sh
environment:
services:
  airtel-zambia-connector:
    image: mojaloop/mifos-core-connector:latest
    ports:
      - "3003:3003"
      - "3004:3004"
    command:
      - sh
      - -c
      - "npm start"
    environment:
      # Shared config
      SUPPORTED_ID_TYPE: 'MSISDN'
      SERVICE_CHARGE: 0
      EXPIRATION_DURATION: 1
      HTTP_TIMEOUT: 5000
      SDK_SERVER_HOST: '0.0.0.0'
      SDK_SERVER_PORT: 3003
      DFSP_SERVER_HOST: '0.0.0.0'
      DFSP_SERVER_PORT: 3004
      DFSP_API_SPEC_FILE: './src/api-spec/core-connector-api-spec-dfsp.yml'
      SDK_API_SPEC_FILE: './src/api-spec/core-connector-api-spec-sdk.yml'
      FSP_ID: 'airtelzambia'
      SDK_BASE_URL: 'http://localhost:4010'
      LEI: 'airtelzambia'

```
---
### Step 6: Maintenance & Scaling
To add more core connectors (e.g., MTN Rwanda, Zamtel), repeat the following:

- Update DFSP-specific services and image.
- Update DFSP-specific environmental variables.
- Ensure unique ports or mount volumes if needed.