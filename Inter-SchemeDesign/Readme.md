<div style="display: flex; justify-content: space-between;">
    <img src="../images/cbc_logo.jpg" >
    <img src="../images/blank.png" style="width: 20%" >
   <img src="../images/mojaloop-foundation.png" height = 40>
    <img src="../images/blank.png" style="width: 20%" >
    <img src="../images/INFITX-TECH_LOGO.png" >
</div>

# Inter scheme using national switches Design
The proxy implementation method to connect schemes does the following.
1. Leverages the trust relationship between scheme so that a transaction only has a single pre-funding requirement at the Payer's scheme.
2. Ensures non-repudiation across schemes; removing the requirement for the cross-network proxy to take on responsibility for clearing; which removes costs

The schemes are connected via a proxy participant, that is registered to act as a proxy in the scheme for adjacent but connected dfsps in other schemes. 
Essentially, the two connected schemes behave as if they where a single scheme.

This design make the following assumptions
1. No two connected participant have the same identifier
1. Get \transfer request are resolved at the payee scheme
1. Timeouts in non-payee schemes are  disabled (maybe enlarged)

<div style="page-break-after: always"></div>

## General Patterns
There are certain general patterns that emerge
### Happy Path Patterns
![Happy Path Patterns](./Proxy%20pattern%20-%20Happy%20path.png)

<div style="page-break-after: always"></div>

### Error Patterns
![Error Patterns](./Proxy%20pattern%20-%20Unhappy%20path.png)

<!-- 
## Detailed Designs
1. [Discovery - On Demand Implementation](./Discovery.md)
2. [P2P](./P2P.md)
-->
## Detailed Design of on Demand Discovery

The discovery flows are summarized as follows:
1. On Demand loading of cross network identifiers - using Oracles for identifier lookups in local scheme
2. On Demand loading for all identifiers

### On Demand Discovery using local oracles
- Scheme uses Oracles to map local identifiers to participants of the scheme
- Identifiers for other schemes are discovered via a depth first search, but asking all participants. Proxy participant then forward the request to the connected scheme
- This diagram shows two connected schemes, but this design work for any number of connected schemes.

![Proxy pattern - On Demand Discovery with Oracles](Proxy%20pattern%20-%20On%20Demand%20Discovery%20-%20using%20Oracles.png)


### On Demand Discover with incorrectly cached results
- When an identifier moved to another dfsp provider, then the store cache for that participant will route to an unsuccessful get \parties call.

Here is a sequence diagram show how that gets updated.
#### Sequence Diagram
![Invalid Cache](Proxy%20pattern%20-%20On%20Demand%20Discovery%20-%20Identifier%20Cache%20Invalid.png)

## P2P flow across network using Proxy
This design make the following assumptions
1. No two connected participant have the same identifier
1. No limit checks are done against proxy participants
1. Get \transfers request are resolved at the payee scheme
1. Timeouts in non-payee schemes are  disabled.

### Sequence Diagram
Here is a sequence diagram show the Agreement and Transfer stages of a transaction, and how the Get Transfer is resolved.

![P2P flow](./Proxy%20pattern%20-%20P2P.png)

<div style="page-break-after: always"></div>

## Admin API - defining Proxy Participants
![Admin API](./SettingUpProxys.png)

## Clearing Accounts for Inter-scheme FX transfers
![Clearing Accounts](./InterschemeAccounts-Clearing.png)

