<template>
  <span ref="el" :class="cn('number-ticker tabular-nums', props.class)">
    {{ formattedDisplayValue }}{{ suffix }}
  </span>
</template>

<script setup lang="ts">
interface NumberTickerProps {
  class?: string;
  value: number;
  duration?: number;
  suffix?: string;
  decimalPlaces?: number;
}

const props = withDefaults(defineProps<NumberTickerProps>(), {
  duration: 2000,
  suffix: '',
  decimalPlaces: 0,
})

// Upstream observed `document.querySelector('.number-ticker')`, so with several
// tickers on one page every instance watched the first one. Use a local ref.
const el = ref<HTMLElement | null>(null)
const displayValue = ref(0)
const isInView = ref(false)
const hasAnimated = ref(false)

const formattedDisplayValue = computed(() => displayValue.value.toFixed(props.decimalPlaces))

function animateValue() {
  if (hasAnimated.value) return

  hasAnimated.value = true
  const startTime = performance.now()
  const startValue = 0
  const endValue = props.value

  function update(currentTime: number) {
    const elapsed = currentTime - startTime
    const progress = Math.min(elapsed / props.duration, 1)

    // Easing function (ease-out)
    const easeOut = 1 - Math.pow(1 - progress, 3)

    displayValue.value = startValue + (endValue - startValue) * easeOut

    if (progress < 1) {
      requestAnimationFrame(update)
    } else {
      displayValue.value = endValue
    }
  }

  requestAnimationFrame(update)
}

const { stop } = useIntersectionObserver(
  el,
  ([{ isIntersecting }]) => {
    if (isIntersecting && !hasAnimated.value) {
      isInView.value = true
      animateValue()
    }
  },
  { threshold: 0.5 },
)

onUnmounted(() => {
  stop()
})

watch(() => props.value, () => {
  hasAnimated.value = false
  if (isInView.value) {
    animateValue()
  }
})
</script>

