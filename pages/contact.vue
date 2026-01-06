<script setup lang="ts">
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

const contactInfo = [
    {
        icon: 'i-heroicons-envelope',
        title: 'Email',
        value: 'contact@example.com',
        link: 'mailto:contact@example.com',
        color: 'primary'
    },
    {
        icon: 'i-heroicons-phone',
        title: 'Phone',
        value: '+1 (555) 123-4567',
        link: 'tel:+15551234567',
        color: 'accent'
    },
    {
        icon: 'i-heroicons-map-pin',
        title: 'Location',
        value: 'San Francisco, CA',
        link: null,
        color: 'secondary'
    }
];

const socialLinks = [
    {
        name: 'GitHub',
        icon: 'i-simple-icons-github',
        url: 'https://github.com'
    },
    {
        name: 'LinkedIn',
        icon: 'i-simple-icons-linkedin',
        url: 'https://linkedin.com'
    },
    {
        name: 'Twitter',
        icon: 'i-simple-icons-twitter',
        url: 'https://twitter.com'
    }
];

const handleSubmit = async () => {
    if (!form.name || !form.email || !form.message) {
        return;
    }

    form.loading = true;

    try {
        await new Promise(resolve => setTimeout(resolve, 1500));
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

useHead({
    title: 'Contact Me | Portfolio',
    meta: [
        { name: 'description', content: 'Get in touch with me to discuss your project or collaboration opportunities.' }
    ]
});
</script>

<template>
    <div class="pt-16">
        <!-- Confetti Effect -->
        <ClientOnly>
            <UiConfetti
                :active="showConfetti"
                :particle-count="100"
                :colors="['rgb(var(--primary-500))', 'rgb(var(--accent-500))', 'rgb(var(--secondary-500))']"
                :duration="4000"
            />
        </ClientOnly>

        <!-- Hero Section -->
        <section class="relative py-24 overflow-hidden">
            <UiAuroraBg class="absolute inset-0" :show-radial-gradient="true" />
            <div class="absolute inset-0 bg-black/30" />
            <UiMeteorEffect :count="10" color="rgb(var(--primary-500))" class="absolute inset-0 z-[1]" />

            <div class="relative z-10 mx-auto px-4 container">
                <UiBlurReveal :delay="0.2">
                    <div class="max-w-3xl mx-auto text-center">
                        <UiSparklesText :sparkle-count="12" :colors="['rgb(var(--primary-500))', 'rgb(var(--accent-500))']">
                            <h1 class="mb-4 text-4xl md:text-5xl font-bold bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-neutral-400 text-transparent">
                                Get In Touch
                            </h1>
                        </UiSparklesText>
                        <p class="max-w-xl mx-auto text-neutral-300 text-lg">
                            Have a project in mind or want to discuss a potential collaboration? Feel free to reach out
                            through the form below or via any of my contact details.
                        </p>
                    </div>
                </UiBlurReveal>
            </div>
        </section>

        <!-- Contact Section -->
        <section class="relative py-24 overflow-hidden">
            <div class="absolute inset-0 bg-gradient-to-b from-background via-neutral-900/50 to-background" />

            <div class="relative z-10 mx-auto px-4 container">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-10">
                    <!-- Contact Information -->
                    <div class="space-y-8 md:col-span-1">
                        <UiBlurReveal :delay="0.3">
                            <h2 class="mb-6 text-xl font-semibold">
                                <span class="bg-clip-text bg-gradient-to-r from-primary-400 to-accent-400 text-transparent">
                                    Contact Information
                                </span>
                            </h2>

                            <div class="space-y-4">
                                <UiCard3D
                                    v-for="(item, index) in contactInfo"
                                    :key="index"
                                    :rotation-factor="6"
                                    :show-glare="true"
                                    :glare-opacity="0.1"
                                >
                                    <UiCardSpotlight
                                        :spotlight-color="item.color === 'primary' ? 'rgb(var(--primary-500) / 0.15)' : item.color === 'accent' ? 'rgb(var(--accent-500) / 0.15)' : 'rgb(var(--secondary-500) / 0.15)'"
                                        class="p-0"
                                    >
                                        <div class="flex items-start p-4">
                                            <div
                                                class="flex items-center justify-center w-12 h-12 mr-4 rounded-xl"
                                                :class="{
                                                    'bg-gradient-to-br from-primary-500/20 to-primary-500/10': item.color === 'primary',
                                                    'bg-gradient-to-br from-accent-500/20 to-accent-500/10': item.color === 'accent',
                                                    'bg-gradient-to-br from-secondary-500/20 to-secondary-500/10': item.color === 'secondary'
                                                }"
                                            >
                                                <UIcon
                                                    :name="item.icon"
                                                    class="w-6 h-6"
                                                    :class="{
                                                        'text-primary-400': item.color === 'primary',
                                                        'text-accent-400': item.color === 'accent',
                                                        'text-secondary-400': item.color === 'secondary'
                                                    }"
                                                />
                                            </div>
                                            <div>
                                                <h3 class="text-sm font-medium text-neutral-400">{{ item.title }}</h3>
                                                <p v-if="item.link" class="mt-1 text-white hover:text-primary-400 transition-colors">
                                                    <a :href="item.link">{{ item.value }}</a>
                                                </p>
                                                <p v-else class="mt-1 text-white">{{ item.value }}</p>
                                            </div>
                                        </div>
                                    </UiCardSpotlight>
                                </UiCard3D>
                            </div>
                        </UiBlurReveal>

                        <UiBlurReveal :delay="0.4">
                            <h2 class="mb-6 text-xl font-semibold">
                                <span class="bg-clip-text bg-gradient-to-r from-primary-400 to-accent-400 text-transparent">
                                    Follow Me
                                </span>
                            </h2>

                            <div class="flex flex-wrap gap-3">
                                <UiGlareCard
                                    v-for="link in socialLinks"
                                    :key="link.name"
                                    :glare-opacity="0.2"
                                    class="group"
                                >
                                    <a
                                        :href="link.url"
                                        target="_blank"
                                        class="flex items-center justify-center w-12 h-12 rounded-xl bg-neutral-900/80 border border-neutral-700/50 hover:border-primary-500/50 transition-all duration-300"
                                    >
                                        <UIcon :name="link.icon" class="w-5 h-5 text-neutral-400 group-hover:text-primary-400 transition-colors" />
                                    </a>
                                </UiGlareCard>
                            </div>
                        </UiBlurReveal>
                    </div>

                    <!-- Contact Form -->
                    <div class="relative md:col-span-2">
                        <UiBlurReveal :delay="0.3">
                            <UiNeonBorder color="rgb(var(--primary-500))" :glow-intensity="10" class="relative">
                                <div class="p-6 md:p-8 rounded-xl bg-neutral-900/50 backdrop-blur-sm">
                                    <h2 class="mb-6 text-xl font-semibold">
                                        <UiSparklesText :sparkle-count="6" :colors="['rgb(var(--primary-500))', 'rgb(var(--accent-500))']">
                                            <span class="text-white">Send a Message</span>
                                        </UiSparklesText>
                                    </h2>

                                    <form @submit.prevent="handleSubmit" class="space-y-6">
                                        <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
                                            <UFormGroup label="Your Name">
                                                <UInput
                                                    v-model="form.name"
                                                    placeholder="John Doe"
                                                    required
                                                    class="bg-neutral-800/50 border-neutral-700 focus:border-primary-500 transition-colors"
                                                />
                                            </UFormGroup>

                                            <UFormGroup label="Your Email">
                                                <UInput
                                                    v-model="form.email"
                                                    type="email"
                                                    placeholder="john@example.com"
                                                    required
                                                    class="bg-neutral-800/50 border-neutral-700 focus:border-primary-500 transition-colors"
                                                />
                                            </UFormGroup>
                                        </div>

                                        <UFormGroup label="Subject">
                                            <UInput
                                                v-model="form.subject"
                                                placeholder="Project Inquiry"
                                                class="bg-neutral-800/50 border-neutral-700 focus:border-primary-500 transition-colors"
                                            />
                                        </UFormGroup>

                                        <UFormGroup label="Message">
                                            <UTextarea
                                                v-model="form.message"
                                                placeholder="Tell me about your project..."
                                                :rows="5"
                                                required
                                                class="bg-neutral-800/50 border-neutral-700 focus:border-primary-500 transition-colors"
                                            />
                                        </UFormGroup>

                                        <div>
                                            <UiShimmerButton
                                                type="submit"
                                                :disabled="form.loading"
                                                class="w-full md:w-auto !px-8"
                                                shimmer-color="rgb(var(--primary-500) / 0.3)"
                                            >
                                                <span v-if="form.loading" class="flex items-center gap-2">
                                                    <UIcon name="i-heroicons-arrow-path" class="w-4 h-4 animate-spin" />
                                                    Sending...
                                                </span>
                                                <span v-else class="flex items-center gap-2">
                                                    <UIcon name="i-heroicons-paper-airplane" class="w-4 h-4" />
                                                    Send Message
                                                </span>
                                            </UiShimmerButton>

                                            <!-- Success Message -->
                                            <ClientOnly>
                                                <Motion
                                                    v-if="form.success"
                                                    :initial="{ opacity: 0, y: -10 }"
                                                    :animate="{ opacity: 1, y: 0 }"
                                                    :exit="{ opacity: 0, y: -10 }"
                                                    class="mt-4 p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/30"
                                                >
                                                    <div class="flex items-center gap-3">
                                                        <div class="p-2 rounded-full bg-emerald-500/20">
                                                            <UIcon name="i-heroicons-check-circle" class="w-5 h-5 text-emerald-400" />
                                                        </div>
                                                        <div>
                                                            <h4 class="font-medium text-emerald-400">Message Sent!</h4>
                                                            <p class="text-sm text-neutral-400">Thanks for reaching out. I'll get back to you soon.</p>
                                                        </div>
                                                    </div>
                                                </Motion>

                                                <Motion
                                                    v-if="form.error"
                                                    :initial="{ opacity: 0, y: -10 }"
                                                    :animate="{ opacity: 1, y: 0 }"
                                                    :exit="{ opacity: 0, y: -10 }"
                                                    class="mt-4 p-4 rounded-lg bg-red-500/10 border border-red-500/30"
                                                >
                                                    <div class="flex items-center gap-3">
                                                        <div class="p-2 rounded-full bg-red-500/20">
                                                            <UIcon name="i-heroicons-exclamation-circle" class="w-5 h-5 text-red-400" />
                                                        </div>
                                                        <div>
                                                            <h4 class="font-medium text-red-400">Error</h4>
                                                            <p class="text-sm text-neutral-400">Something went wrong. Please try again later.</p>
                                                        </div>
                                                    </div>
                                                </Motion>
                                            </ClientOnly>
                                        </div>
                                    </form>
                                </div>

                                <UiBorderBeam :size="300" :duration="12" color-from="rgb(var(--primary-500))" color-to="rgb(var(--accent-500))" />
                            </UiNeonBorder>
                        </UiBlurReveal>
                    </div>
                </div>
            </div>
        </section>

        <!-- Map Section -->
        <section class="relative py-24 overflow-hidden">
            <div class="absolute inset-0 bg-gradient-to-t from-background via-background/95 to-background" />

            <div class="relative z-10 mx-auto px-4 container">
                <UiBlurReveal :delay="0.3">
                    <UiCard3D :rotation-factor="5" :show-glare="true" :glare-opacity="0.1">
                        <div class="overflow-hidden rounded-xl border border-neutral-700/50 h-80">
                            <div class="flex items-center justify-center h-full bg-gradient-to-br from-primary-500/5 via-neutral-900/80 to-accent-500/5">
                                <div class="text-center">
                                    <div class="mb-4 p-4 rounded-full bg-neutral-800/50 inline-block">
                                        <UIcon name="i-heroicons-map" class="w-12 h-12 text-primary-400/50" />
                                    </div>
                                    <p class="text-neutral-400">Interactive Map Coming Soon</p>
                                    <p class="text-sm text-neutral-500 mt-2">San Francisco, CA</p>
                                </div>
                            </div>
                        </div>
                    </UiCard3D>
                </UiBlurReveal>
            </div>
        </section>
    </div>
</template>

<script lang="ts">
import {Motion} from 'motion-v'

export default {
    components: {
        Motion
    }
}
</script>

<style scoped>
/* Input focus styles */
:deep(.ui-input:focus) {
    border-color: rgb(var(--primary-500));
    box-shadow: 0 0 0 2px rgb(var(--primary-500) / 0.2);
}
</style>
