<template>
  <header class="top-0 right-0 left-0 z-50 fixed bg-neutral-900/80 backdrop-blur-xl border-neutral-800/50 border-b">
    <div class="flex justify-between items-center mx-auto px-4 h-16 container">
      <!-- Logo -->
      <NuxtLink to="/" class="bg-clip-text bg-gradient-to-r from-primary-400 hover:opacity-80 font-bold text-transparent text-xl transition-opacity to-accent-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900 rounded">
        Portfolio
      </NuxtLink>

      <!-- Navigation Links -->
      <nav aria-label="Main navigation" class="hidden md:flex items-center space-x-2">
        <NuxtLink
          v-for="item in navigation"
          :key="item.name"
          :to="item.path"
          class="group relative px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
          :class="[
            route.path === item.path
              ? 'text-white'
              : 'text-neutral-400 hover:text-white'
          ]"
        >
          <!-- Active Background -->
          <span
            v-if="route.path === item.path"
            class="absolute inset-0 bg-gradient-to-r from-primary-500/20 border border-primary-500/30 rounded-lg to-accent-500/20"
            aria-hidden="true"
          />

          <!-- Hover Effect -->
          <span
            class="absolute inset-0 bg-neutral-800/50 opacity-0 group-hover:opacity-100 rounded-lg transition-opacity duration-300"
            :class="{ 'opacity-0': route.path === item.path }"
            aria-hidden="true"
          />

          <span class="z-10 relative flex items-center gap-2">
            <UIcon :name="item.icon" class="w-4 h-4" aria-hidden="true" />
            {{ item.name }}
          </span>
        </NuxtLink>
      </nav>

      <!-- Mobile Menu Button -->
      <UiGlareCard :glare-opacity="0.2" class="md:hidden">
        <UButton
          ref="mobileMenuButtonRef"
          variant="ghost"
          icon="i-heroicons-bars-3"
          class="!bg-transparent focus-visible:ring-2 focus-visible:ring-primary-500"
          aria-label="Toggle navigation menu"
          :aria-expanded="mobileMenuOpen"
          aria-controls="mobile-menu"
          @click="toggleMobileMenu"
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
          id="mobile-menu"
          class="md:hidden top-full right-0 left-0 absolute bg-neutral-900/95 backdrop-blur-xl border-neutral-800/50 border-b"
          @keydown.escape="closeMobileMenu"
        >
          <nav aria-label="Mobile navigation" class="space-y-2 mx-auto px-4 py-4 container">
            <NuxtLink
              v-for="item in navigation"
              :key="item.name"
              :to="item.path"
              class="flex items-center gap-3 px-4 py-3 rounded-lg font-medium text-sm transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
              :class="[
                route.path === item.path
                  ? 'bg-gradient-to-r from-primary-500/20 to-accent-500/20 border border-primary-500/30 text-white'
                  : 'text-neutral-400 hover:bg-neutral-800/50 hover:text-white'
              ]"
              @click="mobileMenuOpen = false"
            >
              <UIcon :name="item.icon" class="w-5 h-5" aria-hidden="true" />
              {{ item.name }}
            </NuxtLink>

            <NuxtLink
              to="/contact"
              class="flex justify-center items-center gap-2 mt-4 px-4 py-3 border border-neutral-600 hover:border-primary-500 rounded-lg w-full text-neutral-300 hover:text-white text-sm transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
              @click="mobileMenuOpen = false"
            >
              <UIcon name="i-heroicons-envelope" class="w-4 h-4" aria-hidden="true" />
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
const mobileMenuButtonRef = ref<{ $el: HTMLElement } | null>(null);

const navigation = [
  { name: 'Home', path: '/', icon: 'i-heroicons-home' },
  { name: 'About', path: '/about', icon: 'i-heroicons-user' },
  { name: 'Contact', path: '/contact', icon: 'i-heroicons-chat-bubble-left-right' },
];

function toggleMobileMenu() {
  mobileMenuOpen.value = !mobileMenuOpen.value;
}

function closeMobileMenu() {
  mobileMenuOpen.value = false;
  // Return focus to the menu button
  nextTick(() => {
    const buttonEl = mobileMenuButtonRef.value?.$el?.querySelector('button') || mobileMenuButtonRef.value?.$el;
    buttonEl?.focus();
  });
}

// Close mobile menu on route change
watch(() => route.path, () => {
  mobileMenuOpen.value = false;
});

// Close mobile menu on Escape key (global handler for when focus is outside mobile menu)
onMounted(() => {
  const handleEscape = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && mobileMenuOpen.value) {
      closeMobileMenu();
    }
  };
  document.addEventListener('keydown', handleEscape);
  onUnmounted(() => {
    document.removeEventListener('keydown', handleEscape);
  });
});
</script>

<style scoped>
/* Ensure header stays above other elements */
header {
  z-index: 100;
}
</style>
