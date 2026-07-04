<script setup lang="ts">
withDefaults(defineProps<{
  title?: string
  description?: string
}>(), {
  title: 'Sandu Dorogan — Full Stack Developer',
  description: 'Focused, driven and creative. Tell me the what and I\'ll show you the how.',
})
</script>

<template>
  <div
    class="flex flex-col justify-between p-[70px] w-full h-full"
    style="background: #f3efe6; border: 16px solid #111111; font-family: 'Space Mono', monospace;"
  >
    <div
      class="self-start px-5 py-2 text-[24px] text-white"
      style="background: #ff4d00; letter-spacing: 4px;"
    >
      SANDU DOROGAN / BUCHAREST, RO
    </div>

    <div
      class="text-[88px] text-[#111111] uppercase"
      style="font-family: 'Archivo Black', sans-serif; line-height: 0.9;"
    >
      {{ title }}
    </div>

    <div class="max-w-[900px] text-[30px] text-[#333029]">
      {{ description }}
    </div>
  </div>
</template>
