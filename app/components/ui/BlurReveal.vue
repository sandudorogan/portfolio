<template>
  <div ref="container" :class="props.class">
    <!-- tabindex="-1" prevents animation wrapper from being a tab stop -->
    <Motion v-for="(child, index) in children" :key="index" ref="childElements" as="div" tabindex="-1"
      :initial="getInitial()" :while-in-view="getAnimate()" :in-view-options="{ once: true }"
      :transition="getTransition(Number(index))">
      <component :is="child" />
    </Motion>
  </div>
</template>

<script setup lang="ts">
import { Motion } from 'motion-v'
import { usePreferredReducedMotion } from '@vueuse/core'
import { Text, Comment, Fragment, type VNode } from 'vue'

interface Props {
  duration?: number;
  delay?: number;
  blur?: string;
  yOffset?: number;
  class?: string;
}

const props = withDefaults(defineProps<Props>(), {
  duration: 1,
  delay: 2,
  blur: '20px',
  yOffset: 20,
})

const slots = useSlots()
const reducedMotion = usePreferredReducedMotion()

const shouldReduceMotion = computed(() => reducedMotion.value === 'reduce')

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const children = ref<any>([])

// Filter out text nodes and comments, flatten fragments
function getElementChildren(vnodes: VNode[]): VNode[] {
  const result: VNode[] = []
  for (const vnode of vnodes) {
    if (vnode.type === Text || vnode.type === Comment) continue
    if (vnode.type === Fragment && Array.isArray(vnode.children)) {
      result.push(...getElementChildren(vnode.children as VNode[]))
    } else {
      result.push(vnode)
    }
  }
  return result
}

onMounted(() => {
  watchEffect(() => {
    const rawChildren = slots.default ? slots.default() : []
    children.value = getElementChildren(rawChildren)
  })
})

function getInitial() {
  // If reduced motion, start visible to avoid flash
  if (shouldReduceMotion.value) {
    return {
      opacity: 1,
      filter: 'blur(0px)',
      y: 0,
    }
  }
  return {
    opacity: 0,
    filter: `blur(${props.blur})`,
    y: props.yOffset,
  }
}

function getAnimate() {
  return {
    opacity: 1,
    filter: 'blur(0px)',
    y: 0,
  }
}

function getTransition(index: number) {
  // If reduced motion, use instant transition
  if (shouldReduceMotion.value) {
    return {
      duration: 0,
      delay: 0,
    }
  }
  return {
    duration: props.duration,
    easing: 'easeInOut',
    delay: props.delay * index,
  }
}
</script>
