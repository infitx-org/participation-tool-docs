# Customer Journey
The customer journey is the set of steps a customer of a DFSP would go through to be able to make a transfer from their account to a beneficiary in another DFSP. The customer journey provided here is generic inorder to give an idea of what the customer facing application is supposed to collect.

## Payer Customer Journey - P2P
1. The customer accesses the DFSP interface for performing transactions
2. The customer chooses that they would like to send money
3. The customer then specifies the country to which they are sending the funds.
4. The customer enters the party identifier of the destination beneficiary
5. The customer inputs the amount in their local currency 
6. The customer receives back information about the destination beneficiary i.e their name, receive amount and fees
7. The customer then either confirms to proceed or to abort the transfer
8. If they proceed, the customer's account will be debited with the amount they want to send plus the fees.
9. The customer will then receive notification of the debited funds.


## Payer Customer Journey - P2B
1. The customer accesses the DFSP interface for performing transactions
2. The customer chooses that they would like to make a merchant payment
3. The customer then specifies the country to which they are sending the funds.
3. The customer inputs the amount in the currency of the merchant's country
4. The customer enters the party identifier of the merchant
6. The customer receives back information about the destination beneficiary i.e their name, receive amount and fees
7. The customer then either confirms to proceed or to abort the transfer
8. If they proceed, the customer's account will be debited with the amount equivalent to the merchant's receive amount ,plus the fees.
9. The customer will then receive notification of the debited funds.