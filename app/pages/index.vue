<script setup lang="ts">
definePageMeta({ layout: false })

const { t, tm, rt, locale } = useI18n()
const localePath = useLocalePath()

usePageSeo({
  title: () => t('seo.title'),
  description: () => t('seo.description'),
})

const since = 2018

const glyphs = [
  { d: 'M5.5 4.5 2.5 8l3 3.5M10.5 4.5l3 3.5-3 3.5', fill: 'none' },
  { d: 'M4.5 2.5v10l2.5-2.5 2 4 1.5-.5-2-4h3.5z', fill: 'var(--lav)' },
  { d: 'M8 2.5 12.5 7H10v4.5H6V7H3.5zM3.5 13.5h9', fill: 'var(--lav)' },
  { d: 'M1.5 3.5h13v7h-7l-3 3v-3h-3z', fill: 'var(--lav)' },
]

// Proper nouns and numbers stay in code; their labels and copy come from i18n
const stack = ['JavaScript', 'TypeScript', 'Nuxt', 'Vue', 'React', 'Python', 'Clojure', 'ClojureScript', 'Docker', 'AWS', 'LLMs']

const projectMeta = [
  { title: 'IPRally', url: 'https://iprally.com', tags: ['Clojure', 'CLJS', 'GCP'] },
  { title: 'Crossbeam', url: 'https://partnerbase.com', tags: ['Nuxt', 'Clojure', 'AWS'] },
  { title: 'Newsroom AI', url: 'https://nws.ai', tags: ['CLJS', 'Django', 'AWS'] },
]

const companies = ['IPRally', 'Crossbeam', 'Flexiana', 'Newsroom AI', 'Ubisoft']

const socialLinks = [
  { name: 'GitHub', url: 'https://github.com/sandudorogan' },
  { name: 'GitLab', url: 'https://gitlab.com/sdorogan-flexiana' },
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/sandu-dorogan' },
]

const statValues = [8, 5, 11]
const peak = Math.max(...statValues)
const labValues = [0, 2]

const stats = computed(() => {
  const labels = tm('info.stats') as string[]
  return statValues.map((value, i) => ({ value, label: rt(labels[i] ?? '') }))
})

// OG image (nuxt-og-image) — defined at page level for static generation
defineOgImage({
  component: 'Default',
  props: {
    window: t('about.title'),
    infoWindow: t('info.title'),
    role: `${t('about.role')} — ${t('about.location')}`,
    description: t('seo.ogDescription'),
    stats: stats.value,
    menus: ['services', 'work', 'experience', 'contact', 'ai'].map(key => t(`nav.${key}`)),
  },
})

const labStats = computed(() => {
  const labels = tm('ai.stats') as string[]
  return labValues.map(i => ({ value: aiStatValues[i], label: rt(labels[i] ?? '') }))
})

const services = computed(() => {
  const items = tm('services.items') as Array<{ title: string, description: string }>
  return items.map(item => ({
    title: rt(item.title),
    description: rt(item.description),
  }))
})

const projects = computed(() => {
  const items = tm('work.items') as Array<{ subtitle: string, description: string }>
  return projectMeta.map((meta, i) => ({
    ...meta,
    subtitle: rt(items[i]?.subtitle ?? ''),
    description: rt(items[i]?.description ?? ''),
  }))
})

const experience = computed(() => {
  const items = tm('experience.items') as Array<{ date: string, role: string }>
  return companies.map((company, i) => ({
    company,
    date: rt(items[i]?.date ?? ''),
    role: rt(items[i]?.role ?? ''),
  }))
})

const picked = ref('')

// Person + WebSite structured data for Google (JSON-LD).
// Email intentionally omitted to prevent scraping; sameAs links the public profiles.
const runtimeConfig = useRuntimeConfig()
const siteUrl = ((runtimeConfig.public.siteUrl as string) || 'https://dorogans.com').replace(/\/$/, '')

useHead(() => ({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'Person',
            '@id': `${siteUrl}/#person`,
            'name': 'Sandu Dorogan',
            'jobTitle': t('seo.jobTitle'),
            'url': siteUrl,
            'image': `${siteUrl}/images/sandu-dorogan.webp`,
            'address': {
              '@type': 'PostalAddress',
              'addressLocality': 'Bucharest',
              'addressCountry': 'RO',
            },
            'knowsAbout': ['Clojure', 'ClojureScript', 'TypeScript', 'Vue', 'Nuxt', 'React', 'Python', 'AWS', 'Google Cloud'],
            'sameAs': socialLinks.map(link => link.url),
          },
          {
            '@type': 'WebSite',
            '@id': `${siteUrl}/#website`,
            'url': siteUrl,
            'name': 'Sandu Dorogan',
            'inLanguage': locale.value === 'ro' ? 'ro-RO' : 'en-US',
            'publisher': { '@id': `${siteUrl}/#person` },
          },
        ],
      }),
    },
  ],
}))
</script>

<template>
  <AppDesktop>
    <AppWindow
      win="about"
      :title="t('about.title')"
      :heading="false"
      class="os-w-about"
      aria-labelledby="os-name"
    >
      <div class="os-pane os-about">
        <svg
          class="os-about-icon"
          viewBox="0 0 32 32"
          shape-rendering="crispEdges"
          aria-hidden="true"
        >
          <path d="M3.5 1.5h25v21h-25z" fill="#ddd" stroke="#000" />
          <path d="M4.5 2.5h23" stroke="#fff" />
          <path d="M6.5 4.5h19v14h-19z" fill="var(--lav)" stroke="#000" />
          <path d="M9.5 7.5h13v8h-13z" fill="#fff" stroke="#000" />
          <path d="M10 9.5h12" stroke="#888" />
          <path d="M11.5 12.5h5M11.5 14.5h8" stroke="var(--accent)" />
          <path d="M7.5 20.5h4" stroke="var(--accent)" />
          <path d="M8.5 22.5h15v3h-15z" fill="#bbb" stroke="#000" />
          <path d="M2.5 26.5h27v4h-27z" fill="#ddd" stroke="#000" />
          <path d="M4.5 28.5h1M7.5 28.5h1M10.5 28.5h11M23.5 28.5h1M26.5 28.5h1" stroke="#555" />
        </svg>
        <div class="os-about-main">
          <p class="os-kicker">
            {{ t('about.kicker', { version: statValues[0], year: since }) }}
          </p>
          <h1 id="os-name" class="os-name">
            Sandu Dorogan
          </h1>
          <p class="os-role">
            {{ t('about.role') }} <span aria-hidden="true">—</span> {{ t('about.location') }}
          </p>
          <p class="os-tagline">
            {{ t('about.tagline') }}
          </p>
          <p class="os-intro">
            {{ t('about.intro') }}
          </p>
          <div class="os-actions">
            <a href="#contact" class="os-btn os-btn-default">{{ t('about.start') }}</a>
            <a href="#work" class="os-btn">{{ t('about.projects') }}</a>
          </div>
        </div>
      </div>
    </AppWindow>

    <AppWindow
      win="info"
      :title="t('info.title')"
      flat
      :zoom="false"
      class="os-w-info"
    >
      <div class="os-pane os-info">
        <div class="os-info-head">
          <svg viewBox="0 0 16 16" shape-rendering="crispEdges" aria-hidden="true">
            <path d="M1.5 .5h13v10h-13z" fill="#ddd" stroke="#000" />
            <path d="M3.5 2.5h9v6h-9z" fill="var(--lav)" stroke="#000" />
            <path d="M3.5 11.5h9v2h-9z" fill="#bbb" stroke="#000" />
            <path d="M.5 13.5h15v2H.5z" fill="#ddd" stroke="#000" />
          </svg>
          <p><strong>Sandu Dorogan</strong></p>
        </div>
        <dl class="os-info-list">
          <div>
            <dt>{{ t('info.kind') }}</dt>
            <dd>{{ t('about.role') }}</dd>
          </div>
          <div>
            <dt>{{ t('info.where') }}</dt>
            <dd>{{ t('about.location') }}</dd>
          </div>
          <div>
            <dt>{{ t('info.created') }}</dt>
            <dd>{{ since }}</dd>
          </div>
        </dl>
        <ul class="os-meters">
          <li v-for="stat in stats" :key="stat.label" class="os-meter">
            <span class="os-meter-label">{{ stat.label }}</span>
            <span class="os-meter-bar" aria-hidden="true"><span :style="{ width: `${(stat.value / peak) * 100}%` }" /></span>
            <span class="os-meter-value">{{ stat.value }}</span>
          </li>
        </ul>
      </div>
    </AppWindow>

    <AppWindow
      id="services"
      win="services"
      :title="t('services.title')"
      flat
      class="os-w-services"
    >
      <div class="os-pane os-panels">
        <div v-for="(service, i) in services" :key="service.title" class="os-group">
          <h3 class="os-group-label">
            {{ service.title }}
          </h3>
          <div class="os-group-row">
            <span class="os-tile" aria-hidden="true">
              <svg viewBox="0 0 16 16" shape-rendering="crispEdges">
                <path :d="glyphs[i]?.d" :fill="glyphs[i]?.fill" stroke="#000" />
              </svg>
            </span>
            <p>{{ service.description }}</p>
          </div>
          <div class="os-radios" aria-hidden="true">
            <span class="os-radio is-on" />{{ t('services.on') }}
            <span class="os-radio" />{{ t('services.off') }}
          </div>
        </div>
      </div>
    </AppWindow>

    <AppWindow
      win="ext"
      :title="t('stack.title')"
      :zoom="false"
      class="os-w-ext"
    >
      <p class="os-strip-head">
        <span>{{ t('stack.label') }}</span><span>{{ t('stack.enabled', { n: stack.length }) }}</span>
      </p>
      <ul class="os-ext-list">
        <li v-for="item in stack" :key="item">
          <span class="os-check" aria-hidden="true">
            <svg viewBox="0 0 8 8" shape-rendering="crispEdges"><path d="M1 4h1v1H1zM2 5h1v1H2zM3 6h1v1H3zM4 4h1v2H4zM5 2h1v2H5zM6 1h1v1H6z" /></svg>
          </span>
          <svg
            class="os-puzzle"
            viewBox="0 0 14 14"
            shape-rendering="crispEdges"
            aria-hidden="true"
          >
            <path d="M1.5 4.5h3v-2h2v2h4v3h2v2h-2v3h-9z" fill="var(--lav)" stroke="#000" />
          </svg>
          {{ item }}
        </li>
      </ul>
    </AppWindow>

    <AppWindow
      id="work"
      win="work"
      :title="t('work.window')"
      class="os-w-work"
    >
      <p class="os-strip-head">
        <span>{{ t('window.items', { n: projects.length }) }}</span><span>{{ t('work.title') }}</span>
      </p>
      <ul class="os-files">
        <li v-for="project in projects" :key="project.title" class="os-file">
          <a
            :href="project.url"
            target="_blank"
            rel="noopener"
            class="os-file-link"
            :class="{ 'is-picked': picked === project.title }"
            @click="picked = project.title"
          >
            <svg
              class="os-file-icon"
              viewBox="0 0 16 16"
              shape-rendering="crispEdges"
              aria-hidden="true"
            >
              <path d="M2.5 .5h8l3 3v12h-11z" fill="#fff" stroke="#000" />
              <path d="M10.5 .5v3h3" fill="var(--lav)" stroke="#000" />
              <path d="M4.5 12.5h7" stroke="#888" />
              <text
                x="8"
                y="10"
                text-anchor="middle"
                class="os-file-letter"
              >{{ project.title.charAt(0) }}</text>
            </svg>
            <span class="os-file-name">{{ project.title }}</span>
            <span class="os-sr">{{ t('window.newTab') }}</span>
          </a>
          <p class="os-file-kind">
            {{ project.subtitle }}
          </p>
          <p class="os-file-desc">
            {{ project.description }}
          </p>
          <ul class="os-tags" :aria-label="t('window.tags')">
            <li v-for="tag in project.tags" :key="tag">
              {{ tag }}
            </li>
          </ul>
        </li>
      </ul>
    </AppWindow>

    <AppWindow
      win="lab"
      :title="t('lab.title')"
      flat
      :zoom="false"
      class="os-w-lab"
    >
      <div class="os-pane os-lab">
        <p class="os-kicker">
          {{ t('ai.title') }}
        </p>
        <p class="os-lab-motto">
          {{ t('ai.motto') }}
        </p>
        <dl class="os-lab-stats">
          <div v-for="stat in labStats" :key="stat.label">
            <dt>{{ stat.label }}</dt>
            <dd>{{ stat.value }}</dd>
          </div>
        </dl>
        <NuxtLink :to="localePath('/ai')" class="os-btn os-btn-default os-lab-btn">
          {{ t('lab.open') }}
        </NuxtLink>
      </div>
    </AppWindow>

    <AppWindow
      id="experience"
      win="exp"
      :title="t('experience.title')"
      class="os-w-exp"
    >
      <p class="os-strip-head">
        <span>{{ t('window.items', { n: experience.length }) }}</span><span>{{ t('experience.since', { year: since }) }}</span>
      </p>
      <table class="os-list">
        <caption class="os-sr">
          {{ t('experience.caption') }}
        </caption>
        <thead>
          <tr>
            <th scope="col">
              {{ t('experience.name') }}
            </th>
            <th scope="col" class="is-sorted">
              {{ t('experience.date') }}
            </th>
            <th scope="col">
              {{ t('experience.kind') }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="entry in experience" :key="entry.company">
            <td class="os-list-name">
              <svg viewBox="0 0 16 16" shape-rendering="crispEdges" aria-hidden="true">
                <path d="M.5 3.5h5l1 1h8v9H.5z" fill="var(--lav)" stroke="#000" />
                <path d="M.5 5.5h15" stroke="#000" />
              </svg>
              {{ entry.company }}
            </td>
            <td class="os-list-date">
              {{ entry.date }}
            </td>
            <td>{{ entry.role }}</td>
          </tr>
        </tbody>
      </table>
    </AppWindow>

    <section id="contact" class="os-dialog" aria-labelledby="os-t-contact">
      <div class="os-dialog-inner">
        <svg
          class="os-dialog-icon"
          viewBox="0 0 32 32"
          shape-rendering="crispEdges"
          aria-hidden="true"
        >
          <path d="M2.5 7.5h27v19h-27z" fill="#fff" stroke="#000" />
          <path d="M2.5 7.5 16 18 29.5 7.5" fill="var(--lav)" stroke="#000" />
          <path d="M2.5 26.5l10-9M29.5 26.5l-10-9" fill="none" stroke="#000" />
        </svg>
        <div class="os-dialog-main">
          <p class="os-kicker">
            {{ t('contact.kicker') }}
          </p>
          <h2 id="os-t-contact" class="os-dialog-title">
            {{ t('contact.title') }}
          </h2>
          <p class="os-dialog-text">
            {{ t('contact.text', { place: t('about.location') }) }}
          </p>
          <dl class="os-fields">
            <div class="os-field-row">
              <dt>{{ t('contact.email') }}</dt>
              <dd class="os-field">
                <AppRevealContactValue endpoint="/api/reveal/email" placeholder="email@example.com" />
              </dd>
            </div>
            <div class="os-field-row">
              <dt>{{ t('contact.phone') }}</dt>
              <dd class="os-field">
                <AppRevealContactValue endpoint="/api/reveal/phone" placeholder="+00 000 000 000" />
              </dd>
            </div>
          </dl>
          <ul class="os-dialog-buttons">
            <li v-for="(social, i) in socialLinks" :key="social.name">
              <a
                :href="social.url"
                target="_blank"
                rel="noopener noreferrer"
                class="os-btn"
                :class="{ 'os-btn-default': i === socialLinks.length - 1 }"
              >{{ social.name }}</a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  </AppDesktop>
</template>

<style src="~/assets/css/os.css"></style>

<style scoped>
/* About */

.os-about {
  display: grid;
  gap: 1.25rem;
}

.os-about-icon {
  width: 64px;
  height: 64px;
}


.os-name {
  margin-top: 0.35rem;
  font-family: 'Pixelify Sans', monospace;
  font-size: clamp(2.6rem, 9vw, 5.5rem);
  font-weight: 600;
  line-height: 0.95;
  letter-spacing: -0.01em;
  text-shadow: 4px 4px 0 var(--lav);
}

.os-role {
  margin-top: 0.9rem;
  font-family: 'Pixelify Sans', monospace;
  font-size: 1.05rem;
}

.os-tagline {
  max-width: 34ch;
  margin-top: 1.25rem;
  font-size: clamp(1.2rem, 2.2vw, 1.45rem);
  font-weight: 700;
  line-height: 1.35;
}

.os-intro {
  max-width: 52ch;
  margin-top: 0.75rem;
  color: #333;
}

.os-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem 1.25rem;
  margin-top: 1.75rem;
  padding: 5px;
}

/* Get Info */

.os-info-head {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding-bottom: 0.9rem;
  border-bottom: 1px solid var(--plat-4);
  box-shadow: 0 1px 0 #fff;
}

.os-info-head svg {
  width: 32px;
  height: 32px;
}

.os-info-list {
  display: grid;
  gap: 0.35rem;
  padding: 0.9rem 0;
  border-bottom: 1px solid var(--plat-4);
  box-shadow: 0 1px 0 #fff;
}

.os-info-list div {
  display: grid;
  grid-template-columns: 5.5rem 1fr;
  gap: 0.6rem;
}

.os-info-list dt {
  font-weight: 700;
  text-align: right;
}

.os-meters {
  display: grid;
  gap: 0.75rem;
  padding-top: 1rem;
}

.os-meter {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 0.2rem 0.75rem;
  align-items: center;
}

.os-meter-label {
  font-size: 0.95rem;
}

.os-meter-bar {
  grid-area: 2 / 1;
}

.os-meter-value {
  grid-area: 1 / 2 / 3 / 3;
  min-width: 2ch;
  font-size: 1.75rem;
  font-weight: 700;
  line-height: 1;
  text-align: right;
}

.os-meter-bar {
  display: block;
  height: 12px;
  border: 1px solid #000;
  background: #fff;
}

.os-meter-bar span {
  display: block;
  height: 100%;
  background: repeating-linear-gradient(90deg, var(--accent-hi) 0 2px, var(--lav) 2px 4px);
  border-right: 1px solid #000;
}

/* Services */

.os-panels {
  display: grid;
  gap: 1.5rem 1.25rem;
  padding-top: 1.75rem;
}

.os-group {
  position: relative;
  padding: 1.25rem 1rem 0.9rem;
  border: 1px solid var(--plat-4);
  box-shadow: 1px 1px 0 #fff, inset 1px 1px 0 #fff;
}

.os-group-label {
  position: absolute;
  top: -0.7rem;
  left: 0.75rem;
  padding: 0 0.4rem;
  background: var(--plat-1);
  font-family: 'Pixelify Sans', monospace;
  font-size: 1rem;
  font-weight: 600;
}

.os-group-row {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 0.9rem;
  align-items: start;
}

.os-tile {
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  border: 1px solid #000;
  background: #fff;
  box-shadow: var(--bevel-in);
}

.os-tile svg {
  width: 32px;
  height: 32px;
}

.os-radios {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  margin-top: 0.8rem;
  padding-left: calc(44px + 0.9rem);
  font-family: 'Pixelify Sans', monospace;
  font-size: 0.8rem;
}

.os-radio {
  width: 12px;
  height: 12px;
  border: 1px solid #000;
  border-radius: 50%;
  background: #fff;
  box-shadow: inset 1px 1px 0 var(--plat-3);
}

.os-radio + .os-radio,
.os-radio.is-on ~ .os-radio {
  margin-left: 0.6rem;
}

.os-radio.is-on {
  background: radial-gradient(circle, #000 0 2.5px, #fff 3px);
}

/* Extensions */

.os-ext-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(10rem, 1fr));
  padding: 0.5rem 0;
}

.os-ext-list li {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.3rem 0.9rem;
}

.os-ext-list li:hover {
  background: var(--lav);
}

.os-check {
  display: grid;
  place-items: center;
  width: 13px;
  height: 13px;
  border: 1px solid #000;
  background: #fff;
}

.os-check svg {
  width: 9px;
  height: 9px;
}

.os-puzzle {
  width: 18px;
  height: 18px;
}

/* Projects */

.os-files {
  display: grid;
  gap: 1.75rem 1.5rem;
  padding: 1.5rem 1.25rem 1.75rem;
}

.os-file {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.os-file-link {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.35rem;
}

.os-file-icon {
  width: 64px;
  height: 64px;
}

.os-file-letter {
  font-family: 'Pixelify Sans', monospace;
  font-size: 6px;
  font-weight: 700;
  fill: var(--accent);
}

.os-file-name {
  padding: 0 0.35rem;
  font-family: 'Pixelify Sans', monospace;
  font-size: 1.15rem;
  font-weight: 600;
}

.os-file-link:hover .os-file-name {
  text-decoration: underline;
  text-underline-offset: 3px;
}

.os-file-kind {
  margin-top: 0.15rem;
  font-family: 'Pixelify Sans', monospace;
  font-size: 0.85rem;
  color: var(--accent);
}

.os-file-desc {
  max-width: 26ch;
  margin-top: 0.5rem;
  font-size: 0.95rem;
  color: #333;
}



/* Experience */

.os-list {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.95rem;
}

.os-list th {
  padding: 0.3rem 0.75rem;
  border-right: 1px solid var(--plat-4);
  border-bottom: 1px solid #000;
  background: var(--plat-2);
  box-shadow: var(--bevel-out);
  font-family: 'Pixelify Sans', monospace;
  font-size: 0.8rem;
  font-weight: 500;
  text-align: left;
}

.os-list th.is-sorted {
  background: var(--plat-3);
}

.os-list td {
  padding: 0.5rem 0.75rem;
  border-bottom: 1px dotted var(--plat-3);
  vertical-align: top;
}

.os-list td.os-list-date,
.os-list tbody td:last-child {
  color: #333;
}

.os-list-date {
  background: #f1f1f1;
  white-space: nowrap;
}

.os-list-name {
  font-weight: 700;
}

.os-list-name svg {
  display: inline-block;
  width: 16px;
  height: 16px;
  margin-right: 0.4rem;
  vertical-align: -2px;
}

.os-list tbody tr:hover td {
  background: var(--lav);
}

/* Contact dialog */

.os-dialog {
  position: relative;
  z-index: 1;
  padding: 3px;
  border: 1px solid #000;
  background: var(--plat-2);
  box-shadow: var(--bevel-out), 0 0 0 1px var(--plat-2), var(--shadow), 6px 6px 0 rgb(0 0 0 / 0.25);
  animation: os-open 0.32s steps(4, end) both;
}

.os-dialog-inner {
  display: grid;
  gap: 1rem;
  padding: 1.25rem;
  border: 3px solid var(--plat-3);
  box-shadow: inset 0 0 0 1px var(--plat-4), 0 0 0 1px #fff;
  background: var(--plat-1);
}

.os-dialog-icon {
  width: 48px;
  height: 48px;
}

.os-dialog-title {
  margin-top: 0.3rem;
  font-family: 'Pixelify Sans', monospace;
  font-size: clamp(1.6rem, 4vw, 2.4rem);
  font-weight: 600;
  line-height: 1.05;
}

.os-dialog-text {
  margin-top: 0.6rem;
  color: #333;
}

.os-fields {
  display: grid;
  gap: 0.75rem;
  margin-top: 1.25rem;
}

.os-field-row {
  display: grid;
  grid-template-columns: 4rem minmax(0, 1fr);
  gap: 0.6rem;
  align-items: center;
}

.os-field-row dt {
  font-weight: 700;
  text-align: right;
}

.os-field {
  min-width: 0;
  padding: 0.35rem 0.6rem;
  border: 1px solid #000;
  background: #fff;
  box-shadow: inset 1px 1px 0 var(--plat-4);
  overflow-wrap: anywhere;
}

.os-dialog-buttons {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1.75rem;
  padding: 5px;
}

.os-dialog-buttons .os-btn {
  --gap: var(--plat-1);
}

@media (min-width: 640px) {
  .os-about {
    grid-template-columns: auto 1fr;
    gap: 1.75rem;
    padding: 2rem 2rem 2.25rem;
  }

  .os-about-icon {
    width: 96px;
    height: 96px;
  }

  .os-panels {
    grid-template-columns: 1fr 1fr;
  }

  .os-files {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .os-dialog-inner {
    grid-template-columns: auto 1fr;
    gap: 1.5rem;
    padding: 1.75rem 2rem;
  }
}

@media (min-width: 1024px) {
  .os-w-about {
    grid-area: 1 / 1 / 2 / 9;
  }

  .os-w-about .os-about {
    padding-right: 5rem;
  }

  .os-w-info {
    grid-area: 1 / 8 / 2 / 13;
    align-self: start;
    margin-top: 8.5rem;
  }

  .os-w-services {
    grid-area: 2 / 1 / 3 / 9;
    margin-left: 3rem;
  }

  .os-w-ext {
    grid-area: 2 / 9 / 3 / 13;
    align-self: start;
    margin-top: 4rem;
  }

  .os-w-work {
    grid-area: 3 / 1 / 4 / 9;
    align-self: start;
  }

  .os-w-lab {
    grid-area: 3 / 9 / 4 / 13;
    align-self: start;
    margin-top: 3.5rem;
  }

  .os-w-exp {
    grid-area: 4 / 1 / 5 / 8;
    align-self: start;
  }

  .os-dialog {
    grid-area: 4 / 8 / 5 / 13;
    align-self: start;
    margin-top: 3rem;
  }

  .os-dialog-inner {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 639px) {
  .os-list th,
  .os-list td {
    padding-inline: 0.5rem;
  }

  .os-list-date {
    white-space: normal;
  }

  .os-list-name svg {
    display: none;
  }

  .os-dialog-buttons {
    justify-content: center;
    gap: 0.75rem;
  }

  .os-dialog-buttons .os-btn {
    min-width: 5.25rem;
    padding-inline: 0.75rem;
  }
}

/* AI Lab teaser */

.os-lab {
  display: grid;
  gap: 0.9rem;
  justify-items: start;
}

.os-lab-motto {
  font-family: 'Pixelify Sans', monospace;
  font-size: 1.35rem;
  font-weight: 600;
  line-height: 1.15;
}

.os-lab-stats {
  display: grid;
  gap: 0.6rem;
  width: 100%;
  padding: 0.75rem 0;
  border-block: 1px solid var(--plat-4);
  box-shadow: inset 0 1px 0 #fff, 0 1px 0 #fff;
}

.os-lab-stats div {
  display: grid;
  grid-template-columns: 3.5rem 1fr;
  gap: 0.75rem;
  align-items: center;
}

.os-lab-stats dt {
  grid-column: 2;
  grid-row: 1;
  font-size: 0.95rem;
  line-height: 1.3;
}

.os-lab-stats dd {
  grid-column: 1;
  grid-row: 1;
  font-size: 1.75rem;
  font-weight: 700;
  line-height: 1;
  text-align: right;
}

.os-lab-btn {
  --gap: var(--plat-1);

  margin: 0.4rem 5px 5px;
}
</style>
