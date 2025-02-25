// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-01-26',
  devtools: { enabled: true },
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
    '@nuxt/fonts',
    '@nuxtjs/tailwindcss',
  ],
  tailwindcss: {
    exposeConfig: true,
    viewer: true,
  },
  ui: {
    global: true,
    disableGlobalStyles: false
  },
  vite: {
    server: {
      allowedHosts: ['e5f1-2a02-2f0a-4201-5e00-c11-7494-d5f9-4e24.ngrok-free.app']
    }
  }
})