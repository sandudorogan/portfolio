<script setup lang="ts">
const { t, tm, rt } = useI18n()
const localePath = useLocalePath()

const skills = [
    { name: 'Clojure', level: 95 },
    { name: 'ClojureScript', level: 95 },
    { name: 'React.js', level: 90 },
    { name: 'Vue.js / Nuxt', level: 90 },
    { name: 'TypeScript', level: 85 },
    { name: 'DevOps', level: 80 }
];

const experience = computed(() => {
    const items = tm('about.experience.items') as Array<{ date: string; title: string; subtitle: string; description: string }>;
    return items.map(item => ({
        date: rt(item.date),
        title: rt(item.title),
        subtitle: rt(item.subtitle),
        description: rt(item.description),
    }));
});

const languages = computed(() => {
    const items = tm('about.languages.items') as Array<{ name: string; level: string }>;
    return items.map(item => ({
        name: rt(item.name),
        level: rt(item.level),
    }));
});

usePageSeo({
    title: () => t('about.seo.title'),
    description: () => t('about.seo.description'),
    ogType: 'profile'
})

// OG image must be defined at page level for static generation
defineOgImage({
    component: 'Default',
    props: {
        title: t('about.og.title'),
        description: t('about.og.description')
    }
})
</script>

<template>
    <!-- Hero Section with Aurora Background -->
    <section class="relative py-24 overflow-hidden">
        <UiAuroraBg class="absolute inset-0" :show-radial-gradient="true" />
        <div class="absolute inset-0 bg-white/30 dark:bg-black/30" />

        <div class="z-10 relative mx-auto px-4 container">
            <div class="flex md:flex-row flex-col items-center md:items-start gap-8">
                <!-- Profile Image with 3D effect -->
                <UiBlurReveal :delay="0.2">
                    <UiCard3D :rotation-factor="12" :show-glare="true">
                        <div class="relative">
                            <div class="flex justify-center items-center bg-linear-to-br from-primary-500/20 border border-muted rounded-2xl w-48 h-48 overflow-hidden to-accent-500/20"
                                aria-hidden="true">
                                <img src="/images/sandu-dorogan.jpg" alt="Sandu Dorogan"
                                    class="w-full h-full object-cover" />
                            </div>
                        </div>
                    </UiCard3D>
                </UiBlurReveal>

                <div class="flex-1 md:text-left text-center">
                    <UiBlurReveal :delay="0.3">
                        <h1
                            class="bg-clip-text bg-linear-to-r from-text-950 to-text-700 dark:from-white dark:to-neutral-300 mb-2 font-bold text-transparent text-4xl md:text-5xl">
                            {{ $t('about.hero.name') }}
                        </h1>

                        <p
                            class="bg-clip-text bg-linear-to-r from-primary-400 mb-4 font-medium text-transparent text-xl to-accent-400">
                            {{ $t('about.hero.title') }}
                        </p>

                        <p class="mb-6 max-w-2xl text-muted text-lg">
                            {{ $t('about.hero.bio') }}
                        </p>

                        <div class="flex flex-wrap justify-center md:justify-start gap-4">
                            <UiGlareCard :glare-opacity="0.2"
                                class="group bg-elevated/80 border border-muted !rounded-lg">
                                <div class="flex items-center gap-2 px-4 py-2">
                                    <UIcon name="i-heroicons-map-pin" class="w-4 h-4 text-primary-400"
                                        aria-hidden="true" />
                                    <span class="text-muted">{{ $t('about.hero.location') }}</span>
                                </div>
                            </UiGlareCard>

                            <UiGlareCard :glare-opacity="0.2"
                                class="group bg-elevated/80 border border-muted !rounded-lg">
                                <div class="flex items-center gap-2 px-4 py-2">
                                    <UIcon name="i-heroicons-envelope" class="w-4 h-4 text-accent-400"
                                        aria-hidden="true" />
                                    <AppRevealContactValue endpoint="/api/reveal/email" placeholder="email@example.com"
                                        class="text-neutral-300" />
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
        <div class="absolute inset-0 bg-linear-to-b from-background via-background-200/50 dark:via-neutral-900/50 to-background" />

        <div class="z-10 relative mx-auto px-4 container">
            <UiBlurReveal :delay="0.3">
                <div class="mb-16 text-center">
                    <h2
                        class="bg-clip-text bg-linear-to-r from-primary-400 mb-4 font-bold text-transparent text-3xl md:text-4xl to-accent-400">
                        {{ $t('about.skills.title') }}
                    </h2>
                </div>

                <!-- Skills with Circular Progress -->
                <div class="gap-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 mb-12">
                    <ClientOnly>
                        <UiBlurReveal v-for="(skill, index) in skills" :key="index"
                            :delay="0.2 + index * 0.1" :duration="1" class="h-full">
                            <UiCardSpotlight class="!p-4 h-full"
                                spotlight-color="color-mix(in oklch, var(--color-primary-500) 15%, transparent)">
                                <div class="flex flex-col items-center h-full">
                                    <UiAnimatedCircularProgressBar :value="skill.level" :size="100" :stroke-width="6"
                                        progress-color="var(--color-primary-500)"
                                        :start-delay-ms="1000" />
                                    <span class="mt-auto pt-4 font-medium text-muted text-sm text-center">{{
                                        skill.name }}</span>
                                </div>
                            </UiCardSpotlight>
                        </UiBlurReveal>
                    </ClientOnly>
                </div>
            </UiBlurReveal>
        </div>
    </section>

    <!-- Languages Section -->
    <section class="relative py-24 overflow-hidden">
        <div class="absolute inset-0 bg-linear-to-b from-background via-background/95 to-background" />

        <div class="z-10 relative mx-auto px-4 container">
            <UiBlurReveal :delay="0.3">
                <div class="mb-16 text-center">
                    <h2
                        class="bg-clip-text bg-linear-to-r from-primary-400 mb-4 font-bold text-transparent text-3xl md:text-4xl to-accent-400">
                        {{ $t('about.languages.title') }}
                    </h2>
                </div>

                <div class="gap-6 grid grid-cols-2 md:grid-cols-4 mx-auto max-w-4xl">
                    <UiBlurReveal v-for="(lang, index) in languages" :key="index"
                        :delay="0.2 + index * 0.1">
                        <UiCardSpotlight class="p-6 h-full"
                            spotlight-color="color-mix(in oklch, var(--color-accent-500) 15%, transparent)">
                            <div class="flex flex-col justify-center items-center h-full">
                                <div class="flex flex-col justify-center items-center bg-linear-to-br from-primary-500/20 mb-4 p-6 rounded-xl h-full to-accent-500/20"
                                    aria-hidden="true">
                                    <UIcon name="i-heroicons-language" class="text-primary-400" :size="22" />
                                </div>
                                <h3 class="mb-1 font-semibold text-highlighted text-lg">{{ lang.name }}</h3>
                                <p class="text-dimmed text-sm text-center">{{ lang.level }}</p>
                            </div>
                        </UiCardSpotlight>
                    </UiBlurReveal>
                </div>
            </UiBlurReveal>
        </div>
    </section>

    <!-- Experience Section with Timeline -->
    <section id="work-experience" class="relative py-24 overflow-hidden">
        <div class="absolute inset-0 bg-linear-to-b from-background via-background/95 to-background" />
        <UiMeteorEffect :count="10" color="var(--color-primary-500)" class="absolute inset-0" />

        <div class="z-10 relative mx-auto px-4 container">
            <UiBlurReveal :delay="0.3">
                <div class="mb-16 text-center">
                    <h2
                        class="bg-clip-text bg-linear-to-r from-primary-400 mb-4 font-bold text-transparent text-3xl md:text-4xl to-accent-400">
                        {{ $t('about.experience.title') }}
                    </h2>
                </div>
            </UiBlurReveal>

            <UiTimeline :items="experience" class="mx-auto max-w-4xl" />
        </div>
    </section>

    <!-- CTA Section -->
    <section class="relative py-24 overflow-hidden">
        <div class="absolute inset-0 bg-linear-to-t from-background via-background/95 to-background" />

        <div class="z-10 relative mx-auto px-4 container">
            <UiBlurReveal :delay="0.3">
                <AppContactCta :title="$t('about.cta.title')"
                    :description="$t('about.cta.description')"
                    :button-label="$t('about.cta.button')"
                    :to="localePath('/contact')" />
            </UiBlurReveal>
        </div>
    </section>

</template>
