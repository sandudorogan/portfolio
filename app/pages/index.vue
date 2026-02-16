<script setup lang="ts">
import { usePreferredReducedMotion } from '@vueuse/core'

const { t, tm, rt, locale } = useI18n()
const localePath = useLocalePath()

usePageSeo({
  title: () => t('home.seo.title'),
  description: () => t('home.seo.description')
})

// OG image must be defined at page level for static generation
defineOgImage({
  component: 'Default',
  props: {
    title: t('home.og.title'),
    description: t('home.og.description')
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

const projectMeta = [
  { url: 'https://iprally.com', image: '/images/iprally.png', tags: ['Clojure', 'ClojureScript', 'Google Cloud'] },
  { url: 'https://partnerbase.com', image: '/images/partnerbase.png', tags: ['NuxtJS', 'Clojure', 'AWS'] },
  { url: 'https://nws.ai', image: '/images/nws-studio.png', tags: ['ClojureScripe', 'Django Python', 'AWS'] },
];

const projects = computed<Project[]>(() => {
  const items = tm('home.projects.items') as Array<{ title: string; description: string }>;
  return items.map((item, i) => ({
    title: rt(item.title),
    description: rt(item.description),
    ...projectMeta[i],
  }));
});

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

const serviceIcons = [
  'i-heroicons-code-bracket',
  'i-heroicons-paint-brush',
  'i-heroicons-server',
  'i-heroicons-light-bulb',
];

const services = computed(() => {
  const items = tm('home.services.items') as Array<{ title: string; description: string }>;
  return items.map((item, i) => ({
    title: rt(item.title),
    description: rt(item.description),
    icon: serviceIcons[i],
  }));
});

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
  <section
    class="relative flex flex-col justify-center items-center pt-24 md:pt-48 w-full min-h-screen overflow-hidden">
    <!-- Aurora Background -->
    <UiAuroraBg class="absolute inset-0 w-full h-full" :show-radial-gradient="true" />

    <!-- Meteor Effect -->
    <ClientOnly>
      <UiMeteorEffect :count="15" color="var(--color-primary-500)" class="z-1" />
    </ClientOnly>

    <!-- Overlay for better text readability -->
    <div class="z-2 absolute inset-0 bg-white/40 dark:bg-black/40" />

    <!-- Hero Content -->
    <div class="z-3 flex flex-col items-center gap-4 px-4 max-w-4xl">
      <UiBlurReveal :delay="0.3" class="flex flex-col justify-center items-center gap-16 md:gap-6">
        <!-- Main Heading -->
        <h1
          class="flex flex-col justify-center items-center bg-clip-text bg-linear-to-b from-text-950 via-text-800 to-text-500 dark:from-white dark:via-neutral-200 dark:to-neutral-400 font-bold text-transparent text-5xl md:text-7xl text-center leading-tight">
          {{ $t('home.hero.building') }}
          <UiTextHighlight class="bg-linear-to-r from-primary-500 py-2 rounded-xl to-accent-500">
            <UiFlipWords :key="locale" :words="(tm('home.hero.flipWords') as string[]).map(rt)" :duration="3000"
              class="text-white" />
          </UiTextHighlight>
          {{ $t('home.hero.webExperiences') }}
        </h1>

        <!-- Subtitle -->
        <p class="max-w-2xl text-muted text-xl md:text-2xl text-center">
          {{ $t('home.hero.subtitle') }}
        </p>

        <!-- CTA Buttons -->
        <div class="flex flex-row flex-wrap justify-center items-center gap-4 mt-4">
          <NuxtLink :to="localePath('/about')"
            class="group bg-linear-to-r from-primary-500 hover:opacity-90 px-5 py-2 rounded-full focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--ui-bg)] font-medium text-white text-sm hover:scale-105 transition-all duration-300 to-accent-500">
            <span class="flex items-center gap-1.5">
              <UIcon name="i-heroicons-user" class="w-3.5 h-3.5" aria-hidden="true" />
              {{ $t('home.hero.aboutMe') }}
            </span>
          </NuxtLink>

          <UiGlowBorder :border-radius="9999" :color="['var(--color-primary-500)', 'var(--color-accent-500)']"
            :border-width="2" :duration="15"
            class="!bg-transparent !p-0 !min-w-fit !min-h-fit hover:scale-105 transition-transform duration-300">
            <NuxtLink :to="localePath('/contact')"
              class="flex items-center gap-2 bg-default/80 px-8 py-3 rounded-full focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-primary-500 font-semibold text-highlighted">
              {{ $t('home.hero.getInTouch') }}
              <UIcon name="i-heroicons-arrow-right" class="w-4 h-4" aria-hidden="true" />
            </NuxtLink>
          </UiGlowBorder>
        </div>

        <!-- Device Mockup with Border Beam -->
        <ClientOnly>
          <div class="relative mt-16 md:mb-32 w-full">
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
    <div class="hidden md:block bottom-8 z-3 absolute animate-bounce">
      <UiShimmerButton class="!px-4 !py-2 !rounded-full" :aria-label="$t('home.hero.scrollDown')"
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
              {{ $t('home.services.title') }}
            </span>
          </h2>
          <p class="mx-auto max-w-2xl text-dimmed text-lg">
            {{ $t('home.services.subtitle') }}
          </p>
        </div>
      </UiBlurReveal>

      <div class="flex flex-col justify-center items-center gap-6 md:grid md:grid-cols-2 lg:grid-cols-4">
        <UiBlurReveal v-for="(service, index) in services" :key="index" :delay="0.3 + index * 0.1"
          class="w-full md:max-w-none max-w-md h-full">
          <UiCardSpotlight class="h-full min-h-[220px]"
            spotlight-color="color-mix(in oklch, var(--color-accent-500) 15%, transparent)" :spotlight-size="350">
            <div class="flex flex-col items-center p-4 h-full text-center">
              <div class="bg-linear-to-br from-primary-500/20 mb-4 p-4 rounded-xl to-accent-500/20" aria-hidden="true">
                <UIcon :name="service.icon" class="w-8 h-8 text-primary-400" />
              </div>
              <h3 class="mb-3 font-semibold text-highlighted text-xl">{{ service.title }}</h3>
              <p class="text-dimmed grow">{{ service.description }}</p>
            </div>
          </UiCardSpotlight>
        </UiBlurReveal>
      </div>
    </div>
  </section>

  <!-- Tech Stack Section with Marquee -->
  <section class="relative py-24 overflow-hidden">
    <div class="absolute inset-0 bg-linear-to-b from-background/95 via-background-200/50 dark:via-neutral-900/50 to-background" />

    <div class="z-10 relative mx-auto px-4 container">
      <UiBlurReveal :delay="0.3">
        <div class="mb-16 text-center">
          <h2 class="mb-4 font-bold text-4xl md:text-5xl">
            <span class="bg-clip-text bg-linear-to-r from-primary-400 text-transparent to-accent-400">
              {{ $t('home.techStack.title') }}
            </span>
          </h2>
          <p class="mx-auto max-w-2xl text-dimmed text-lg">
            {{ $t('home.techStack.subtitle') }}
          </p>
        </div>
      </UiBlurReveal>

      <!-- Marquee for tech icons -->
      <UiMarquee :duration="25" pause-on-hover class="py-8">
        <div v-for="(tech, index) in [...techStack, ...techStack]" :key="index" class="mx-6">
          <UiGlareCard class="group" :glare-opacity="0.3"
            glare-color="color-mix(in oklch, var(--color-primary-500) 40%, transparent)">
            <div
              class="flex flex-col items-center bg-elevated/80 p-6 border border-muted hover:border-primary-500/50 rounded-xl transition-colors duration-300">
              <div class="flex justify-center items-center mb-3 w-24 h-24" aria-hidden="true">
                <UIcon :name="tech.icon" class="group-hover:scale-110 transition-transform duration-300" :size="24" />
              </div>
              <span class="font-medium text-muted text-sm">{{ tech.name }}</span>
            </div>
          </UiGlareCard>
        </div>
      </UiMarquee>

      <UiMarquee :duration="30" reverse pause-on-hover class="py-8">
        <div v-for="(tech, index) in [...techStack, ...techStack].reverse()" :key="index" class="mx-6">
          <UiGlareCard class="group" :glare-opacity="0.3"
            glare-color="color-mix(in oklch, var(--color-accent-500) 40%, transparent)">
            <div
              class="flex flex-col items-center bg-elevated/80 p-6 border border-muted hover:border-accent-500/50 rounded-xl transition-colors duration-300">
              <div class="flex justify-center items-center mb-3 w-24 h-24" aria-hidden="true">
                <UIcon :name="tech.icon" class="group-hover:scale-110 transition-transform duration-300" :size="24" />
              </div>
              <span class="font-medium text-muted text-sm">{{ tech.name }}</span>
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
              {{ $t('home.projects.title') }}
            </span>
          </h2>
          <p class="mx-auto max-w-2xl text-dimmed text-lg">
            {{ $t('home.projects.subtitle') }}
          </p>
        </div>
      </UiBlurReveal>

      <div class="gap-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <UiBlurReveal v-for="(project, index) in projects" :key="index" :delay="0.3 + index * 0.15" class="h-full">
          <NuxtLink :to="project.url" target="_blank" external>
            <UiCard3D :rotation-factor="10" :show-glare="false" class="group">
              <div
                class="flex flex-col bg-elevated/80 backdrop-blur-xs border border-muted rounded-xl h-full overflow-hidden">
                <!-- Project Image Placeholder -->
                <div class="relative h-52 overflow-hidden shrink-0">
                  <div
                    class="absolute inset-0 bg-linear-to-br from-primary-500/20 to-secondary-500/20 via-accent-500/20" />
                  <div class="absolute inset-0 flex justify-center items-center">
                    <img :src="project.image" alt="Project Image"
                      class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <!-- Glow effect on hover -->
                  <div class="absolute inset-0 bg-linear-to-t from-white dark:from-neutral-900 via-transparent to-transparent" />
                </div>

                <div class="flex flex-col p-6 grow">
                  <h3 class="mb-3 font-semibold text-highlighted group-hover:text-primary-400 text-xl transition-colors">
                    {{ project.title }}
                  </h3>
                  <p class="mb-4 text-dimmed grow">{{ project.description }}</p>
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
        <UiGradientButton as="NuxtLink" :to="localePath('/about') + '#work-experience'" variant="outline"
          from-color="var(--color-primary-500)" via-color="var(--color-accent-500)" to-color="var(--color-primary-500)">
          <span class="flex items-center gap-2">
            {{ $t('home.projects.viewAll') }}
            <UIcon name="i-heroicons-arrow-right" class="w-4 h-4" aria-hidden="true" />
          </span>
        </UiGradientButton>
      </div>
    </div>
  </section>

  <!-- Testimonials Section -->
  <section class="hidden relative py-24 overflow-hidden">
    <div class="absolute inset-0 bg-linear-to-b from-background/95 via-background-200/50 dark:via-neutral-900/50 to-background" />

    <div class="z-10 relative mx-auto px-4 container">
      <UiBlurReveal :delay="0.3">
        <div class="mb-16 text-center">
          <h2 class="mb-4 font-bold text-4xl md:text-5xl">
            <span class="bg-clip-text bg-linear-to-r from-primary-400 text-transparent to-accent-400">
              {{ $t('home.testimonials.title') }}
            </span>
          </h2>
          <p class="mx-auto max-w-2xl text-dimmed text-lg">
            {{ $t('home.testimonials.subtitle') }}
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
        <AppContactCta :title="$t('home.cta.title')"
          :description="$t('home.cta.description')"
          :button-label="$t('home.cta.button')"
          :to="localePath('/contact')" />
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
