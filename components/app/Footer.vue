<template>
  <footer class="py-6 border-t bg-background border-border/40">
    <div class="container px-4 mx-auto">
      <div class="flex flex-col items-center justify-between gap-4 md:flex-row">
        <div class="text-sm text-neutral-400">
          © {{ new Date().getFullYear() }} Portfolio. All rights reserved.
        </div>

        <div class="flex items-center space-x-4">
          <UButton variant="ghost" icon="i-simple-icons-github" size="sm" href="https://github.com" target="_blank" />
          <UButton variant="ghost" icon="i-simple-icons-linkedin" size="sm" href="https://linkedin.com"
            target="_blank" />
          <UButton variant="ghost" icon="i-simple-icons-twitter" size="sm" href="https://twitter.com" target="_blank" />
        </div>
      </div>
    </div>
  </footer>
</template>

<script lang="ts" setup>

</script>

<style></style>