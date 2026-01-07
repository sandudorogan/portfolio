<script setup lang="ts">
const developerInfo = {
    name: 'Sandu Dorogan',
    title: 'Full Stack Developer at IPRally',
    bio: 'Focused, driven and creative. Will bring your ideas to life. Tell me the what and I\'ll show you the how.',
    location: 'Bucharest, Romania',
    email: 'sandu.dorogan@gmail.com',
    experience: [
        {
            date: 'May 2025 - Present',
            title: 'Full Stack Developer',
            subtitle: 'IPRally',
            description: 'Using Clojure & ClojureScript to connect AI with users. Front-end stack: Reagent (ReactJS) + re-frame. Notable achievements: MCP server implementation, 50% improved performance score.'
        },
        {
            date: 'Aug 2024 - Jul 2025',
            title: 'Full Stack Engineer',
            subtitle: 'Crossbeam',
            description: 'Senior full stack developer for the Crossbeam platform. Working with a Clojure backend and VueJS frontend.'
        },
        {
            date: 'Mar 2022 - Jan 2025',
            title: 'Lead Developer - Partnerbase Platform',
            subtitle: 'Flexiana (for Crossbeam)',
            description: 'Spearheaded Nuxt 2 to Nuxt 3 migration, engineered ~30% performance improvement, redesigned UI/UX for accessibility, built notification system from scratch, implemented OneTrust cookies compliance, set up E2E testing with Docker Compose & Cypress, and achieved ~15% increase in new monthly users via SEO updates.'
        },
        {
            date: 'Sep 2021 - Jul 2025',
            title: 'Full Stack Developer',
            subtitle: 'Flexiana',
            description: 'Full-stack web development with Clojure backend and ClojureScript frontend using Reagent & re-frame.'
        },
        {
            date: 'Sep 2019 - Aug 2021',
            title: 'Web Development Engineer',
            subtitle: 'Newsroom AI',
            description: 'Built a sophisticated WYSIWYG editor for web stories (like Instagram stories for web). Engineered dynamic elements with 9 anchor points for consistent cross-device alignment, developed complex stacking algorithm, and led performance optimizations. Tech: ClojureScript, Re-Frame, Reagent, Django, NodeJS.'
        },
        {
            date: 'Apr 2019 - Jul 2019',
            title: 'Junior Programmer',
            subtitle: 'Ubisoft',
            description: 'Developed UI for a code editor using C# and WPF. Implemented global find & replace and VSCode-like highlight all occurrences of selected text.'
        },
        {
            date: 'Jun 2018 - Mar 2019',
            title: 'Ubisoft Coding Campus',
            subtitle: 'Ubisoft',
            description: 'Game Development & Online Dev. Built a local multiplayer top-down 2D shooter in C++ with Client-Server model and Lockstep synchronization. Implemented Matchmaking, LeaderBoard, and Authentication services using Redis, MySQL, MongoDB on Docker Swarm/AWS.'
        }
    ],
    skills: [
        { name: 'Clojure', level: 95 },
        { name: 'ClojureScript', level: 95 },
        { name: 'React.js', level: 90 },
        { name: 'Vue.js / Nuxt', level: 90 },
        { name: 'TypeScript', level: 85 },
        { name: 'DevOps', level: 80 }
    ],
    languages: [
        { name: 'Romanian', level: 'Native / Bilingual' },
        { name: 'Russian', level: 'Native / Bilingual' },
        { name: 'English', level: 'Full Professional' },
        { name: 'Ukrainian', level: 'Professional Working' }
    ]
};

usePageSeo({
    title: 'About | Sandu Dorogan',
    description: 'Learn more about Sandu Dorogan - Full Stack Developer specializing in Clojure, ClojureScript, React, and Vue.',
    ogType: 'profile'
})

// OG image must be defined at page level for static generation
defineOgImage({
  component: 'Default',
  props: {
    title: 'About Sandu Dorogan',
    description: 'Full Stack Developer at IPRally. Based in Bucharest, Romania.'
  }
})
</script>

<template>
    <div class="pt-16">
        <!-- Hero Section with Aurora Background -->
        <section class="relative py-24 overflow-hidden">
            <UiAuroraBg class="absolute inset-0" :show-radial-gradient="true" />
            <div class="absolute inset-0 bg-black/30" />

            <div class="z-10 relative mx-auto px-4 container">
                <div class="flex md:flex-row flex-col items-center md:items-start gap-8">
                    <!-- Profile Image with 3D effect -->
                    <UiBlurReveal :delay="0.2">
                        <UiCard3D :rotation-factor="12" :show-glare="true" :glare-opacity="0.2">
                            <div class="relative">
                                <div class="flex justify-center items-center bg-gradient-to-br from-primary-500/20 border border-neutral-700/50 rounded-2xl w-48 h-48 overflow-hidden to-accent-500/20">
                                    <UIcon name="i-heroicons-user" class="w-24 h-24 text-primary-400/50" />
                                </div>
                                <UiBorderBeam :size="150" :duration="8" color-from="rgb(var(--primary-500))" color-to="rgb(var(--accent-500))" />
                            </div>
                        </UiCard3D>
                    </UiBlurReveal>

                    <div class="flex-1 md:text-left text-center">
                        <UiBlurReveal :delay="0.3">
                            <h1 class="bg-clip-text bg-gradient-to-r from-white to-neutral-300 mb-2 font-bold text-transparent text-4xl md:text-5xl">
                                {{ developerInfo.name }}
                            </h1>

                            <p class="bg-clip-text bg-gradient-to-r from-primary-400 mb-4 font-medium text-transparent text-xl to-accent-400">
                                {{ developerInfo.title }}
                            </p>

                            <p class="mb-6 max-w-2xl text-neutral-300 text-lg">
                                {{ developerInfo.bio }}
                            </p>

                            <div class="flex flex-wrap justify-center md:justify-start gap-4">
                                <UiGlareCard :glare-opacity="0.2" class="group">
                                    <div class="flex items-center gap-2 bg-neutral-900/80 px-4 py-2 border border-neutral-700/50 rounded-lg">
                                        <UIcon name="i-heroicons-map-pin" class="w-4 h-4 text-primary-400" />
                                        <span class="text-neutral-300">{{ developerInfo.location }}</span>
                                    </div>
                                </UiGlareCard>

                                <UiGlareCard :glare-opacity="0.2" class="group">
                                    <div class="flex items-center gap-2 bg-neutral-900/80 px-4 py-2 border border-neutral-700/50 rounded-lg">
                                        <UIcon name="i-heroicons-envelope" class="w-4 h-4 text-accent-400" />
                                        <span class="text-neutral-300">{{ developerInfo.email }}</span>
                                    </div>
                                </UiGlareCard>
                            </div>
                        </UiBlurReveal>
                    </div>
                </div>
            </div>
        </section>

        <!-- Skills Section with Animated Progress Bars -->
        <section class="relative py-24 overflow-hidden">
            <div class="absolute inset-0 bg-gradient-to-b from-background via-neutral-900/50 to-background" />

            <div class="z-10 relative mx-auto px-4 container">
                <UiBlurReveal :delay="0.3">
                    <div class="mb-16 text-center">
                        <h2 class="bg-clip-text bg-gradient-to-r from-primary-400 mb-4 font-bold text-transparent text-3xl md:text-4xl to-accent-400">
                            Professional Skills
                        </h2>
                    </div>

                    <!-- Skills with Circular Progress -->
                    <div class="gap-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 mb-12">
                        <ClientOnly>
                            <UiBlurReveal v-for="(skill, index) in developerInfo.skills" :key="index" :delay="0.2 + index * 0.1">
                                <UiCardSpotlight
                                    class="flex flex-col items-center p-4"
                                    spotlight-color="rgb(var(--primary-500) / 0.15)"
                                >
                                    <UiAnimatedCircularProgressBar
                                        :value="skill.level"
                                        :size="100"
                                        :stroke-width="6"
                                        track-color="rgba(255, 255, 255, 0.1)"
                                        progress-color="rgb(var(--primary-500))"
                                    />
                                    <span class="mt-3 font-medium text-neutral-300 text-sm text-center">{{ skill.name }}</span>
                                </UiCardSpotlight>
                            </UiBlurReveal>
                        </ClientOnly>
                    </div>
                </UiBlurReveal>
            </div>
        </section>

        <!-- Languages Section -->
        <section class="relative py-24 overflow-hidden">
            <div class="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />

            <div class="z-10 relative mx-auto px-4 container">
                <UiBlurReveal :delay="0.3">
                    <div class="mb-16 text-center">
                        <h2 class="bg-clip-text bg-gradient-to-r from-primary-400 mb-4 font-bold text-transparent text-3xl md:text-4xl to-accent-400">
                            Languages
                        </h2>
                    </div>

                    <div class="gap-6 grid grid-cols-2 md:grid-cols-4 mx-auto max-w-4xl">
                        <UiBlurReveal v-for="(lang, index) in developerInfo.languages" :key="index" :delay="0.2 + index * 0.1">
                            <UiCardSpotlight
                                class="flex flex-col items-center p-6"
                                spotlight-color="rgb(var(--accent-500) / 0.15)"
                            >
                                <div class="bg-gradient-to-br from-primary-500/20 mb-4 p-3 rounded-xl to-accent-500/20">
                                    <UIcon name="i-heroicons-language" class="w-6 h-6 text-primary-400" />
                                </div>
                                <h3 class="mb-1 font-semibold text-white text-lg">{{ lang.name }}</h3>
                                <p class="text-neutral-400 text-sm text-center">{{ lang.level }}</p>
                            </UiCardSpotlight>
                        </UiBlurReveal>
                    </div>
                </UiBlurReveal>
            </div>
        </section>

        <!-- Experience Section with Timeline -->
        <section class="relative py-24 overflow-hidden">
            <div class="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
            <UiMeteorEffect :count="10" color="rgb(var(--primary-500))" class="absolute inset-0" />

            <div class="z-10 relative mx-auto px-4 container">
                <UiBlurReveal :delay="0.3">
                    <div class="mb-16 text-center">
                        <h2 class="bg-clip-text bg-gradient-to-r from-primary-400 mb-4 font-bold text-transparent text-3xl md:text-4xl to-accent-400">
                            Work Experience
                        </h2>
                    </div>
                </UiBlurReveal>

                <UiTimeline :items="developerInfo.experience" class="mx-auto max-w-4xl" />
            </div>
        </section>

        <!-- CTA Section -->
        <section class="relative py-24 overflow-hidden">
            <div class="absolute inset-0 bg-gradient-to-t from-background via-background/95 to-background" />

            <div class="z-10 relative mx-auto px-4 container">
                <UiBlurReveal :delay="0.3">
                    <AppContactCta
                        title="Interested in working together?"
                        description="Let's discuss how I can help bring your project to life. I'm always open to new opportunities and challenges."
                        button-label="Contact Me"
                    />
                </UiBlurReveal>
            </div>
        </section>
    </div>
</template>

