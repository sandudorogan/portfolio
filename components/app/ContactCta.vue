<script setup lang="ts">
interface ContactCtaProps {
  title: string;
  description: string;
  to?: string;
  buttonLabel?: string;
  buttonIcon?: string;
}

withDefaults(defineProps<ContactCtaProps>(), {
  to: '/contact',
  buttonLabel: 'Contact Me',
  buttonIcon: 'i-heroicons-envelope',
});
</script>

<template>
  <UiNeonBorder color="rgb(var(--primary-500))" :glow-intensity="15" class="mx-auto max-w-3xl">
    <div class="relative p-8 md:p-12 overflow-hidden rounded-xl">
      <div class="absolute inset-0 bg-gradient-to-br from-primary-500/5 via-transparent to-accent-500/5" />

      <div class="relative z-10 text-center">
        <UiSparklesText :sparkle-count="10" :colors="['rgb(var(--primary-500))', 'rgb(var(--accent-500))']">
          <h2 class="mb-4 text-2xl md:text-3xl font-bold text-white">
            {{ title }}
          </h2>
        </UiSparklesText>

        <p class="max-w-2xl mx-auto mb-8 text-neutral-400">
          {{ description }}
        </p>

        <UiGradientButton
          as="NuxtLink"
          :to="to"
          from-color="rgb(var(--primary-500))"
          via-color="rgb(var(--accent-500))"
          to-color="rgb(var(--primary-500))"
        >
          <span class="flex items-center gap-2">
            <UIcon :name="buttonIcon" class="w-5 h-5" />
            {{ buttonLabel }}
          </span>
        </UiGradientButton>
      </div>

      <UiBorderBeam :size="350" :duration="12" color-from="rgb(var(--primary-500))" color-to="rgb(var(--accent-500))" />
    </div>
  </UiNeonBorder>
</template>
