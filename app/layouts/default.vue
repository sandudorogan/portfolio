<script setup lang="ts">
// Global SEO metadata applied to all pages
useHead({
  htmlAttrs: {
    lang: 'en'
  },
  link: [
    { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
  ],
  meta: [
    // Location metadata for SEO (Bucharest, Romania)
    { name: 'geo.region', content: 'RO-B' },
    { name: 'geo.placename', content: 'Bucharest' },
    { name: 'geo.position', content: '44.4268;26.1025' },
    { name: 'ICBM', content: '44.4268, 26.1025' },
    // OpenGraph location/business meta
    { property: 'og:locale', content: 'en_US' },
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
    jobTitle: 'Full Stack Developer',
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
      class="sr-only focus:not-sr-only focus:top-4 focus:left-4 focus:z-200 focus:fixed focus:bg-primary-500 focus:px-4 focus:py-2 focus:rounded-lg focus:outline-hidden focus:ring-2 focus:ring-white focus:text-white">
      Skip to main content
    </a>

    <AppHeader />
    <main id="main-content" tabindex="-1" class="pt-16 outline-hidden grow">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>
