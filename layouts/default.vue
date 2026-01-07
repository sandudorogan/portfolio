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
useSchemaOrg([
  definePerson({
    name: 'Sandu Dorogan',
    jobTitle: 'Full Stack Developer',
    email: 'sandu.dorogan@gmail.com',
    address: {
      addressLocality: 'Bucharest',
      addressCountry: 'RO'
    }
  })
])
</script>

<template>
  <div class="flex flex-col bg-background min-h-screen text-foreground">
    <AppHeader />
    <main class="flex-grow">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>
