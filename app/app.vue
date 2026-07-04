<script setup lang="ts">
import { Analytics } from '@vercel/analytics/nuxt'

// Locale-aware head: htmlAttrs (lang/dir), hreflang alternates, og:locale.
// Canonical is owned by usePageSeo (per page), so we keep only the alternate links here.
const localeHead = useLocaleHead({ seo: true })

useHead(() => ({
  htmlAttrs: localeHead.value.htmlAttrs,
  link: [
    { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    // hreflang alternates only; canonical is owned by usePageSeo
    ...(localeHead.value.link ?? []).filter(l => l.rel === 'alternate'),
  ],
  meta: [
    ...(localeHead.value.meta ?? []),
    { name: 'theme-color', content: '#f3efe6' },
    // Location metadata for SEO (Bucharest, Romania)
    { name: 'geo.region', content: 'RO-B' },
    { name: 'geo.placename', content: 'Bucharest' },
    { name: 'geo.position', content: '44.4268;26.1025' },
    { name: 'ICBM', content: '44.4268, 26.1025' },
    { property: 'og:site_name', content: 'Sandu Dorogan' },
    { property: 'place:location:latitude', content: '44.4268' },
    { property: 'place:location:longitude', content: '26.1025' },
    { property: 'business:contact_data:locality', content: 'Bucharest' },
    { property: 'business:contact_data:country_name', content: 'Romania' },
  ],
}))
</script>

<template>
  <UApp>
    <Analytics />
    <NuxtPage />
  </UApp>
</template>
