<template>
  <div :class="cn('timeline relative', props.class)">
    <div
      class="absolute left-4 top-0 h-full w-[2px] bg-gradient-to-b from-transparent via-primary/50 to-transparent md:left-1/2 md:-ml-[1px]"
    />
    <div class="relative space-y-12">
      <Motion
        v-for="(item, index) in items"
        :key="index"
        as="div"
        :initial="{ opacity: 0, y: 50 }"
        :in-view="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.5, delay: index * 0.1 }"
        :class="cn(
          'timeline-item relative flex items-start',
          index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
        )"
      >
        <div
          class="absolute left-4 h-4 w-4 rounded-full border-2 border-primary bg-background md:left-1/2 md:-ml-2"
        />
        <div
          :class="cn(
            'ml-12 md:ml-0 md:w-1/2',
            index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12 md:text-left'
          )"
        >
          <div
            class="rounded-lg border border-neutral-800 bg-neutral-900/50 p-6 transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10"
          >
            <span class="mb-2 inline-block rounded-full bg-primary/20 px-3 py-1 text-xs text-primary">
              {{ item.date }}
            </span>
            <h3 class="mb-2 text-lg font-semibold">{{ item.title }}</h3>
            <p v-if="item.subtitle" class="mb-2 text-sm text-primary">{{ item.subtitle }}</p>
            <p class="text-sm text-neutral-400">{{ item.description }}</p>
            <slot :name="`item-${index}`" :item="item" />
          </div>
        </div>
      </Motion>
    </div>
  </div>
</template>

<script setup lang="ts">
import {Motion} from 'motion-v'

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

