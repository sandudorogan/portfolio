<template>
  <div :class="cn('animated-testimonials relative w-full', props.class)">
    <div class="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-20">
      <!-- Image Section -->
      <div class="relative h-80 w-full md:h-[500px]">
        <Motion
          v-for="(testimonial, index) in testimonials"
          :key="index"
          as="div"
          :initial="{ opacity: 0, scale: 0.9, rotate: randomRotation }"
          :animate="activeIndex === index
            ? { opacity: 1, scale: 1, rotate: 0, y: 0 }
            : { opacity: 0, scale: 0.9, rotate: randomRotation, y: 40 }"
          :exit="{ opacity: 0, scale: 0.9, rotate: randomRotation }"
          :transition="{
            type: 'spring',
            stiffness: 300,
            damping: 20,
            duration: 0.5
          }"
          :class="cn(
            'absolute inset-0 origin-bottom',
            activeIndex === index ? 'z-10' : 'z-0'
          )"
        >
          <img
            :src="testimonial.image"
            :alt="testimonial.name"
            class="h-full w-full rounded-3xl object-cover object-center"
            draggable="false"
          />
        </Motion>
      </div>

      <!-- Content Section -->
      <div class="flex flex-col justify-between py-4">
        <div>
          <Motion
            :key="`name-${activeIndex}`"
            as="h3"
            :initial="{ opacity: 0, y: 20, filter: 'blur(10px)' }"
            :animate="{ opacity: 1, y: 0, filter: 'blur(0px)' }"
            :transition="{ duration: 0.4, ease: 'easeOut' }"
            class="text-2xl font-bold text-text-50 md:text-4xl"
          >
            {{ activeTestimonial.name }}
          </Motion>
          <Motion
            :key="`designation-${activeIndex}`"
            as="p"
            :initial="{ opacity: 0, y: 20, filter: 'blur(10px)' }"
            :animate="{ opacity: 1, y: 0, filter: 'blur(0px)' }"
            :transition="{ duration: 0.4, delay: 0.1, ease: 'easeOut' }"
            class="mt-1 text-sm text-neutral-400 md:text-base"
          >
            {{ activeTestimonial.designation }}
          </Motion>
          <Motion
            :key="`quote-${activeIndex}`"
            as="blockquote"
            :initial="{ opacity: 0, y: 20, filter: 'blur(10px)' }"
            :animate="{ opacity: 1, y: 0, filter: 'blur(0px)' }"
            :transition="{ duration: 0.4, delay: 0.2, ease: 'easeOut' }"
            class="mt-8 text-lg text-neutral-300 md:text-xl"
          >
            "{{ activeTestimonial.quote }}"
          </Motion>
        </div>

        <!-- Navigation Buttons -->
        <div class="mt-8 flex gap-4">
          <button
            class="group flex h-10 w-10 items-center justify-center rounded-full bg-neutral-800 transition-colors hover:bg-neutral-700"
            @click="prev"
          >
            <UIcon
              name="i-heroicons-arrow-left"
              class="h-5 w-5 text-neutral-400 transition-transform group-hover:-translate-x-0.5 group-hover:text-white"
            />
          </button>
          <button
            class="group flex h-10 w-10 items-center justify-center rounded-full bg-neutral-800 transition-colors hover:bg-neutral-700"
            @click="next"
          >
            <UIcon
              name="i-heroicons-arrow-right"
              class="h-5 w-5 text-neutral-400 transition-transform group-hover:translate-x-0.5 group-hover:text-white"
            />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Motion } from 'motion-v'

interface Testimonial {
  name: string
  designation: string
  quote: string
  image: string
}

interface AnimatedTestimonialsProps {
  class?: string
  testimonials: Testimonial[]
  autoplay?: boolean
  duration?: number
}

const props = withDefaults(defineProps<AnimatedTestimonialsProps>(), {
  autoplay: false,
  duration: 5000,
})

const activeIndex = ref(0)
const randomRotation = ref(getRandomRotation())

function getRandomRotation() {
  return Math.floor(Math.random() * 13) - 6 // -6 to 6 degrees
}

const activeTestimonial = computed(() => props.testimonials[activeIndex.value])

function next() {
  randomRotation.value = getRandomRotation()
  activeIndex.value = (activeIndex.value + 1) % props.testimonials.length
}

function prev() {
  randomRotation.value = getRandomRotation()
  activeIndex.value = (activeIndex.value - 1 + props.testimonials.length) % props.testimonials.length
}

let intervalId: ReturnType<typeof setInterval> | null = null

onMounted(() => {
  if (props.autoplay) {
    intervalId = setInterval(next, props.duration)
  }
})

onUnmounted(() => {
  if (intervalId) {
    clearInterval(intervalId)
  }
})
</script>
