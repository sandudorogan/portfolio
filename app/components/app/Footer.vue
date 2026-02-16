<template>
  <footer class="relative bg-default/80 backdrop-blur-xl py-6 border-muted border-t overflow-hidden">
    <div class="absolute inset-0 bg-linear-to-t from-primary-500/5 via-transparent to-transparent" />

    <div class="z-10 relative mx-auto px-4 container">
      <div class="flex md:flex-row flex-col justify-between items-center gap-6">
        <div class="flex flex-col items-center md:items-start gap-2">
          <NuxtLink :to="localePath('/')"
            class="bg-clip-text bg-linear-to-r from-primary-400 rounded focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 font-bold text-transparent text-lg to-accent-400">
            {{ $t('layout.footer.portfolio') }}
          </NuxtLink>
          <p class="text-dimmed text-sm">
            {{ $t('layout.footer.rights', { year: new Date().getFullYear() }) }}
          </p>
        </div>

        <nav aria-label="Footer navigation" class="flex items-center gap-6">
          <NuxtLink v-for="link in quickLinks" :key="link.path" :to="link.path"
            class="rounded focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-primary-500 text-muted hover:text-primary-400 text-sm transition-colors duration-300">
            {{ link.name }}
          </NuxtLink>
        </nav>

        <div class="flex items-center gap-3">
          <a v-for="link in socialLinks" :key="link.name" :href="link.url" target="_blank" rel="noopener noreferrer"
            :aria-label="$t('layout.footer.visitProfile', { name: link.name })"
            class="group flex justify-center items-center bg-default/80 border border-muted hover:border-primary-500/50 rounded-xl focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-primary-500 w-10 h-10 transition-all duration-300">
            <UIcon :name="link.icon" class="w-5 h-5 text-muted group-hover:text-primary-400 transition-colors"
              aria-hidden="true" />
          </a>
        </div>
      </div>

    </div>
  </footer>
</template>

<script lang="ts" setup>
const { t } = useI18n();
const localePath = useLocalePath();

const quickLinks = computed(() => [
  { name: t('nav.home'), path: localePath('/') },
  { name: t('nav.about'), path: localePath('/about') },
  { name: t('nav.contact'), path: localePath('/contact') },
]);

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
