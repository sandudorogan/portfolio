<template>
  <div
    ref="cardRef"
    :class="cn(
      'glare-card relative overflow-hidden rounded-xl',
      props.class
    )"
    @mouseenter="handleMouseEnter"
    @mousemove="handleMouseMove"
    @mouseleave="handleMouseLeave"
  >
    <div class="relative z-10">
      <slot />
    </div>
    <div
      class="glare-effect pointer-events-none absolute inset-0 z-20 transition-opacity duration-300"
      :style="glareStyle"
    />
  </div>
</template>

<script setup lang="ts">
interface GlareCardProps {
  class?: string;
  glareColor?: string;
  glareSize?: number;
  glareOpacity?: number;
}

const props = withDefaults(defineProps<GlareCardProps>(), {
  glareColor: 'rgba(255, 255, 255, 0.4)',
  glareSize: 200,
  glareOpacity: 0.5,
})

const cardRef = ref<HTMLElement | null>(null)
const mouseX = ref(0)
const mouseY = ref(0)
const isHovering = ref(false)

const glareStyle = computed(() => ({
  background: `radial-gradient(${props.glareSize}px circle at ${mouseX.value}px ${mouseY.value}px, ${props.glareColor}, transparent 50%)`,
  opacity: isHovering.value ? props.glareOpacity : 0,
}))

function handleMouseEnter() {
  isHovering.value = true
}

function handleMouseMove(e: MouseEvent) {
  if (!cardRef.value) return

  const rect = cardRef.value.getBoundingClientRect()
  mouseX.value = e.clientX - rect.left
  mouseY.value = e.clientY - rect.top
}

function handleMouseLeave() {
  isHovering.value = false
}
</script>

