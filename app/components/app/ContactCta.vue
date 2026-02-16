<script setup lang="ts">
interface ContactCtaProps {
  title: string;
  description: string;
  to?: string;
  buttonLabel?: string;
  buttonIcon?: string;
}

const props = withDefaults(defineProps<ContactCtaProps>(), {
  buttonLabel: 'Contact Me',
  buttonIcon: 'i-heroicons-envelope',
});

const localePath = useLocalePath();
const resolvedTo = computed(() => props.to ?? localePath('/contact'));
</script>

<template>
  <UiNeonBorder color="var(--color-primary-500)" :glow-intensity="15" class="mx-auto max-w-3xl">
    <div class="relative p-8 md:p-12 rounded-xl overflow-hidden">
      <div class="pointer-events-none absolute inset-0 bg-linear-to-br from-primary-500/5 via-transparent to-accent-500/5" />

      <div class="z-10 relative text-center">
        <UiSparklesText :sparkle-count="10" :colors="['var(--color-primary-500)', 'var(--color-accent-500)']">
          <h2 class="mb-4 font-bold text-highlighted text-2xl md:text-3xl">
            {{ title }}
          </h2>
        </UiSparklesText>

        <p class="mx-auto mb-8 max-w-2xl text-dimmed">
          {{ description }}
        </p>

        <UiGradientButton as="NuxtLink" :to="resolvedTo" from-color="var(--color-primary-500)"
          via-color="var(--color-accent-500)" to-color="var(--color-primary-500)">
          <span class="flex items-center gap-2">
            <UIcon :name="buttonIcon" class="w-5 h-5" />
            {{ buttonLabel }}
          </span>
        </UiGradientButton>
      </div>
    </div>
  </UiNeonBorder>
</template>
