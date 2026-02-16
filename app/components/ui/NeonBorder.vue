<template>
  <div
    :class="cn(
      'neon-border relative rounded-lg p-[2px]',
      props.class
    )"
    :style="borderStyle"
  >
    <div class="relative z-10 rounded-[inherit] bg-default">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
interface NeonBorderProps {
  class?: string;
  color?: string;
  glowIntensity?: number;
  animated?: boolean;
}

const props = withDefaults(defineProps<NeonBorderProps>(), {
  color: '#00ff88',
  glowIntensity: 10,
  animated: true,
})

const borderStyle = computed(() => ({
  background: props.color,
  boxShadow: `0 0 ${props.glowIntensity}px ${props.color}, 0 0 ${props.glowIntensity * 2}px ${props.color}, 0 0 ${props.glowIntensity * 4}px ${props.color}`,
}))
</script>

<style scoped>
.neon-border {
  animation: neon-pulse 2s ease-in-out infinite alternate;
}

@keyframes neon-pulse {
  from {
    filter: brightness(1);
  }
  to {
    filter: brightness(1.2);
  }
}
</style>

