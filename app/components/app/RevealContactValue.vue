<script setup lang="ts">
interface Props {
  /** API endpoint to fetch the value from, e.g. '/api/reveal/email' */
  endpoint: string
  /** Placeholder text shown while blurred (does not reveal real info) */
  placeholder?: string
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: '••••••••••••'
})

const { t } = useI18n()

const revealed = ref(false)
const loading = ref(false)
const error = ref(false)
const data = ref<{ value: string; link: string } | null>(null)

async function reveal() {
  if (revealed.value || loading.value) return

  loading.value = true
  error.value = false

  try {
    data.value = await $fetch<{ value: string; link: string }>(props.endpoint)
    revealed.value = true
  } catch {
    error.value = true
  } finally {
    loading.value = false
  }
}

function handleKeydown(e: KeyboardEvent) {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault()
    reveal()
  }
}
</script>

<template>
  <span class="inline-block">
    <Transition name="reveal" mode="out-in">
      <!-- Revealed state: normal link -->
      <a v-if="revealed && data" key="revealed" :href="data.link"
        class="rounded focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-primary-500 text-highlighted hover:text-primary-400 transition-colors">
        {{ data.value }}
      </a>

      <!-- Loading state -->
      <span v-else-if="loading" key="loading" class="inline-flex items-center gap-1.5 text-dimmed"
        aria-live="polite">
        <UIcon name="i-heroicons-arrow-path" class="w-3.5 h-3.5 animate-spin" aria-hidden="true" />
        <span class="text-sm">{{ t('reveal.revealing') }}</span>
      </span>

      <!-- Error state -->
      <button v-else-if="error" key="error" type="button"
        class="rounded focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-red-500 text-red-400 hover:text-red-300 transition-colors cursor-pointer"
        :title="t('reveal.retry')" @click="reveal" @keydown="handleKeydown">
        {{ t('reveal.failed') }}
      </button>

      <!-- Blurred placeholder (initial state) -->
      <button v-else key="placeholder" type="button" :title="t('reveal.clickToReveal')"
        class="blur-xs hover:blur-[3px] rounded focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-primary-500 text-highlighted transition-all duration-200 cursor-pointer select-none"
        :aria-label="t('reveal.clickToRevealAria')" @click="reveal" @keydown="handleKeydown">
        {{ placeholder }}
      </button>
    </Transition>
  </span>
</template>

<style scoped>
.reveal-enter-active,
.reveal-leave-active {
  transition: transform 0.2s ease, filter 0.2s ease;
}

.reveal-enter-from {
  transform: scale(0.8);
  filter: blur(4px);
}

.reveal-leave-to {
  transform: scale(0.8);
}
</style>
