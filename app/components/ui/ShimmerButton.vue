<template>
  <component :is="props.as" :class="cn(
    'shimmer-button group relative z-0 inline-flex cursor-pointer items-center justify-center overflow-hidden whitespace-nowrap rounded-lg border border-white/10 px-6 py-3 text-white',
    'transform-gpu transition-transform duration-300 ease-in-out active:translate-y-px',
    'focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900',
    props.class
  )" v-bind="$attrs">
    <span class="z-0 absolute inset-0 rounded-lg overflow-hidden" :style="{ background: props.background }">
      <span class="z-0 absolute inset-0 shimmer-effect" :style="{
        background: `linear-gradient(to right, transparent, ${props.shimmerColor}, transparent)`,
        transform: 'translateX(-100%)',
      }" />
    </span>
    <span class="z-10 relative flex justify-center items-center gap-2">
      <slot />
    </span>
    <span
      class="-bottom-0 left-[1.125rem] absolute bg-linear-to-r from-primary-400/0 via-primary-400/90 to-primary-400/0 group-hover:opacity-40 w-[calc(100%-2.25rem)] h-px transition-opacity duration-500" />
  </component>
</template>

<script setup lang="ts">
interface ShimmerButtonProps {
  as?: string | object;
  class?: string;
  background?: string;
  shimmerColor?: string;
  shimmerDuration?: string;
}

const props = withDefaults(defineProps<ShimmerButtonProps>(), {
  as: 'button',
  background: 'linear-gradient(110deg, #000103 45%, #1e2631 55%, #000103)',
  shimmerColor: 'rgba(255, 255, 255, 0.1)',
  shimmerDuration: '2s',
})
</script>

<style scoped>
.shimmer-button:hover .shimmer-effect {
  animation: shimmer v-bind('props.shimmerDuration') infinite;
}

@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }

  100% {
    transform: translateX(100%);
  }
}
</style>
