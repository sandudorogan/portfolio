<template>
  <div :class="cn('orbit relative flex items-center justify-center', props.class)"
    :style="{ width: `${size}px`, height: `${size}px` }">
    <div class="absolute inset-0 flex justify-center items-center">
      <slot name="center" />
    </div>

    <div v-for="(ring, ringIndex) in rings" :key="ringIndex"
      class="absolute border border-neutral-700/30 rounded-full orbit-ring" :style="{
        width: `${ring.radius * 2}px`,
        height: `${ring.radius * 2}px`,
        animationDuration: `${ring.duration}s`,
        animationDirection: ring.reverse ? 'reverse' : 'normal',
      }">
      <div v-for="(item, itemIndex) in ring.items" :key="itemIndex" class="absolute orbit-item"
        :style="getItemStyle(ring, itemIndex)">
        <div
          class="flex justify-center items-center bg-neutral-800/80 backdrop-blur-xs rounded-full w-10 h-10 hover:scale-125 transition-transform duration-300"
          :style="{
            animationDuration: `${ring.duration}s`,
            animationDirection: ring.reverse ? 'normal' : 'reverse',
          }">
          <UIcon v-if="typeof item === 'string'" :name="item" class="w-5 h-5" />
          <component :is="item" v-else />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Component } from 'vue'

interface OrbitRing {
  radius: number;
  duration: number;
  reverse?: boolean;
  items: (string | Component)[];
}

interface OrbitProps {
  class?: string;
  size?: number;
  rings: OrbitRing[];
}

const props = withDefaults(defineProps<OrbitProps>(), {
  size: 400,
})

function getItemStyle(ring: OrbitRing, index: number) {
  const angle = (360 / ring.items.length) * index
  return {
    left: '50%',
    top: '50%',
    transform: `rotate(${angle}deg) translateX(${ring.radius}px) rotate(-${angle}deg)`,
    marginLeft: '-20px',
    marginTop: '-20px',
  }
}
</script>

<style scoped>
.orbit-ring {
  animation: orbit-spin linear infinite;
}

.orbit-item>div {
  animation: orbit-counter-spin linear infinite;
}

@keyframes orbit-spin {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

@keyframes orbit-counter-spin {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(-360deg);
  }
}
</style>
