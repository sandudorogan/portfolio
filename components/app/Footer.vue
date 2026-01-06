<template>
  <footer class="relative py-12 border-t border-neutral-800/50 bg-neutral-900/80 backdrop-blur-xl overflow-hidden">
    <!-- Background gradient -->
    <div class="absolute inset-0 bg-gradient-to-t from-violet-500/5 via-transparent to-transparent" />

    <div class="relative z-10 container px-4 mx-auto">
      <div class="flex flex-col items-center justify-between gap-6 md:flex-row">
        <!-- Logo and Copyright -->
        <div class="flex flex-col items-center md:items-start gap-2">
          <NuxtLink to="/" class="text-lg font-bold bg-clip-text bg-gradient-to-r from-violet-400 to-pink-400 text-transparent">
            Portfolio
          </NuxtLink>
          <p class="text-sm text-neutral-500">
            © {{ new Date().getFullYear() }} All rights reserved.
          </p>
        </div>

        <!-- Quick Links -->
        <div class="flex items-center gap-6">
          <NuxtLink
            v-for="link in quickLinks"
            :key="link.path"
            :to="link.path"
            class="text-sm text-neutral-400 hover:text-violet-400 transition-colors duration-300"
          >
            {{ link.name }}
          </NuxtLink>
        </div>

        <!-- Social Links -->
        <div class="flex items-center gap-3">
          <UiGlareCard
            v-for="link in socialLinks"
            :key="link.name"
            :glare-opacity="0.2"
            class="group"
          >
            <a
              :href="link.url"
              target="_blank"
              class="flex items-center justify-center w-10 h-10 rounded-lg bg-neutral-800/50 border border-neutral-700/50 hover:border-violet-500/50 transition-all duration-300"
            >
              <UIcon
                :name="link.icon"
                class="w-4 h-4 text-neutral-400 group-hover:text-violet-400 transition-colors"
              />
            </a>
          </UiGlareCard>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="mt-8 pt-6 border-t border-neutral-800/50">
        <div class="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <p>Crafted with passion using Vue, Nuxt, and Inspira UI</p>
          <div class="flex items-center gap-4">
            <a href="#" class="hover:text-violet-400 transition-colors">Privacy Policy</a>
            <a href="#" class="hover:text-violet-400 transition-colors">Terms of Service</a>
          </div>
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
    url: 'https://github.com'
  },
  {
    name: 'LinkedIn',
    icon: 'i-simple-icons-linkedin',
    url: 'https://linkedin.com'
  },
  {
    name: 'Twitter',
    icon: 'i-simple-icons-twitter',
    url: 'https://twitter.com'
  }
];
</script>
