<script setup lang="ts">
</script>

<template>
  <div class="flex flex-col min-h-screen bg-background text-foreground">
    <AppHeader />
    <main class="flex-grow">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>
