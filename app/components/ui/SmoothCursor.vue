<template>
  <div
    v-if="isVisible"
    ref="cursorRef"
    :class="cn('smooth-cursor pointer-events-none fixed z-[9999]', props.class)"
    :style="cursorStyle"
  >
    <div
      :class="cn(
        'cursor-dot h-4 w-4 rounded-full bg-primary transition-transform duration-100',
        isHovering && 'scale-150'
      )"
    />
    <div
      class="cursor-ring absolute -inset-4 rounded-full border-2 border-primary/50 transition-all duration-300"
      :style="ringStyle"
    />
  </div>
</template>

<script setup lang="ts">
interface SmoothCursorProps {
  class?: string;
  smoothing?: number;
}

const props = withDefaults(defineProps<SmoothCursorProps>(), {
  smoothing: 0.15,
})

const cursorRef = ref<HTMLElement | null>(null)
const isVisible = ref(false)
const isHovering = ref(false)
const position = ref({ x: 0, y: 0 })
const targetPosition = ref({ x: 0, y: 0 })

const cursorStyle = computed(() => ({
  transform: `translate(${position.value.x}px, ${position.value.y}px)`,
}))

const ringStyle = computed(() => ({
  transform: isHovering.value ? 'scale(1.5)' : 'scale(1)',
  opacity: isHovering.value ? 0.3 : 0.5,
}))

let animationFrame: number | null = null

function updatePosition() {
  position.value.x += (targetPosition.value.x - position.value.x) * props.smoothing
  position.value.y += (targetPosition.value.y - position.value.y) * props.smoothing
  animationFrame = requestAnimationFrame(updatePosition)
}

function handleMouseMove(e: MouseEvent) {
  targetPosition.value = { x: e.clientX - 8, y: e.clientY - 8 }
  isVisible.value = true
}

function handleMouseLeave() {
  isVisible.value = false
}

function handleMouseOver(e: MouseEvent) {
  const target = e.target as HTMLElement
  isHovering.value = target.matches('a, button, [role="button"], input, textarea, select, [data-cursor-hover]')
}

onMounted(() => {
  document.addEventListener('mousemove', handleMouseMove)
  document.addEventListener('mouseleave', handleMouseLeave)
  document.addEventListener('mouseover', handleMouseOver)
  updatePosition()
})

onUnmounted(() => {
  document.removeEventListener('mousemove', handleMouseMove)
  document.removeEventListener('mouseleave', handleMouseLeave)
  document.removeEventListener('mouseover', handleMouseOver)
  if (animationFrame) {
    cancelAnimationFrame(animationFrame)
  }
})
</script>

<style scoped>
.smooth-cursor {
  mix-blend-mode: difference;
}
</style>

