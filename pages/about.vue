<script setup lang="ts">
// Developer's information
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
            role: 'Senior Web Developer',
            company: 'Tech Innovations Inc.',
            period: '2020 - Present',
            description: 'Lead developer for enterprise-level web applications using NuxtJS, VueJS, and AWS. Implemented CI/CD pipelines and optimized application performance.'
        },
        {
            role: 'Full Stack Developer',
            company: 'Digital Solutions LLC',
            period: '2018 - 2020',
            description: 'Developed and maintained multiple client projects using VueJS and Clojure. Collaborated with design teams to implement responsive UI/UX.'
        },
        {
            role: 'Web Developer',
            company: 'Creative Web Agency',
            period: '2016 - 2018',
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

// Meta for SEO
useHead({
    title: 'About Me | Portfolio',
    meta: [
        { name: 'description', content: 'Learn more about my skills, experience, and background as a web developer.' }
    ]
});
</script>

<template>
    <div class="pt-16">
        <!-- Hero Section -->
        <section class="py-20 bg-gradient-to-b from-background to-background/80">
            <div class="container px-4 mx-auto">
                <div class="flex flex-col items-center gap-8 md:flex-row md:items-start">
                    <div
                        class="flex items-center justify-center w-40 h-40 overflow-hidden border rounded-full md:w-48 md:h-48 bg-primary/5">
                        <UIcon name="i-heroicons-user" class="w-24 h-24 text-primary/30" />
                    </div>

                    <div class="flex-1 text-center md:text-left">
                        <UiBlurReveal :delay="0.2">
                            <h1 class="mb-2 text-3xl font-bold md:text-4xl">{{ developerInfo.name }}</h1>
                            <p class="mb-4 text-xl text-primary">{{ developerInfo.title }}</p>
                            <p class="max-w-2xl mb-6 text-neutral-300">{{ developerInfo.bio }}</p>

                            <div class="flex flex-wrap justify-center gap-4 md:justify-start">
                                <div class="flex items-center gap-1 text-sm">
                                    <UIcon name="i-heroicons-map-pin" class="w-4 h-4 text-primary" />
                                    <span>{{ developerInfo.location }}</span>
                                </div>
                                <div class="flex items-center gap-1 text-sm">
                                    <UIcon name="i-heroicons-envelope" class="w-4 h-4 text-primary" />
                                    <span>{{ developerInfo.email }}</span>
                                </div>
                            </div>
                        </UiBlurReveal>
                    </div>
                </div>
            </div>
        </section>

        <!-- Skills Section -->
        <section class="py-16 bg-gradient-to-b from-background/80 to-background">
            <div class="container px-4 mx-auto">
                <UiBlurReveal :delay="0.3">
                    <h2 class="mb-12 text-2xl font-bold text-center md:text-3xl">
                        <UiTextHighlight class="py-1 rounded-xl bg-gradient-to-r from-primary to-secondary">
                            Professional Skills
                        </UiTextHighlight>
                    </h2>

                    <div class="grid grid-cols-1 gap-8 md:grid-cols-2">
                        <div v-for="(skill, index) in developerInfo.skills" :key="index" class="space-y-2">
                            <div class="flex items-center justify-between">
                                <span class="font-medium">{{ skill.name }}</span>
                                <span class="text-sm text-neutral-400">{{ skill.level }}%</span>
                            </div>
                            <div class="w-full h-2 overflow-hidden rounded-full bg-background/50">
                                <div class="h-full rounded-full bg-gradient-to-r from-primary to-secondary"
                                    :style="{ width: `${skill.level}%` }" />
                            </div>
                        </div>
                    </div>
                </UiBlurReveal>
            </div>
        </section>

        <!-- Experience Section -->
        <section class="py-16 bg-gradient-to-b from-background to-background/80">
            <div class="container px-4 mx-auto">
                <UiBlurReveal :delay="0.3">
                    <h2 class="mb-12 text-2xl font-bold text-center md:text-3xl">
                        <UiTextHighlight class="py-1 rounded-xl bg-gradient-to-r from-blue-500 to-emerald-500">
                            Work Experience
                        </UiTextHighlight>
                    </h2>

                    <div class="space-y-8">
                        <div v-for="(exp, index) in developerInfo.experience" :key="index"
                            class="p-6 transition-all duration-300 border rounded-lg bg-background/50 hover:border-primary">
                            <div class="flex flex-col justify-between gap-2 mb-4 md:flex-row md:items-center">
                                <div>
                                    <h3 class="text-xl font-semibold">{{ exp.role }}</h3>
                                    <p class="text-primary">{{ exp.company }}</p>
                                </div>
                                <span class="px-3 py-1 text-sm border rounded-full bg-background/80">{{ exp.period
                                    }}</span>
                            </div>
                            <p class="text-neutral-300">{{ exp.description }}</p>
                        </div>
                    </div>
                </UiBlurReveal>
            </div>
        </section>

        <!-- Education Section -->
        <section class="py-16 bg-gradient-to-b from-background/80 to-background">
            <div class="container px-4 mx-auto">
                <UiBlurReveal :delay="0.3">
                    <h2 class="mb-12 text-2xl font-bold text-center md:text-3xl">
                        <UiTextHighlight class="py-1 rounded-xl bg-gradient-to-r from-pink-500 to-violet-500">
                            Education
                        </UiTextHighlight>
                    </h2>

                    <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
                        <div v-for="(edu, index) in developerInfo.education" :key="index"
                            class="p-6 transition-all duration-300 border rounded-lg bg-background/50 hover:border-primary">
                            <div class="flex items-center justify-between mb-2">
                                <h3 class="text-lg font-semibold">{{ edu.degree }}</h3>
                                <span class="text-sm text-neutral-400">{{ edu.year }}</span>
                            </div>
                            <p class="text-primary">{{ edu.school }}</p>
                        </div>
                    </div>
                </UiBlurReveal>
            </div>
        </section>

        <!-- CTA Section -->
        <section class="py-16 bg-gradient-to-t from-background to-background/90">
            <div class="container px-4 mx-auto">
                <div class="relative p-8 overflow-hidden border rounded-lg md:p-12 bg-background/40">
                    <UiBlurReveal :delay="0.3">
                        <div class="max-w-3xl mx-auto text-center">
                            <h2 class="mb-4 text-2xl font-bold md:text-3xl">Interested in working together?</h2>
                            <p class="max-w-2xl mx-auto mb-8 text-neutral-300">
                                Let's discuss how I can help bring your project to life. I'm always open to new
                                opportunities and challenges.
                            </p>
                            <UButton to="/contact" size="lg" class="px-8">Contact Me</UButton>
                        </div>
                    </UiBlurReveal>
                    <UiBorderBeam :size="350" :duration="15" :delay="2" :border-width="2" />
                </div>
            </div>
        </section>
    </div>
</template>

<style scoped>
/* Add any custom styles here */
</style>