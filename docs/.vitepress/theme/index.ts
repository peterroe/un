// https://vitepress.dev/guide/custom-theme
import type { App } from 'vue'
import { h, watch } from 'vue'
import Theme, { VPBadge } from 'vitepress/theme'
import NProgress from 'nprogress'
import VPSwitchAppearance from './components/VPSwitchAppearance.vue'
import TwoslashFloatingVue from '@shikijs/vitepress-twoslash/client'
import '@shikijs/vitepress-twoslash/style.css'
import 'viewerjs/dist/viewer.css'
import type { Router } from 'vitepress/types'
import HomePage from './components/HomePage.vue'
import Atropos from 'atropos/vue'
import VueLazyLoad from 'vue3-lazyload'
import VueViewer from 'v-viewer'
import './rainbow.css'
import './vars.css'
import './main.css'
import './overrides.stylus'
import 'shiki-magic-move/style.css'
// import 'virtual:unocss-devtools'
import './animate.min.css'
import 'uno.css'

let homePageStyle: HTMLStyleElement | undefined

const deployImg = h('a',{
  href: 'https://app.netlify.com/sites/fe-book/deploys',
  style: 'margin-left: 8px'
}, h('img', {
  src: 'https://api.netlify.com/api/v1/badges/c1d4bddd-4dfc-49cc-849d-8cc8fb1ccab7/deploy-status?branch=main&bgColor=red'
}, 'Netlify Status'))

const playground = h('a',{
  href: '/playground',
  style: 'margin-left: 8px'
}, h('svg', { xmlns: 'http://www.w3.org/2000/svg', width: '22', height: '22', viewBox: '0 0 32 32', style: "vertical-align: middle" }, [
  h('circle', { cx: '16', cy: '16', r: '14', fill: '#193e63' }),
  h('path', { fill: '#add1ea', d: 'm10.777 22.742l-1.434-1.394l3.386-3.483l-3.383-3.448l1.428-1.4l4.751 4.842zm10.643-3.641l1.434-1.395l-3.386-3.482l3.383-3.448l-1.428-1.4l-4.751 4.842z' })
]))

export default {
  Layout: () => {
    return h(Theme.Layout, null, {
      'home-features-after': () => h(HomePage),
      'sidebar-nav-after': () => deployImg,
      ...(process.env.NODE_ENV === 'production' ? {} : { 'nav-bar-content-after': () => playground })
      
    })
  },
  enhanceApp({ app, router, ...rest }: { app: App, router: Router }) {
    app.use(VueLazyLoad, {})
    // @ts-ignore
    app.use(TwoslashFloatingVue)

    if (typeof window === 'undefined')
      return
    app.component('Atropos', Atropos)
    app.component('Badge', VPBadge)

    app.use(VueViewer, {
      defaultOptions: {
        // backdrop: false,
        // button: false,
        navbar: false,
        toolbar: false,
      },
    })
    setTimeout(() => {
      const cacheBeforeRouteChange = router.onBeforeRouteChange
      const cacheAfterRouteChange = router.onAfterRouteChanged
      router.onBeforeRouteChange = (to) => {
        const pageDom: HTMLElement | null = document.querySelector('.VPContent')
        if (!pageDom)
          return
        pageDom.classList.add('page-active')
        NProgress.start()
        cacheBeforeRouteChange?.(to)
      }
      router.onAfterRouteChanged = (to) => {
        const pageDom: HTMLElement | null = document.querySelector('.VPContent')
        if (!pageDom)
          return
        pageDom.classList.remove('page-active')
        NProgress.done()
        cacheAfterRouteChange?.(to)
      }
    })

    watch(
      () => router.route.data.relativePath,
      () => updateHomePageStyle(location.pathname === '/'),
      { immediate: true },
    )
  },
}

if (typeof window !== 'undefined') {
  // detect browser, add to class for conditional styling
  const browser = navigator.userAgent.toLowerCase()
  if (browser.includes('chrome'))
    document.documentElement.classList.add('browser-chrome')
  else if (browser.includes('firefox'))
    document.documentElement.classList.add('browser-firefox')
  else if (browser.includes('safari'))
    document.documentElement.classList.add('browser-safari')
}

// Speed up the rainbow animation on home page
function updateHomePageStyle(value: boolean) {
  if (value) {
    if (homePageStyle)
      return

    homePageStyle = document.createElement('style')
    homePageStyle.innerHTML = `
    :root {
      animation: rainbow 12s linear infinite;
    }`
    document.body.appendChild(homePageStyle)
  }
  else {
    if (!homePageStyle)
      return

    homePageStyle.remove()
    homePageStyle = undefined
  }
}
