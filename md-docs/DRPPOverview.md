# COMESA Digital Retail Payments Platform (DRPP) Solution Overview

# Preface
This document is written to help share and evolve the common vision behind INFITX’s implementation of the COMESA’s Digital Retail Payment Platform. This provides a high level overview and signposting the key characteristics and milestones. There is a companion presentation deck that provides additional diagrams and process information.These two documents are references for understanding what the solution is and how the solution is to be realised. The rationale for implementation decisions are included, these are the“why”s for the particular implementation details, the program level “why” is answered in COMESA’s own documentation and the journey they have taken to get to this point.A good understanding of the concepts here will derisk program communication and allow for elements, such as the DRPP Schematic alongside a functionality matrix will be used to report program progress

# Introduction
In an increasingly interconnected global economy, the need for efficient and inclusive cross-border payment solutions has never been more pressing. The Instant and InclusivePayment Scheme2(IIPS) addresses this need by creating a robust, standardised, and accessible framework for seamless financial transactions across COMESA borders and diverse financial service providers. The proposed solution leverages the power of the Mojaloop open-source platform to establish a comprehensive network. This network connects DigitalFinancial Service Providers (DFSPs), financial institutions, and end-users, facilitating real-time,low-cost transactions regardless of their geographical location or preferred payment method(end-to-end). Scale can be accelerated by supporting IIPS compliant national payment schemes(NPS) to onboard their entire jurisdiction, thus ensuring jurisdictional sovereignty and compliance. Where the NPS is not yet IIPS compliant, an emulated NPS (aka Emulated NIIPS) will be used to provide the optimal scaling solution.By streamlining onboarding processes, ensuring regulatory compliance, and prioritising interoperability, the proposed IIPS solution empowers DFSPs in the COMESA region to expand their reach, enhance their service offerings, and foster financial inclusion for millions of individuals and businesses. This interconnected ecosystem not only simplifies cross-border transactions but also paves the way for greater economic connectivity, trade, and financial empowerment on a global scale

As considering the

# The objectives and expected outcomes 
- Design and develop a comprehensive COMESA Digital Retail Payments platform with aFraud Management Module that aligns with the specified key system requirements
    - We strive to offer a trusted cross-border digital payment solution for a real-time digital payments platform based on Mojaloop integrated with a Fraud and Risk Management Module based on Tazama that enables seamless cross-border transactions between MSMEs across the eight (8) pilot COMESA member states. The design and local skill capacity-building program will extend this to all 21 COMESA member states.
- The selected firm(s) shall be responsible for designing and implementing the COMESA Digital Retail Payments Platform in eight (8) COMESA Member States, with its key system features and functionalities in a production environment in line with Level One DesignPrinciples.
    - We aim to engage four DFSPs in each of the eight countries to participate, with local technical and operational teams trained through hands-on collaboration with INFITX and CBC, ensuring adherence to best practices for financial inclusion
- The firm(s) shall ensure robust fraud detection and enhance security for cross-border payments by identifying scams, detecting money laundering, and preventing terrorist financing activities
     - Collaborating with the contracted organisation for the FRMS Component while leveraging on Tazama, we will strive to strengthen the DRPP to create a highly secure payment landscape,effectively mitigating the risks of fraud, money laundering, and terrorism financing. Our approach prioritises domestic data sovereignty and minimal data sharing, ensuring compliance and trust. With our track record of successful DFSP collaborations, we guarantee a scalable and reliable system.
- The firm(s) shall conduct rigorous testing and analysis of the payment platform to assure its performance, security measures, efficiency, and scalability across cross-border payment platforms to ensure its reliability and resilience.2
Our unique advantage lies in building and rigorously testing production-ready platform son-prem, ensuring proven reliability and scalability for cross-border transactions through comprehensive performance and capacity analysis
- The firm(s) shall collaborate with a nominated service operator or CBC/CCH team to enable the handover of a live service to that operator, supported by knowledge transfer to develop the appropriate capacity in the operator’s staff.
     - Leveraging our extensive experience, as demonstrated by previous assignments in platform development and management and engagement with Hub operators and system integrators,we are committed to a seamless transition of the COMESA platform to the designated CBCservice operators, including detailed training to empower staff for autonomous operation and management.
- The firm(s) shall develop a ‘Post-Implementation Support and Maintenance Plan’ that maximises independence and does not require the implementing consultants to be involved in future maintenance. Support and maintenance should be localised
    - Our support model is designed for sustainability, promoting long-term platform independence while empowering local teams for ongoing maintenance and support, as demonstrated through our commitments to open-source software and building community capacity.

# Scope
The platform being developed for COMESA is a cutting-edge Cross-Border Digital Retail Payments Scheme aimed at revolutionizing financial transactions within the COMESA region. This initiative focuses on enhancing financial inclusion, economic growth, and security through seamless digital payment solutions.
- Design and development of the COMESA DRPP based on the Mojaloop open-source framework.
- Integration with existing financial institutions, mobile network operators, and other relevant stakeholders.
- Deployment of the platform in eight pilot COMESA member states.To start, 8 countries will be part of the regional hub: Egypt, Ethiopia, Rwanda, Kenya, Malawi, Mauritius, Uganda, and Zambia
- Comprehensive training and knowledge transfer to local teams and system integrators.

# Key Stakeholders
- Common Market for Eastern and Southern Africa(COMESA): As the regional economic community overseeing the project, COMESA plays a crucial role in providing strategic direction, governance, and support for the initiative. The COMESA Business
Council (CBC)l and its DFI 4 SME program will oversee the implementation of the Digital Retail Payment Platform.
- Some Member States have domestic switches operated under the guidance of their local regulator and central bank.
- Regional Payment and Settlement Systems (REPSS3) User Group
- Government and Regulatory Bodies: Central Banks, Financial Service Regulators
- Solution Implementers INFITX and Paysys Labs : INFITX is responsible for delivering the cross-border payment system (LOT1) and Paysys is responsible for Fraud Management Solution (LOT 2).
- Hub Operators: Jurisdictional and the selected regional Hub Operators are key stakeholders involved in the implementation and operation of the business and technical functions of the system.
- Local implementers and System Integrators: System Integrators responsible for integrating various components of the solution and ensuring seamless functionality are essential stakeholders in the project. A key deliverable of the program is the enhanced capacity building and knowledge transfer to the local organisations to facilitate scaling cost effective participation.
- Financial Service Providers (FSPs)
     - Digital Financial Service Providers (DFSPs)
        - Banks
        - Mobile Network Operators (MNOs)
        - Savings and Credit Cooperative Organizations (SACCOs)
        - Micro Finance Institutions
    - Foreign Exchange Providers
- Program Management Team
- End Users
- Mojaloop Foundation: oversee the product management of the solution ensuring that the algorithms meet the inclusivity objectives.
- Tazama Project (Linux Foundation): oversee the product management of the FRMS module.

# The Solution
![Fig 2. Digital Retail Payment Platform (DRPP) Schematic](/md-docs/images/TheSolution.png)

>Fig 2. Digital Retail Payment Platform (DRPP) Schematic

# Key:Solution Explained
- DRPP Regional hub:
    - Facilitates Foreign Exchange Providers via single connection to Regional Hub to offer currency conversion between different jurisdictions.
    - Jurisdictional IIPS schemes can connect via logical connectors called proxies.
    - Proxies connect schemes, not individual participants, and can link both Mojaloop and IIPS compliant non-Mojaloop schemes.
    - In the case of a non-compliant scheme, rather than instantiating a degraded connection via a cross-network provider (CNP), the DRPP will allow direct connection to the hub. This is facilitated via an “emulated NIIPS” scheme that allows the regional hub to emulate a “international gateway” such that the jurisdictional control can be exercised and clearance and settlement flows can appear consistent.
- Local Jurisdictional system: (Connecting Schemes)
    - Existing/Modified Jurisdictional IIPS (Connecting the existing Non-IIPS national payment system to the regional hub)
        - Manages both jurisdictional and international payments.
        - Decisions on routing payments internationally are made by the scheme.
        - Individual participants connect to this scheme for all types of payments.
    - Jurisdictional IIPS by emulated “International Gateway” (aka emulated NIIPS) (see point 3)
        - Manages only international payments.
        - Jurisdictional payments continue to be managed by existing methods.
        - Individual participants connect directly to this scheme and decide on routing via the emulated NIIPS.
        - Suitable for jurisdictions lacking an IPS compliant with ISO 20022 for IIPS.
- “International Gateway” / emulated NIIPS:
    - Enables participation in regional platforms as a “stand-in” international jurisdictional gateway scheme offered within the administrative boundary of the DRPP
    - Maintains non-repudiation guarantees and aggregated settlements.
    - Facilitates secure transactions across multiple jurisdictions.
    - Supports a gradual transition towards IIPS compliance with regional platform criteria.

![](/md-docs/images/ConnectingIIPS.png)
- Proxies:
    - Serve as single points of contact between connecting IIPS compliant schemes.
    - Act as “proxy” representing all linked participant organisations locally in a scheme. Enabling cross scheme transactions with only requiring a single connection between schemes.
    - Are not themselves participants to any transactions (that would be a cross network provider and (d) would not hold)
    - Do not interfere with message content, preserving non-repudiation checks and execution warranties.

Solution Implementation Strategy: A hub and Spoke Model Backed by Domestics Central Banks
![](/md-docs/images/Proxies.png)

To minimise dependencies between parallel streams the following implementation strategy is to be adopted:
- The harmonisation of the API content and messaging standards of jurisdictional schemes with the regional platform, specifically using ISO 20022 for IIPS messages.
- Uncontested settlements are enabled through validation of message integrity and security and alignment to IIPS ISO 20022 standardisation.

# Realising the Solution
![](/md-docs/images/RealisingTheSolution.png)

# Core Components
- Country-Level Jurisdictional Switches: These represent the national payment infrastructures of participating countries. They serve as switches for domestic transactions and gateways to connect to the broader network.
- Mojaloop: This open-source software platform forms the backbone of the regional system. It enables real-time, low-value transactions across different payment service providers and financial institutions. Mojaloop's API-driven architecture promotes interoperability and ease of integration.
- ISO 20022 for IIPS: This international messaging standard optimised for IIPS real-time transactions ensures standardised communication between financial institutions and systems. It facilitates seamless data exchange and transaction processing, regardless of the underlying technologies or protocols.
- FXP (Foreign Exchange Provider): This component is responsible for facilitating cross-currency transactions often required for cross border transactions. It ensures accurate and efficient provision of currency cover.
- TAZAMA: An Open Source Real-Time Transaction Monitoring Software built to support any Financial Services Provider (FSP) that requires Transaction Monitoring for Fraud and Money Laundering detection.
- Payment Manager: Comprehensive software solution designed to streamline and secure the integration of Digital Financial Service Providers (DFSPs) with Mojaloop Real-Time Payment (RTP) systems. It acts as a bridge between your core banking system and the Mojaloop Switch, simplifying complex processes and ensuring robust security.

# Connectors and Adapters
- Mojaloop Connector: This interface facilitates communication between the Mojaloop platform and external systems like core banking platforms or payment gateways. It ensures seamless integration and data exchange, allowing financial institutions to connect to the Mojaloop network. In the first instance, we expect this to use the existing Mojaloop FSPIOP protocol, but this will be replaced by a protocol using ISO 20022 definitions when it is agreed by all participants.
- Core Connector: This generic connector serves as a bridge between the Mojaloop platform and various financial institutions' core banking systems. It enables the exchange of transaction data, account information, and other relevant details, ensuring seamless integration.

# Additional Elements
- FI Backend: This represents the backend systems of various financial institutions participating in the network. It includes core banking systems, transaction processing engines, and other infrastructure necessary for providing financial services.
- API Gateway (Enterprise Service Bus): This component provides a centralised point of integration for different applications and services. It helps manage message routing, protocol translation, and security, ensuring efficient communication between various components of the system.

# How It Works
![](/md-docs/images/HowItWorks.png)
The existing national hub will connect to the regional hub via a mapping layer that will manage the format conversion.
Note: Today, none of the national IPS are IIPS.

Scenario
If there is a non-IIPS compliant jurisdictional scheme, the DFSPs will be connected directly to the Regional Hub (also known as DRPP). This is realised by ensuring that :
- Jurisdictional sovereignty is preserved for regulating cross-border solution
- The regional platform should work equally well for DFSPs connected directly with it and those through an IIPS compliant domestic jurisdiction,

Through an intermediate switch within the Administrative Boundary of the DRPP (or emulated NIIPS) which is used to simulate international gateway features of a jurisdictional scheme.

# A
# Country Level DFSP 
- Initiation: A customer initiates a payment or transfer using their preferred digital financial service (e.g., mobile money wallet, bank app) provided by their local DFSP.
- Customer Authentication and Authorization: The DFSP's systems authenticate the customer's identity and authorise the transaction based on available funds and security protocols.
- Message Formatting: Using the participation tools, the DFSP formats the transaction details into an ISO 20022 message, ensuring standardised communication across the network.
- Message authentication: when the message has been constructed, it is signed by the DFSP to verify it and is encrypted to protect it in transit.
- Transmission: The DFSP transmits the ISO 20022 message to the designated scheme, acting as an intermediary between the DFSP and the broader network.
- Currency Conversion: where currency conversion is required, the DFSP will manage the provision and execution of currency conversion.

# Emulated National Inclusive Instant Payement Scheme (emulated NIIPS)
- Message Reception and Validation: The intermediary scheme receives the ISO 20022 message from the DFSP and validates its integrity and adherence to standards.
- Transaction Routing: The intermediary scheme determines the appropriate destination for the transaction based on the recipient's information and the routing rules configured in the Mojaloop system.
- Security and Risk Management: The intermediary scheme may also perform additional security checks and risk assessments to prevent fraud and ensure the safety of transactions.
- Forwarding: The intermediary scheme forwards the validated transaction message to the designated proxy.

# Proxy
- Message Reception and Validation: The proxy receives the transaction message from the intermediary scheme and performs its own validation checks.
- Routing to Regional Switch: The proxy switch forwards the processed transaction message to the regional switch responsible for connecting different countries and their respective financial ecosystems.

# Regional Switch
- Message Reception and Validation: The regional switch receives the transaction message from the proxy switch and conducts further validation checks.
- Clearing and Settlement: The regional switch coordinates the clearing and settlement process, ensuring that funds are transferred between the relevant financial institutions securely and efficiently. This may involve interaction with local clearinghouses or settlement systems.
- Status Updates: The regional switch sends status updates back to the proxy, which then relays the information to the intermediary scheme and ultimately to the originating DFSP.
- Completion: Upon successful clearing and settlement, the transaction is considered complete, and the recipient's account is credited with the funds.

# Interconnectedness and Benefits

The interconnectedness of these components creates a robust and efficient payment ecosystem. The use of standardised messaging (ISO 20022 for IIPS) and open-source software (Mojaloop) promotes interoperability, allowing different financial service providers to seamlessly connect and transact. This fosters financial inclusion by enabling individuals and businesses in underserved areas to access a wider range of financial services, regardless of their chosen provider or location.

The system's real-time processing capabilities and efficient clearing and settlement processes ensure fast and secure transactions, benefiting both consumers and businesses. Additionally, the integration of FXP facilitates cross-border payments, enabling greater economic connectivity and facilitating international trade and remittances.

# GLOSSARY
This section introduces specific terminology and concepts that may be new within the CBC DFI program's context. It is designed not to replicate the existing CBC DFI acronyms and definitions but to serve as a guide to the open-source programs and initiatives mentioned throughout our bid document. This approach ensures clarity for the DFI Phase III initiative, emphasising our commitment to an open solution framework where product enhancements occur within a transparent, open-source ecosystem.

- SDG	1,5,
8,9,10 and 17 : United Nations Sustainable Development Goals - collectively focus on poverty eradication, promoting gender equality (SDG 5), economic growth and employment (SDG 8), innovation and infrastructure (SDG 9), reducing inequalities (SDG 10), and enhancing global partnerships (SDG 17).
- SMART: Criteria for defining and evaluating the definition of an objective. A SMART objective should be Specific, Measurable, Achievable, Relevant, and Time-bound
- MSME's: Micro, Small and Medium Enterprises
- PI: Scaled Agile Framework for Enterprise (SAFe) Program Increment - a period of delivery usually 10 weeks starting with a planning session and ending with a review of the work done
- SI: System Integrator
- FXP: Foreign Exchange Provider - these organisations can provide Forex services and connect to the Mojaloop scheme via APIs and flows described in by the Mojaloop currency conversion workstream.
- Proxy: A Mojaloop entity which is connected to two different schemes (in this case, a regional scheme and a jurisdictional scheme) and provides:
    - A conduit for API messages to pass between the two schemes.
    - A set of ledgers that allow accounting integrity to be maintained in each scheme.
- ISO 20022: A single standardisation approach (methodology, process, repository) is to be used by all financial standards initiatives. The standard covers all areas of financial activity. This includes the payment area, the main focus of interest here.
- ISO 20022 for IIPS: The existing ISO 20022 specification enhancements are required to reduce costs and increase certainty for inclusive Instant Payment Systems. These are currently being piloted through the ISO 20022 organisation by the Mojaloop Foundation, a member of the ISO 20022 organisation. Documentation    for    this    can   be   consulted   here: https://github.com/mojaloop/iso-20022-docs.
- Emulated Inslucive Instant Payment Scheme (Emulated NIIPS): is a scheme logically implemented in a jurisdiction solely to manage international payments to and from that jurisdiction. Unless the jurisdiction wants to adopt the solution as an “international gateway," the implementation is co-located with the regional service and is transparent to the end participants. The jurisdictional settlement instructions come from this service.
- Intermediary scheme: DFSPs will not connect directly to the regional (COMESA) scheme. They will connect through a domestic scheme (the intermediary scheme). This intermediary scheme may be of two types: it may be either an existing domestic IPS, if that IPS is capable of connecting to the regional scheme; or a special-purpose scheme (known as a Emulated NIIPS) which exists solely to facilitate payments between jurisdictions, and which does not process domestic payments.
- EMDE: Emerging Markets and Developing Economies
- Corridor: A connection between two jurisdictions, including the direction of payment travel. For instance, payments from Kenya to Rwanda and Rwanda to Kenya are two different corridors.
- Jurisdiction: The territory over which the authority of a legal or regulatory system extends.
- Mojaloop: Mojaloop is open-source software for creating interoperable payment platforms connecting all digital financial providers and customers. Mojaloop is supported through the Mojaloop Foundation.
References:
    - [Mojaloop Foundation](https://mojaloop.io)
    - [Open API for FSP Interoperability Specification](https://docs.mojaloop.io/api/fspiop)
    - [Github repository](https://github.com/mojaloop)
    - [Mojaloop Training Program](https://mojaloop.io/mojaloop-training-program/)
- Tazama: Tazama (previously Ekuta) is a Linux Foundation project designed as a complimentary FRMS platform for Mojaloop.
    - [Tazama](https://tazama.org/)
    - [Github Repositor](https://github.com/frmscoe)
    - [Documentation](https://frmscoe.atlassian.net/wiki/spaces/FRMS/pages/6488065/Product+Overview)
- Payment Manager - Participation Tools: Open source software that standardises onboarding and participating in a Mojaloop compatible real-time payment network.
References:
    - [Documentation](https://pm4ml.github.io/documents/payment_manager_oss/latest/index.html)
    - [Github Repository](https://github.com/pm4ml)
- Tazama Rule: Life Cycle: [Tazama's rule lifecycle](https://frmscoe.atlassian.net/wiki/spaces/FRMS/pages/1738243/Actio+Rules+life-cycle)
- Hub Operator: The Entity that is appointed by the Scheme Owner to manage the day-to-day Operations of the Scheme
- Scheme Owner: The structure is the decision body, and from the REPSS documents, this is expected to be a shared responsibility of the CBC DFI and COMESA Clearing House (CCH) teams with representation from the participating countries.
