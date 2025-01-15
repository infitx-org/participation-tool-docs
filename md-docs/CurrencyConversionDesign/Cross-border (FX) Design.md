
# Cross-border (FX) Design

The Mojaloop currency conversion functional implementation includes support for Payer DFSP currency conversion. In this scenario, it is the Payer DFSP that comes to an agreement with the foreign exchange provider, to provide another currency liquidity in order to fund the transfer.
There are two variation of the implementation. 
 - Sending funds from a local currency
 - Making a payment in a foreign currency

The difference between these use case concerns the amount Type that is specified when making the transfer.

## Sending funds to an account in another currency
For this use case, the Payer DFSP will specify the transfer with amount type **SEND** and define the transfer amount in the **Payer's local currency** (the source currency).
An secondary use case example for this is a P2P remittance transfer.

### Simplified Send Money Diagram
Below is a simplified sequence diagram showing the flows between the Participant organizations, the foreign exchange providers and the Mojaloop switch.

#### Discovery Phase
![Discovery Phase](/md-docs/images/Payer_SEND_Discovery/Payer_SEND_Discovery.svg)

#### Currency Conversion
![Currency Conversion](/md-docs/images/PAYER_SEND_CurrencyConversion/PAYER_SEND_CurrencyConversion.svg)

#### Agreement Phase 
![Agreement](/md-docs/images/PAYER_SEND_Agreement/PAYER_SEND_Agreement.svg)

#### Send Confirmation
![Send Confirmation](/md-docs/images/PAYER_SEND_Confirmation/PAYER_SEND_Confirmation.svg)

#### Transfer 
![Transfer](/md-docs/images/PAYER_SEND_Transfer/PAYER_SEND_Transfer.svg)


### Detailed Send Money Diagram

Below is a detailed sequence diagram that shows the complete flow, and includes the **Mojaloop Connector** and integration APIs for all participant organizations. (This is a useful view if you are building integrations as a participant organization.)

#### Discovery
![Discovery Phase](/md-docs/images/FXAPI_Discovery/FXAPI_Discovery.svg)


#### Currency Conversion
![Currecny Conversion](/md-docs/images/FXAPI_Payer_CurrencyConversion/FXAPI_Payer_CurrencyConversion.svg)

#### Agreement Phase 
![Agreement Phase](/md-docs/images/FXAPI_Payer_Agreement/FXAPI_Payer_Agreement.svg)

#### Sender Confirmation
![Confirmatiom](/md-docs/images/FXAPI_Payer_SenderConfirmation/FXAPI_Payer_SenderConfirmation.svg)

#### Transfer Phase
![Transfer](/md-docs/images/FXAPI_Payer_Transfer/FXAPI_Payer_Transfer.svg)


<div style="page-break-after: always"></div>

## Making a payment in another currency
For this use case, the Payer DFSP will specify the transfer with amount type **RECEIVE** and define the transfer amount in the **Payee's local currency** (the target currency).
An secondary use case example for this is a cross boarder Merchant Payment.

Below is a detailed sequence diagram that shows the complete flow, and includes the Mojaloop connector and integration APIs for all participant organizations.

#### Discovery 
![Discovery](/md-docs/images/FXAPI_Payer_Receive_Discovery/FXAPI_Payer_Receive_Discovery.svg)

#### Get FX Providers
![Get FXPs](/md-docs/images/FXAPI_Payer_Receive_GetFXPs/FXAPI_Payer_Receive_GetFXPs.svg)

#### Agreement
![Agreement](/md-docs/images/FXAPI_Payer_Receive_Agreement/FXAPI_Payer_Receive_Agreement.svg)

#### Sender Confirmation
![Sender Confirmation](/md-docs/images/FXAPI_Payer_Receive_SenderConfirmation/FXAPI_Payer_Receive_SenderConfirmation.svg)

#### Transfer 
![Transfer](/md-docs/images/FXAPI_Payer_Receive_TransferPhase/FXAPI_Payer_Receive_TransferPhase.svg)

<div style="page-break-after: always"></div>

## Abort flows
This sequence diagram show how the design implements abort messages.

### Discovery 
![Discovery](/md-docs/images/Payer_SEND_ABORT_Discovery/Payer_SEND_ABORT_Discovery.svg)

### Currency Conversion
![Currency Conversion](/md-docs/images/Payer_SEND_ABORT_CurrencyConversion/Payer_SEND_ABORT_CurrencyConversion.svg)

### Agreement
![Agreement](/md-docs/images/Payer_SEND_ABORT_Agreement/Payer_SEND_ABORT_Agreement.svg)

### Sender Confirmation
![Sender Confirmatiom](/md-docs/images/Payer_SEND_ABORT_SenderConfirmation/Payer_SEND_ABORT_SenderConfirmation.svg)

### Transfer Phase
![Transfer](/md-docs/images/Payer_SEND_ABORT_TransferPhase/Payer_SEND_ABORT_TransferPhase.svg)

## Open API References
These Open API references are designed to be readable for both software an review person. The show the detailed requirements and implementations of the API design.

- [FSPIOP specification Open Api definition](https://github.com/mojaloop/mojaloop-specification/blob/master/fspiop-api/documents/v2.0-document-set/fspiop-v2.0-openapi3-implementation-draft.yaml).
- [API Snippets Open Api definition](https://github.com/mojaloop/api-snippets/blob/main/docs/fspiop-rest-v2.0-openapi3-snippets.yaml)
- [Mojaloop Connector backend Open Api definition](https://github.com/mojaloop/api-snippets/blob/main/docs/sdk-scheme-adapter-backend-v2_1_0-openapi3-snippets.yaml)
- [Mojaloop Connector outbound Open Api definition](https://github.com/mojaloop/api-snippets/blob/main/docs/sdk-scheme-adapter-outbound-v2_1_0-openapi3-snippets.yaml)


