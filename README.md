# Mojaloop SI Toolkit

An FSP integration toolkit for DFSPs, Hub Operators and any concerned stakeholders.

# Table of Contents
- [Introduction](#introduction)
- [What is Mojaloop](#what-is-mojaloop)
- [Connecting to a Mojaloop Scheme](#connecting-to-a-mojaloop-scheme)
- [DFSP Onboarding Guide and Roadmap](./md-docs/DfspGuide.md)
    - [Overview](./md-docs/DfspGuide.md#overview)
    - Customer Journey
    - Integration Accounts
    - Technical Requirements 
        - Mojaloop Connector
        - Payment Manager
        - Payment Manager Transfers Overview
        - Integration Patterns
        - Secure Connection From DFSP and Core Banking API
        - Uploading Identifiers from DFSP to Account Lookup Service. (ALS) 
        - Core Connector Development 
        - Core Connector Testing Harness
        - Operational Readiness
- FXP Onboarding Guide and Roadmap
- Liquidity Design
- Settlement 
- Glossary


# Introduction 
The goal of this SI toolkit is to give System Integrators, Digital Financial Service providers, Hub operators, any policy stakeholders and any concerned parties a central location for all information regarding connecting to a Mojaloop scheme. This documentation provides both policy and technical integration information to answer most if not all questions around what it takes to integrate to a Mojaloop Scheme.

> For any acronyms used, please check the [glossary](#glossary) section for the full forms.

# What is Mojaloop
Mojaloop is an open-source software platform designed to help financial institutions, mobile network operators, and fintech companies create interoperable digital payment systems. It was originally developed by the Mojaloop Foundation, with support from the Bill & Melinda Gates Foundation, and its goal is to advance financial inclusion by enabling low-cost, real-time payment services, especially in underbanked and unbanked regions.

Key features of Mojaloop include:

- Interoperability: Mojaloop allows different financial service providers, including banks, mobile wallets, and payment processors, to connect and interact with each other seamlessly.

- Real-time payments: It facilitates immediate payments between participants in the system.

- Open-source: The platform's code is freely available, making it adaptable to various local contexts and reducing the cost of building payment infrastructure.

- DFSP inclusion: The platform supports digital financial service providers (DFSPs), making it easier for more people to access formal financial services, particularly in developing economies.

Mojaloop is often seen as a framework to build national or regional payment infrastructures, which can improve the financial ecosystem's efficiency and drive down transaction costs.

# Connecting to a Mojaloop Scheme
Connecting to a Mojaloop Scheme requires both technical and political engagements inorder to arrive at a successful integration. From a business perspective

# Policy Requirements
Before connecting to a Mojaloop Scheme, some pre-requisites must be in place from a policy perspective. The Central Bank of the jurisdiction must be in the know of the payment switch which is to be implemented and they must have approved the implementation of the scheme.

It is imperative that prior to implementing the scheme the Central Bank is in the know to prevent any friction in the future during the operation of the scheme.

From a DFSP point of view, the stakeholders of the company are supposed to be in agreement and in support of the integration to the mojaloop switch.


# Technical Requirements
The Mojaloop Community has come up with tools to allow potential participants build integrations into a mojaloop Switch.

To understand more about the Technical Requirements, please read through section for [technical requirements](./md-docs/TechnicalRequirements.md)


# Glossary

- DFSP - Digital Financial Service Provider.