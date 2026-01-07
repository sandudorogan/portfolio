<template>
  <div
    ref="marqueeRef"
    :class="cn(
      'marquee group flex overflow-hidden p-2 [--duration:40s] [--gap:1rem] [gap:var(--gap)]',
      vertical ? 'flex-col' : 'flex-row',
      props.class
    )"
    :style="{ '--duration': `${duration}s` }"
    @focusin="handleFocusIn"
    @focusout="handleFocusOut"
  >
    <div
      :class="cn(
        'flex shrink-0 justify-around [gap:var(--gap)]',
        vertical ? 'animate-marquee-vertical flex-col' : 'animate-marquee flex-row',
        (pauseOnHover || shouldReduceMotion) && 'group-hover:[animation-play-state:paused]',
        shouldPause && '[animation-play-state:paused]',
        reverse && '[animation-direction:reverse]'
      )"
    >
      <slot />
    </div>
    <div
      :class="cn(
        'flex shrink-0 justify-around [gap:var(--gap)]',
        vertical ? 'animate-marquee-vertical flex-col' : 'animate-marquee flex-row',
        (pauseOnHover || shouldReduceMotion) && 'group-hover:[animation-play-state:paused]',
        shouldPause && '[animation-play-state:paused]',
        reverse && '[animation-direction:reverse]'
      )"
      aria-hidden="true"
    >
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { usePreferredReducedMotion } from '@vueuse/core'

interface MarqueeProps {
  class?: string;
  reverse?: boolean;
  pauseOnHover?: boolean;
  vertical?: boolean;
  duration?: number;
}

const props = withDefaults(defineProps<MarqueeProps>(), {
  reverse: false,
  pauseOnHover: false,
  vertical: false,
  duration: 40,
})

const marqueeRef = ref<HTMLElement | null>(null)
const reducedMotion = usePreferredReducedMotion()
const isFocusedWithin = ref(false)

const shouldReduceMotion = computed(() => reducedMotion.value === 'reduce')
const shouldPause = computed(() => shouldReduceMotion.value || isFocusedWithin.value)

function handleFocusIn() {
  isFocusedWithin.value = true
}

function handleFocusOut(e: FocusEvent) {
  // Only unfocus if focus moved outside the marquee
  if (marqueeRef.value && !marqueeRef.value.contains(e.relatedTarget as Node)) {
    isFocusedWithin.value = false
  }
}
</script>

<style scoped>
@keyframes marquee {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(calc(-100% - var(--gap)));
  }
}

@keyframes marquee-vertical {
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(calc(-100% - var(--gap)));
  }
}

.animate-marquee {
  animation: marquee var(--duration) linear infinite;
}

.animate-marquee-vertical {
  animation: marquee-vertical var(--duration) linear infinite;
}
</style>

