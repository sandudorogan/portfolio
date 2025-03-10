<template>
  <header class="fixed top-0 left-0 right-0 z-50 border-b bg-background/80 backdrop-blur-sm border-border/40">
    <div class="container flex items-center justify-between h-16 px-4 mx-auto">
      <!-- Logo -->
      <NuxtLink to="/" class="text-xl font-bold">
        <span class="text-transparent bg-gradient-to-r from-primary to-secondary bg-clip-text">Portfolio</span>
      </NuxtLink>

      <!-- Navigation Links -->
      <nav class="items-center hidden space-x-6 md:flex">
        <NuxtLink v-for="item in navigation" :key="item.name" :to="item.path"
          class="text-sm font-medium transition-colors hover:text-primary"
          :class="{ 'text-primary': route.path === item.path }">
          {{ item.name }}
        </NuxtLink>
      </nav>

      <!-- Mobile Menu Button -->
      <UButton class="md:hidden" variant="ghost" icon="i-heroicons-bars-3" />
    </div>
  </header>
</template>

<script lang="ts" setup>
const route = useRoute();

const navigation = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
];
</script>

<style></style>