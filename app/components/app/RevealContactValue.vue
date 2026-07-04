<script setup lang="ts">
interface Props {
  /** API endpoint to fetch the value from, e.g. '/api/reveal/email' */
  endpoint: string
  /** Placeholder text shown while blurred (does not reveal real info) */
  placeholder?: string
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: '••••••••••••',
})

const { t } = useI18n()

const revealed = ref(false)
const loading = ref(false)
const error = ref(false)
const data = ref<{ value: string, link: string } | null>(null)

async function reveal() {
  if (revealed.value || loading.value) return

  loading.value = true
  error.value = false

  try {
    data.value = await $fetch<{ value: string, link: string }>(props.endpoint)
    revealed.value = true
  }
  catch {
    error.value = true
  }
  finally {
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
  <span class="reveal-wrap">
    <Transition name="reveal" mode="out-in">
      <!-- Revealed state: normal link -->
      <a
        v-if="revealed && data"
        key="revealed"
        :href="data.link"
        class="reveal-link"
      >
        {{ data.value }}
      </a>

      <!-- Loading state -->
      <span
        v-else-if="loading"
        key="loading"
        class="reveal-loading"
        aria-live="polite"
      >
        <UIcon name="i-heroicons-arrow-path" class="w-3.5 h-3.5 animate-spin" aria-hidden="true" />
        {{ t('reveal.revealing') }}
      </span>

      <!-- Error state -->
      <button
        v-else-if="error"
        key="error"
        type="button"
        class="reveal-error"
        :title="t('reveal.retry')"
        @click="reveal"
        @keydown="handleKeydown"
      >
        {{ t('reveal.failed') }}
      </button>

      <!-- Blurred placeholder (initial state) -->
      <button
        v-else
        key="placeholder"
        type="button"
        :title="t('reveal.clickToReveal')"
        class="reveal-placeholder"
        :aria-label="t('reveal.clickToRevealAria')"
        @click="reveal"
        @keydown="handleKeydown"
      >
        <span aria-hidden="true">{{ placeholder }}</span>
      </button>
    </Transition>
  </span>
</template>

<style scoped>
.reveal-wrap {
  display: inline-block;
}

.reveal-link {
  color: var(--ink);
  text-decoration: underline;
  text-decoration-thickness: 2px;
  text-underline-offset: 3px;
  text-decoration-color: var(--shock);
  transition: color 0.1s;
}

.reveal-link:hover {
  color: var(--shock);
}

.reveal-loading {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  color: #6d6860;
  font-size: 0.85rem;
}

.reveal-error {
  color: var(--shock);
  font-weight: 700;
  cursor: pointer;
  background: none;
  border: none;
  padding: 0;
}

.reveal-placeholder {
  filter: blur(4px);
  color: var(--ink);
  cursor: pointer;
  user-select: none;
  background: none;
  border: none;
  padding: 0;
  transition: filter 0.2s;
}

.reveal-placeholder:hover {
  filter: blur(3px);
}

.reveal-link:focus-visible,
.reveal-error:focus-visible,
.reveal-placeholder:focus-visible {
  outline: 3px solid var(--shock);
  outline-offset: 3px;
}

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
