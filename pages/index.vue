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
  <section class="relative flex flex-col justify-center items-center w-full min-h-screen">
    <UiParticlesBg class="absolute inset-0" :quantity="100" :ease="100" :color="true ? '#FFF' : '#000'" :staticity="10"
      refresh />
    <div class="z-[1] absolute inset-0 bg-black opacity-50" />
    <div class="z-[2] flex flex-col items-center gap-2 max-w-xl">
      <UiBlurReveal :delay="0.5" class="flex flex-col justify-center items-center gap-4">
        <span
          class="flex flex-col justify-center items-center bg-clip-text bg-gradient-to-b from-neutral-200 to-neutral-500 font-bold text-transparent text-4xl md:text-6xl text-center">
          <span>
            Building
            <UiTextHighlight class="bg-gradient-to-r from-pink-500 to-violet-500 py-1 rounded-xl w-80"
              text-end-color="rgb(var(--accent-500))">
              <UiFlipWords :words="['beautiful', 'stunning', 'immersive', 'scalable']" :duration="3000"
                class="bg-clip-text bg-gradient-to-b from-neutral-200 to-neutral-500 mx-auto w-fit text-transparent" />
            </UiTextHighlight>
          </span>
          web experiences
        </span>

        <span class="text-xl text-center">
          Together, let's create something extraordinary!
        </span>

        <div class="flex flex-row justify-center items-center gap-4 my-2">
          <UButton to="/about"> About Me </UButton>
          <UButton to="/contact" variant="outline">
            Get in Touch
          </UButton>
        </div>

        <ClientOnly>
          <div
            class="relative flex flex-col justify-center items-center bg-background md:shadow-xl p-px border rounded-lg w-full h-fit overflow-hidden">
            <div class="relative p-4">
              <UiSafariMockup url="inspira-ui.com" src="/images/inspira-ss.png" class="size-full" />
            </div>
            <UiBorderBeam :size="250" :duration="12" :delay="0" :border-width="2" />
          </div>
        </ClientOnly>
      </UiBlurReveal>
    </div>

    <div class="bottom-8 z-[2] absolute animate-bounce">
      <UButton variant="ghost" icon="i-heroicons-chevron-down" class="rounded-full"
        @click="() => scrollToElement('services')" />
    </div>
  </section>

  <!-- Services Section -->
  <section id="services" class="bg-gradient-to-b from-background to-background/80 py-20">
    <div class="mx-auto px-4 container">
      <UiBlurReveal :delay="0.3">
        <h2 class="mb-4 font-bold text-3xl md:text-4xl text-center">
          <UiTextHighlight class="bg-gradient-to-r from-blue-500 to-emerald-500 py-1 rounded-xl">
            Services
          </UiTextHighlight>
        </h2>
        <p class="mx-auto mb-12 max-w-2xl text-neutral-300 text-center">
          From concept to deployment, I offer comprehensive web development services tailored to your specific needs
        </p>
      </UiBlurReveal>

      <div class="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        <UiBlurReveal v-for="(service, index) in services" :key="index" :delay="0.3 + index * 0.1">
          <div
            class="flex flex-col bg-background/50 hover:shadow-lg hover:shadow-primary/20 p-6 border hover:border-primary rounded-lg h-full transition-all duration-300">
            <div class="bg-primary/20 mb-4 p-3 rounded-full w-fit">
              <UIcon :name="service.icon" class="w-6 h-6 text-primary" />
            </div>
            <h3 class="mb-2 font-semibold text-xl">{{ service.title }}</h3>
            <p class="text-neutral-300">{{ service.description }}</p>
          </div>
        </UiBlurReveal>
      </div>
    </div>
  </section>

  <!-- Tech Stack Section -->
  <section class="bg-gradient-to-b from-background/80 to-background py-20">
    <div class="mx-auto px-4 container">
      <UiBlurReveal :delay="0.3">
        <h2 class="mb-4 font-bold text-3xl md:text-4xl text-center">
          <UiTextHighlight class="bg-gradient-to-r from-violet-500 to-pink-500 py-1 rounded-xl">
            Tech Stack
          </UiTextHighlight>
        </h2>
        <p class="mx-auto mb-12 max-w-2xl text-neutral-300 text-center">
          Modern technologies I specialize in to build powerful, scalable web applications
        </p>
      </UiBlurReveal>

      <div class="flex flex-wrap justify-center items-center gap-8">
        <UiBlurReveal v-for="(tech, index) in techStack" :key="index" :delay="0.3 + index * 0.1">
          <div class="flex flex-col items-center hover:scale-110 transition-all duration-300">
            <div
              class="flex justify-center items-center bg-background/80 mb-3 border hover:border-primary rounded-xl w-20 h-20">
              <UIcon :name="tech.icon" class="w-12 h-12" />
            </div>
            <span class="font-medium text-sm">{{ tech.name }}</span>
          </div>
        </UiBlurReveal>
      </div>
    </div>
  </section>

  <!-- Projects Section -->
  <section class="bg-gradient-to-b from-background to-background/80 py-20">
    <div class="mx-auto px-4 container">
      <UiBlurReveal :delay="0.3">
        <h2 class="mb-4 font-bold text-3xl md:text-4xl text-center">
          <UiTextHighlight class="bg-gradient-to-r from-amber-500 to-red-500 py-1 rounded-xl">
            Featured Projects
          </UiTextHighlight>
        </h2>
        <p class="mx-auto mb-12 max-w-2xl text-neutral-300 text-center">
          A selection of my recent work that demonstrates my skills and experience
        </p>
      </UiBlurReveal>

      <div class="gap-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <UiBlurReveal v-for="(project, index) in projects" :key="index" :delay="0.3 + index * 0.1">
          <div
            class="bg-background/50 hover:shadow-lg hover:shadow-primary/20 border hover:border-primary rounded-lg overflow-hidden transition-all duration-300">
            <div class="bg-gradient-to-br from-primary/30 to-secondary/30 h-48">
              <div class="flex justify-center items-center h-full">
                <UIcon name="i-heroicons-photo" class="opacity-40 w-10 h-10" />
              </div>
            </div>
            <div class="p-6">
              <h3 class="mb-2 font-semibold text-xl">{{ project.title }}</h3>
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
  <section class="bg-gradient-to-b from-background/80 to-background py-20">
    <div class="mx-auto px-4 container">
      <UiBlurReveal :delay="0.3">
        <h2 class="mb-4 font-bold text-3xl md:text-4xl text-center">
          <UiTextHighlight class="bg-gradient-to-r from-emerald-500 to-blue-500 py-1 rounded-xl">
            Client Testimonials
          </UiTextHighlight>
        </h2>
        <p class="mx-auto mb-12 max-w-2xl text-neutral-300 text-center">
          What clients say about working with me
        </p>
      </UiBlurReveal>

      <div class="gap-8 grid grid-cols-1 md:grid-cols-3">
        <UiBlurReveal v-for="(testimonial, index) in testimonials" :key="index" :delay="0.3 + index * 0.1">
          <div
            class="relative bg-background/50 hover:shadow-lg hover:shadow-primary/20 p-6 border hover:border-primary rounded-lg transition-all duration-300">
            <UIcon name="i-heroicons-quote" class="-top-4 -left-4 absolute w-10 h-10 text-primary/20" />
            <p class="mb-6 text-neutral-300 italic">{{ testimonial.content }}</p>
            <div class="flex items-center">
              <div class="bg-primary/20 mr-3 rounded-full w-10 h-10 overflow-hidden">
                <UIcon name="i-heroicons-user" class="p-2 w-full h-full" />
              </div>
              <div>
                <h4 class="font-semibold">{{ testimonial.name }}</h4>
                <p class="text-neutral-400 text-sm">{{ testimonial.position }}, {{ testimonial.company }}</p>
              </div>
            </div>
          </div>
        </UiBlurReveal>
      </div>
    </div>
  </section>

  <!-- Contact CTA Section -->
  <section class="bg-gradient-to-t from-background to-background/80 py-20">
    <div class="mx-auto px-4 container">
      <div class="relative bg-background/40 p-8 md:p-12 border rounded-lg overflow-hidden">
        <UiBlurReveal :delay="0.3">
          <div class="mx-auto max-w-3xl text-center">
            <h2 class="mb-4 font-bold text-3xl md:text-4xl">Ready to bring your ideas to life?</h2>
            <p class="mx-auto mb-8 max-w-2xl text-neutral-300">
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

