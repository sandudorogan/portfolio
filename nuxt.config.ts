// https://nuxt.com/docs/api/configuration/nuxt-config

// Use production URL by default; override with NUXT_PUBLIC_SITE_URL env var or fall back to localhost in dev
const defaultSiteUrl = process.env.NUXT_PUBLIC_SITE_URL
  || (process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://dorogans.com')

export default defineNuxtConfig({
  compatibilityDate: '2025-01-26',
  devtools: { enabled: true },
  css: [
    'leaflet/dist/leaflet.css',
    '~/assets/css/main.css',
  ],
  modules: [
    '@nuxtjs/i18n',
    '@vueuse/nuxt',
    '@nuxt/image',
    '@nuxt/eslint',
    '@nuxt/icon',
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
  nitro: {
    preset: process.env.NITRO_PRESET || undefined,
  },
  vite: {
    server: {
      allowedHosts: ['e5f1-2a02-2f0a-4201-5e00-c11-7494-d5f9-4e24.ngrok-free.app', '192.168.1.234'],
    },
  },
})
