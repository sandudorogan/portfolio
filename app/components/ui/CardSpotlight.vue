<template>
  <div ref="cardRef" :class="cn(
    'card-spotlight relative overflow-hidden rounded-xl border border-muted bg-elevated/50 py-4 md:p-8',
    props.class
  )" @mousemove="handleMouseMove" @mouseleave="handleMouseLeave">
    <!-- Decorative spotlight effect -->
    <div class="absolute -inset-px opacity-0 rounded-xl transition-opacity duration-300 pointer-events-none"
      :style="spotlightStyle" aria-hidden="true" />
    <div class="z-10 relative h-full">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
interface CardSpotlightProps {
  class?: string;
  spotlightColor?: string;
  spotlightSize?: number;
}

const props = withDefaults(defineProps<CardSpotlightProps>(), {
  spotlightColor: 'rgba(120, 119, 198, 0.3)',
  spotlightSize: 400,
})

const cardRef = ref<HTMLElement | null>(null)
const mouseX = ref(0)
const mouseY = ref(0)
const isHovering = ref(false)

const spotlightStyle = computed(() => ({
  background: `radial-gradient(${props.spotlightSize}px circle at ${mouseX.value}px ${mouseY.value}px, ${props.spotlightColor}, transparent 40%)`,
  opacity: isHovering.value ? 1 : 0,
}))

function handleMouseMove(e: MouseEvent) {
  if (!cardRef.value) return

  const rect = cardRef.value.getBoundingClientRect()
  mouseX.value = e.clientX - rect.left
  mouseY.value = e.clientY - rect.top
  isHovering.value = true
}

function handleMouseLeave() {
  isHovering.value = false
}
</script>
