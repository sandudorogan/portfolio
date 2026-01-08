<script setup lang="ts">
withDefaults(defineProps<{
  title?: string
  description?: string
  emoji?: string
}>(), {
  title: 'Sandu Dorogan — Full Stack Developer',
  description: "Focused, driven and creative. Will bring your ideas to life. Tell me the what and I'll show you the how.",
  emoji: '👨‍💻⚡💻'
})
</script>

<template>
  <div
    class="flex flex-col justify-center items-center p-[60px] w-full h-full"
    style="background: linear-gradient(135deg, #5569DD 0%, #3654FC 100%)"
  >
    <div class="mb-6 text-[72px]">
      {{ emoji }}
    </div>
    <div class="font-bold text-[52px] text-white text-center leading-tight">
      {{ title }}
    </div>
    <div class="mt-5 max-w-[1000px] text-[26px] text-white/85 text-center">
      {{ description }}
    </div>
  </div>
</template>
