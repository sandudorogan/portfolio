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

// Sample data for projects
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

// Sample testimonials
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

// Tech stack with icons
const techStack = [
  { name: 'NuxtJS', icon: 'i-logos-nuxt-icon' },
  { name: 'VueJS', icon: 'i-logos-vue' },
  { name: 'Clojure', icon: 'i-logos-clojure' },
  { name: 'ClojureScript', icon: 'i-logos-clojurescript' },
  { name: 'Docker', icon: 'i-logos-docker-icon' },
  { name: 'AWS', icon: 'i-logos-aws' },
];

// Services offered
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

// Function to scroll to a specific element
const scrollToElement = (elementId: string) => {
  const element = document.getElementById(elementId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};
</script>

<template>
  <!-- Hero Section -->
  <section class="relative flex flex-col items-center justify-center w-full min-h-screen">
    <UiParticlesBg class="absolute inset-0" :quantity="100" :ease="100" :color="true ? '#FFF' : '#000'" :staticity="10"
      refresh />
    <div class="absolute inset-0 z-[1] bg-black opacity-50" />
    <div class="z-[2] flex max-w-xl flex-col items-center gap-2">
      <UiBlurReveal :delay="0.5" class="flex flex-col items-center justify-center gap-4">
        <span
          class="flex flex-col items-center justify-center text-4xl font-bold text-center text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 bg-clip-text md:text-6xl">
          <span>
            Building
            <UiTextHighlight class="py-1 rounded-xl bg-gradient-to-r from-pink-500 to-violet-500 w-80"
              text-end-color="hsl(var(--accent))">
              <UiFlipWords :words="['beautiful', 'stunning', 'immersive', 'scalable']" :duration="3000"
                class="mx-auto text-transparent w-fit bg-gradient-to-b from-neutral-200 to-neutral-500 bg-clip-text" />
            </UiTextHighlight>
          </span>
          web experiences
        </span>

        <span class="text-xl text-center">
          Together, let's create something extraordinary!
        </span>

        <div class="flex flex-row items-center justify-center gap-4 my-2">
          <UButton to="/about"> About Me </UButton>
          <UButton to="/contact" variant="outline">
            Get in Touch
          </UButton>
        </div>

        <ClientOnly>
          <div
            class="relative flex flex-col items-center justify-center w-full p-px overflow-hidden border rounded-lg h-fit bg-background md:shadow-xl">
            <div class="relative p-4">
              <UiSafariMockup url="inspira-ui.com" src="/images/inspira-ss.png" class="size-full" />
            </div>
            <UiBorderBeam :size="250" :duration="12" :delay="0" :border-width="2" />
          </div>
        </ClientOnly>
      </UiBlurReveal>
    </div>

    <div class="absolute bottom-8 z-[2] animate-bounce">
      <UButton variant="ghost" icon="i-heroicons-chevron-down" class="rounded-full"
        @click="() => scrollToElement('services')" />
    </div>
  </section>

  <!-- Services Section -->
  <section id="services" class="py-20 bg-gradient-to-b from-background to-background/80">
    <div class="container px-4 mx-auto">
      <UiBlurReveal :delay="0.3">
        <h2 class="mb-4 text-3xl font-bold text-center md:text-4xl">
          <UiTextHighlight class="py-1 rounded-xl bg-gradient-to-r from-blue-500 to-emerald-500">
            Services
          </UiTextHighlight>
        </h2>
        <p class="max-w-2xl mx-auto mb-12 text-center text-neutral-300">
          From concept to deployment, I offer comprehensive web development services tailored to your specific needs
        </p>
      </UiBlurReveal>

      <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <UiBlurReveal v-for="(service, index) in services" :key="index" :delay="0.3 + index * 0.1">
          <div
            class="flex flex-col h-full p-6 transition-all duration-300 border rounded-lg hover:border-primary hover:shadow-lg hover:shadow-primary/20 bg-background/50">
            <div class="p-3 mb-4 rounded-full w-fit bg-primary/20">
              <UIcon :name="service.icon" class="w-6 h-6 text-primary" />
            </div>
            <h3 class="mb-2 text-xl font-semibold">{{ service.title }}</h3>
            <p class="text-neutral-300">{{ service.description }}</p>
          </div>
        </UiBlurReveal>
      </div>
    </div>
  </section>

  <!-- Tech Stack Section -->
  <section class="py-20 bg-gradient-to-b from-background/80 to-background">
    <div class="container px-4 mx-auto">
      <UiBlurReveal :delay="0.3">
        <h2 class="mb-4 text-3xl font-bold text-center md:text-4xl">
          <UiTextHighlight class="py-1 rounded-xl bg-gradient-to-r from-violet-500 to-pink-500">
            Tech Stack
          </UiTextHighlight>
        </h2>
        <p class="max-w-2xl mx-auto mb-12 text-center text-neutral-300">
          Modern technologies I specialize in to build powerful, scalable web applications
        </p>
      </UiBlurReveal>

      <div class="flex flex-wrap items-center justify-center gap-8">
        <UiBlurReveal v-for="(tech, index) in techStack" :key="index" :delay="0.3 + index * 0.1">
          <div class="flex flex-col items-center transition-all duration-300 hover:scale-110">
            <div
              class="flex items-center justify-center w-20 h-20 mb-3 border rounded-xl bg-background/80 hover:border-primary">
              <UIcon :name="tech.icon" class="w-12 h-12" />
            </div>
            <span class="text-sm font-medium">{{ tech.name }}</span>
          </div>
        </UiBlurReveal>
      </div>
    </div>
  </section>

  <!-- Projects Section -->
  <section class="py-20 bg-gradient-to-b from-background to-background/80">
    <div class="container px-4 mx-auto">
      <UiBlurReveal :delay="0.3">
        <h2 class="mb-4 text-3xl font-bold text-center md:text-4xl">
          <UiTextHighlight class="py-1 rounded-xl bg-gradient-to-r from-amber-500 to-red-500">
            Featured Projects
          </UiTextHighlight>
        </h2>
        <p class="max-w-2xl mx-auto mb-12 text-center text-neutral-300">
          A selection of my recent work that demonstrates my skills and experience
        </p>
      </UiBlurReveal>

      <div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        <UiBlurReveal v-for="(project, index) in projects" :key="index" :delay="0.3 + index * 0.1">
          <div
            class="overflow-hidden transition-all duration-300 border rounded-lg bg-background/50 hover:border-primary hover:shadow-lg hover:shadow-primary/20">
            <div class="h-48 bg-gradient-to-br from-primary/30 to-secondary/30">
              <div class="flex items-center justify-center h-full">
                <UIcon name="i-heroicons-photo" class="w-10 h-10 opacity-40" />
              </div>
            </div>
            <div class="p-6">
              <h3 class="mb-2 text-xl font-semibold">{{ project.title }}</h3>
              <p class="mb-4 text-neutral-300">{{ project.description }}</p>
              <div class="flex flex-wrap gap-2">
                <UBadge v-for="tag in project.tags" :key="tag" color="primary" variant="soft" size="sm">
                  {{ tag }}
                </UBadge>
              </div>
            </div>
          </div>
        </UiBlurReveal>
      </div>

      <div class="flex justify-center mt-10">
        <UButton to="/projects" variant="outline">View All Projects</UButton>
      </div>
    </div>
  </section>

  <!-- Testimonials Section -->
  <section class="py-20 bg-gradient-to-b from-background/80 to-background">
    <div class="container px-4 mx-auto">
      <UiBlurReveal :delay="0.3">
        <h2 class="mb-4 text-3xl font-bold text-center md:text-4xl">
          <UiTextHighlight class="py-1 rounded-xl bg-gradient-to-r from-emerald-500 to-blue-500">
            Client Testimonials
          </UiTextHighlight>
        </h2>
        <p class="max-w-2xl mx-auto mb-12 text-center text-neutral-300">
          What clients say about working with me
        </p>
      </UiBlurReveal>

      <div class="grid grid-cols-1 gap-8 md:grid-cols-3">
        <UiBlurReveal v-for="(testimonial, index) in testimonials" :key="index" :delay="0.3 + index * 0.1">
          <div
            class="relative p-6 transition-all duration-300 border rounded-lg bg-background/50 hover:border-primary hover:shadow-lg hover:shadow-primary/20">
            <UIcon name="i-heroicons-quote" class="absolute w-10 h-10 -top-4 -left-4 text-primary/20" />
            <p class="mb-6 italic text-neutral-300">{{ testimonial.content }}</p>
            <div class="flex items-center">
              <div class="w-10 h-10 mr-3 overflow-hidden rounded-full bg-primary/20">
                <UIcon name="i-heroicons-user" class="w-full h-full p-2" />
              </div>
              <div>
                <h4 class="font-semibold">{{ testimonial.name }}</h4>
                <p class="text-sm text-neutral-400">{{ testimonial.position }}, {{ testimonial.company }}</p>
              </div>
            </div>
          </div>
        </UiBlurReveal>
      </div>
    </div>
  </section>

  <!-- Contact CTA Section -->
  <section class="py-20 bg-gradient-to-t from-background to-background/80">
    <div class="container px-4 mx-auto">
      <div class="relative p-8 overflow-hidden border rounded-lg md:p-12 bg-background/40">
        <UiBlurReveal :delay="0.3">
          <div class="max-w-3xl mx-auto text-center">
            <h2 class="mb-4 text-3xl font-bold md:text-4xl">Ready to bring your ideas to life?</h2>
            <p class="max-w-2xl mx-auto mb-8 text-neutral-300">
              Let's collaborate to transform your vision into a reality. From concept to completion, I'm here to guide
              you through every step of the development process.
            </p>
            <UButton to="/contact" size="lg" class="px-8">Get in Touch</UButton>
          </div>
        </UiBlurReveal>
        <UiBorderBeam :size="400" :duration="15" :delay="2" :border-width="2" />
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Add any custom styles here */
</style>

