<template>
  <span
    ref="containerEl"
    :class="cn(
      'relative inline-grid place-items-center px-4 py-1',
      // Background is rendered by the absolutely-positioned element below so its width can be animated.
      '!bg-transparent !bg-none',
      props.class,
    )"
  >
    <span
      aria-hidden="true"
      :class="cn(
        'text-highlight-bg absolute inset-y-0 left-1/2 block -translate-x-1/2',
        // Avoid animating from 0px -> initial size on mount/hydration.
        hasMeasured ? 'transition-[width] duration-300 ease-in-out' : 'transition-none',
        props.class,
      )"
      :style="{ width: bgWidth == null ? '100%' : `${bgWidth}px` }"
    />

    <span class="z-10 relative">
      <slot />
    </span>
  </span>
</template>

<script setup lang="ts">
import type {HTMLAttributes} from 'vue'

interface Props {
  delay?: number;
  duration?: number;
  class?: HTMLAttributes['class'];
  textEndColor?: string;
}

const props = withDefaults(defineProps<Props>(), {
  delay: 0,
  duration: 2000,
  class: [],
  textEndColor: 'inherit',
})

const delayMs = computed(() => `${props.delay}ms`)
const durationMs = computed(() => `${props.duration}ms`)

const containerEl = ref<HTMLElement | null>(null)
const bgWidth = ref<number | null>(null)
const hasMeasured = ref(false)

let resizeObserver: ResizeObserver | undefined

function updateBgWidth() {
  if (!containerEl.value) {
    return
  }

  bgWidth.value = Math.round(containerEl.value.getBoundingClientRect().width)

  // Enable the resize transition only after the first measurement to prevent an initial "grow" animation.
  if (!hasMeasured.value) {
    requestAnimationFrame(() => {
      hasMeasured.value = true
    })
  }
}

onMounted(() => {
  updateBgWidth()

  resizeObserver = new ResizeObserver(() => {
    updateBgWidth()
  })

  if (containerEl.value) {
    resizeObserver.observe(containerEl.value)
  }
})

onBeforeUnmount(() => {
  resizeObserver?.disconnect()
  resizeObserver = undefined
})
</script>

<style scoped>
@keyframes background-expand {
  0% {
    background-size: 0% 100%;
  }
  100% {
    background-size: 100% 100%;
  }
}

@keyframes text-color-change {
  0% {
    color: inherit;
  }
  100% {
    color: v-bind(textEndColor);
  }
}

span {
  background-size: 0% 100%;
  background-repeat: no-repeat;
  background-position: left center;
  animation: text-color-change v-bind(durationMs) ease-in-out v-bind(delayMs) forwards;
}

.text-highlight-bg {
  background-size: 0% 100%;
  background-repeat: no-repeat;
  background-position: left center;
  animation: background-expand v-bind(durationMs) ease-in-out v-bind(delayMs) forwards;
}
</style>
