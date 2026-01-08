// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-01-26',
  devtools: { enabled: true },
  css: [
    'leaflet/dist/leaflet.css',
  ],
  modules: [
    '@pinia/nuxt',
    '@nuxtjs/i18n',
    '@vueuse/nuxt',
    '@nuxt/test-utils',
    '@nuxt/image',
    '@nuxt/eslint',
    '@nuxt/icon',
    '@nuxt/ui',
    'nuxt-schema-org',
    'nuxt-og-image',
    '@nuxt/fonts',
    '@nuxtjs/tailwindcss',
    'motion-v/nuxt',
  ],
  site: {
    url: process.env.NUXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    name: 'Sandu Dorogan',
  },
  runtimeConfig: {
    // Private keys (server-only) - auto-populated from NUXT_CONTACT_* env vars
    contactEmail: '',
    contactPhone: '',
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || '',
    },
  },
  tailwindcss: {
    exposeConfig: true,
    viewer: true,
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
  ui: {
    global: true,
    disableGlobalStyles: false,
  },
  vite: {
    server: {
      allowedHosts: ['e5f1-2a02-2f0a-4201-5e00-c11-7494-d5f9-4e24.ngrok-free.app'],
    },
  },
})
