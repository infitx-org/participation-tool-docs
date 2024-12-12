# Integration Accounts
To integrate a financial service provider, some accounts need to be established by the DFSP to allow receipt and sending money for its customers. For incoming payments, the DFSP needs to establish a funded disbursement and for outgoing payments, the DFSP needs to establish a collections account.

Some financial service providers can choose to have one account to serve as both the disbursement and collection account but it may be better to have separate accounts to address the integration.

## Funded Disbursement Account (Incoming Payments)
This account is held inside the DFSP and is used as a store for float from which funds are deducted when crediting a beneficiary's account during the execution of an incoming instant payment.
![](/md-docs/images/Disbursement.png)

## Collection Account (Outgoing Payments)
This account is held inside the DFSP and is used as a store for funds when customers who are trying to send money have their accounts debited with the send amount.
![](/md-docs/images/Collection.png)

