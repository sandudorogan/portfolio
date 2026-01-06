<template>
  <div
    :class="cn(
      'marquee group flex overflow-hidden p-2 [--duration:40s] [--gap:1rem] [gap:var(--gap)]',
      vertical ? 'flex-col' : 'flex-row',
      props.class
    )"
    :style="{ '--duration': `${duration}s` }"
  >
    <div
      :class="cn(
        'flex shrink-0 justify-around [gap:var(--gap)]',
        vertical ? 'animate-marquee-vertical flex-col' : 'animate-marquee flex-row',
        pauseOnHover && 'group-hover:[animation-play-state:paused]',
        reverse && '[animation-direction:reverse]'
      )"
    >
      <slot />
    </div>
    <div
      :class="cn(
        'flex shrink-0 justify-around [gap:var(--gap)]',
        vertical ? 'animate-marquee-vertical flex-col' : 'animate-marquee flex-row',
        pauseOnHover && 'group-hover:[animation-play-state:paused]',
        reverse && '[animation-direction:reverse]'
      )"
      aria-hidden="true"
    >
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
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

