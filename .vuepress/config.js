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
        link: '/md-docs/BusinessComercial',
      },
      {
        text: 'Financial Operations',
        link: '/md-docs/LiquidityDesign',
      },
      {
        text: 'Technical Integration Guide',
        link: '/md-docs/TechnicalIntegration',
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
          link: '/md-docs/BusinessComercial.md',
        },
        {
          text: 'Business Operations',
          link: '/md-docs/LiquidityDesign.md'
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
          ]
        },
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