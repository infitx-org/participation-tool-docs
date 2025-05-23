# Business Operations 

This section contains documentation on recommendations and to-dos on the different financial operations that should happen on be put in place for successful operation of an integration. It contains information about the accounting schema, prefunded liquidity design and any other information that is relevant to the financial operations team of a DFSP.

## DFSP Integration Accounts
To integrate a financial service provider, some accounts need to be established by the DFSP to allow receipt and sending money for its customers. For incoming payments, the DFSP needs to establish a funded disbursement and for outgoing payments, the DFSP needs to establish a collections account. [Learn more](/md-docs/IntegrationAccounts.md)



## DFSP Liquidity Design
All transactions that move through a Mojaloop payment gateway are prefunded. This removes systemic risk and allows the settlement of cleared funds between financial institutions to be fast and reliable. As only prefunded transactions are permitted, prefunding is also a mechanism for DFSP to control their exposure. Designing for liquidity for a DFSP must therefore cover both the mechanisms and procedures for managing the liquidity but also the controlling of exposure. [Learn more](/md-docs/LiquidityDesign.md)