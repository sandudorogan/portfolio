<script setup lang="ts">
import { Analytics } from '@vercel/analytics/nuxt'

const head = useLocaleHead({ addSeoAttributes: true })
useHead({
  htmlAttrs: computed(() => head.value.htmlAttrs || {}),
})
</script>

<template>
  <UApp>
    <Analytics />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>
