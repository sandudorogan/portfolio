<script setup lang="ts">
const { t } = useI18n()

const form = reactive({
    name: '',
    email: '',
    subject: '',
    message: '',
    loading: false,
    success: false,
    error: false
});

const showConfetti = ref(false);

const contactInfo = computed(() => [
    {
        icon: 'i-heroicons-envelope',
        title: t('contact.info.email'),
        // Fetched on user interaction to avoid scraping
        revealEndpoint: '/api/reveal/email',
        placeholder: 'email@example.com',
        color: 'primary'
    },
    {
        icon: 'i-heroicons-phone',
        title: t('contact.info.phone'),
        // Fetched on user interaction to avoid scraping
        revealEndpoint: '/api/reveal/phone',
        placeholder: '+00 000 000 000',
        color: 'accent'
    },
    {
        icon: 'i-heroicons-map-pin',
        title: t('contact.info.location'),
        value: t('contact.info.locationValue'),
        color: 'secondary'
    }
]);

const socialLinks = [
    {
        name: 'GitHub',
        icon: 'i-simple-icons-github',
        url: 'https://github.com/sandudorogan'
    },
    {
        name: 'GitLab',
        icon: 'i-simple-icons-gitlab',
        url: 'https://gitlab.com/sdorogan-flexiana'
    },
    {
        name: 'LinkedIn',
        icon: 'i-simple-icons-linkedin',
        url: 'https://www.linkedin.com/in/sandu-dorogan'
    }
];

const handleSubmit = async () => {
    if (!form.name || !form.email || !form.message) {
        return;
    }

    form.loading = true;

    try {
        await $fetch('/api/contact', {
            method: 'POST',
            body: { name: form.name, email: form.email, subject: form.subject, message: form.message },
        });
        form.success = true;
        showConfetti.value = true;
        form.name = '';
        form.email = '';
        form.subject = '';
        form.message = '';
    } catch (e) {
        form.error = true;
    } finally {
        form.loading = false;

        setTimeout(() => {
            form.success = false;
            form.error = false;
            showConfetti.value = false;
        }, 5000);
    }
};

usePageSeo({
    title: () => t('contact.seo.title'),
    description: () => t('contact.seo.description')
})

// OG image must be defined at page level for static generation
defineOgImage({
    component: 'Default',
    props: {
        title: t('contact.og.title'),
        description: t('contact.og.description')
    }
})
</script>

<template>
    <!-- Confetti Effect -->
    <ClientOnly>
        <UiConfetti :active="showConfetti" :particle-count="100"
            :colors="['var(--color-primary-500)', 'var(--color-accent-500)', 'var(--color-secondary-500)']"
            :duration="4000" />
    </ClientOnly>

    <!-- Hero Section -->
    <section class="relative py-24 overflow-hidden">
        <UiAuroraBg class="absolute inset-0" :show-radial-gradient="true" />
        <div class="absolute inset-0 bg-white/30 dark:bg-black/30" />
        <UiMeteorEffect :count="10" color="var(--color-primary-500)" class="z-1 absolute inset-0" />

        <div class="z-10 relative mx-auto px-4 container">
            <UiBlurReveal :delay="0.2">
                <div class="mx-auto max-w-3xl text-center">
                    <h1
                        class="bg-clip-text bg-linear-to-r from-text-950 via-text-800 to-text-500 dark:from-white dark:via-neutral-200 dark:to-neutral-400 mb-4 font-bold text-transparent text-4xl md:text-5xl">
                        {{ $t('contact.hero.title') }}
                    </h1>
                    <p class="mx-auto max-w-xl text-muted text-lg">
                        {{ $t('contact.hero.subtitle') }}
                    </p>
                </div>
            </UiBlurReveal>
        </div>
    </section>

    <!-- Contact Section -->
    <section class="relative py-24 overflow-hidden">
        <div class="absolute inset-0 bg-linear-to-b from-background via-background-200/50 dark:via-neutral-900/50 to-background" />

        <div class="z-10 relative mx-auto px-4 container">
            <div class="gap-10 grid grid-cols-1 md:grid-cols-3">
                <!-- Contact Information -->
                <div class="space-y-8 md:col-span-1">
                    <UiBlurReveal :delay="0.3">
                        <h2 class="mb-6 font-semibold text-xl md:text-left text-center">
                            <span class="bg-clip-text bg-linear-to-r from-primary-400 text-transparent to-accent-400">
                                {{ $t('contact.info.title') }}
                            </span>
                        </h2>

                        <div class="space-y-4">
                            <UiCard3D v-for="(item, index) in contactInfo" :key="index" :rotation-factor="6"
                                :show-glare="false">
                                <UiCardSpotlight
                                    :spotlight-color="item.color === 'primary' ? 'color-mix(in oklch, var(--color-primary-500) 15%, transparent)' : item.color === 'accent' ? 'color-mix(in oklch, var(--color-accent-500) 15%, transparent)' : 'color-mix(in oklch, var(--color-secondary-500) 15%, transparent)'"
                                    class="p-0">
                                    <div class="flex items-start p-4">
                                        <div class="flex justify-center items-center mr-4 rounded-xl w-12 h-12" :class="{
                                            'bg-linear-to-br from-primary-500/20 to-primary-500/10': item.color === 'primary',
                                            'bg-linear-to-br from-accent-500/20 to-accent-500/10': item.color === 'accent',
                                            'bg-linear-to-br from-secondary-500/20 to-secondary-500/10': item.color === 'secondary'
                                        }">
                                            <UIcon :name="item.icon" class="w-6 h-6" :class="{
                                                'text-primary-400': item.color === 'primary',
                                                'text-accent-400': item.color === 'accent',
                                                'text-secondary-400': item.color === 'secondary'
                                            }" aria-hidden="true" />
                                        </div>
                                        <div>
                                            <h3 class="font-medium text-dimmed text-sm">{{ item.title }}</h3>
                                            <p class="mt-1">
                                                <!-- Reveal-on-click for email/phone (anti-scraper) -->
                                                <AppRevealContactValue v-if="item.revealEndpoint"
                                                    :endpoint="item.revealEndpoint" :placeholder="item.placeholder" />
                                                <!-- Static value for location -->
                                                <span v-else class="text-highlighted">{{ item.value }}</span>
                                            </p>
                                        </div>
                                    </div>
                                </UiCardSpotlight>
                            </UiCard3D>
                        </div>
                    </UiBlurReveal>

                    <UiBlurReveal :delay="0.4">
                        <h2 class="mb-6 font-semibold text-xl md:text-left text-center">
                            <span class="bg-clip-text bg-linear-to-r from-primary-400 text-transparent to-accent-400">
                                {{ $t('contact.social.title') }}
                            </span>
                        </h2>

                        <div class="flex flex-wrap justify-center md:justify-start gap-3">
                            <UiGlareCard v-for="link in socialLinks" :key="link.name" :glare-opacity="0.2"
                                class="group">
                                <a :href="link.url" target="_blank" rel="noopener noreferrer"
                                    :aria-label="$t('contact.social.visitProfile', { name: link.name })"
                                    class="flex justify-center items-center bg-elevated/80 border border-muted hover:border-primary-500/50 rounded-xl focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-inset w-12 h-12 transition-all duration-300">
                                    <UIcon :name="link.icon"
                                        class="w-5 h-5 text-dimmed group-hover:text-primary-400 transition-colors"
                                        aria-hidden="true" />
                                </a>
                            </UiGlareCard>
                        </div>
                    </UiBlurReveal>
                </div>

                <!-- Contact Form -->
                <div class="relative md:col-span-2">
                    <UiBlurReveal :delay="0.3">
                        <UiNeonBorder color="var(--color-primary-500)" :glow-intensity="10" class="relative">
                            <div class="bg-elevated/50 backdrop-blur-xs p-6 md:p-8 rounded-xl">
                                <h2 class="mb-6 font-semibold text-xl">
                                    <span class="text-highlighted">{{ $t('contact.form.title') }}</span>
                                </h2>

                                <form @submit.prevent="handleSubmit" class="space-y-6">
                                    <div class="gap-6 grid grid-cols-1 md:grid-cols-2">
                                        <UFormField :label="$t('contact.form.name')" name="name">
                                            <UInput v-model="form.name" :placeholder="$t('contact.form.namePlaceholder')" required class="w-full"
                                                :ui="{ base: 'bg-accented/50 border-muted focus:border-primary-500 transition-colors' }" />
                                        </UFormField>

                                        <UFormField :label="$t('contact.form.email')" name="email">
                                            <UInput v-model="form.email" type="email" :placeholder="$t('contact.form.emailPlaceholder')"
                                                required class="w-full"
                                                :ui="{ base: 'bg-accented/50 border-muted focus:border-primary-500 transition-colors' }" />
                                        </UFormField>
                                    </div>

                                    <UFormField :label="$t('contact.form.subject')" name="subject">
                                        <UInput v-model="form.subject" :placeholder="$t('contact.form.subjectPlaceholder')" class="w-full"
                                            :ui="{ base: 'bg-accented/50 border-muted focus:border-primary-500 transition-colors' }" />
                                    </UFormField>

                                    <UFormField :label="$t('contact.form.message')" name="message">
                                        <UTextarea v-model="form.message" :placeholder="$t('contact.form.messagePlaceholder')"
                                            :rows="5" required class="w-full"
                                            :ui="{ base: 'bg-accented/50 border-muted focus:border-primary-500 transition-colors' }" />
                                    </UFormField>

                                    <div>
                                        <UiShimmerButton type="submit" :disabled="form.loading"
                                            class="!px-8 w-full md:w-auto"
                                            shimmer-color="color-mix(in oklch, var(--color-primary-500) 30%, transparent)">
                                            <span v-if="form.loading" class="flex items-center gap-2">
                                                <UIcon name="i-heroicons-arrow-path" class="w-4 h-4 animate-spin"
                                                    aria-hidden="true" />
                                                {{ $t('contact.form.sending') }}
                                            </span>
                                            <span v-else class="flex items-center gap-2">
                                                <UIcon name="i-heroicons-paper-airplane" class="w-4 h-4"
                                                    aria-hidden="true" />
                                                {{ $t('contact.form.send') }}
                                            </span>
                                        </UiShimmerButton>

                                        <!-- Success Message -->
                                        <ClientOnly>
                                            <Motion v-if="form.success" tabindex="-1" role="status"
                                                :initial="{ opacity: 0, y: -10 }" :animate="{ opacity: 1, y: 0 }"
                                                :exit="{ opacity: 0, y: -10 }"
                                                class="bg-emerald-500/10 mt-4 p-4 border border-emerald-500/30 rounded-lg">
                                                <div class="flex items-center gap-3">
                                                    <div class="flex items-center justify-center bg-emerald-500/20 p-2 rounded-full" aria-hidden="true">
                                                        <UIcon name="i-heroicons-check-circle"
                                                            class="w-5 h-5 text-emerald-400" />
                                                    </div>
                                                    <div>
                                                        <h4 class="font-medium text-emerald-400">{{ $t('contact.success.title') }}</h4>
                                                        <p class="text-dimmed text-sm">{{ $t('contact.success.description') }}</p>
                                                    </div>
                                                </div>
                                            </Motion>

                                            <Motion v-if="form.error" tabindex="-1" role="alert"
                                                :initial="{ opacity: 0, y: -10 }" :animate="{ opacity: 1, y: 0 }"
                                                :exit="{ opacity: 0, y: -10 }"
                                                class="bg-red-500/10 mt-4 p-4 border border-red-500/30 rounded-lg">
                                                <div class="flex items-center gap-3">
                                                    <div class="flex items-center justify-center bg-red-500/20 p-2 rounded-full" aria-hidden="true">
                                                        <UIcon name="i-heroicons-exclamation-circle"
                                                            class="w-5 h-5 text-red-400" />
                                                    </div>
                                                    <div>
                                                        <h4 class="font-medium text-red-400">{{ $t('contact.error.title') }}</h4>
                                                        <p class="text-dimmed text-sm">{{ $t('contact.error.description') }}</p>
                                                    </div>
                                                </div>
                                            </Motion>
                                        </ClientOnly>
                                    </div>
                                </form>
                            </div>
                        </UiNeonBorder>
                    </UiBlurReveal>
                </div>
            </div>
        </div>
    </section>

    <!-- Map Section -->
    <section class="relative py-24 overflow-hidden">
        <div class="absolute inset-0 bg-linear-to-t from-background via-background/95 to-background" />

        <div class="z-10 relative mx-auto px-4 container">
            <UiBlurReveal :delay="0.3">
                <UiCard3D :rotation-factor="0" :show-glare="true" :glare-opacity="0.1">
                    <div class="border border-muted rounded-xl h-80 overflow-hidden">
                        <AppBucharestMap />
                    </div>
                </UiCard3D>
            </UiBlurReveal>
        </div>
    </section>

</template>

<script lang="ts">
import { Motion } from 'motion-v'

export default {
    components: {
        Motion
    }
}
</script>
