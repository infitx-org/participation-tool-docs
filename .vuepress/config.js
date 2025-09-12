import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress/cli'
import { viteBundler } from '@vuepress/bundler-vite'

//import { defineUserConfig } from 'vuepress'

export default defineUserConfig({
  lang: 'en-US',

  title: 'System Integrator (SI) Toolkit',
  tagline: 'Everything you need to know about Mojaloop System Integration',
  description: 'Everything you need to know about Mojaloop System Integration',
  base: '/participation-tool-docs/',


  theme: defaultTheme({
    logo: 'https://www.infitx.com/wp-content/uploads/2022/11/cropped-INFITX-Icon-White-Cropped-270x270.png',
    navbar: [
      {
        text: 'Introduction',
        link: '/md-docs/Introduction',
      },
      {
        text: 'Management',
        link: '/md-docs/DRPPOverview',
      },
      {
        text: 'Business Operations',
        link: '/md-docs/BusinessOperations',
      },
      {
        text: 'Technical Integration Guide',
        link: '/md-docs/TechnicalIntegration',
      },
      {
        text: 'Deployment',
        link: '/md-docs/PM4ML_Docs/Overview',
      },
      {
        text: 'Payment Manager User Guide',
        link: '/md-docs/PaymentManager.md',
      },
      {
        text: 'Technical Reference',
        link: '/md-docs/Service',
      },
      {
        text: 'Scheme Designs',
        link: '/md-docs/CurrencyConversionDesign/Cross-border (FX) Design',
      }
    ],
    sidebar: {
      '/md-docs/': [
        {
          text: 'Introduction',
          collapsible: true,
          // prefix will be prepended to relative paths
          children: [
            'Introduction.md',
            'DfspGuide.md',
            'CustomerJourney.md'
            //        'TechnicalIntegration.md',
          ]
        },
        {
          text: 'Management',
          link: '/md-docs/DRPPOverview.md',
        },
        {
          text: 'Business Operations',
          link: '/md-docs/BusinessOperations.md'
        },
        {
          text: 'Technical Integration Guide',
          collapsible: true,
          // prefix will be prepended to relative paths
          children: [
            'TechnicalIntegration',
            'IIPSDesignPatterns.md',
            'CoreConnectorBuildingGuide.md',
            // 'CoreConnectorTemplate.md',
            'CoreConnectorTestingHarness.md',
            'CoreConnectorTemplateDocs.md',
            'ISO20022AndMerchantPayments.md'
          ]
        },
        {
          text: 'Deployment',
          collapsible: true,
          children: [
          {
            text: 'Overview',
            link: '/md-docs/PM4ML_Docs/Overview.md'
          },
          {
            text: 'Docker Compose',
            collapsible: true,
            children: [
              '/md-docs/PM4ML_Docs/Guide.md',
              '/md-docs/PM4ML_Docs/CoreConnectorSetup.md',
              '/md-docs/PM4ML_Docs/DeployingDockerComposePayment.md',
              '/md-docs/PM4ML_Docs/ConfiguringACustomCoreConnector.md',
              '/md-docs/PM4ML_Docs/connectToLiveHub.md',
              '/md-docs/PM4ML_Docs/SecuringTheDockerDaemon.md',
              '/md-docs/PM4ML_Docs/firewallConfig.md',
              '/md-docs/PM4ML_Docs/TestTransfer.md'
            ]
          },
//          {
//            text: 'Kubernetes',
//            collapsible: true,
//            children: [
              // Add Kubernetes-related docs here, e.g.:
              // '/md-docs/PM4ML_Docs/KubernetesGuide.md'
//            ]
//          } 
        
        ]},
        {
          text: 'Technical Reference',
          collapsible: true,
          children: [
            'Service.md',
            'RoutingAndApiSpecifications.md',
            'Networking.md',
            'CBSClient.md',
            'SDKClient.md',
            'Configuration.md',
            'CoreConnectorAggregate.md',
            'ErrorHandling.md',
            'IntegrationAccounts.md',
            'RequestHandling.md'
          ]
        },
        {
          text: 'Payment Manager User Guide',
          collapsible: true,
          // prefix will be prepended to relative paths
          children: [
            'PaymentManager.md',
            'PM4ML_TransferOverview.md',
            'PM4ML_FXConversionsOverview.md',
            'PM4MLTechnicalDashboard.md'
          ]
        },
        {
          text: 'Scheme Designs',
          collapsible: true,
          // prefix will be prepended to relative paths
          children: [
            'CurrencyConversionDesign/Cross-border (FX) Design.md',
            'Inter-SchemeDesign/Readme.md',
          ]
        },
      ],
    }
  }),

  bundler: viteBundler({
    viteOptions: {},
    vuePluginOptions: {},
  }),
})
