# Core Connector Template
Core Connector template to be adapted for rapid core connector development.

> For full forms check the glossary section

## Introduction
A core connector is a middleware that facilitates a connection between the DFSP and the mojaloop connector.

### Prerequisites
Before you start building a core connector, there are some requirements that need to be in place before implementation starts. These are important because they affect the success of the integration

- CBS Sandbox API
- Access credentials 
- Typescript knowledge
- Beginner docker knowledge 
- Git knowledge
- Mojaloop Knowledge
- For Windows users you will need WSL (Ubuntu)

If you need to get knowledge on how Mojaloop works, consider taking the [Mojaloop Training Program](https://mojaloop.io/mojaloop-training-program/).

## Start Here.

Clone this repository or fork it and clone.

```bash
git clone https://github.com/mojaloop/ml-reference-connectors.git
```

Change into the cloned directory
```bash
cd ml-reference-connectors
```

Create a new core connector by running this command

```bash
./create.sh -c zm -n airtel
```

Once you have run this command, it will created a folder named `airtel-zm-core-connector`

This command also creates a new branch for the core connector. For this connector, it will be called `ft/airtel-zm-core-connector`. It will install npm dependencies, build and start the server. To stop the server from running, press `CTRL + C`

Once you have setup your local development environment, follow the instructions in the next sections to learn how to customize the new connector.

## Core Connector Structure
Core connectors are supposed to expose two servers. One to handle requests from the mojaloop connector i.e the [mojaloop connector backend api](https://mojaloop.github.io/api-snippets/?urls.primaryName=SDK%20Backend%20v2.1.0). This api implements the part of the integration that supports incoming payments. The other server will handle requests from the DFSP to send money to a beneficiary in another DFSP. This is called the [send money api](https://github.com/mojaloop/ml-reference-connectors/blob/main/core-connector-template/src/api-spec/core-connector-api-spec-dfsp.yml).  This api implements the part of the integration that supports outgoing payments.

By default the core connector exposes port 3003 for incoming payments and port 3004 for outgoing payments. For more information about the core connector networking, [learn more](/md-docs/Networking.md)

The core connector template code base has 3 main structural components located in the `src` folder of the core connector.

- `core-connector-svc`: This folder contains code that handles the way the api is exposed over a RESTFUL interface.
- `domain`: This folder contains the business logic of the core connector and all client classes used to communicate with the [DFSP](/md-docs/CBSClient.md) and [Mojaloop Connector](/md-docs/SDKClient.md).  
- `infra`: This layer contains implementations for an http client, logger and plugins that are used by the service. This does not need refactoring.

## Payee Integration  (Incoming Payments)
![Incoming Payments](/md-docs/images/IncomingPayments.png)
The payee integration is required to support incoming payments into the DFSP being integrated. It will setup the required facilities to support account holders of a DFSP receive funds from a payer in another DFSP.

### Implementing Get Parties

Get Parties is the function of the core connector that supports account discovery. The way it is implemented is by exposing a route on the core connector that will receive requests from the Mojaloop Connector. The get parties function is exposed by this route.

`GET` `/parties/{IdType}/{IdValue}`

For more information about this route, please refer to the [mojaloop connector backend api](https://mojaloop.github.io/api-snippets/?urls.primaryName=SDK%20Backend%20v2.1.0)

When the core connector receives this request, it retrieves information about the party `IdValue` from the DFSPs core banking api. It then prepares a response payload that is structurally compliant with the mojaloop connector backend api and returns it to the mojaloop connector.

To implement this function in the newly created connector. A few things need to be refactored.
- Implement a client for the core banking api. [learn more](/md-docs/CBSClient.md)
- Refactor the aggregate function for `getParties` prepare a response for the mojaloop connector based on the data received from the DFSP core banking api. [learn more](/md-docs/CoreConnectorAggregate.md#get-parties)
- Write unit and integration tests to verify the functionality. [learn more](/md-docs/Testing.md)

The core connector template already has code that implements the request handling logic. The core connector template has route handler functions that receive request that match the get parties url. The route handler functions then call the respective function for account discovery in the domain.


### Implementing Quote Requests
Quote requests is the function of the core connector that supports agreement of transfer terms. It is implemented by exposing a route on the core connector that will receive requests from the Mojaloop Connector. It also serves as route to help the mojaloop connector determine whether a transfer of the amount specified in the request body can happen. This means checking if the account of the beneficiary is blocked or whether a payment may fail for whatever reason. The route to be exposed is this.

`POST /quotetrequests`

For more information about this route, please refer to the [mojaloop connector backend api](https://mojaloop.github.io/api-snippets/?urls.primaryName=SDK%20Backend%20v2.1.0)

When the core connector receives a request that matches this route it is supposed to do the following;
- Calculate how much the transfer will cost
- Check if the destination beneficiary can receive the funds of the amount specified in the request body.
- Check the request body has the correct currency as supported by the core connector. The supported currency is configured in the core connector environment variables. [Learn more](/md-docs/Configuration.md) about configuration management.
- Return a response payload containing transfer fees and amount the destination beneficiary will receive. [Learn more](https://mojaloop.github.io/api-snippets/?urls.primaryName=SDK%20Backend%20v2.1.0#/Quotes/BackendQuoteRequest) about the request and response payloads

To implement this functionality in the newly created connector, A few things need to be refactored.
- Implement a client for the core banking api. [learn more](/md-docs/CBSClient.md)
- Refactor the aggregate function for `quoteRequests` to perform the tasks as listed above and prepare a response for the mojaloop connector as specified in the mojaloop connector backend api. [learn more](/md-docs/CoreConnectorAggregate.md#quote-requests)
- Write unit and integration tests to verify the functionality. [learn more](/md-docs/Testing.md)

### Implementing Transfers
Transfers is the function of the core connector that supports the actual crediting of funds on to the destination beneficiary's account. The transfers function happens in two requests. The first is a reservation step and the second is a funds committing step.

The first endpoint that the core connector needs to expose for the funds reservation step is the `POST /transfers` and the second endpoint that needs to be exposed is `PUT /transfers/{transferId}`

For more information about this routes, please refer to the [mojaloop connector backend api](https://mojaloop.github.io/api-snippets/?urls.primaryName=SDK%20Backend%20v2.1.0#/Transfers)

When the core connector receives a `POST /transfers` request, it is supposed to perform the following;
- Reserve the funds from the 


## Payer Integration  (Outgoing Payments)
![Outgoing Payments](/md-docs/images/OutgoingPayments.png)
This section describes how to implement payer integrations to support payer operations to the Mojaloop Connector

### Implementing Send Money
TBD...

### Implementing Update Send Money
TBD...

## Reference
- [API Service](/md-docs/Service.md) 
- [Route Handling and Api Specifications](/md-docs/RoutingAndApiSpecifications.md)
- [Networking](/md-docs/Networking.md)
- [Core Banking Solution Client](/md-docs/CBSClient.md)
- [Mojaloop Connector Client](/md-docs/MojaloopConnector.md)
- [Configuration Management](/md-docs/Configuration.md) 
- [Aggregate for Business Logic](/md-docs/CoreConnectorAggregate.md)
- [Error Handling](/md-docs/ErrorHandling.md) 
- [Integration Accounts](/md-docs/IntegrationAccounts.md)
- [Request Lifecycle](/md-docs/RequestHandling.md)

# Glossary
- CC : Core Connector
- DFSP : Digital Financial Service Provider
- CBS: Core Banking Solution
- API: Application Programming Interface
- WSL: Windows Sub-System For Linux
- KYC: Know Your Customer