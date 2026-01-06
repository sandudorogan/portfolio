<template>
  <div :class="cn('animated-testimonials relative overflow-hidden', props.class)">
    <div class="relative">
      <Motion
        v-for="(testimonial, index) in testimonials"
        :key="index"
        as="div"
        :initial="{ opacity: 0, scale: 0.9, y: 20 }"
        :animate="activeIndex === index ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.9, y: 20 }"
        :transition="{ duration: 0.5, ease: 'easeOut' }"
        :class="cn(
          'absolute inset-0 transition-all duration-500',
          activeIndex === index ? 'relative z-10' : 'pointer-events-none'
        )"
      >
        <div class="flex flex-col items-center text-center">
          <div class="relative mb-6">
            <div
              class="h-20 w-20 overflow-hidden rounded-full border-2 border-primary/50 bg-gradient-to-br from-primary/20 to-secondary/20"
            >
              <img
                v-if="testimonial.image"
                :src="testimonial.image"
                :alt="testimonial.name"
                class="h-full w-full object-cover"
              />
              <div v-else class="flex h-full w-full items-center justify-center">
                <UIcon name="i-heroicons-user" class="h-10 w-10 text-primary/50" />
              </div>
            </div>
            <div class="absolute -bottom-2 -right-2 rounded-full bg-primary p-1">
              <UIcon name="i-heroicons-chat-bubble-left-right" class="h-4 w-4 text-white" />
            </div>
          </div>
          <blockquote class="relative mb-6 max-w-2xl">
            <UIcon
              name="i-heroicons-quote"
              class="absolute -left-4 -top-4 h-8 w-8 text-primary/20"
            />
            <p class="text-lg italic text-neutral-300">
              "{{ testimonial.content }}"
            </p>
          </blockquote>
          <div>
            <h4 class="text-lg font-semibold">{{ testimonial.name }}</h4>
            <p class="text-sm text-neutral-400">
              {{ testimonial.position }}<span v-if="testimonial.company">, {{ testimonial.company }}</span>
            </p>
          </div>
        </div>
      </Motion>
    </div>

    <div v-if="showNavigation" class="mt-8 flex items-center justify-center gap-2">
      <button
        v-for="(_, index) in testimonials"
        :key="index"
        :class="cn(
          'h-2 w-2 rounded-full transition-all duration-300',
          activeIndex === index ? 'w-8 bg-primary' : 'bg-neutral-600 hover:bg-neutral-500'
        )"
        @click="activeIndex = index"
      />
    </div>

    <div v-if="showArrows" class="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-4">
      <button
        class="rounded-full bg-neutral-800/50 p-2 transition-colors hover:bg-neutral-700/50"
        @click="prev"
      >
        <UIcon name="i-heroicons-chevron-left" class="h-5 w-5" />
      </button>
      <button
        class="rounded-full bg-neutral-800/50 p-2 transition-colors hover:bg-neutral-700/50"
        @click="next"
      >
        <UIcon name="i-heroicons-chevron-right" class="h-5 w-5" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import {Motion} from 'motion-v'

interface Testimonial {
  name: string;
  position: string;
  company?: string;
  content: string;
  image?: string;
}

interface AnimatedTestimonialsProps {
  class?: string;
  testimonials: Testimonial[];
  autoplay?: boolean;
  autoplayInterval?: number;
  showNavigation?: boolean;
  showArrows?: boolean;
}

const props = withDefaults(defineProps<AnimatedTestimonialsProps>(), {
  autoplay: true,
  autoplayInterval: 5000,
  showNavigation: true,
  showArrows: false,
})

const activeIndex = ref(0)
let intervalId: ReturnType<typeof setInterval> | null = null

function next() {
  activeIndex.value = (activeIndex.value + 1) % props.testimonials.length
}

function prev() {
  activeIndex.value = (activeIndex.value - 1 + props.testimonials.length) % props.testimonials.length
}

onMounted(() => {
  if (props.autoplay) {
    intervalId = setInterval(next, props.autoplayInterval)
  }
})

onUnmounted(() => {
  if (intervalId) {
    clearInterval(intervalId)
  }
})
</script>

