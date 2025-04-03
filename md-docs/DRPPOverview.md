# DRPP Overview
The Digital Retail Payments Platform (DRPP), is a project of COMESA being executed under the supervision of COMESA Business Council (CBC) and COMESA Clearing House (CCH).
The goal of this platform is to enable real-time cross-border remittances between traders in the COMESA region. This platform will be based on the Open Source [Mojaloop Software](https://mojaloop.io)

## Acronyms
- DFSP Digital Financial Service Provider (Financial Institution)
- DRPP Digital Retail Payments Platform
- FXP Foreign Exchange Provider

## Early Adopter Program
This is an initiative of the program implementers to work with a select group of DFSPs in Zambia and Malawi to collaboratively work on an initial release of the platform by collaborating with the financial institutions to address integration issues in preparation for the full rollout to other countries and financial institutions.

As an Early adopter you will get a tailored onboarding experience and access to dedicated support for the DRPP’s interoperability and regional financial inclusion efforts.

## Simulation Customer Journey
Peter, using Equity Bank in Kenya with the local currency Kenyan Shillings (Ksh), initiates a payment to Otis, who banks with UBA in Zambia using a different local currency Zambian Kwacha (ZMW).

Both of these jurisdictions are participating in the COMESA Digital Retail Payment Platform (DRPP), a prefunded Inclusive and Instant Payment System (IIPS) compliant Regional Hub. The Local Schemes in Kenya and Zambia adhere to IIPS compliance and are either realized as upgraded national switches or emulated national IIPS (eNIIPS) operated by the DRPP on behalf of the local scheme.

When Peter sends money to Otis, the transaction is processed through an orchestrated interaction between his local bank, Equity, the Kenyan Local Scheme, the Regional Scheme (DRPP) including an FXP participating at the regional level providing foreign exchange between the two currencies, the Zambian local scheme and the recipient's bank UBA. 

Taking a more detailed look at the transfer when Peter initiates a payment in Kenyan Shillings (Ksh) to Otis through his bank, Equity. If Peter's account with Equity is in good standing, Equity will submit the remittance request via the local scheme. If the recipient, Otis, is not local, the local scheme will forward the request to the DRPP’s Regional Hub. The Regional Hub, operating as a linked system, will inquire with other connected jurisdictional schemes to locate the potential recipient.

Once located Otis’ DFPS, UBA in Zambia confirms his account exists and is active, these recipient details are returned to Equity. Equity requests an agreement from Foreign Exchange Providers (FXPs) connected to the Regional Hub to provide liquidity cover in Zambian Kwacha (ZMW). The Regional Hub and recipient's local scheme, via Otis’ DFPS validates that Otis is in good standing and able to receive the payment. The commercial terms of the transfer and currency conversion are presented to Equity. Equity presents its corresponding retail terms to Peter, who acknowledges and accepts them. Upon acceptance, Equity initiates the irrevocable and non-repudiable transfer on Peter’s behalf, by this point Equity has  reserved the funds from Peter’s account to ensure the payment will be covered.

The remitter's local scheme reserves liquidity by recording the obligation and passes confirmation of the request to the Regional Hub. The Regional Hub secures the destination currency from the FXPs' promised liquidity cover and informs the recipient's local scheme that the clearance transaction has been authorized. This results in a reservation of funds in the Zambian scheme that enable the recipient's Digital Financial Service Provider (DFSP), UBA to confirm that it has cleared funds from its working capital into Otis' account, with the expectation that at settlement the funds from the FXP will be transferred to UBA. This is upheld by the DRPP Scheme Rules that the Regional Hub and participating local scheme and their participants are all signatories of.

Upon successful processing and clearance of funds to Otis, the recipient's DFSP and, in turn, the local scheme notifies the Regional Hub. Subsequently, via the remitter's local scheme, Equity, and ultimately Peter will receive confirmation that Otis has received the payment.

Note: Central bank role remains that of oversight and regulation, monetary policy but are not financially obligated in the clearance and settlement flows.

## Architecture
The architecture of the DRPP from the DFSP’s point of view consists of a network of DFSPs and FXPs all connecting to a central hub. The central hub broker’s messages between the DFSPs and FXPs to be able to perform cross border transactions.

In the DRPP,  financial institutions can participate in the scheme either as DFSPs or FXPs. DFSPs are financial institutions that have customers that send and receive money. FXPs are financial institutions that provide foreign exchange between currency pairs to support cross-border transactions.

Here is an illustration that shows from a high level how the whole scheme is structured from a financial institution’s point of view.

![DRPP Architecture](/md-docs/images/DRPP-Arc.jpg)

The DRPP is a representation of all the components in the platform that support routing of transfer requests to and from all participating financial institutions.

In production, each financial institution will be required to deploy a piece of software to run in their environment to facilitate the connection between the respective financial institutions and the DRPP. 

![DFSP Setup](/md-docs/images/DFSP-Setup.png)

### Payment Manager
This is a tool developed to support connectivity between the DFSP and the DRPP. The 2 components of concern from the DFSP perspective are the core connector and the mojaloop connector.

#### Core Connector
The core connector is a custom built middleware that provides an integration between the DFSP API and the mojaloop Connector. 

Part of the work that must be done during an integration is the development of a core connector specifically for the DFSP being integrated. This is because DFSP APIs vary across different financial institutions.

#### Mojaloop Connector
The mojaloop connector is the middleware that brokers communication between the custom built core connector and the DRPP.

It is already built and will only need to be deployed as part of the Payment Manager services for it to be able to work for the DFSP being integrated.


For the Early Adopter Program, the Payment Managers will be hosted for the DFSPs in a managed environment. But when going into production, deployment tools will be provided to support the DFSPs in deploying the solution in their environments.

## Payment Flows
An integration for a specific DFSP is supposed to support both incoming and outgoing payments.

### Incoming Payments
Incoming payments from the perspective of a DFSP are payments that are destined for a specific customer account. They are intended for customers who will be receiving payments from other customers in the DRPP.

The core connector is built to support incoming payments. From the DFSP API, it requires the following information
- How to get account information especially the name of the customer for a specific account number
- How to validate that a specific account can receive a payment prior to committing funds
- How to determine the cost of a transfer into a customer’s account
- How to request a reservation of a funds for a customer before crediting to the account
- How to send a disbursement request to credit a customer’s account with the reserved funds

Additional information required by the integration team is information from the DFSP about what we call “Working Capital Accounts”. From an incoming payments perspective, this is an account from which money will be disbursed to the beneficiary. It is held inside the DFSP and it is specifically for DRPP integration. More discussions can be held to talk about what this account will look like for incoming payments.

### Outgoing Payments
Outgoing payments from the perspective of the DFSP are payments that are originating from the DFSP’s customers destined for other beneficiaries in the DRPP scheme.

The core connector is built to support outgoing payments. During the implementation of the integration to support outgoing payments, there is an important consideration to make.

- DFSP Customer Application integration with core connector

From the DFSP API, the core connector needs to do the following to be able to support outgoing payments.
- How to perform a refund when an outgoing payment into the scheme fails.

Customers can trigger outgoing payments through a customer facing application. Either USSD , Mobile or Web Application. This DFSP Customer application needs to send outgoing payment requests to the core connector so that the core connector can send outbound transfer messages to the DRPP through the mojaloop connector.

To review the core connector send money api, please [click here](https://editor-next.swagger.io/?url=https://raw.githubusercontent.com/mojaloop/ml-reference-connectors/refs/heads/dev/airtel-zm-core-connector/src/api-spec/core-connector-api-spec-dfsp.yml) to learn more

The DRPP supports two payment use cases. They include 
- P2P Normal Send Money
- P2B Merchant Payment

#### Customer Journey
There are 2 use cases the DRPP intends to support and offer to customers. P2P and P2B. Here is a generic customer journey.

1. Customer Opens application or dials USSD code.
2. Customer enters payee identifier
3. Customer enters amount to send
4. Customer initiates the transfer by submitting the data
5. Application responds with transfer terms and name of the payee.
6. Customer reviews payment terms and payee details
7. Customer proceeds to abort or approve the transfer
8. If the customer approves, the funds are deducted from their account.

Step `4` represents the initial step of triggering the payment and step `7` represents the Confirm Send Money Step The approaches provided in the Confirm Send Money Approaches section address options for handling events from step 7 onwards.

#### Initial Step
The send-money customer journey begins when the customer expresses interest to send funds by specifying details about the payee and amount to send. This initiation step applies to both approaches going to be presented in this documentation.

Here is a sequence diagram that describes the process.

In this sequence diagram the DFSP Customer Facing application (USSD or Mobile App) receives some data from the customer about the payment details and then sends the data to a Core Connector middleware that is designed to retrieve information about the payee and how much it will cost to execute the transfer.

This step corresponds to the following requests in the [api documentation](https://editor-next.swagger.io/?url=https://raw.githubusercontent.com/mojaloop/ml-reference-connectors/refs/heads/dev/airtel-zm-core-connector/src/api-spec/core-connector-api-spec-dfsp.yml).

- POST /send-money
- POST /merchant-payment

![InitiateSendMoney](/md-docs/images/InitiateSendMoney.png)

#### Confirm Send Money Approaches
In reference to the customer journey, this section presents 2 ways of handling the series of events from step 7. This is the point where if the customer has approved of the payment, either DFSP or the core connector middleware will take the responsibility of debiting funds from the customer account. These are the approaches shared here.

#### DFSP Handling Debit of Funds
In this approach, after the customer has reviewed the transfer terms, the name of the payee and has approved the transfer. DFSP Customer Application handles the debiting of funds from the customer account.

Here is a sequence diagram to show the steps from an DFSP and core connector perspective.

This step corresponds to the following requests in the [api documentation](https://editor-next.swagger.io/?url=https://raw.githubusercontent.com/mojaloop/ml-reference-connectors/refs/heads/dev/airtel-zm-core-connector/src/api-spec/core-connector-api-spec-dfsp.yml)

- PUT /send-money/{transferId}
- PUT /merchant-payment/{transferId}

![DFSP Handled](/md-docs/images/DFSPHandled.png)

#### Core Connector Initiating Debit of Funds
In this approach, after the customer has reviewed the transfer terms, the name of the payee and has approved the transfer. The Core Connector Middleware initiates debit of funds from the customer account.

Here is a sequence diagram to show the steps from an DFSP and core connector perspective.

This step corresponds to the following requests in the [api documentation](https://editor-next.swagger.io/?url=https://raw.githubusercontent.com/mojaloop/ml-reference-connectors/refs/heads/dev/airtel-zm-core-connector/src/api-spec/core-connector-api-spec-dfsp.yml)

- PUT /send-money/{transferId}
- PUT /merchant-payment/{transferId}
- PUT /callback (This is a callback URL registered in DFSP Open API Portal)

![CoreConnector Handled](/md-docs/images/CoreConnectorHandled.png)

## Customer Identifiers
For the Soft launch and during the Early Adopter Program, a selected group of customer identifiers will be uploaded into the DRPP account lookup service oracles to support account discovery. 

## Foreign Exchange Providers (FXPs)
Foreign exchange providers will be the financial institutions in the scheme that provide foreign exchange services to support cross border transactions involving a currency pair.

To integrate an FXP into the scheme, they would also need to run an instance of the payment manager in their environment. They will also require a core connector to be built to support the integration for the FXP.

The foreign exchange provider’s core connector needs some information and apis to be able to perform its task.

1. How to get a quote for exchange of an amount  in a currency to another currency.
2. How to confirm the transfer for a previously requested quote.

Here is the design for how the FXP core connector will interact with the FX API of the financial institution.
The component that needs to be developed or should be present in the financial institution participating as an FXP is the FXP API. 

### FX Quoting process design
This process shows the interaction between the FXP Core connector and the financial institution’s FXP api.

![fxQuoting](/md-docs/images/fxQuoting.png)

### FX Transfer Confirmation
This process shows the interaction between the FXP core connector and FXP Api when confirming a transfer

![fxTransfers](/md-docs/images/fxTransfers.png)
