<template>
  <div :class="cn('timeline relative', props.class)">
    <div
      class="top-0 left-4 md:left-1/2 absolute bg-linear-to-b from-transparent via-primary/50 to-transparent md:-ml-[1px] w-[2px] h-full" />
    <div class="relative space-y-12">
      <!-- tabindex="-1" prevents animation wrapper from being a tab stop -->
      <Motion v-for="(item, index) in items" :key="index" as="div" tabindex="-1" :initial="{ opacity: 0, y: 50 }"
        :while-in-view="{ opacity: 1, y: 0 }" :transition="{ duration: 0.5, delay: index * 0.1 }" :class="cn(
          'timeline-item relative flex items-start',
          index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
        )">
        <div class="left-4 md:left-1/2 absolute bg-background md:-ml-2 border-2 border-primary rounded-full w-4 h-4" />
        <div :class="cn(
          'ml-12 md:ml-0 md:w-1/2',
          index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12 md:text-left'
        )">
          <div
            class="bg-neutral-900/50 hover:shadow-lg hover:shadow-primary/10 p-6 border border-neutral-800 hover:border-primary/50 rounded-lg transition-all duration-300">
            <span class="inline-block bg-primary/20 mb-2 px-3 py-1 rounded-full text-primary text-xs">
              {{ item.date }}
            </span>
            <h3 class="mb-2 font-semibold text-lg">{{ item.title }}</h3>
            <p v-if="item.subtitle" class="mb-2 text-primary text-sm">{{ item.subtitle }}</p>
            <p class="text-neutral-400 text-sm">{{ item.description }}</p>
            <slot :name="`item-${index}`" :item="item" />
          </div>
        </div>
      </Motion>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Motion } from 'motion-v'

interface TimelineItem {
  date: string;
  title: string;
  subtitle?: string;
  description: string;
  [key: string]: unknown;
}

interface TimelineProps {
  class?: string;
  items: TimelineItem[];
}

const props = defineProps<TimelineProps>()
</script>
