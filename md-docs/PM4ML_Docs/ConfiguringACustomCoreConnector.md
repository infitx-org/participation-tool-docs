# Configuring a custom core connectors

## Objective
This guide documents the step-by-step process of:
- Replacing the sim-backend (a mock backend) with actual Core Connector, a real DFSP implementation.
- Creating a custom configuration for managing shared environment variables used by all core connectors (MNOs, Banks, etc).
- Integrating all configurations into docker-compose.yml for clean and maintainable deployments. 
---


### Step 1: Replacing sim-backend (Mock DFSP)

#### **Background:**
sim-backend was a simulated DFSP used for testing purposes within the Mojaloop environment.
#### **Action Taken:**
- Add the actual core connector image (CORE_CONNECTOR_IMAG) and tag (CORE_CONNECTOR_TAG) in the .env file docker-compose/.env

```sh
GET_SERVICES_FXP_RESPONSE= # e.g, test-fxp
PM4ML_ENABLED=true
SUPPORTED_CURRENCIES= # e.g., MWK

## Sim Backend
CORE_CONNECTOR_IMAGE= # e.g, mojaloop/mtn-ug-core-connector
CORE_CONNECTOR_TAG= # e.g, v1.25.0

```
- In the docker-compose/docker-compose.yaml file coment out the sim-backend-ui environment if using a core connector as shown bellow.
```sh
ports:
      # - "5052:4040"
      # - "5051:5050"
      # Use following if using a core connector
      - "3003:3003"
      - "3004:3004"
```

- Also in the docker-compose/docker-compose.yaml file coment out the sim-backend ports if using a core connector as shown bellow.
```sh
# NOTE: The following UI for sim backend can be enabled for debugging purpose
  sim-backend-ui:
    image: mojaloop/ml-testing-toolkit-ui:v16.0.4
    ports:
      - "6061:6060"
    environment:
      # For ttk as sim-backend
      # - API_BASE_URL=http://localhost:5051
      # For core connector
      - API_BASE_URL=http://localhost:3003
      - AUTH_ENABLED=FALSE
```

- If the core connector is not found it will default to using the ml-testing-toolkit (sim backend).
---

### Step 3: Creating a Shared Environment Block

#### **Problem:**
Each core connector (MTN, Airtel, etc.) required similar configurations like:

- FSP_ID
- CONNECTOR_NAME

#### **Solution:**
We identified these shared variables and defined them as part of a shared environment config.

### Shared/Common Variables:

| Variable                  | Example |
|---------------------------|-------------|
| FSP_ID    | Identifier type (e.g., mtndfsp) |
| CONNECTOR_NAME       | e.g.,MTN-UG |
| FSP_ID    | e.g.,mtnuganda |
| LEI| e.g.,mtnuganda |
---

### Final Shared Configuration Block:
```sh
# Mojaloop Connector Config for sim-backend
FSP_ID= #e.g., mtndfsp
CONNECTOR_NAME= #e.g.,MTN-UG
FSP_ID= #e.g.,mtnuganda
LEI= #e.g.,mtnuganda

```
---
### Step 4: Customizing DFSP-Specific Configuration Variables
The following variables are provided as a sample. Each DFSP requires unique values:
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
### DFSP-Specific Configuration Block:
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
### Final Configuration Block:
Here is what the final configuration block should look like:
```sh
# Mojaloop Connector Config for sim-backend
FSP_ID= #e.g., mtndfsp
CONNECTOR_NAME= #e.g.,MTN-UG
FSP_ID= #e.g.,mtnuganda
LEI= #e.g.,mtnuganda

## CBS Config , env variables can change as per the core connector being used
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
### Step 5: Connecting the Deployed Payment Manager to a Live Hub
The Core Connector acts as the crucial intermediary between the DFSP (like the Payment Manager) and the Mojaloop hub.

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
### Step 5: Maintenance & Scaling
To add more core connectors (e.g., MTN Rwanda, Zamtel), repeat the following:

- Update DFSP-specific services and image.
- Update DFSP-specific environmental variables.
- Ensure unique ports or mount volumes if needed.