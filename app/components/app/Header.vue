<template>
  <header class="top-0 right-0 left-0 z-50 fixed bg-neutral-900/80 backdrop-blur-xl border-neutral-800/50 border-b">
    <div class="flex justify-center items-center mx-auto px-4 h-16 container">
      <!-- Navigation Links -->
      <nav aria-label="Main navigation" class="flex items-center space-x-2">
        <NuxtLink v-for="item in navigation" :key="item.name" :to="item.path"
          class="group relative px-4 py-2 rounded-lg focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-primary-500 font-medium text-sm transition-all duration-300"
          :class="[
            route.path === item.path
              ? 'text-white'
              : 'text-neutral-400 hover:text-white'
          ]">
          <!-- Active Background -->
          <span v-if="route.path === item.path"
            class="absolute inset-0 bg-linear-to-r from-primary-500/20 border border-primary-500/30 rounded-lg to-accent-500/20"
            aria-hidden="true" />

          <!-- Hover Effect -->
          <span
            class="absolute inset-0 bg-neutral-800/50 opacity-0 group-hover:opacity-100 rounded-lg transition-opacity duration-300"
            :class="{ 'opacity-0': route.path === item.path }" aria-hidden="true" />

          <span class="z-10 relative flex items-center gap-2">
            <UIcon :name="item.icon" class="w-4 h-4" aria-hidden="true" />
            {{ item.name }}
          </span>
        </NuxtLink>
      </nav>
    </div>
  </header>
</template>

<script lang="ts" setup>
const route = useRoute();

const navigation = [
  { name: 'Home', path: '/', icon: 'i-heroicons-home' },
  { name: 'About', path: '/about', icon: 'i-heroicons-user' },
  { name: 'Contact', path: '/contact', icon: 'i-heroicons-chat-bubble-left-right' },
];
</script>

<style scoped>
/* Ensure header stays above other elements */
header {
  z-index: 100;
}
</style>
