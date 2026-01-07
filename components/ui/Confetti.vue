<template>
  <!-- Confetti is suppressed when user prefers reduced motion -->
  <div v-if="isActive && !shouldReduceMotion" class="confetti-container pointer-events-none fixed inset-0 z-50">
    <div
      v-for="(piece, index) in confettiPieces"
      :key="index"
      class="confetti-piece absolute"
      :style="piece.style"
    />
  </div>
</template>

<script setup lang="ts">
import { usePreferredReducedMotion } from '@vueuse/core'

interface ConfettiProps {
  active?: boolean;
  particleCount?: number;
  colors?: string[];
  duration?: number;
}

const props = withDefaults(defineProps<ConfettiProps>(), {
  active: false,
  particleCount: 50,
  colors: () => ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'],
  duration: 3000,
})

const reducedMotion = usePreferredReducedMotion()
const shouldReduceMotion = computed(() => reducedMotion.value === 'reduce')

const isActive = ref(props.active)

interface ConfettiPiece {
  style: {
    left: string;
    top: string;
    backgroundColor: string;
    width: string;
    height: string;
    animationDelay: string;
    animationDuration: string;
    transform: string;
  };
}

const confettiPieces = computed<ConfettiPiece[]>(() => {
  if (!isActive.value || shouldReduceMotion.value) return []

  return Array.from({ length: props.particleCount }, () => {
    const color = props.colors[Math.floor(Math.random() * props.colors.length)]
    const size = Math.random() * 10 + 5
    return {
      style: {
        left: `${Math.random() * 100}%`,
        top: '-20px',
        backgroundColor: color,
        width: `${size}px`,
        height: `${size}px`,
        animationDelay: `${Math.random() * 0.5}s`,
        animationDuration: `${Math.random() * 2 + 2}s`,
        transform: `rotate(${Math.random() * 360}deg)`,
      },
    }
  })
})

watch(() => props.active, (newValue) => {
  isActive.value = newValue
  if (newValue) {
    setTimeout(() => {
      isActive.value = false
    }, props.duration)
  }
})
</script>

<style scoped>
.confetti-piece {
  animation: confetti-fall linear forwards;
  border-radius: 2px;
}

@keyframes confetti-fall {
  0% {
    transform: translateY(0) rotate(0deg);
    opacity: 1;
  }
  100% {
    transform: translateY(100vh) rotate(720deg);
    opacity: 0;
  }
}
</style>

