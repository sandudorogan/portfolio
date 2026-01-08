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
    <div class="z-10 relative">
      <slot />
    </div>
    <!-- Decorative glare effect -->
    <div
      class="z-20 absolute inset-0 transition-opacity duration-300 pointer-events-none glare-effect"
      :style="glareStyle"
      aria-hidden="true"
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

