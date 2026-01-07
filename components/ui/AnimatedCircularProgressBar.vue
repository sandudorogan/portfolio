<template>
  <div
    ref="containerRef"
    :class="cn('animated-circular-progress relative inline-flex items-center justify-center', props.class)"
    :style="{ width: `${size}px`, height: `${size}px` }"
  >
    <svg :width="size" :height="size" class="-rotate-90">
      <circle
        :cx="size / 2"
        :cy="size / 2"
        :r="radius"
        fill="none"
        :stroke="trackColor"
        :stroke-width="strokeWidth"
      />
      <circle
        ref="progressCircle"
        :cx="size / 2"
        :cy="size / 2"
        :r="radius"
        fill="none"
        :stroke="progressColor"
        :stroke-width="strokeWidth"
        stroke-linecap="round"
        :stroke-dasharray="circumference"
        :stroke-dashoffset="strokeDashoffset"
        class="transition-all duration-1000 ease-out"
      />
    </svg>
    <div class="absolute inset-0 flex flex-col items-center justify-center">
      <span class="text-2xl font-bold">{{ Math.round(animatedValue) }}%</span>
      <span v-if="label" class="text-xs text-neutral-400">{{ label }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
interface AnimatedCircularProgressBarProps {
  class?: string;
  value: number;
  size?: number;
  strokeWidth?: number;
  trackColor?: string;
  progressColor?: string;
  label?: string;
}

const props = withDefaults(defineProps<AnimatedCircularProgressBarProps>(), {
  size: 120,
  strokeWidth: 8,
  trackColor: 'rgba(255, 255, 255, 0.1)',
  progressColor: 'rgb(var(--primary-500))',
})

const animatedValue = ref(0)
const hasAnimated = ref(false)
const containerRef = ref<HTMLElement | null>(null)

const radius = computed(() => (props.size - props.strokeWidth) / 2)
const circumference = computed(() => 2 * Math.PI * radius.value)
const strokeDashoffset = computed(() => {
  return circumference.value - (animatedValue.value / 100) * circumference.value
})

function animateProgress() {
  if (hasAnimated.value) return

  hasAnimated.value = true
  const duration = 1500
  const startTime = performance.now()

  function update(currentTime: number) {
    const elapsed = currentTime - startTime
    const progress = Math.min(elapsed / duration, 1)
    const easeOut = 1 - Math.pow(1 - progress, 3)

    animatedValue.value = props.value * easeOut

    if (progress < 1) {
      requestAnimationFrame(update)
    }
  }

  requestAnimationFrame(update)
}

const { stop } = useIntersectionObserver(
  containerRef,
  ([{ isIntersecting }]) => {
    if (isIntersecting && !hasAnimated.value) {
      animateProgress()
    }
  },
  { threshold: 0.5 }
)

onUnmounted(() => {
  stop()
})

watch(() => props.value, () => {
  hasAnimated.value = false
  animateProgress()
})
</script>

