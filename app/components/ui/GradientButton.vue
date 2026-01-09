<template>
  <component
    :is="resolvedComponent"
    :class="cn(
      'gradient-button group relative inline-flex items-center justify-center overflow-hidden rounded-lg p-[2px] font-medium transition-all duration-300',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900',
      props.class
    )"
    v-bind="$attrs"
  >
    <span
      class="absolute inset-[-1000%] animate-spin-slow"
      :style="{ background: `conic-gradient(from 90deg at 50% 50%, ${props.fromColor} 0%, ${props.viaColor} 50%, ${props.toColor} 100%)` }"
    />
    <span
      :class="cn(
        'inline-flex h-full w-full cursor-pointer items-center justify-center rounded-[6px] px-6 py-2 text-sm font-medium backdrop-blur-3xl transition-all duration-300',
        props.variant === 'filled' ? 'bg-neutral-900 text-white' : 'bg-background text-foreground group-hover:bg-neutral-900 group-hover:text-white'
      )"
    >
      <slot />
    </span>
  </component>
</template>

<script setup lang="ts">
interface GradientButtonProps {
  as?: string | object;
  class?: string;
  fromColor?: string;
  viaColor?: string;
  toColor?: string;
  variant?: 'filled' | 'outline';
}

const props = withDefaults(defineProps<GradientButtonProps>(), {
  as: 'button',
  fromColor: '#E2CBFF',
  viaColor: '#393BB2',
  toColor: '#E2CBFF',
  variant: 'filled',
})

// NuxtLink passed as a string isn't resolvable by Vue's dynamic <component :is> at runtime.
// Explicitly resolve it so the rendered element is a proper <a> with router integration.
const resolvedComponent = computed(() => {
  if (typeof props.as === 'string' && props.as.toLowerCase() === 'nuxtlink') {
    return resolveComponent('NuxtLink')
  }
  return props.as
})
</script>

<style scoped>
@keyframes spin-slow {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.animate-spin-slow {
  animation: spin-slow 3s linear infinite;
}
</style>

