<template>
  <footer class="relative bg-neutral-900/80 backdrop-blur-xl py-6 border-neutral-800/50 border-t overflow-hidden">
    <!-- Background gradient -->
    <div class="absolute inset-0 bg-linear-to-t from-primary-500/5 via-transparent to-transparent" />

    <div class="z-10 relative mx-auto px-4 container">
      <div class="flex md:flex-row flex-col justify-between items-center gap-6">
        <!-- Logo and Copyright -->
        <div class="flex flex-col items-center md:items-start gap-2">
          <NuxtLink to="/"
            class="bg-clip-text bg-linear-to-r from-primary-400 rounded focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900 font-bold text-transparent text-lg to-accent-400">
            Portfolio
          </NuxtLink>
          <p class="text-neutral-500 text-sm">
            © {{ new Date().getFullYear() }} All rights reserved.
          </p>
        </div>

        <!-- Quick Links -->
        <nav aria-label="Footer navigation" class="flex items-center gap-6">
          <NuxtLink v-for="link in quickLinks" :key="link.path" :to="link.path"
            class="rounded focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-primary-500 text-neutral-400 hover:text-primary-400 text-sm transition-colors duration-300">
            {{ link.name }}
          </NuxtLink>
        </nav>

        <!-- Social Links -->
        <div class="flex items-center gap-3">
          <a v-for="link in socialLinks" :key="link.name" :href="link.url" target="_blank" rel="noopener noreferrer"
            :aria-label="`Visit my ${link.name} profile (opens in new tab)`"
            class="group flex justify-center items-center bg-neutral-900/80 border border-neutral-700/50 hover:border-primary-500/50 rounded-xl focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-primary-500 w-10 h-10 transition-all duration-300">
            <UIcon :name="link.icon" class="w-5 h-5 text-neutral-400 group-hover:text-primary-400 transition-colors"
              aria-hidden="true" />
          </a>
        </div>
      </div>

    </div>
  </footer>
</template>

<script lang="ts" setup>
const quickLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
];

const socialLinks = [
  {
    name: 'GitHub',
    icon: 'i-simple-icons-github',
    url: 'https://github.com/sandudorogan'
  },
  {
    name: 'GitLab',
    icon: 'i-simple-icons-gitlab',
    url: 'https://gitlab.com/sdorogan-flexiana'
  },
  {
    name: 'LinkedIn',
    icon: 'i-simple-icons-linkedin',
    url: 'https://www.linkedin.com/in/sandu-dorogan'
  }
];
</script>
