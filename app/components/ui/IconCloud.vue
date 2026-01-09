<template>
  <div ref="containerRef" :class="cn('icon-cloud relative flex items-center justify-center', props.class)"
    :style="{ width: `${size}px`, height: `${size}px` }">
    <div v-for="(icon, index) in icons" :key="index" class="absolute transition-all duration-300 icon-cloud-item"
      :style="getIconStyle(index)">
      <div
        class="flex justify-center items-center bg-neutral-800/50 backdrop-blur-xs rounded-full w-12 h-12 hover:scale-125 transition-transform duration-300">
        <UIcon :name="icon" class="w-6 h-6" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface IconCloudProps {
  class?: string;
  icons: string[];
  size?: number;
  radius?: number;
}

const props = withDefaults(defineProps<IconCloudProps>(), {
  size: 400,
  radius: 150,
})

const containerRef = ref<HTMLElement | null>(null)
const rotation = ref({ x: 0, y: 0 })
const animationFrame = ref<number | null>(null)
const autoRotation = ref(0)

function getIconStyle(index: number) {
  const total = props.icons.length
  const phi = Math.acos(-1 + (2 * index + 1) / total)
  const theta = Math.sqrt(total * Math.PI) * phi + autoRotation.value

  const x = props.radius * Math.sin(phi) * Math.cos(theta) + rotation.value.x * 0.1
  const y = props.radius * Math.sin(phi) * Math.sin(theta) + rotation.value.y * 0.1
  const z = props.radius * Math.cos(phi)

  const scale = (z + props.radius) / (2 * props.radius)
  const opacity = 0.3 + scale * 0.7

  return {
    transform: `translate3d(${x + props.size / 2 - 24}px, ${y + props.size / 2 - 24}px, ${z}px) scale(${scale})`,
    opacity,
    zIndex: Math.round(scale * 100),
  }
}

function animate() {
  autoRotation.value += 0.005
  animationFrame.value = requestAnimationFrame(animate)
}

onMounted(() => {
  animate()
})

onUnmounted(() => {
  if (animationFrame.value) {
    cancelAnimationFrame(animationFrame.value)
  }
})
</script>

<style scoped>
.icon-cloud {
  perspective: 1000px;
  transform-style: preserve-3d;
}
</style>
