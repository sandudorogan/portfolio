<script setup lang="ts">
// Shell of the Retro OS pages: menu bar, desktop icons, desk grid and control strip.
// Pages fill the desk with <AppWindow>s. Styles live in ~/assets/css/os.css.
import { deskKey } from '~/composables/useDesktop'

const props = defineProps<{
  /** True on /ai, where section links leave the page. */
  ai?: boolean
}>()

const { t, locale } = useI18n()
const localePath = useLocalePath()
const switchLocalePath = useSwitchLocalePath()

provide(deskKey, useDesktop())

const home = !props.ai
const otherLocale = computed(() => (locale.value === 'en' ? 'ro' : 'en'))
const at = (hash: string) => ({ to: home ? hash : `${localePath('/')}${hash}`, external: home })
const lab = computed(() => ({ to: localePath('/ai'), external: false }))

const sections = ['services', 'work', 'experience', 'contact']

const menus = computed(() => [
  ...sections.map(id => ({ label: t(`nav.${id}`), ...at(`#${id}`) })),
  { label: t('nav.ai'), ...lab.value },
])

const shortcuts = computed(() => [
  { label: t('desktop.disk'), icon: 'disk', ...at('#top') },
  ...sections.map(id => ({ label: t(`nav.${id}`), icon: 'folder', ...at(`#${id}`) })),
  { label: t('desktop.lab'), icon: 'chip', ...lab.value },
])

const picked = ref('')
const clock = ref('')

let timer: ReturnType<typeof setInterval> | undefined

onMounted(() => {
  const fmt = new Intl.DateTimeFormat(locale.value === 'ro' ? 'ro-RO' : 'en-GB', { timeZone: 'Europe/Bucharest', hour: '2-digit', minute: '2-digit' })
  const tick = () => {
    clock.value = fmt.format(new Date())
  }
  tick()
  timer = setInterval(tick, 15_000)
})

onBeforeUnmount(() => clearInterval(timer))
</script>

<template>
  <div id="top" class="os">
    <a href="#main" class="os-skip">{{ t('skipToContent') }}</a>

    <header class="os-menubar">
      <NuxtLink v-bind="at('#top')" class="os-logo" :aria-label="t('desktop.home')">
        <svg viewBox="0 0 9 9" shape-rendering="crispEdges" aria-hidden="true">
          <rect width="9" height="9" fill="var(--accent)" />
          <path d="M3 1h4v1H3zM2 2h1v2H2zM3 4h3v1H3zM6 5h1v2H6zM2 7h4v1H2z" fill="#fff" />
        </svg>
      </NuxtLink>
      <span class="os-appname" aria-hidden="true">Sandu</span>
      <nav :aria-label="t('nav.ariaLabel')" class="os-menus">
        <NuxtLink
          v-for="link in menus"
          :key="link.label"
          :to="link.to"
          :external="link.external"
          class="os-menu"
        >
          {{ link.label }}
        </NuxtLink>
      </nav>
      <p class="os-clock">
        <svg viewBox="0 0 9 9" shape-rendering="crispEdges" aria-hidden="true">
          <path d="M2.5.5h4l2 2v4l-2 2h-4l-2-2v-4z" fill="#fff" stroke="#000" />
          <path d="M4 2h1v3H4zM5 4h2v1H5z" />
        </svg>
        {{ t('desktop.city') }}<span v-if="clock" class="os-clock-time">{{ clock }}</span>
      </p>
      <NuxtLink
        :to="switchLocalePath(otherLocale)"
        class="os-menu os-lang"
        :aria-label="t('lang.switchAria')"
      >
        {{ t('lang.switchTo') }}
      </NuxtLink>
    </header>

    <nav class="os-icons" :aria-label="t('desktop.shortcuts')">
      <NuxtLink
        v-for="item in shortcuts"
        :key="item.label"
        :to="item.to"
        :external="item.external"
        class="os-icon"
        :class="{ 'is-picked': picked === item.label }"
        @click="picked = item.label"
      >
        <svg viewBox="0 0 16 16" shape-rendering="crispEdges" aria-hidden="true">
          <template v-if="item.icon === 'disk'">
            <path d="M.5 5.5h15v6H.5z" fill="#ddd" stroke="#000" />
            <path d="M1.5 6.5h13" stroke="#fff" />
            <path d="M2.5 9.5h2" stroke="var(--accent)" />
            <path d="M9.5 9.5h4" stroke="#888" />
          </template>
          <template v-else-if="item.icon === 'chip'">
            <path d="M5.5 .5v3M10.5 .5v3M5.5 12.5v3M10.5 12.5v3M.5 5.5h3M.5 10.5h3M12.5 5.5h3M12.5 10.5h3" stroke="#000" />
            <path d="M3.5 3.5h9v9h-9z" fill="var(--lav)" stroke="#000" />
            <path d="M6.5 6.5h3v3h-3z" fill="var(--accent)" stroke="#000" />
          </template>
          <template v-else>
            <path d="M.5 3.5h5l1 1h8v9H.5z" fill="var(--lav)" stroke="#000" />
            <path d="M.5 5.5h15" stroke="#000" />
          </template>
        </svg>
        <span class="os-icon-label">{{ item.label }}</span>
      </NuxtLink>
    </nav>

    <main id="main" class="os-desk" tabindex="-1">
      <slot />
    </main>

    <footer class="os-foot">
      <p class="os-strip">
        <span class="os-strip-tab" aria-hidden="true" />
        <span class="os-strip-cell">{{ t('desktop.rights', { year: new Date().getFullYear() }) }}</span>
        <span class="os-strip-cell">{{ t('about.location') }}</span>
        <span class="os-strip-cell">Sandu OS 8</span>
        <span class="os-strip-end" aria-hidden="true" />
      </p>
    </footer>
  </div>
</template>
