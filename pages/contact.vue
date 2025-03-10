<script setup lang="ts">
// Form data
const form = reactive({
    name: '',
    email: '',
    subject: '',
    message: '',
    loading: false,
    success: false,
    error: false
});

// Contact information
const contactInfo = [
    {
        icon: 'i-heroicons-envelope',
        title: 'Email',
        value: 'contact@example.com',
        link: 'mailto:contact@example.com'
    },
    {
        icon: 'i-heroicons-phone',
        title: 'Phone',
        value: '+1 (555) 123-4567',
        link: 'tel:+15551234567'
    },
    {
        icon: 'i-heroicons-map-pin',
        title: 'Location',
        value: 'San Francisco, CA',
        link: null
    }
];

// Social links
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

// Handle form submission
const handleSubmit = async () => {
    if (!form.name || !form.email || !form.message) {
        return;
    }

    form.loading = true;

    // Simulate form submission (in a real application, you would send this to a server)
    try {
        await new Promise(resolve => setTimeout(resolve, 1500));
        form.success = true;
        form.name = '';
        form.email = '';
        form.subject = '';
        form.message = '';
    } catch (e) {
        form.error = true;
    } finally {
        form.loading = false;

        // Reset success/error messages after some time
        setTimeout(() => {
            form.success = false;
            form.error = false;
        }, 5000);
    }
};

// Meta for SEO
useHead({
    title: 'Contact Me | Portfolio',
    meta: [
        { name: 'description', content: 'Get in touch with me to discuss your project or collaboration opportunities.' }
    ]
});
</script>

<template>
    <div class="pt-16">
        <!-- Hero Section -->
        <section class="relative py-20 bg-gradient-to-b from-background to-background/80">
            <div class="container px-4 mx-auto">
                <UiBlurReveal :delay="0.2">
                    <div class="max-w-3xl mx-auto text-center">
                        <h1 class="mb-4 text-3xl font-bold md:text-4xl">Get In Touch</h1>
                        <p class="max-w-xl mx-auto mb-8 text-neutral-300">
                            Have a project in mind or want to discuss a potential collaboration? Feel free to reach out
                            through the form below or via any of my contact details.
                        </p>
                    </div>
                </UiBlurReveal>
            </div>
        </section>

        <!-- Contact Section -->
        <section class="py-16 bg-gradient-to-b from-background/80 to-background">
            <div class="container px-4 mx-auto">
                <div class="grid grid-cols-1 gap-10 md:grid-cols-3">
                    <!-- Contact Information -->
                    <div class="space-y-10 md:col-span-1">
                        <UiBlurReveal :delay="0.3">
                            <h2 class="mb-6 text-xl font-semibold">Contact Information</h2>

                            <div class="space-y-4">
                                <div v-for="(item, index) in contactInfo" :key="index"
                                    class="flex items-start p-4 transition-all duration-300 border rounded-lg hover:border-primary bg-background/50">
                                    <div
                                        class="flex items-center justify-center w-10 h-10 mr-4 rounded-full bg-primary/10">
                                        <UIcon :name="item.icon" class="w-5 h-5 text-primary" />
                                    </div>
                                    <div>
                                        <h3 class="text-sm font-medium text-neutral-400">{{ item.title }}</h3>
                                        <p v-if="item.link" class="mt-1 transition-colors hover:text-primary">
                                            <a :href="item.link">{{ item.value }}</a>
                                        </p>
                                        <p v-else class="mt-1">{{ item.value }}</p>
                                    </div>
                                </div>
                            </div>
                        </UiBlurReveal>

                        <UiBlurReveal :delay="0.4">
                            <h2 class="mb-6 text-xl font-semibold">Follow Me</h2>

                            <div class="flex flex-wrap gap-3">
                                <UButton v-for="link in socialLinks" :key="link.name" :icon="link.icon" color="gray"
                                    variant="ghost" :to="link.url" target="_blank" class="hover:text-primary" />
                            </div>
                        </UiBlurReveal>
                    </div>

                    <!-- Contact Form -->
                    <div class="relative md:col-span-2">
                        <UiBlurReveal :delay="0.3">
                            <div class="p-6 border rounded-lg md:p-8 bg-background/50">
                                <h2 class="mb-6 text-xl font-semibold">Send a Message</h2>

                                <form @submit.prevent="handleSubmit">
                                    <div class="grid grid-cols-1 gap-6 mb-6 md:grid-cols-2">
                                        <UFormGroup label="Your Name">
                                            <UInput v-model="form.name" placeholder="John Doe" required />
                                        </UFormGroup>

                                        <UFormGroup label="Your Email">
                                            <UInput v-model="form.email" type="email" placeholder="john@example.com"
                                                required />
                                        </UFormGroup>
                                    </div>

                                    <UFormGroup label="Subject" class="mb-6">
                                        <UInput v-model="form.subject" placeholder="Project Inquiry" />
                                    </UFormGroup>

                                    <UFormGroup label="Message" class="mb-6">
                                        <UTextarea v-model="form.message" placeholder="Tell me about your project..."
                                            :rows="5" required />
                                    </UFormGroup>

                                    <div>
                                        <UButton type="submit" :loading="form.loading" :disabled="form.loading"
                                            class="w-full md:w-auto">
                                            Send Message
                                        </UButton>

                                        <UAlert v-if="form.success" class="mt-4" color="green" variant="soft"
                                            icon="i-heroicons-check-circle" title="Message Sent!"
                                            description="Thanks for reaching out. I'll get back to you as soon as possible." />

                                        <UAlert v-if="form.error" class="mt-4" color="red" variant="soft"
                                            icon="i-heroicons-exclamation-circle" title="Error"
                                            description="Something went wrong. Please try again later." />
                                    </div>
                                </form>
                            </div>
                        </UiBlurReveal>

                        <UiBorderBeam :size="300" :duration="15" :delay="2" :border-width="2" />
                    </div>
                </div>
            </div>
        </section>

        <!-- Map Section (Placeholder) -->
        <section class="py-16 bg-gradient-to-t from-background to-background/80">
            <div class="container px-4 mx-auto">
                <UiBlurReveal :delay="0.3">
                    <div class="overflow-hidden border rounded-lg h-80 bg-background/30">
                        <div
                            class="flex items-center justify-center h-full bg-gradient-to-br from-primary/5 to-secondary/5">
                            <div class="text-center">
                                <UIcon name="i-heroicons-map" class="w-12 h-12 mx-auto mb-4 text-primary/20" />
                                <p class="text-neutral-400">Map Placeholder</p>
                            </div>
                        </div>
                    </div>
                </UiBlurReveal>
            </div>
        </section>
    </div>
</template>

<style scoped>
/* Add any custom styles here */
</style>