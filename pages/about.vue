<script setup lang="ts">
const developerInfo = {
    name: 'John Doe',
    title: 'Full Stack Web Developer',
    bio: 'I am a passionate web developer with over 7 years of experience building modern web applications. I specialize in turning ideas into fully functional products, with a strong focus on client communication throughout the development process.',
    location: 'San Francisco, CA',
    email: 'contact@example.com',
    education: [
        {
            degree: 'MS in Computer Science',
            school: 'Stanford University',
            year: '2016 - 2018'
        },
        {
            degree: 'BS in Software Engineering',
            school: 'University of California, Berkeley',
            year: '2012 - 2016'
        }
    ],
    experience: [
        {
            date: '2020 - Present',
            title: 'Senior Web Developer',
            subtitle: 'Tech Innovations Inc.',
            description: 'Lead developer for enterprise-level web applications using NuxtJS, VueJS, and AWS. Implemented CI/CD pipelines and optimized application performance.'
        },
        {
            date: '2018 - 2020',
            title: 'Full Stack Developer',
            subtitle: 'Digital Solutions LLC',
            description: 'Developed and maintained multiple client projects using VueJS and Clojure. Collaborated with design teams to implement responsive UI/UX.'
        },
        {
            date: '2016 - 2018',
            title: 'Web Developer',
            subtitle: 'Creative Web Agency',
            description: 'Created custom web solutions for clients across various industries. Utilized Docker for consistent deployment environments.'
        }
    ],
    skills: [
        { name: 'Frontend Development', level: 95 },
        { name: 'Backend Development', level: 90 },
        { name: 'DevOps & Deployment', level: 85 },
        { name: 'UI/UX Design', level: 80 },
        { name: 'Project Management', level: 90 },
        { name: 'Client Communication', level: 95 }
    ]
};

useHead({
    title: 'About Me | Portfolio',
    meta: [
        { name: 'description', content: 'Learn more about my skills, experience, and background as a web developer.' }
    ]
});
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
                            <UiSparklesText :sparkle-count="10" :colors="['rgb(var(--primary-500))', 'rgb(var(--accent-500))']">
                                <h1 class="bg-clip-text bg-gradient-to-r from-white to-neutral-300 mb-2 font-bold text-transparent text-4xl md:text-5xl">
                                    {{ developerInfo.name }}
                                </h1>
                            </UiSparklesText>

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
                        <h2 class="mb-4 font-bold text-3xl md:text-4xl">
                            <UiSparklesText :sparkle-count="8" :colors="['rgb(var(--primary-500))', 'rgb(var(--accent-500))']">
                                <span class="bg-clip-text bg-gradient-to-r from-primary-400 text-transparent to-accent-400">
                                    Professional Skills
                                </span>
                            </UiSparklesText>
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

        <!-- Experience Section with Timeline -->
        <section class="relative py-24 overflow-hidden">
            <div class="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
            <UiMeteorEffect :count="10" color="rgb(var(--primary-500))" class="absolute inset-0" />

            <div class="z-10 relative mx-auto px-4 container">
                <UiBlurReveal :delay="0.3">
                    <div class="mb-16 text-center">
                        <h2 class="mb-4 font-bold text-3xl md:text-4xl">
                            <UiSparklesText :sparkle-count="8" :colors="['rgb(var(--primary-500))', 'rgb(var(--accent-500))']">
                                <span class="bg-clip-text bg-gradient-to-r from-primary-400 text-transparent to-accent-400">
                                    Work Experience
                                </span>
                            </UiSparklesText>
                        </h2>
                    </div>
                </UiBlurReveal>

                <UiTimeline :items="developerInfo.experience" class="mx-auto max-w-4xl" />
            </div>
        </section>

        <!-- Education Section -->
        <section class="relative py-24 overflow-hidden">
            <div class="absolute inset-0 bg-gradient-to-b from-background/95 via-neutral-900/50 to-background" />

            <div class="z-10 relative mx-auto px-4 container">
                <UiBlurReveal :delay="0.3">
                    <div class="mb-16 text-center">
                        <h2 class="mb-4 font-bold text-3xl md:text-4xl">
                            <UiSparklesText :sparkle-count="8" :colors="['rgb(var(--accent-500))', 'rgb(var(--primary-500))']">
                                <span class="bg-clip-text bg-gradient-to-r to-primary-400 text-transparent from-accent-400">
                                    Education
                                </span>
                            </UiSparklesText>
                        </h2>
                    </div>
                </UiBlurReveal>

                <div class="gap-6 grid grid-cols-1 md:grid-cols-2 mx-auto max-w-4xl">
                    <UiBlurReveal v-for="(edu, index) in developerInfo.education" :key="index" :delay="0.3 + index * 0.1">
                        <UiCard3D :rotation-factor="8" :show-glare="true" :glare-opacity="0.15" class="h-full">
                            <UiCardSpotlight
                                class="h-full"
                                spotlight-color="rgb(var(--accent-500) / 0.15)"
                            >
                                <div class="p-6">
                                    <div class="flex justify-between items-center mb-3">
                                        <div class="bg-gradient-to-br to-primary-500/20 p-3 rounded-xl from-accent-500/20">
                                            <UIcon name="i-heroicons-academic-cap" class="w-6 h-6 text-accent-400" />
                                        </div>
                                        <span class="bg-neutral-800/50 px-3 py-1 rounded-full text-neutral-400 text-sm">
                                            {{ edu.year }}
                                        </span>
                                    </div>
                                    <h3 class="mb-2 font-semibold text-white text-xl">{{ edu.degree }}</h3>
                                    <p class="text-secondary-400">{{ edu.school }}</p>
                                </div>
                            </UiCardSpotlight>
                        </UiCard3D>
                    </UiBlurReveal>
                </div>
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

