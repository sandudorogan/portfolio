<template>
  <div
    ref="cardRef"
    :class="cn('card-3d relative', props.class)"
    :style="cardStyle"
    @mouseenter="handleMouseEnter"
    @mousemove="handleMouseMove"
    @mouseleave="handleMouseLeave"
  >
    <div
      class="z-10 relative h-full transition-transform duration-200 card-3d-inner"
      :style="innerStyle"
    >
      <slot />
    </div>
    <div
      v-if="showGlare"
      class="z-20 absolute inset-0 opacity-0 rounded-[inherit] transition-opacity duration-300 pointer-events-none card-3d-glare"
      :style="glareStyle"
    />
  </div>
</template>

<script setup lang="ts">
interface Card3DProps {
  class?: string;
  rotationFactor?: number;
  showGlare?: boolean;
  glareOpacity?: number;
  glareColor?: string;
}

const props = withDefaults(defineProps<Card3DProps>(), {
  rotationFactor: 15,
  showGlare: true,
  glareOpacity: 0.3,
  glareColor: 'white',
})

const cardRef = ref<HTMLElement | null>(null)
const isHovering = ref(false)
const rotateX = ref(0)
const rotateY = ref(0)
const glareX = ref(50)
const glareY = ref(50)

const cardStyle = computed(() => ({
  transformStyle: 'preserve-3d' as const,
  perspective: '1000px',
}))

const innerStyle = computed(() => ({
  transform: isHovering.value
    ? `rotateX(${rotateX.value}deg) rotateY(${rotateY.value}deg) scale3d(1.02, 1.02, 1.02)`
    : 'rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
  transformStyle: 'preserve-3d' as const,
}))

const glareStyle = computed(() => ({
  background: `radial-gradient(circle at ${glareX.value}% ${glareY.value}%, ${props.glareColor}, transparent 50%)`,
  opacity: isHovering.value ? props.glareOpacity : 0,
}))

function handleMouseEnter() {
  isHovering.value = true
}

function handleMouseMove(e: MouseEvent) {
  if (!cardRef.value) return

  const rect = cardRef.value.getBoundingClientRect()
  const centerX = rect.left + rect.width / 2
  const centerY = rect.top + rect.height / 2

  const mouseX = e.clientX - centerX
  const mouseY = e.clientY - centerY

  rotateX.value = (-mouseY / (rect.height / 2)) * props.rotationFactor
  rotateY.value = (mouseX / (rect.width / 2)) * props.rotationFactor

  glareX.value = ((e.clientX - rect.left) / rect.width) * 100
  glareY.value = ((e.clientY - rect.top) / rect.height) * 100
}

function handleMouseLeave() {
  isHovering.value = false
  rotateX.value = 0
  rotateY.value = 0
}
</script>

<style scoped>
.card-3d {
  transform-style: preserve-3d;
}
</style>

