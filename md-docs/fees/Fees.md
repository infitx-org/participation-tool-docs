# Fees
This section provides a detailed description of what fees can be charged and how these fees are executed and collected.

## Fee types / categories
There are four categories of fees. This documentation describes in detail the transaction based fees, but it is important to understand that there are other types of fees that are not covered in this documentation.

1. **Transaction based fees (Participant Organisation Fees)** <br>These are per fees that are charged per transaction, and paid by the end consumer. All participant organisation can apply this fee. I.e. Payer DFSP, FXP and Payee DFSP. <br> The Payee DFSP & FXP fees are included in the clearing amount of the transaction. <br> I.e. They are pre-funded and settled during settlement.
1. **Non-transaction based fees** <br> E.g. DRPP Connection Fees: These fees are charged by the hub operator to Participant Organisations connecting to the DRPP. They are defined by the participant scheme agreement. No special mechanism is needed to invoice and settle these fees.
1. **Interchange Fees** <br> This is a mechanism where more elaborate per transaction fee can be applied by the hub.
1. **Fee commissions** <br> This is where a participant organisation involved in a transaction can choose to subsidise fees incurred by other participant organisation involved in a transaction.

## Transaction Based Fees
These are Participant Organisation Fees. I.e. all Participants in a Transaction are able to add/include their fees at the time of the transaction. In order to describe in details, this document describe how the fee is applied and collected based on the participants role in the transaction. I.e. we will discuss how transaction fees are applied as:
1. A Payer DFSP
1. An FXP (Foreign Exchange Provider)
1. A Payee DFSP

### Payer DFSP Transaction Fee
This fee is not included in the DRPP messaging, as it is expected to be managed outside of DRPP.
1. **P2P: Send Money** <br> Fees are deducted before.<br> DRPP Send Money Amount = Amount - Fee
1. **P2B: Merchant Payment** <br> Fee is added before presenting terms to customer. <br> You will need to pay = DRPP Source Amount + Fee.

Lets have a look at the detailed sequence diagrams in each of these use cases.

### FXP Transaction Fee
Fees are included in the conversion terms;
that are then presented to Payer DFSP, and the Payer.
The fees are included in the clearing amount of the transaction. 
I.e. They are pre-funded and settled during settlement.
1. **P2P: Send Money** <br> Fees are included in the terms <br> Target Currency Amount = Conversion Amount - Fee
1. **P2B: Merchant Payment** <br> Fees are included in the terms. <br> Source Currency Amount = Conversion Amount + Fee

Lets have a look at the detailed sequence diagrams in each of these use cases.

### Payee DFSP Transaction Fee
Fees are included in the transfer terms;
that are then presented to Payer DFSP, and the Payer.
The fees are included in the clearing amount of the transaction. 
I.e. They are pre-funded and settled during settlement.

1. **P2P: Send Money & P2B: Merchant Payment** <br>Fees are included in the transfer terms<br>Transfer amount = request amount + Fee

Lets have a look at the detailed sequence diagrams in each of these use cases.

## Scheme specified maximum fee
DRPP scheme has the objective of meeting the world bank and G20 targets to reduce cross border remittance fees to < 3% transferred amount.

Restriction of fees are placed on participant organisations. Details of which are included in the participant agreement and scheme rules of the scheme.

## P2P: Send Money Fees Example
Here is an end-to-end example of how fees are calculated for all participant organisations using a P2P or Send Money scenario.

![P2P_Fees_Example](./SequenceDiagram/P2PExample.png)
The Payer initiates a transfer of 500 ZMW to the Payee. The Payer DFSP charges a 1% fee (5 ZMW), leaving 495 ZMW for conversion. The FXP converts the remaining 495 ZMW to MWK at an exchange rate of 75, resulting in 37,125 MWK. The FXP then deducts their 1% fee (371 MWK), leaving 36,754 MWK for the Payee DFSP. Finally, the Payee DFSP applies their 1% fee (367 MWK), and the Payee receives 36,387 MWK.

Let's examine the message sequences that illustrate how this example impacts the messages being transmitted.
### P2P: Payer DFSP agreement
![P2P: Payer DFSP agreement](./SequenceDiagram/PayerDFSP_P2P_Fees%20-%20agreement.svg)

### P2P: FXP agreement
![P2P: FXP agreement](./SequenceDiagram/FXP_P2P_Fees%20-%20agreement.svg)

### P2P: Payee DFSP agreement
![P2P: Payee DFSP agreement](./SequenceDiagram/PayeeDFSP_P2P_Fees%20-%20agreement.svg)

### P2P: Payer DFSP transfer
![P2P: Payer DFSP transfer](./SequenceDiagram/PayerDFSP_P2P_Fees%20-%20transfer.svg)

### P2P: FXP transfer
![P2P: FXP transfer](./SequenceDiagram/FXP_P2P_Fees%20-%20transfer.svg)

### P2P: Payee DFSP transfer
![P2P: Payee DFSP transfer](./SequenceDiagram/PayeeDFSP_P2P_Fees%20-%20transfer.svg)


## P2B: Merchant Payment Fees Example
Here is an end-to-end example of how fees are calculated for all participant organisations using a P2B or Merchant Payment scenario.

![P2B_Fees_Example](./SequenceDiagram/P2BExample.png)
The Payer requests to pay the merchant 50,000 MWK (note that this amount is specified in the Payee's currency). The Payee DFSP charges a 1% fee (500 MWK), so the FXP needs to send 50,500 MWK. The FXP applies their 1% fee (505 MWK), requiring a total conversion amount of 51,005 MWK. At an exchange rate of 75, this translates to 680 ZMW needed to support the transfer. The Payer DFSP then adds their fee of 6 ZMW, meaning the Payer must pay 686 ZMW to complete this payment, while the Payee receives 50,000 MWK.

Let's examine the message sequences that illustrate how this example impacts the messages being transmitted.