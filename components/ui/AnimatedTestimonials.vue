<template>
  <div :class="cn('animated-testimonials relative w-full', props.class)">
    <div class="gap-12 md:gap-20 grid grid-cols-1 md:grid-cols-2">
      <!-- Image Section -->
      <div class="relative w-full h-80 md:h-[500px]">
        <Motion
          v-for="(testimonial, index) in testimonials"
          :key="index"
          as="div"
          :initial="imageInitial"
          :animate="activeIndex === index
            ? imageAnimateActive
            : imageAnimateInactive"
          :exit="imageInitial"
          :transition="imageTransition"
          :class="cn(
            'absolute inset-0 origin-bottom',
            activeIndex === index ? 'z-10' : 'z-0'
          )"
        >
          <img
            :src="testimonial.image"
            :alt="testimonial.name"
            class="rounded-3xl w-full h-full object-center object-cover"
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
            :initial="textInitial"
            :animate="textAnimate"
            :transition="textTransition(0)"
            class="font-bold text-text-50 text-2xl md:text-4xl"
          >
            {{ activeTestimonial.name }}
          </Motion>
          <Motion
            :key="`designation-${activeIndex}`"
            as="p"
            :initial="textInitial"
            :animate="textAnimate"
            :transition="textTransition(0.1)"
            class="mt-1 text-neutral-400 text-sm md:text-base"
          >
            {{ activeTestimonial.designation }}
          </Motion>
          <Motion
            :key="`quote-${activeIndex}`"
            as="blockquote"
            :initial="textInitial"
            :animate="textAnimate"
            :transition="textTransition(0.2)"
            class="mt-8 text-neutral-300 text-lg md:text-xl"
          >
            "{{ activeTestimonial.quote }}"
          </Motion>
        </div>

        <!-- Navigation Buttons -->
        <div class="flex gap-4 mt-8" role="group" aria-label="Testimonial navigation">
          <button
            type="button"
            aria-label="Previous testimonial"
            class="group flex justify-center items-center bg-neutral-800 hover:bg-neutral-700 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 w-10 h-10 transition-colors"
            @click="prev"
          >
            <UIcon
              name="i-heroicons-arrow-left"
              class="w-5 h-5 text-neutral-400 group-hover:text-white transition-transform group-hover:-translate-x-0.5"
              aria-hidden="true"
            />
          </button>
          <button
            type="button"
            aria-label="Next testimonial"
            class="group flex justify-center items-center bg-neutral-800 hover:bg-neutral-700 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 w-10 h-10 transition-colors"
            @click="next"
          >
            <UIcon
              name="i-heroicons-arrow-right"
              class="w-5 h-5 text-neutral-400 group-hover:text-white transition-transform group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Motion } from 'motion-v'
import { usePreferredReducedMotion } from '@vueuse/core'

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

const reducedMotion = usePreferredReducedMotion()
const shouldReduceMotion = computed(() => reducedMotion.value === 'reduce')

const activeIndex = ref(0)
const randomRotation = ref(getRandomRotation())

function getRandomRotation() {
  return shouldReduceMotion.value ? 0 : Math.floor(Math.random() * 13) - 6
}

const activeTestimonial = computed(() => props.testimonials[activeIndex.value])

// Animation states for images
const imageInitial = computed(() => shouldReduceMotion.value
  ? { opacity: 0 }
  : { opacity: 0, scale: 0.9, rotate: randomRotation.value }
)

const imageAnimateActive = computed(() => shouldReduceMotion.value
  ? { opacity: 1 }
  : { opacity: 1, scale: 1, rotate: 0, y: 0 }
)

const imageAnimateInactive = computed(() => shouldReduceMotion.value
  ? { opacity: 0 }
  : { opacity: 0, scale: 0.9, rotate: randomRotation.value, y: 40 }
)

const imageTransition = computed(() => shouldReduceMotion.value
  ? { duration: 0.01 }
  : { type: 'spring', stiffness: 300, damping: 20, duration: 0.5 }
)

// Animation states for text
const textInitial = computed(() => shouldReduceMotion.value
  ? { opacity: 1 }
  : { opacity: 0, y: 20, filter: 'blur(10px)' }
)

const textAnimate = computed(() => shouldReduceMotion.value
  ? { opacity: 1 }
  : { opacity: 1, y: 0, filter: 'blur(0px)' }
)

function textTransition(delay: number) {
  return shouldReduceMotion.value
    ? { duration: 0.01 }
    : { duration: 0.4, delay, ease: 'easeOut' }
}

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
  // Don't autoplay if user prefers reduced motion
  if (props.autoplay && !shouldReduceMotion.value) {
    intervalId = setInterval(next, props.duration)
  }
})

// Watch for reduced motion changes to stop autoplay
watch(shouldReduceMotion, (newValue) => {
  if (newValue && intervalId) {
    clearInterval(intervalId)
    intervalId = null
  } else if (!newValue && props.autoplay && !intervalId) {
    intervalId = setInterval(next, props.duration)
  }
})

onUnmounted(() => {
  if (intervalId) {
    clearInterval(intervalId)
  }
})
</script>
