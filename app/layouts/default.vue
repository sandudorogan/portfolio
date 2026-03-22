<script setup lang="ts">
const { locale, t } = useI18n()

const ogLocale = computed(() => locale.value === 'ro' ? 'ro_RO' : 'en_US')
const ogLocaleAlternate = computed(() => locale.value === 'ro' ? 'en_US' : 'ro_RO')

// Global SEO metadata applied to all pages
const colorMode = useColorMode()
const themeColor = computed(() => colorMode.value === 'dark' ? '#1a1625' : '#f3f0f7')

useHead({
  link: [
    { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
  ],
  meta: [
    { name: 'theme-color', content: themeColor },
    // Location metadata for SEO (Bucharest, Romania)
    { name: 'geo.region', content: 'RO-B' },
    { name: 'geo.placename', content: 'Bucharest' },
    { name: 'geo.position', content: '44.4268;26.1025' },
    { name: 'ICBM', content: '44.4268, 26.1025' },
    // OpenGraph location/business meta
    { property: 'og:locale', content: ogLocale },
    { property: 'og:locale:alternate', content: ogLocaleAlternate },
    { property: 'og:site_name', content: 'Sandu Dorogan' },
    { property: 'place:location:latitude', content: '44.4268' },
    { property: 'place:location:longitude', content: '26.1025' },
    { property: 'business:contact_data:locality', content: 'Bucharest' },
    { property: 'business:contact_data:country_name', content: 'Romania' }
  ]
})

// Person structured data for Google (via nuxt-schema-org)
// Note: email intentionally omitted to prevent scraping
useSchemaOrg([
  definePerson({
    name: 'Sandu Dorogan',
    jobTitle: () => t('schema.jobTitle'),
    address: {
      addressLocality: 'Bucharest',
      addressCountry: 'RO'
    }
  })
])
</script>

<template>
  <div class="flex flex-col bg-background min-h-screen text-foreground">
    <!-- Skip to main content link for keyboard/screen reader users -->
    <a href="#main-content"
      class="sr-only focus-visible:not-sr-only focus-visible:top-4 focus-visible:left-4 focus-visible:z-200 focus-visible:fixed focus-visible:bg-primary-500 focus-visible:px-4 focus-visible:py-2 focus-visible:rounded-lg focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-white focus-visible:text-white">
      {{ $t('layout.skipToContent') }}
    </a>

    <AppHeader />
    <main id="main-content" tabindex="-1" class="pt-16 outline-hidden grow">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>
