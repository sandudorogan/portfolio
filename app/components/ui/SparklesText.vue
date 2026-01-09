<template>
  <span :class="cn('sparkles-text relative inline-block', props.class)">
    <span class="z-10 relative">
      <slot />
    </span>
    <span
      v-for="(sparkle, index) in sparkles"
      :key="index"
      class="absolute sparkle"
      :style="sparkle.style"
    >
      <!-- focusable="false" prevents SVG tab stop in Safari/legacy browsers -->
      <svg
        :width="sparkle.size"
        :height="sparkle.size"
        viewBox="0 0 160 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        focusable="false"
        tabindex="-1"
      >
        <path
          d="M80 0C80 0 84.2846 41.2925 101.496 58.504C118.707 75.7154 160 80 160 80C160 80 118.707 84.2846 101.496 101.496C84.2846 118.707 80 160 80 160C80 160 75.7154 118.707 58.504 101.496C41.2925 84.2846 0 80 0 80C0 80 41.2925 75.7154 58.504 58.504C75.7154 41.2925 80 0 80 0Z"
          :fill="sparkle.color"
        />
      </svg>
    </span>
  </span>
</template>

<script setup lang="ts">
interface SparklesTextProps {
  class?: string;
  colors?: string[];
  sparkleCount?: number;
}

const props = withDefaults(defineProps<SparklesTextProps>(), {
  colors: () => ['#FFC700', '#FF0099', '#00D4FF'],
  sparkleCount: 10,
})

interface Sparkle {
  size: number;
  color: string;
  style: {
    top: string;
    left: string;
    animationDelay: string;
    animationDuration: string;
  };
}

const sparkles = computed<Sparkle[]>(() => {
  return Array.from({ length: props.sparkleCount }, () => ({
    size: Math.random() * 12 + 8,
    color: props.colors[Math.floor(Math.random() * props.colors.length)],
    style: {
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 2}s`,
      animationDuration: `${Math.random() * 1 + 0.5}s`,
    },
  }))
})
</script>

<style scoped>
.sparkle {
  pointer-events: none;
  animation: sparkle-spin linear infinite, sparkle-fade ease-in-out infinite;
  transform-origin: center;
}

@keyframes sparkle-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(180deg);
  }
}

@keyframes sparkle-fade {
  0%, 100% {
    opacity: 0;
    transform: scale(0);
  }
  50% {
    opacity: 1;
    transform: scale(1);
  }
}
</style>

