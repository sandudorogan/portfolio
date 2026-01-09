<template>
  <component
    :is="props.as"
    :class="cn(
      'interactive-hover-button group relative cursor-pointer overflow-hidden rounded-full border border-neutral-700 bg-transparent px-8 py-3 text-center font-semibold uppercase tracking-wider',
      props.class
    )"
    v-bind="$attrs"
  >
    <span class="relative z-10 inline-block transition-all duration-300 ease-in-out group-hover:translate-x-12 group-hover:opacity-0">
      <slot />
    </span>
    <div class="absolute inset-0 z-20 flex translate-x-12 items-center justify-center gap-2 text-primary-foreground opacity-0 transition-all duration-300 ease-in-out group-hover:translate-x-0 group-hover:opacity-100">
      <slot name="hover">
        <span>Let's Go</span>
        <UIcon name="i-heroicons-arrow-right" class="h-4 w-4" />
      </slot>
    </div>
    <div
      class="absolute inset-0 z-0 -translate-x-full transform rounded-full bg-gradient-to-r from-primary to-secondary transition-transform duration-300 ease-in-out group-hover:translate-x-0"
    />
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

