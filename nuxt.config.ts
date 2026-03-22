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
    'nuxt-schema-org',
    'nuxt-og-image',
    'motion-v/nuxt',
    '@nuxtjs/plausible',
    '@nuxt/ui', // Automatically registers @nuxt/fonts
  ],
  plausible: {
    autoOutboundTracking: true,
    proxy: true,
  },
  site: {
    url: defaultSiteUrl,
    name: 'Sandu Dorogan',
  },
  runtimeConfig: {
    // Private keys (server-only) - auto-populated from NUXT_ env vars
    contactEmail: '',
    contactPhone: '',
    resendApiKey: '',
    public: {
      siteUrl: defaultSiteUrl,
    },
  },
  fonts: {
    families: [
      {
        name: 'Mukta Mahee',
        provider: 'google',
        weights: [400, 700],
      },
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
  },
  nitro: {
    preset: process.env.NITRO_PRESET || undefined,
  },
})
