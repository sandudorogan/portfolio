<template>
  <header class="top-0 right-0 left-0 z-50 fixed bg-default/80 backdrop-blur-xl border-muted border-b">
    <div class="relative flex justify-center items-center mx-auto px-4 h-16 container">
      <nav aria-label="Main navigation" class="flex items-center space-x-2">
        <NuxtLink v-for="item in navigation" :key="item.name" :to="item.path"
          class="group relative px-4 py-2 rounded-lg focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-primary-500 font-medium text-sm transition-all duration-300"
          :class="[
            isActive(item.path)
              ? 'text-highlighted'
              : 'text-muted hover:text-highlighted'
          ]">
          <span v-if="isActive(item.path)"
            class="absolute inset-0 bg-linear-to-r from-primary-500/20 border border-primary-500/30 rounded-lg to-accent-500/20"
            aria-hidden="true" />

          <span
            class="absolute inset-0 bg-elevated/50 opacity-0 group-hover:opacity-100 rounded-lg transition-opacity duration-300"
            :class="{ 'opacity-0': isActive(item.path) }" aria-hidden="true" />

          <span class="z-10 relative flex items-center gap-2">
            <UIcon :name="item.icon" class="w-4 h-4" aria-hidden="true" />
            {{ item.name }}
          </span>
        </NuxtLink>
      </nav>

      <div class="absolute right-4 flex items-center gap-1">
        <button
          class="cursor-pointer p-2 rounded-lg text-muted hover:text-highlighted hover:bg-elevated/50 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-primary-500 transition-colors duration-300 font-medium text-sm"
          :aria-label="$t('lang.switchTo')"
          @click="switchLocale"
        >
          {{ $t('lang.switchTo') }}
        </button>

        <button
          class="cursor-pointer p-2 rounded-lg text-muted hover:text-highlighted hover:bg-elevated/50 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-primary-500 transition-colors duration-300"
          :aria-label="isDark ? $t('theme.switchToLight') : $t('theme.switchToDark')"
          @click="isDark = !isDark"
        >
          <span class="relative flex items-center justify-center w-5 h-5">
            <UIcon
              name="i-lucide-sun"
              class="absolute inset-0 w-5 h-5 transition-all duration-500 rotate-0 scale-100 dark:rotate-90 dark:scale-0"
              aria-hidden="true"
            />
            <UIcon
              name="i-lucide-moon"
              class="absolute inset-0 w-5 h-5 transition-all duration-500 -rotate-90 scale-0 dark:rotate-0 dark:scale-100"
              aria-hidden="true"
            />
          </span>
        </button>
      </div>
    </div>
  </header>
</template>

<script lang="ts" setup>
const route = useRoute();
const { t, locale } = useI18n();
const localePath = useLocalePath();
const switchLocalePath = useSwitchLocalePath();

const colorMode = useColorMode();
const isDark = computed({
  get: () => colorMode.value === 'dark',
  set: (v: boolean) => { colorMode.preference = v ? 'dark' : 'light'; },
});

const navigation = computed(() => [
  { name: t('nav.home'), path: localePath('/'), icon: 'i-heroicons-home' },
  { name: t('nav.about'), path: localePath('/about'), icon: 'i-heroicons-user' },
  { name: t('nav.contact'), path: localePath('/contact'), icon: 'i-heroicons-chat-bubble-left-right' },
]);

function isActive(path: string) {
  return route.path === path;
}

function switchLocale() {
  const target = locale.value === 'en' ? 'ro' : 'en';
  navigateTo(switchLocalePath(target));
}
</script>

<style scoped>
header {
  z-index: 100;
}
</style>
