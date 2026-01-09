<template>
  <component :is="props.as" :class="cn(
    'interactive-hover-button group relative cursor-pointer overflow-hidden rounded-full border border-neutral-700 bg-transparent px-8 py-3 text-center font-semibold uppercase tracking-wider',
    props.class
  )" v-bind="$attrs">
    <span
      class="inline-block z-10 relative group-hover:opacity-0 transition-all group-hover:translate-x-12 duration-300 ease-in-out">
      <slot />
    </span>
    <div
      class="z-20 absolute inset-0 flex justify-center items-center gap-2 opacity-0 group-hover:opacity-100 text-primary-foreground transition-all translate-x-12 group-hover:translate-x-0 duration-300 ease-in-out">
      <slot name="hover">
        <span>Let's Go</span>
        <UIcon name="i-heroicons-arrow-right" class="w-4 h-4" />
      </slot>
    </div>
    <div
      class="z-0 absolute inset-0 bg-linear-to-r from-primary to-secondary rounded-full transition-transform -translate-x-full group-hover:translate-x-0 duration-300 ease-in-out transform" />
  </component>
</template>

<script setup lang="ts">
interface InteractiveHoverButtonProps {
  as?: string | object;
  class?: string;
}

const props = withDefaults(defineProps<InteractiveHoverButtonProps>(), {
  as: 'button',
})
</script>
