<script setup lang="ts">
import { usePreferredReducedMotion } from '@vueuse/core'

usePageSeo({
  title: 'Sandu Dorogan | Full Stack Developer',
  description: 'Full Stack Developer specializing in Clojure, ClojureScript, Vue.js, and React. Building beautiful, scalable web experiences.'
})

// OG image must be defined at page level for static generation
defineOgImage({
  component: 'Default',
  props: {
    title: 'Sandu Dorogan — Full Stack Developer',
    description: "Focused, driven and creative. Will bring your ideas to life. Tell me the what and I'll show you the how."
  }
})

interface Project {
  title: string;
  description: string;
  tags: string[];
  image: string;
  url: string;
}

interface Testimonial {
  name: string
  designation: string
  quote: string
  image: string
}

const projects: Project[] = [
  {
    title: 'IPRally - Patents Search',
    url: 'https://iprally.com',
    image: '/images/iprally.png',
    description: 'A patents search engine for IPRally. Built with Clojure and ClojureScript. Deployed on Google Cloud.',
    tags: ['Clojure', 'ClojureScript', 'Google Cloud'],
  },
  {
    title: 'Crossbeam - Partnerbase',
    url: 'https://partnerbase.com',
    image: '/images/partnerbase.png',
    description: 'A database of partners and their products. Built with NuxtJS and Clojure. Deployed on AWS.',
    tags: ['NuxtJS', 'Clojure', 'AWS'],
  },
  {
    title: 'Newsroom AI - Stories Editor',
    url: 'https://nws.ai',
    image: '/images/nws-studio.png',
    description: 'A modern stories editor for Newsroom AI. Built with ClojureScript and Django Python. Deployed on AWS.',
    tags: ['ClojureScripe', 'Django Python', 'AWS'],
  }
];

const testimonials: Testimonial[] = [
  {
    name: 'Jane Smith',
    designation: 'CEO at TechSolutions Inc.',
    quote: 'Working with this developer was a game-changer for our company. They transformed our initial idea into a polished product that exceeded our expectations.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&h=500&fit=crop',
  },
  {
    name: 'Mark Johnson',
    designation: 'CTO at InnovateCorp',
    quote: 'Exceptional communication skills combined with technical expertise. Our project was delivered on time and with outstanding quality.',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=500&h=500&fit=crop',
  },
  {
    name: 'Sarah Wilson',
    designation: 'Product Manager at Nexus Systems',
    quote: 'The ability to take our vague concepts and turn them into functional, beautiful web applications is truly remarkable. Highly recommended!',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&h=500&fit=crop',
  },
]

const techStack = [
  { name: 'JavaScript', icon: 'i-logos-javascript' },
  { name: 'TypeScript', icon: 'i-logos-typescript-icon' },
  { name: 'NuxtJS', icon: 'i-logos-nuxt-icon' },
  { name: 'VueJS', icon: 'i-logos-vue' },
  { name: 'React', icon: 'i-logos-react' },
  { name: 'Python', icon: 'i-logos-python' },
  { name: 'Clojure', icon: 'i-logos-clojure' },
  { name: 'ClojureScript', icon: 'i-logos-clojure' },
  { name: 'Docker', icon: 'i-logos-docker-icon' },
  { name: 'AWS', icon: 'i-logos-aws' },
  { name: 'LLMs', icon: 'i-logos-openai-icon' },
];

const services = [
  {
    title: 'Web Development',
    description: 'Building responsive, performant web applications using modern technologies',
    icon: 'i-heroicons-code-bracket'
  },
  {
    title: 'UX/UI Design',
    description: 'Creating intuitive user interfaces that delight users and achieve business goals',
    icon: 'i-heroicons-paint-brush'
  },
  {
    title: 'DevOps & Deployment',
    description: 'Setting up CI/CD pipelines and cloud infrastructure for seamless deployment',
    icon: 'i-heroicons-server'
  },
  {
    title: 'Technical Consultation',
    description: 'Providing expert advice on architecture, technology selection, and implementation',
    icon: 'i-heroicons-light-bulb'
  },
];

const reducedMotion = usePreferredReducedMotion();

// UA-based mobile detection (client-only)
const isMobileDevice = ref(false);
if (import.meta.client) {
  const ua = navigator.userAgent;
  // Detect mobile phones (not tablets like iPad)
  isMobileDevice.value = /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);
}

const scrollToElement = (elementId: string) => {
  const element = document.getElementById(elementId);
  if (element) {
    // Respect reduced motion preference
    const behavior = reducedMotion.value === 'reduce' ? 'instant' : 'smooth';
    element.scrollIntoView({ behavior });
    // Move focus to the section for keyboard/screen reader users
    element.setAttribute('tabindex', '-1');
    element.focus({ preventScroll: true });
  }
};
</script>

<template>
  <!-- Hero Section with Aurora Background -->
  <section class="relative flex flex-col justify-center items-center pt-48 w-full min-h-screen overflow-hidden">
    <!-- Aurora Background -->
    <UiAuroraBg class="absolute inset-0 w-full h-full" :show-radial-gradient="true" />

    <!-- Meteor Effect -->
    <ClientOnly>
      <UiMeteorEffect :count="15" color="var(--color-primary-500)" class="z-1" />
    </ClientOnly>

    <!-- Overlay for better text readability -->
    <div class="z-2 absolute inset-0 bg-black/40" />

    <!-- Hero Content -->
    <div class="z-3 flex flex-col items-center gap-4 px-4 max-w-4xl">
      <UiBlurReveal :delay="0.3" class="flex flex-col justify-center items-center gap-6">
        <!-- Main Heading -->
        <h1
          class="flex flex-col justify-center items-center bg-clip-text bg-linear-to-b from-white via-neutral-200 to-neutral-400 font-bold text-transparent text-5xl md:text-7xl text-center leading-tight">
          Building
          <UiTextHighlight class="bg-linear-to-r from-primary-500 py-2 rounded-xl to-accent-500">
            <UiFlipWords :words="['beautiful', 'stunning', 'immersive', 'scalable']" :duration="3000"
              class="bg-clip-text bg-linear-to-b from-white to-neutral-200 text-transparent" />
          </UiTextHighlight>
          web experiences
        </h1>

        <!-- Subtitle -->
        <p class="max-w-2xl text-neutral-300 text-xl md:text-2xl text-center">
          Together, let's create something extraordinary!
        </p>

        <!-- CTA Buttons -->
        <div class="flex flex-row flex-wrap justify-center items-center gap-4 mt-4">
          <NuxtLink to="/about"
            class="group bg-linear-to-r from-primary-500 hover:opacity-90 px-5 py-2 rounded-full focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900 font-medium text-white text-sm hover:scale-105 transition-all duration-300 to-accent-500">
            <span class="flex items-center gap-1.5">
              <UIcon name="i-heroicons-user" class="w-3.5 h-3.5" aria-hidden="true" />
              About Me
            </span>
          </NuxtLink>

          <UiGlowBorder :border-radius="9999" :color="['var(--color-primary-500)', 'var(--color-accent-500)']"
            :border-width="2" :duration="15"
            class="!bg-transparent !p-0 !min-w-fit !min-h-fit hover:scale-105 transition-transform duration-300">
            <NuxtLink to="/contact"
              class="flex items-center gap-2 bg-neutral-900/80 px-8 py-3 rounded-full focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-primary-500 font-semibold text-white">
              Get in Touch
              <UIcon name="i-heroicons-arrow-right" class="w-4 h-4" aria-hidden="true" />
            </NuxtLink>
          </UiGlowBorder>
        </div>

        <!-- Device Mockup with Border Beam -->
        <ClientOnly>
          <div class="relative mb-32 w-full">
            <UiCard3D :rotation-factor="8" :show-glare="false">
              <!-- iPhone mockup for mobile devices -->
              <div v-if="isMobileDevice" class="relative flex justify-center">
                <UiIPhone15ProMockup src="/images/pb-mobile.png" :width="280" :height="570" />
              </div>
              <!-- Safari mockup for desktop -->
              <div v-else class="relative">
                <UiSafariMockup url="app.iprally.com" src="/images/iprally.png" class="block w-full h-auto" />
              </div>
            </UiCard3D>
          </div>
        </ClientOnly>
      </UiBlurReveal>
    </div>

    <!-- Scroll Indicator -->
    <div class="bottom-8 z-3 absolute animate-bounce">
      <UiShimmerButton class="!px-4 !py-2 !rounded-full" aria-label="Scroll down to services section"
        @click="() => scrollToElement('services')">
        <UIcon name="i-heroicons-chevron-down" class="w-5 h-5" aria-hidden="true" />
      </UiShimmerButton>
    </div>
  </section>

  <!-- Services Section -->
  <section id="services" class="relative py-24 overflow-hidden">
    <div class="absolute inset-0 bg-linear-to-b from-background via-background/95 to-background" />

    <div class="z-10 relative mx-auto px-4 container">
      <UiBlurReveal :delay="0.3">
        <div class="mb-16 text-center">
          <h2 class="mb-4 font-bold text-4xl md:text-5xl">
            <span class="bg-clip-text bg-linear-to-r from-primary-400 text-transparent to-accent-400">
              Services
            </span>
          </h2>
          <p class="mx-auto max-w-2xl text-neutral-400 text-lg">
            From concept to deployment, I offer comprehensive web development services tailored to your specific needs
          </p>
        </div>
      </UiBlurReveal>

      <div class="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        <UiBlurReveal v-for="(service, index) in services" :key="index" :delay="0.3 + index * 0.1" class="h-full">
          <UiCardSpotlight class="h-full min-h-[220px]"
            spotlight-color="color-mix(in oklch, var(--color-accent-500) 15%, transparent)" :spotlight-size="350">
            <div class="flex flex-col p-4 h-full">
              <div class="bg-linear-to-br from-primary-500/20 mb-4 p-4 rounded-xl w-fit to-accent-500/20"
                aria-hidden="true">
                <UIcon :name="service.icon" class="w-8 h-8 text-primary-400" />
              </div>
              <h3 class="mb-3 font-semibold text-white text-xl">{{ service.title }}</h3>
              <p class="text-neutral-400 grow">{{ service.description }}</p>
            </div>
          </UiCardSpotlight>
        </UiBlurReveal>
      </div>
    </div>
  </section>

  <!-- Tech Stack Section with Marquee -->
  <section class="relative py-24 overflow-hidden">
    <div class="absolute inset-0 bg-linear-to-b from-background/95 via-neutral-900/50 to-background" />

    <div class="z-10 relative mx-auto px-4 container">
      <UiBlurReveal :delay="0.3">
        <div class="mb-16 text-center">
          <h2 class="mb-4 font-bold text-4xl md:text-5xl">
            <span class="bg-clip-text bg-linear-to-r from-primary-400 text-transparent to-accent-400">
              Tech Stack
            </span>
          </h2>
          <p class="mx-auto max-w-2xl text-neutral-400 text-lg">
            Modern technologies I specialize in to build powerful, scalable web applications
          </p>
        </div>
      </UiBlurReveal>

      <!-- Marquee for tech icons -->
      <UiMarquee :duration="25" pause-on-hover class="py-8">
        <div v-for="(tech, index) in [...techStack, ...techStack]" :key="index" class="mx-6">
          <UiGlareCard class="group" :glare-opacity="0.3"
            glare-color="color-mix(in oklch, var(--color-primary-500) 40%, transparent)">
            <div
              class="flex flex-col items-center bg-neutral-900/80 p-6 border border-neutral-700/50 hover:border-primary-500/50 rounded-xl transition-colors duration-300">
              <div class="flex justify-center items-center mb-3 w-24 h-24" aria-hidden="true">
                <UIcon :name="tech.icon" class="w-16 h-16 group-hover:scale-110 transition-transform duration-300" />
              </div>
              <span class="font-medium text-neutral-300 text-sm">{{ tech.name }}</span>
            </div>
          </UiGlareCard>
        </div>
      </UiMarquee>

      <UiMarquee :duration="30" reverse pause-on-hover class="py-8">
        <div v-for="(tech, index) in [...techStack, ...techStack].reverse()" :key="index" class="mx-6">
          <UiGlareCard class="group" :glare-opacity="0.3"
            glare-color="color-mix(in oklch, var(--color-accent-500) 40%, transparent)">
            <div
              class="flex flex-col items-center bg-neutral-900/80 p-6 border border-neutral-700/50 hover:border-accent-500/50 rounded-xl transition-colors duration-300">
              <div class="flex justify-center items-center mb-3 w-24 h-24" aria-hidden="true">
                <UIcon :name="tech.icon" class="w-16 h-16 group-hover:scale-110 transition-transform duration-300" />
              </div>
              <span class="font-medium text-neutral-300 text-sm">{{ tech.name }}</span>
            </div>
          </UiGlareCard>
        </div>
      </UiMarquee>
    </div>
  </section>

  <!-- Projects Section -->
  <section class="relative py-24 overflow-hidden">
    <div class="absolute inset-0 bg-linear-to-b from-background via-background/95 to-background" />

    <div class="z-10 relative mx-auto px-4 container">
      <UiBlurReveal :delay="0.3">
        <div class="mb-16 text-center">
          <h2 class="mb-4 font-bold text-4xl md:text-5xl">
            <span class="bg-clip-text bg-linear-to-r from-primary-400 text-transparent to-accent-400">
              Featured Projects
            </span>
          </h2>
          <p class="mx-auto max-w-2xl text-neutral-400 text-lg">
            A selection of my recent work that demonstrates my skills and experience
          </p>
        </div>
      </UiBlurReveal>

      <div class="gap-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <UiBlurReveal v-for="(project, index) in projects" :key="index" :delay="0.3 + index * 0.15" class="h-full">
          <NuxtLink :to="project.url" target="_blank" external>
            <UiCard3D :rotation-factor="10" :show-glare="false" class="group">
              <div
                class="flex flex-col bg-neutral-900/80 backdrop-blur-xs border border-neutral-700/50 rounded-xl h-full overflow-hidden">
                <!-- Project Image Placeholder -->
                <div class="relative h-52 overflow-hidden shrink-0">
                  <div
                    class="absolute inset-0 bg-linear-to-br from-primary-500/20 to-secondary-500/20 via-accent-500/20" />
                  <div class="absolute inset-0 flex justify-center items-center">
                    <img :src="project.image" alt="Project Image"
                      class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <!-- Glow effect on hover -->
                  <div class="absolute inset-0 bg-linear-to-t from-neutral-900 via-transparent to-transparent" />
                </div>

                <div class="flex flex-col p-6 grow">
                  <h3 class="mb-3 font-semibold text-white group-hover:text-primary-400 text-xl transition-colors">
                    {{ project.title }}
                  </h3>
                  <p class="mb-4 text-neutral-400 grow">{{ project.description }}</p>
                  <div class="flex flex-wrap gap-2">
                    <span v-for="tag in project.tags" :key="tag"
                      class="bg-linear-to-r from-secondary-500/10 to-secondary-400/10 px-3 py-1 border border-secondary-500/20 rounded-full font-medium text-secondary-400 text-xs">
                      {{ tag }}
                    </span>
                  </div>
                </div>
              </div>
            </UiCard3D>
          </NuxtLink>
        </UiBlurReveal>
      </div>

      <div class="flex justify-center mt-12">
        <UiGradientButton as="NuxtLink" to="/about#work-experience" variant="outline"
          from-color="var(--color-primary-500)" via-color="var(--color-accent-500)" to-color="var(--color-primary-500)">
          <span class="flex items-center gap-2">
            View All Projects
            <UIcon name="i-heroicons-arrow-right" class="w-4 h-4" aria-hidden="true" />
          </span>
        </UiGradientButton>
      </div>
    </div>
  </section>

  <!-- Testimonials Section -->
  <section class="hidden relative py-24 overflow-hidden">
    <div class="absolute inset-0 bg-linear-to-b from-background/95 via-neutral-900/50 to-background" />

    <div class="z-10 relative mx-auto px-4 container">
      <UiBlurReveal :delay="0.3">
        <div class="mb-16 text-center">
          <h2 class="mb-4 font-bold text-4xl md:text-5xl">
            <span class="bg-clip-text bg-linear-to-r from-primary-400 text-transparent to-accent-400">
              Client Testimonials
            </span>
          </h2>
          <p class="mx-auto max-w-2xl text-neutral-400 text-lg">
            What clients say about working with me
          </p>
        </div>
      </UiBlurReveal>

      <ClientOnly>
        <UiAnimatedTestimonials :testimonials="testimonials" :autoplay="true" :duration="5000"
          class="mx-auto max-w-5xl" />
      </ClientOnly>
    </div>
  </section>

  <!-- Contact CTA Section -->
  <section class="relative py-24 overflow-hidden">
    <div class="absolute inset-0 bg-linear-to-t from-background via-background/95 to-background" />

    <div class="z-10 relative mx-auto px-4 container">
      <UiBlurReveal :delay="0.3">
        <AppContactCta title="Ready to bring your ideas to life?"
          description="Let's collaborate to transform your vision into a reality. From concept to completion, I'm here to guide you through every step of the development process."
          button-label="Get in Touch" />
      </UiBlurReveal>
    </div>
  </section>
</template>

<style scoped>
/* Custom animations */
@keyframes float {

  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-10px);
  }
}
</style>
