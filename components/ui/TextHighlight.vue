<template>
  <span :class="cn('inline-grid place-items-center px-4 py-1 transition duration-500 ease-in-out', props.class)"><slot /></span>
</template>

<script setup lang="ts">
import type {HTMLAttributes} from 'vue'

interface Props {
  delay?: number;
  duration?: number;
  class?: HTMLAttributes['class'];
  textEndColor?: string;
}

const props = withDefaults(defineProps<Props>(), {
  delay: 0,
  duration: 2000,
  endColor: 'inherit',
  class: [],
  textEndColor: '',
})

const delayMs = computed(() => `${props.delay}ms`)
const durationMs = computed(() => `${props.duration}ms`)
</script>

<style scoped>
@keyframes background-expand {
  0% {
    background-size: 0% 100%;
  }
  100% {
    background-size: 100% 100%;
  }
}

@keyframes text-color-change {
  0% {
    color: inherit;
  }
  100% {
    color: v-bind(textEndColor);
  }
}

span {
  background-size: 0% 100%;
  background-repeat: no-repeat;
  background-position: left center;
  animation:
      background-expand v-bind(durationMs) ease-in-out v-bind(delayMs) forwards,
      text-color-change v-bind(durationMs) ease-in-out v-bind(delayMs) forwards;
}
</style>
