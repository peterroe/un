import { defineConfig } from 'vitepress'
import type { DefaultTheme } from 'vitepress/types'
import pkg from '../package.json'

const title = 'Front End'
const description = 'The docs template for the front end'

const Guides: DefaultTheme.NavItemWithLink[] = [
  { text: 'Getting Started', link: '/guide/' },
]

const Nav: DefaultTheme.NavItem[] = [
  {
    text: 'Guide',
    items: [
      {
        text: 'Guide',
        items: Guides,
      },
    ],
    activeMatch: '^/guide/',
  },
]

const SidebarGuide: DefaultTheme.SidebarItem[] = [
  {
    text: 'Guides',
    items: Guides,
  },
]

export default defineConfig({
  lang: 'en-US',
  title,
  titleTemplate: title,
  description,
  outDir: './dist',
  base: `/${pkg.name}/`,
  head: [
    ['link', { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' }],
    ['link', { rel: 'alternate icon', href: '/favicon.ico', type: 'image/png', sizes: '16x16' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { name: 'og:title', content: title }],
    ['meta', { name: 'og:description', content: description }],
    ['meta', { name: 'twitter:title', content: title }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
  ],
  lastUpdated: true,
  cleanUrls: true,
  ignoreDeadLinks: [
    /^\/play/,
    /^\/interactive/,
    /:\/\/localhost/,
  ],

  markdown: {
    theme: {
      light: 'vitesse-light',
      dark: 'vitesse-dark',
    },
  },

  themeConfig: {
    logo: '/logo.svg',
    nav: Nav,
    search: {
      provider: 'local',
    },
    sidebar: {
      '/guide/': SidebarGuide,
    },
    editLink: {
      pattern: 'https://github.com/peterroe/un/edit/main/templates/docs-starter/:paht',
      text: 'Suggest changes to this page',
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/peterroe/un' },
    ],
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2021-PRESENT Peter Roe',
    },
  },
})
