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
    <div class="absolute inset-0 flex justify-center items-center">
      <span class="font-bold text-2xl">{{ Math.round(animatedValue) }}%</span>
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
  startDelayMs?: number;
}

const props = withDefaults(defineProps<AnimatedCircularProgressBarProps>(), {
  class: undefined,
  size: 120,
  strokeWidth: 8,
  trackColor: 'rgba(255, 255, 255, 0.1)',
  progressColor: 'rgb(var(--primary-500))',
  startDelayMs: 0,
})

const animatedValue = ref(0)
const hasAnimated = ref(false)
const isInView = ref(false)
const containerRef = ref<HTMLElement | null>(null)
let delayTimeout: ReturnType<typeof setTimeout> | null = null

const radius = computed(() => (props.size - props.strokeWidth) / 2)
const circumference = computed(() => 2 * Math.PI * radius.value)
const strokeDashoffset = computed(() => circumference.value - (animatedValue.value / 100) * circumference.value)

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

function scheduleAnimation() {
  if (hasAnimated.value) return
  cancelScheduledAnimation()

  if (props.startDelayMs > 0) {
    delayTimeout = setTimeout(() => {
      if (isInView.value) {
        animateProgress()
      }
    }, props.startDelayMs)
  } else {
    animateProgress()
  }
}

function cancelScheduledAnimation() {
  if (delayTimeout !== null) {
    clearTimeout(delayTimeout)
    delayTimeout = null
  }
}

const { stop } = useIntersectionObserver(
  containerRef,
  ([{ isIntersecting }]) => {
    isInView.value = isIntersecting
    if (isIntersecting && !hasAnimated.value) {
      scheduleAnimation()
    } else if (!isIntersecting) {
      cancelScheduledAnimation()
    }
  },
  { threshold: 0.5 },
)

onUnmounted(() => {
  stop()
  cancelScheduledAnimation()
})

watch(() => props.value, () => {
  hasAnimated.value = false
  if (isInView.value) {
    scheduleAnimation()
  }
},
)
</script>

