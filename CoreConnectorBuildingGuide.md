<div style="overflow: hidden;">
<span style="float: left; margin: 0.00px 0.0px">
<img src="images/cbc_logo.jpg" style="width: 88.90px; height: 63.50px;" > </span>
<span style="float: right; margin: 0.00px 0.0px">
<img src="images/infitx-tech_logo.png" style="width: 144.50px; height: 55.35px">
</span>
</div>

# Development guide for building core-connectors
## Integration Development Steps
Here are the typical steps that need to be taken to building an integration:
1. Download the [**testing harness**](CoreConnectorTestingHarness.md) with an example core connector to try.<br>
Understand the scope of the requirement and the API flows, by reviewing the core-connector golden path test collection that is used to illustrate the quality and adherence to the requirements.
2. Work with the Business / Product Expert at the DFSP to determine and get sign off on the **funding and liquidity design** that must be implemented in the integration.<br>
The pre-funded [**liquidity design documents**](LiquidityDesign.md) can help this process.
3. Investigate the core-connector API and **design an integration solution**. <br>
The [**IIPS Design Patterns**](IIPSDesignPatterns.md) for Payer and Payee DFSP integration is a good guide for this work.
4. Build the integration against a Core Banking Solution Sandbox. This solution can be tested at any time by deploying/connecting it into the testing harness and running all or parts of the golden path test collection.<br>
The [**core-connector template**](CoreConnectorTemplate.md) can be useful here as a starting point for the development.<br>
5. **Submit the core-connector for review** and approval by the Scheme. The scheme will have final say as to whether the integration solution is adequate for their scheme and use case.
6. Perform **User Acceptance Testing** for the scheme by deploying into Payment manager / or other deployment solution connected to a fully secured Environment.<br>
Run end-to-end testing, that include sending and receiving funds between connected organizations.<br>
Run a Settlement test.

## Open API references
- [Mojaloop Connector Outbound API](https://github.com/mojaloop/api-snippets/blob/main/docs/sdk-scheme-adapter-outbound-v2_1_0-openapi3-snippets.yaml)
- [Mojaloop Connector Backend API](https://github.com/mojaloop/api-snippets/blob/main/docs/sdk-scheme-adapter-backend-v2_1_0-openapi3-snippets.yaml)
- [FSPIOP API v2.0](https://github.com/mojaloop/api-snippets/blob/main/docs/fspiop-rest-v2.0-openapi3-snippets.yaml)