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
        text: 'Toolkit',
        link: '/',

      },
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
      //        'TechnicalIntegration.md',
    ]},
        {
        text: 'Management',
        link: '/md-docs/BusinessComercial.md',
        },
        {
          text: 'Financial Operations',
          link: '/md-docs/LiquidityDesign.md'
},
{
  text: 'Mojaloop Connector',
  link: '/md-docs/MojaloopConnector.md',
},    
{
          text: 'Integration Guide',
          collapsible: true,
          // prefix will be prepended to relative paths
        children: [
          'IIPSDesignPatterns.md',
          'CoreConnectorBuildingGuide.md',
          'CoreConnectorTemplate.md',
          'CoreConnectorTestingHarness.md',
        ]},    
        {
          text: 'Payment Manager',
          collapsible: true,
          // prefix will be prepended to relative paths
        children: [
          'PaymentManager.md',
          'PM4ML_TransferOverview.md',
        ]},    
        {
          text: 'Scheme Designs',
          collapsible: true,
          // prefix will be prepended to relative paths
        children: [
          '/CurrencyConversionDesign/Cross-border (FX) Design.md',
          '/Inter-SchemeDesign/Readme.md',
        ]},    
    ],}  
  }),

  bundler: viteBundler({
    viteOptions: {},
    vuePluginOptions: {},
  }),
})
