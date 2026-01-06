<template>
  <header class="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-neutral-900/80 border-b border-neutral-800/50">
    <div class="container flex items-center justify-between h-16 px-4 mx-auto">
      <!-- Logo -->
      <NuxtLink to="/" class="text-xl font-bold bg-clip-text bg-gradient-to-r from-violet-400 to-pink-400 text-transparent hover:opacity-80 transition-opacity">
        Portfolio
      </NuxtLink>

      <!-- Navigation Links -->
      <nav class="items-center hidden space-x-2 md:flex">
        <NuxtLink
          v-for="item in navigation"
          :key="item.name"
          :to="item.path"
          class="relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg group"
          :class="[
            route.path === item.path
              ? 'text-white'
              : 'text-neutral-400 hover:text-white'
          ]"
        >
          <!-- Active Background -->
          <span
            v-if="route.path === item.path"
            class="absolute inset-0 rounded-lg bg-gradient-to-r from-violet-500/20 to-pink-500/20 border border-violet-500/30"
          />

          <!-- Hover Effect -->
          <span
            class="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-neutral-800/50"
            :class="{ 'opacity-0': route.path === item.path }"
          />

          <span class="relative z-10 flex items-center gap-2">
            <UIcon :name="item.icon" class="w-4 h-4" />
            {{ item.name }}
          </span>
        </NuxtLink>

        <!-- CTA Button -->
        <NuxtLink
          to="/contact"
          class="ml-4 px-4 py-1.5 border border-neutral-600 hover:border-violet-500 rounded-lg text-sm text-neutral-300 hover:text-white transition-all duration-200"
        >
          <span class="flex items-center gap-1.5">
            <UIcon name="i-heroicons-envelope" class="w-4 h-4" />
            Hire Me
          </span>
        </NuxtLink>
      </nav>

      <!-- Mobile Menu Button -->
      <UiGlareCard :glare-opacity="0.2" class="md:hidden">
        <UButton
          variant="ghost"
          icon="i-heroicons-bars-3"
          class="!bg-transparent"
          @click="mobileMenuOpen = !mobileMenuOpen"
        />
      </UiGlareCard>
    </div>

    <!-- Mobile Menu -->
    <ClientOnly>
      <Transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="opacity-0 -translate-y-4"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 -translate-y-4"
      >
        <div
          v-if="mobileMenuOpen"
          class="absolute top-full left-0 right-0 md:hidden bg-neutral-900/95 backdrop-blur-xl border-b border-neutral-800/50"
        >
          <nav class="container px-4 py-4 mx-auto space-y-2">
            <NuxtLink
              v-for="item in navigation"
              :key="item.name"
              :to="item.path"
              class="flex items-center gap-3 px-4 py-3 text-sm font-medium transition-all duration-300 rounded-lg"
              :class="[
                route.path === item.path
                  ? 'bg-gradient-to-r from-violet-500/20 to-pink-500/20 border border-violet-500/30 text-white'
                  : 'text-neutral-400 hover:bg-neutral-800/50 hover:text-white'
              ]"
              @click="mobileMenuOpen = false"
            >
              <UIcon :name="item.icon" class="w-5 h-5" />
              {{ item.name }}
            </NuxtLink>

            <NuxtLink
              to="/contact"
              class="flex items-center justify-center gap-2 w-full mt-4 px-4 py-3 border border-neutral-600 hover:border-violet-500 rounded-lg text-sm text-neutral-300 hover:text-white transition-all duration-200"
              @click="mobileMenuOpen = false"
            >
              <UIcon name="i-heroicons-envelope" class="w-4 h-4" />
              Hire Me
            </NuxtLink>
          </nav>
        </div>
      </Transition>
    </ClientOnly>
  </header>
</template>

<script lang="ts" setup>
const route = useRoute();
const mobileMenuOpen = ref(false);

const navigation = [
  { name: 'Home', path: '/', icon: 'i-heroicons-home' },
  { name: 'About', path: '/about', icon: 'i-heroicons-user' },
  { name: 'Contact', path: '/contact', icon: 'i-heroicons-chat-bubble-left-right' },
];

// Close mobile menu on route change
watch(() => route.path, () => {
  mobileMenuOpen.value = false;
});
</script>

<style scoped>
/* Ensure header stays above other elements */
header {
  z-index: 100;
}
</style>
