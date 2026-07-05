// https://nuxt.com/docs/api/configuration/nuxt-config

// Use production URL by default; override with NUXT_PUBLIC_SITE_URL env var or fall back to localhost in dev
const defaultSiteUrl = process.env.NUXT_PUBLIC_SITE_URL
  || (process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://dorogans.com')

export default defineNuxtConfig({
  compatibilityDate: '2025-01-26',
  devtools: { enabled: true },
  css: [
    '~/assets/css/main.css',
  ],
  modules: [
    '@nuxtjs/i18n',
    '@vueuse/nuxt',
    '@nuxt/image',
    '@nuxt/eslint',
    '@nuxt/icon',
    '@nuxtjs/sitemap',
    'nuxt-og-image',
    '@nuxtjs/plausible',
    '@nuxt/ui', // Automatically registers @nuxt/fonts
  ],
  plausible: {
    autoOutboundTracking: true,
    proxy: true,
  },
  // Single-page brutalist portfolio: force the light palette, no theme toggle
  colorMode: {
    preference: 'light',
    fallback: 'light',
  },
  site: {
    url: defaultSiteUrl,
    name: 'Sandu Dorogan',
  },
  runtimeConfig: {
    // Private keys (server-only) - auto-populated from NUXT_ env vars.
    // Consumed by the /api/reveal/* endpoints for anti-scraping contact reveal.
    contactEmail: '',
    contactPhone: '',
    public: {
      siteUrl: defaultSiteUrl,
    },
  },
  fonts: {
    families: [
      // Brutalist pairing: Archivo Black display, Space Mono body
      { name: 'Archivo Black', provider: 'google', weights: [400] },
      { name: 'Space Mono', provider: 'google', weights: [400, 700] },
    ],
  },
  i18n: {
    locales: [
      { code: 'en', language: 'en-US', name: 'English', file: 'en.json' },
      { code: 'ro', language: 'ro-RO', name: 'Română', file: 'ro.json' },
    ],
    defaultLocale: 'en',
    strategy: 'prefix_except_default',
    lazy: true,
    langDir: '../i18n/locales',
    // baseUrl enables absolute hreflang/canonical links for multilingual SEO
    baseUrl: defaultSiteUrl,
    bundle: { optimizeTranslationDirective: false },
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
    },
  },
  routeRules: {
    '/**': {
      headers: {
        'X-Frame-Options': 'DENY',
        'X-Content-Type-Options': 'nosniff',
        'Referrer-Policy': 'strict-origin-when-cross-origin',
        'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
      },
    },
    // Routes from the pre-2026 multi-page site are still in search indexes;
    // send them to the matching one-pager sections
    '/about': { redirect: { to: '/#experience', statusCode: 301 } },
    '/contact': { redirect: { to: '/#contact', statusCode: 301 } },
    '/ro/about': { redirect: { to: '/ro#experience', statusCode: 301 } },
    '/ro/contact': { redirect: { to: '/ro#contact', statusCode: 301 } },
  },
  nitro: {
    preset: process.env.NITRO_PRESET || undefined,
  },
})
