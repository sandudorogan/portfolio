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
    '@nuxt/ui', // Automatically registers @nuxt/fonts
  ],
  site: {
    url: defaultSiteUrl,
    name: 'Sandu Dorogan',
  },
  runtimeConfig: {
    // Private keys (server-only) - auto-populated from NUXT_CONTACT_* env vars
    contactEmail: '',
    contactPhone: '',
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
    bundle: {
      optimizeTranslationDirective: false,
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
