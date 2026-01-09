<template>
  <div :class="cn(
    'relative flex flex-col items-center justify-center transition-bg overflow-hidden',
    props.class
  )">
    <!-- Decorative background gradient - hidden from accessibility tree -->
    <div class="absolute inset-0 overflow-hidden" aria-hidden="true">
      <div class="aurora-gradient" :class="cn(
        `
            [background-size:300%,_200%]
            [background-position:50%_50%,50%_50%]
            filter blur-[10px] invert dark:invert-0
            after:content-[''] after:absolute after:inset-0
            after:[background-size:200%,_100%]
            after:animate-aurora after:[background-attachment:fixed] after:mix-blend-difference
            pointer-events-none
            absolute -inset-[10px] opacity-50 will-change-transform
          `,
        showRadialGradient && `[mask-image:radial-gradient(ellipse_at_100%_0%,black_10%,transparent_70%)]`
      )" />
    </div>
    <slot />
  </div>
</template>

<script setup lang="ts">
interface AuroraBgProps {
  class?: string;
  showRadialGradient?: boolean;
}

const props = withDefaults(defineProps<AuroraBgProps>(), {
  showRadialGradient: true,
})
</script>

<style scoped>
@keyframes aurora {
  from {
    background-position: 50% 50%, 50% 50%;
  }

  to {
    background-position: 350% 50%, 350% 50%;
  }
}

.animate-aurora {
  animation: aurora 60s linear infinite;
}

.aurora-gradient {
  --white-gradient: repeating-linear-gradient(100deg, white 0%, white 7%, transparent 10%, transparent 12%, white 16%);
  --dark-gradient: repeating-linear-gradient(100deg, black 0%, black 7%, transparent 10%, transparent 12%, black 16%);
  --aurora: repeating-linear-gradient(100deg,
      var(--color-primary-600) 10%,
      var(--color-primary-400) 15%,
      var(--color-accent-400) 20%,
      var(--color-accent-300) 25%,
      var(--color-primary-500) 30%);
  background-image: var(--white-gradient), var(--aurora);
}

.dark .aurora-gradient {
  background-image: var(--dark-gradient), var(--aurora);
}

.aurora-gradient::after {
  background-image: var(--white-gradient), var(--aurora);
}

.dark .aurora-gradient::after {
  background-image: var(--dark-gradient), var(--aurora);
}
</style>
