<template>
  <div :class="cn('animated-list', props.class)">
    <Motion
      v-for="(item, index) in items"
      :key="item.id || index"
      as="div"
      :initial="{ opacity: 0, y: 20, scale: 0.95 }"
      :in-view="{ opacity: 1, y: 0, scale: 1 }"
      :transition="{
        duration: 0.4,
        delay: index * staggerDelay,
        ease: 'easeOut'
      }"
    >
      <slot :item="item" :index="index" />
    </Motion>
  </div>
</template>

<script setup lang="ts">
import {Motion} from 'motion-v'

interface AnimatedListProps {
  class?: string;
  items: Array<{ id?: string | number; [key: string]: unknown }>;
  staggerDelay?: number;
}

const props = withDefaults(defineProps<AnimatedListProps>(), {
  staggerDelay: 0.1,
})
</script>

