# Configuring a custom core connectors
## Objective
This guide documents the step-by-step process of:
- Configuring the sim-backend service to use a Core Connector, a real DFSP implementation, instead of the default mock backend.
- Creating a custom configuration for managing shared environment variables used by all core connectors (MNOs, Banks, etc).
- Integrating all configurations into docker-compose.yml for clean and maintainable deployments.
---
### Step 1: Configuring sim-backend to use a Core Connector
#### **Background:**
The sim-backend service can operate in two modes: as a simulated DFSP using the ml-testing-toolkit, or as a real core connector implementation. The service automatically switches between these modes based on the configured image.
#### **Action Taken:**
- Add the core connector image (CORE_CONNECTOR_IMAGE) and tag (CORE_CONNECTOR_TAG) in the .env file docker-compose/.env
```sh
GET_SERVICES_FXP_RESPONSE= # e.g, test-fxp
PM4ML_ENABLED=true
SUPPORTED_CURRENCIES= # e.g., MWK
## Sim Backend
CORE_CONNECTOR_IMAGE= # e.g, mojaloop/mtn-ug-core-connector
CORE_CONNECTOR_TAG= # e.g, v1.25.0
```
- Create a separate `core-connector-config.env` file to configure the core connector environment variables. This file is used by the sim-backend service when running as a core connector.
- The docker-compose.yaml file has been configured to use the core connector setup as shown below:
```yaml
sim-backend:
    image: ${CORE_CONNECTOR_IMAGE:-mojaloop/ml-testing-toolkit}:${CORE_CONNECTOR_TAG:-v18.5.1}
    env_file:
        # - .env
        - core-connector-config.env
    ports:
      # - "5052:4040"
      # - "5051:5050"
      # Use following if using a core connector
      - "3003:3003"
      - "3004:3004"
    volumes:
      - ./core-connector-config/:/opt/app/core-connector-config/
    environment:
      # Uncomment if using a core-connector for sim-backend
      # SERVER CONFIGS
      - DFSP_SERVER_HOST=0.0.0.0
      - DFSP_SERVER_PORT=3004
      - SDK_SERVER_HOST=0.0.0.0
      - SDK_SERVER_PORT=3003
      - DFSP_API_SPEC_FILE=./core-connector-config/core-connector-api-spec-dfsp.yml
      - SDK_API_SPEC_FILE=./core-connector-config/core-connector-api-spec-sdk.yml
      # Mojaloop Connector
      - SDK_BASE_URL=http://sdk-scheme-adapter:4001
```
The key configuration changes include:
- The sim-backend service uses environment file `core-connector-config.env` instead of the main `.env` file
- Volume mounting for core connector configuration files
- Server configuration environment variables for DFSP and SDK endpoints
- API specification file paths for both DFSP and SDK interfaces
- If no core connector image is specified (CORE_CONNECTOR_IMAGE is empty), the service will default to using the ml-testing-toolkit as a simulated backend.
---
### Step 2: Creating the Core Connector Configuration File
#### **Problem:**
Each core connector (MTN, Airtel, etc.) requires specific configurations that need to be managed separately from the main environment variables.
#### **Solution:**
We create a dedicated `core-connector-config.env` file that contains all the necessary environment variables for the core connector. This file is referenced by the sim-backend service in the docker-compose configuration.
### Shared/Common Variables for core-connector-config.env:
| Variable                  | Example |
|---------------------------|-------------|
| FSP_ID    | Identifier type (e.g., mtndfsp) |
| CONNECTOR_NAME       | e.g.,MTN-UG |
| LEI| e.g.,mtnuganda |
---
### Shared Configuration Block for core-connector-config.env:
```sh
# Mojaloop Connector Config for core connector
FSP_ID= #e.g., mtndfsp
CONNECTOR_NAME= #e.g.,MTN-UG
LEI= #e.g.,mtnuganda
```
---
### Step 3: Customizing DFSP-Specific Configuration Variables
The following variables are provided as a sample and should be added to the `core-connector-config.env` file. Each DFSP requires unique values:
| Variable                  | Example |
|---------------------------|-------------|
| MTN_BASE_URL   | sandbox.momodeveloper.mtn.com |
| MTN_COLLECTION_API_KEY       | b1207baca1d343b581cc21346904c707 |
| MTN_COLLECTION_CLIENT_ID    | c87a6e02-aa8c-4eaf-827a-d5d90e744241 |
| MTN_COLLECTION_SUBSCRIPTION_KEY    | 5f40c404bf0c4e4f9b37e533d4993dd7 |
| MTN_DISBURSEMENT_API_KEY    | 1188de4fcff9436f826cd1151985d7fe |
| MTN_DISBURSEMENT_CLIENT_ID    | 980fa27a-16dc-4432-b589-7733a02008cf |
| MTN_DISBURSEMENT_SUBSCRIPTION_KEY    | 85ce32bfcd8a44aaab993ebac601ff46 |
| MTN_TARGET_ENVIRONMENT    | sandbox |
| SUPPORTED_ID_TYPE    | MSISDN |
| CBS_NAME    | MTN |
| X_COUNTRY    | UG |
| SERVICE_CHARGE    | 0 |
| EXPIRATION_DURATION    | 1 |
| HTTP_TIMEOUT    | 5000 |
| MTN_ENV    | staging |
| DFSP_CURRENCY    | UGX |
---
### DFSP-Specific Configuration Block for core-connector-config.env:
```sh
# These are only provided as sample
MTN_BASE_URL= #e.g.,sandbox.momodeveloper.mtn.com
MTN_COLLECTION_API_KEY= #e.g.,b1207baca1d343b581cc21346904c707
MTN_COLLECTION_CLIENT_ID= #e.g.,c87a6e02-aa8c-4eaf-827a-d5d90e744241
MTN_COLLECTION_SUBSCRIPTION_KEY= #e.g.,5f40c404bf0c4e4f9b37e533d4993dd7
MTN_DISBURSEMENT_API_KEY= #e.g.,1188de4fcff9436f826cd1151985d7fe
MTN_DISBURSEMENT_CLIENT_ID= #e.g.,980fa27a-16dc-4432-b589-7733a02008cf
MTN_DISBURSEMENT_SUBSCRIPTION_KEY= #e.g.,85ce32bfcd8a44aaab993ebac601ff46
MTN_TARGET_ENVIRONMENT= #e.g.,sandbox
SUPPORTED_ID_TYPE= #e.g.,MSISDN
CBS_NAME= #e.g.,MTN
X_COUNTRY= #e.g.,UG
X_CURRENCY= #e.g.,EUR
SERVICE_CHARGE= #e.g.,0
EXPIRATION_DURATION= #e.g.,1
HTTP_TIMEOUT= #e.g.,5000
MTN_ENV= #e.g.,staging
DFSP_CURRENCY= #e.g.,UGX
```
### Final core-connector-config.env Configuration
Here is what the complete `core-connector-config.env` file should look like:
```sh
# Mojaloop Connector Config for core connector
FSP_ID= #e.g., mtndfsp
CONNECTOR_NAME= #e.g.,MTN-UG
LEI= #e.g.,mtnuganda
## DFSP-Specific Config - env variables can change as per the core connector being used
# These are only provided as sample
MTN_BASE_URL= #e.g.,sandbox.momodeveloper.mtn.com
MTN_COLLECTION_API_KEY= #e.g.,b1207baca1d343b581cc21346904c707
MTN_COLLECTION_CLIENT_ID= #e.g.,c87a6e02-aa8c-4eaf-827a-d5d90e744241
MTN_COLLECTION_SUBSCRIPTION_KEY= #e.g.,5f40c404bf0c4e4f9b37e533d4993dd7
MTN_DISBURSEMENT_API_KEY= #e.g.,1188de4fcff9436f826cd1151985d7fe
MTN_DISBURSEMENT_CLIENT_ID= #e.g.,980fa27a-16dc-4432-b589-7733a02008cf
MTN_DISBURSEMENT_SUBSCRIPTION_KEY= #e.g.,85ce32bfcd8a44aaab993ebac601ff46
MTN_TARGET_ENVIRONMENT= #e.g.,sandbox
SUPPORTED_ID_TYPE= #e.g.,MSISDN
CBS_NAME= #e.g.,MTN
X_COUNTRY= #e.g.,UG
X_CURRENCY= #e.g.,EUR
SERVICE_CHARGE= #e.g.,0
EXPIRATION_DURATION= #e.g.,1
HTTP_TIMEOUT= #e.g.,5000
MTN_ENV= #e.g.,staging
DFSP_CURRENCY= #e.g.,UGX
```
---
### Step 4: Connecting the Deployed Payment Manager to a Live Hub
The Core Connector acts as the crucial intermediary between the Payment Manager and the core backend.
- Replacing the sim-backend with a real core connector is the first step towards live hub connectivity.
- The essential environment variables are
  - FSP_ID: The Financial Service Provider ID assigned by the Mojaloop scheme.
  - CONNECTOR_NAME: The specific name for your connector and the LEI: Legal Entity Identifier.
  - Hub Endpoints: The actual network addresses (URLs) of the live Mojaloop APIs.
  - Authentication Credentials: Client ID and Client Secret are required to authenticate with the hub.
  - Security Protocols: Details on TLS versions, encryption standards, and other security requirements.
  - Message Formats: Confirmation of the message formats (FSPIOP / ISO20022) expected by the live hub.
##### The most critical information will come from the operator of the live Mojaloop hub itself
---