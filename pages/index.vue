<script setup lang="ts">
interface Project {
  title: string;
  description: string;
  tags: string[];
  image?: string;
}

interface Testimonial {
  name: string;
  position: string;
  company: string;
  content: string;
  image?: string;
}

const projects: Project[] = [
  {
    title: 'E-commerce Platform',
    description: 'A modern e-commerce solution with real-time inventory management',
    tags: ['NuxtJS', 'VueJS', 'AWS'],
  },
  {
    title: 'Financial Dashboard',
    description: 'Interactive dashboard for visualizing complex financial data',
    tags: ['ClojureScript', 'VueJS', 'Docker'],
  },
  {
    title: 'Content Management System',
    description: 'Custom CMS with role-based access control and workflow automation',
    tags: ['Clojure', 'NuxtJS', 'AWS'],
  }
];

const testimonials: Testimonial[] = [
  {
    name: 'Jane Smith',
    position: 'CEO',
    company: 'TechSolutions Inc.',
    content: 'Working with this developer was a game-changer for our company. They transformed our initial idea into a polished product that exceeded our expectations.',
  },
  {
    name: 'Mark Johnson',
    position: 'CTO',
    company: 'InnovateCorp',
    content: 'Exceptional communication skills combined with technical expertise. Our project was delivered on time and with outstanding quality.',
  },
  {
    name: 'Sarah Wilson',
    position: 'Product Manager',
    company: 'Nexus Systems',
    content: 'The ability to take our vague concepts and turn them into functional, beautiful web applications is truly remarkable. Highly recommended!',
  }
];

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

const scrollToElement = (elementId: string) => {
  const element = document.getElementById(elementId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
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
      <UiMeteorEffect :count="15" color="#8b5cf6" class="z-[1]" />
    </ClientOnly>

    <!-- Overlay for better text readability -->
    <div class="z-[2] absolute inset-0 bg-black/40" />

    <!-- Hero Content -->
    <div class="z-[3] flex flex-col items-center gap-4 px-4 max-w-4xl">
      <UiBlurReveal :delay="0.3" class="flex flex-col justify-center items-center gap-6">
        <!-- Main Heading -->
        <h1 class="flex flex-col justify-center items-center bg-clip-text bg-gradient-to-b from-white via-neutral-200 to-neutral-400 font-bold text-transparent text-5xl md:text-7xl text-center leading-tight">
          Building
          <UiTextHighlight class="bg-gradient-to-r from-violet-600 to-pink-600 py-2 rounded-xl">
            <UiFlipWords
              :words="['beautiful', 'stunning', 'immersive', 'scalable']"
              :duration="3000"
              class="bg-clip-text bg-gradient-to-b from-white to-neutral-200 text-transparent"
            />
          </UiTextHighlight>
          web experiences
        </h1>

        <!-- Subtitle -->
        <p class="max-w-2xl text-neutral-300 text-xl md:text-2xl text-center">
          Together, let's create something extraordinary!
        </p>

        <!-- CTA Buttons -->
        <div class="flex flex-row flex-wrap justify-center items-center gap-4 mt-4">
          <NuxtLink
            to="/about"
            class="group bg-gradient-to-r from-violet-600 to-pink-600 hover:opacity-90 px-5 py-2 rounded-full font-medium text-white text-sm hover:scale-105 transition-all duration-300"
          >
            <span class="flex items-center gap-1.5">
              <UIcon name="i-heroicons-user" class="w-3.5 h-3.5" />
              About Me
            </span>
          </NuxtLink>

          <UiGlowBorder
            :border-radius="9999"
            :color="['#8b5cf6', '#ec4899']"
            :border-width="2"
            :duration="15"
            class="!bg-transparent !p-0 !min-w-fit !min-h-fit hover:scale-105 transition-transform duration-300"
          >
            <NuxtLink
              to="/contact"
              class="flex items-center gap-2 bg-neutral-900/80 px-8 py-3 rounded-full font-semibold text-white"
            >
              Get in Touch
              <UIcon name="i-heroicons-arrow-right" class="w-4 h-4" />
            </NuxtLink>
          </UiGlowBorder>
        </div>

        <!-- Safari Mockup with Border Beam -->
        <ClientOnly>
          <div class="relative mt-8 w-full max-w-2xl">
            <UiCard3D :rotation-factor="8" :show-glare="true" :glare-opacity="0.2">
              <div class="relative bg-neutral-900/80 backdrop-blur-xl p-1 border border-neutral-700/50 rounded-xl">
                <UiSafariMockup url="inspira-ui.com" src="/images/inspira-ss.png" class="w-full" />
                <UiBorderBeam :size="300" :duration="10" :delay="0" :border-width="2" color-from="#8b5cf6" color-to="#ec4899" />
              </div>
            </UiCard3D>
          </div>
        </ClientOnly>
      </UiBlurReveal>
    </div>

    <!-- Scroll Indicator -->
    <div class="bottom-8 z-[3] absolute animate-bounce">
      <UiShimmerButton
        class="!px-4 !py-2 !rounded-full"
        @click="() => scrollToElement('services')"
      >
        <UIcon name="i-heroicons-chevron-down" class="w-5 h-5" />
      </UiShimmerButton>
    </div>
  </section>

  <!-- Services Section -->
  <section id="services" class="relative py-24 overflow-hidden">
    <div class="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />

    <div class="z-10 relative mx-auto px-4 container">
      <UiBlurReveal :delay="0.3">
        <div class="mb-16 text-center">
          <h2 class="mb-4 font-bold text-4xl md:text-5xl">
            <span class="bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-500 text-transparent">
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
          <UiCardSpotlight
            class="h-full min-h-[220px]"
            spotlight-color="rgba(16, 185, 129, 0.15)"
            :spotlight-size="350"
          >
            <div class="flex flex-col p-4 h-full">
              <div class="bg-gradient-to-br from-emerald-500/20 to-blue-500/20 mb-4 p-4 rounded-xl w-fit">
                <UIcon :name="service.icon" class="w-8 h-8 text-emerald-400" />
              </div>
              <h3 class="mb-3 font-semibold text-white text-xl">{{ service.title }}</h3>
              <p class="flex-grow text-neutral-400">{{ service.description }}</p>
            </div>
          </UiCardSpotlight>
        </UiBlurReveal>
      </div>
    </div>
  </section>

  <!-- Tech Stack Section with Marquee -->
  <section class="relative py-24 overflow-hidden">
    <div class="absolute inset-0 bg-gradient-to-b from-background/95 via-neutral-900/50 to-background" />

    <div class="z-10 relative mx-auto px-4 container">
      <UiBlurReveal :delay="0.3">
        <div class="mb-16 text-center">
          <h2 class="mb-4 font-bold text-4xl md:text-5xl">
            <span class="bg-clip-text bg-gradient-to-r from-pink-500 to-violet-500 text-transparent">
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
        <div
          v-for="(tech, index) in [...techStack, ...techStack]"
          :key="index"
          class="mx-6"
        >
          <UiGlareCard
            class="group"
            :glare-opacity="0.3"
            glare-color="rgba(139, 92, 246, 0.4)"
          >
            <div class="flex flex-col items-center bg-neutral-900/80 p-6 border border-neutral-700/50 hover:border-violet-500/50 rounded-xl transition-colors duration-300">
              <div class="flex justify-center items-center mb-3 w-16 h-16">
                <UIcon :name="tech.icon" class="w-12 h-12 group-hover:scale-110 transition-transform duration-300" />
              </div>
              <span class="font-medium text-neutral-300 text-sm">{{ tech.name }}</span>
            </div>
          </UiGlareCard>
        </div>
      </UiMarquee>

      <UiMarquee :duration="30" reverse pause-on-hover class="py-8">
        <div
          v-for="(tech, index) in [...techStack, ...techStack].reverse()"
          :key="index"
          class="mx-6"
        >
          <UiGlareCard
            class="group"
            :glare-opacity="0.3"
            glare-color="rgba(236, 72, 153, 0.4)"
          >
            <div class="flex flex-col items-center bg-neutral-900/80 p-6 border border-neutral-700/50 hover:border-pink-500/50 rounded-xl transition-colors duration-300">
              <div class="flex justify-center items-center mb-3 w-16 h-16">
                <UIcon :name="tech.icon" class="w-12 h-12 group-hover:scale-110 transition-transform duration-300" />
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
    <div class="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />

    <div class="z-10 relative mx-auto px-4 container">
      <UiBlurReveal :delay="0.3">
        <div class="mb-16 text-center">
          <h2 class="mb-4 font-bold text-4xl md:text-5xl">
            <span class="bg-clip-text bg-gradient-to-r from-amber-500 to-red-500 text-transparent">
              Featured Projects
            </span>
          </h2>
          <p class="mx-auto max-w-2xl text-neutral-400 text-lg">
            A selection of my recent work that demonstrates my skills and experience
          </p>
        </div>
      </UiBlurReveal>

      <div class="gap-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <UiBlurReveal v-for="(project, index) in projects" :key="index" :delay="0.3 + index * 0.15">
          <UiCard3D :rotation-factor="10" :show-glare="true" :glare-opacity="0.15" class="h-full">
            <div class="group bg-neutral-900/80 backdrop-blur-sm border border-neutral-700/50 rounded-xl h-full overflow-hidden">
              <!-- Project Image Placeholder -->
              <div class="relative h-52 overflow-hidden">
                <div class="absolute inset-0 bg-gradient-to-br from-amber-500/20 via-red-500/20 to-orange-500/20" />
                <div class="absolute inset-0 flex justify-center items-center">
                  <UIcon name="i-heroicons-photo" class="w-16 h-16 text-white/20 group-hover:scale-110 transition-transform duration-300" />
                </div>
                <!-- Glow effect on hover -->
                <div class="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-transparent" />
              </div>

              <div class="p-6">
                <h3 class="mb-3 font-semibold text-white group-hover:text-amber-400 text-xl transition-colors">
                  {{ project.title }}
                </h3>
                <p class="mb-4 text-neutral-400">{{ project.description }}</p>
                <div class="flex flex-wrap gap-2">
                  <span
                    v-for="tag in project.tags"
                    :key="tag"
                    class="bg-gradient-to-r from-amber-500/10 to-red-500/10 px-3 py-1 border border-amber-500/20 rounded-full font-medium text-amber-400 text-xs"
                  >
                    {{ tag }}
                  </span>
                </div>
              </div>
            </div>
          </UiCard3D>
        </UiBlurReveal>
      </div>

      <div class="flex justify-center mt-12">
        <UiGradientButton
          as="NuxtLink"
          to="/projects"
          variant="outline"
          from-color="#f59e0b"
          via-color="#ef4444"
          to-color="#f59e0b"
        >
          <span class="flex items-center gap-2">
            View All Projects
            <UIcon name="i-heroicons-arrow-right" class="w-4 h-4" />
          </span>
        </UiGradientButton>
      </div>
    </div>
  </section>

  <!-- Testimonials Section -->
  <section class="relative py-24 overflow-hidden">
    <div class="absolute inset-0 bg-gradient-to-b from-background/95 via-neutral-900/50 to-background" />

    <div class="z-10 relative mx-auto px-4 container">
      <UiBlurReveal :delay="0.3">
        <div class="mb-16 text-center">
          <h2 class="mb-4 font-bold text-4xl md:text-5xl">
            <span class="bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-500 text-transparent">
              Client Testimonials
            </span>
          </h2>
          <p class="mx-auto max-w-2xl text-neutral-400 text-lg">
            What clients say about working with me
          </p>
        </div>
      </UiBlurReveal>

      <ClientOnly>
        <UiAnimatedTestimonials
          :testimonials="testimonials"
          :autoplay="true"
          :autoplay-interval="5000"
          :show-navigation="true"
          class="mx-auto max-w-3xl"
        />
      </ClientOnly>
    </div>
  </section>

  <!-- Contact CTA Section -->
  <section class="relative py-24 overflow-hidden">
    <div class="absolute inset-0 bg-gradient-to-t from-background via-background/95 to-background" />

    <div class="z-10 relative mx-auto px-4 container">
      <UiBlurReveal :delay="0.3">
        <div class="relative bg-neutral-900/50 mx-auto p-8 md:p-12 border border-neutral-800 rounded-xl max-w-3xl overflow-hidden text-center">
          <UiBorderBeam :size="300" :duration="10" :border-width="1.5" color-from="#8b5cf6" color-to="#ec4899" />

          <h2 class="mb-4 font-bold text-white text-3xl md:text-4xl">
            Ready to bring your ideas to life?
          </h2>

          <p class="mx-auto mb-8 max-w-2xl text-neutral-400 text-lg">
            Let's collaborate to transform your vision into a reality. From concept to completion, I'm here to guide
            you through every step of the development process.
          </p>

          <div class="flex justify-center">
            <UiGlowBorder
              :border-radius="9999"
              :color="['#8b5cf6', '#ec4899']"
              :border-width="2"
              :duration="15"
              class="!bg-transparent !p-0 !min-w-fit !min-h-fit hover:scale-105 transition-transform duration-300"
            >
              <NuxtLink
                to="/contact"
                class="flex items-center gap-2 bg-neutral-900/80 px-8 py-3 rounded-full font-semibold text-white"
              >
                <UIcon name="i-heroicons-envelope" class="w-5 h-5" />
                Get in Touch
              </NuxtLink>
            </UiGlowBorder>
          </div>
        </div>
      </UiBlurReveal>
    </div>
  </section>
</template>

<style scoped>
/* Custom animations */
@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}
</style>
