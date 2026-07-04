<script setup lang="ts">
definePageMeta({ layout: false })

const { t, tm, rt, locale } = useI18n()
const switchLocalePath = useSwitchLocalePath()

usePageSeo({
  title: () => t('seo.title'),
  description: () => t('seo.description'),
})

// OG image (nuxt-og-image) — defined at page level for static generation
defineOgImage({
  component: 'Default',
  props: {
    title: t('seo.ogTitle'),
    description: t('seo.ogDescription'),
  },
})

const otherLocale = computed(() => (locale.value === 'en' ? 'ro' : 'en'))

// Non-translated project metadata (URLs + tech tags are proper nouns)
const projectMeta = [
  { url: 'https://iprally.com', tags: ['CLOJURE', 'CLJS', 'GCP'] },
  { url: 'https://partnerbase.com', tags: ['NUXT', 'CLOJURE', 'AWS'] },
  { url: 'https://nws.ai', tags: ['CLJS', 'DJANGO', 'AWS'] },
]

const services = computed(() => {
  const items = tm('services.items') as Array<{ title: string, description: string }>
  return items.map((item, i) => ({
    num: String(i + 1).padStart(2, '0'),
    title: rt(item.title),
    description: rt(item.description),
  }))
})

const projects = computed(() => {
  const items = tm('work.items') as Array<{ title: string, description: string }>
  return items.map((item, i) => ({
    title: rt(item.title),
    description: rt(item.description),
    url: projectMeta[i]?.url ?? '#',
    tags: projectMeta[i]?.tags ?? [],
  }))
})

const experience = computed(() => {
  const items = tm('experience.items') as Array<{ date: string, role: string, company: string }>
  return items.map(item => ({
    date: rt(item.date),
    role: rt(item.role),
    company: rt(item.company),
  }))
})

// Tech stack marquee — proper nouns, not translated
const stack = ['JAVASCRIPT', 'TYPESCRIPT', 'NUXT', 'VUE', 'REACT', 'PYTHON', 'CLOJURE', 'CLOJURESCRIPT', 'DOCKER', 'AWS', 'LLMS']

const socialLinks = [
  { name: 'GITHUB', url: 'https://github.com/sandudorogan' },
  { name: 'GITLAB', url: 'https://gitlab.com/sdorogan-flexiana' },
  { name: 'LINKEDIN', url: 'https://www.linkedin.com/in/sandu-dorogan' },
]

const navLinks = computed(() => [
  { label: t('nav.services'), href: '#services' },
  { label: t('nav.work'), href: '#work' },
  { label: t('nav.experience'), href: '#experience' },
  { label: t('nav.contact'), href: '#contact' },
])

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
  <div class="v1">
    <a href="#main" class="v1-skip">{{ t('skipToContent') }}</a>

    <nav class="v1-nav" :aria-label="t('nav.ariaLabel')">
      <a href="#top" class="v1-nav-brand">SD.</a>
      <div class="v1-nav-right">
        <div class="v1-nav-links">
          <a
            v-for="link in navLinks"
            :key="link.href"
            :href="link.href"
            class="v1-nav-link"
          >{{ link.label }}</a>
        </div>
        <NuxtLink :to="switchLocalePath(otherLocale)" class="v1-nav-lang" :aria-label="t('lang.switchAria')">
          {{ t('lang.switchTo') }}
        </NuxtLink>
      </div>
    </nav>

    <main id="main">
      <header id="top" class="v1-hero">
        <p class="v1-hero-kicker">{{ t('hero.kicker') }}</p>
        <h1 class="v1-hero-title">
          <span class="v1-line">{{ t('hero.line1') }}</span>
          <span class="v1-line v1-line-offset">{{ t('hero.line2') }}</span>
          <span class="v1-line v1-line-outline">{{ t('hero.line3') }}</span>
        </h1>
        <div class="v1-hero-bottom">
          <p class="v1-hero-sub">{{ t('hero.sub') }}</p>
          <a href="#contact" class="v1-btn">{{ t('hero.cta') }}</a>
        </div>
      </header>

      <div class="v1-marquee" aria-hidden="true">
        <div class="v1-marquee-track">
          <span v-for="i in 2" :key="i" class="v1-marquee-content">
            <span v-for="tech in stack" :key="tech" class="v1-marquee-item">{{ tech }} ✦</span>
          </span>
        </div>
      </div>

      <section id="services" class="v1-section">
        <h2 class="v1-section-title">{{ t('services.title') }}</h2>
        <div class="v1-services">
          <article v-for="s in services" :key="s.num" class="v1-service">
            <span class="v1-service-num">{{ s.num }}</span>
            <h3>{{ s.title }}</h3>
            <p>{{ s.description }}</p>
          </article>
        </div>
      </section>

      <section id="work" class="v1-section v1-section-inverted">
        <h2 class="v1-section-title">{{ t('work.title') }}</h2>
        <div class="v1-projects">
          <a
            v-for="p in projects"
            :key="p.title"
            :href="p.url"
            target="_blank"
            rel="noopener"
            class="v1-project"
          >
            <div class="v1-project-head">
              <h3>{{ p.title }}</h3>
              <span class="v1-project-arrow">↗</span>
            </div>
            <p>{{ p.description }}</p>
            <div class="v1-project-tags">
              <span v-for="tag in p.tags" :key="tag">{{ tag }}</span>
            </div>
          </a>
        </div>
      </section>

      <section id="experience" class="v1-section">
        <h2 class="v1-section-title">{{ t('experience.title') }}</h2>
        <ul class="v1-exp">
          <li v-for="e in experience" :key="e.company" class="v1-exp-row">
            <span class="v1-exp-date">{{ e.date }}</span>
            <span class="v1-exp-role">{{ e.role }}</span>
            <span class="v1-exp-company">@ {{ e.company }}</span>
          </li>
        </ul>
      </section>

      <section id="contact" class="v1-section">
        <h2 class="v1-section-title">{{ t('contact.title') }}</h2>
        <div class="v1-contact">
          <div class="v1-contact-info">
            <div class="v1-contact-row">
              <span class="v1-contact-label">{{ t('contact.email') }}</span>
              <AppRevealContactValue endpoint="/api/reveal/email" placeholder="email@example.com" />
            </div>
            <div class="v1-contact-row">
              <span class="v1-contact-label">{{ t('contact.phone') }}</span>
              <AppRevealContactValue endpoint="/api/reveal/phone" placeholder="+00 000 000 000" />
            </div>
            <div class="v1-contact-row">
              <span class="v1-contact-label">{{ t('contact.location') }}</span>
              <span class="v1-contact-value">{{ t('contact.locationValue') }}</span>
            </div>
          </div>
          <div class="v1-socials">
            <a
              v-for="link in socialLinks"
              :key="link.name"
              :href="link.url"
              target="_blank"
              rel="noopener noreferrer"
              class="v1-social"
            >{{ link.name }} ↗</a>
          </div>
        </div>
      </section>
    </main>

    <footer class="v1-footer">
      <h2 class="v1-footer-title">{{ t('footer.line1') }}<br>{{ t('footer.line2') }}</h2>
      <div class="v1-footer-links">
        <a href="#contact" class="v1-btn v1-btn-invert">{{ t('footer.cta') }}</a>
        <p>{{ t('footer.rights', { year: new Date().getFullYear() }) }}</p>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.v1 {
  --paper: #f3efe6;
  --ink: #111111;
  --shock: #ff4d00;
  background: var(--paper);
  color: var(--ink);
  font-family: 'Space Mono', monospace;
  min-height: 100vh;
}

/* Paper grain over the whole page, including the inverted sections */
.v1::after {
  content: '';
  position: fixed;
  inset: 0;
  z-index: 60;
  pointer-events: none;
  opacity: 0.28;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='240'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.35 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
}

.v1 ::selection {
  background: var(--shock);
  color: var(--paper);
}

/* ---- Skip link ---- */
.v1-skip {
  position: absolute;
  left: -9999px;
  top: 0;
  z-index: 100;
  background: var(--ink);
  color: var(--paper);
  padding: 0.75rem 1.25rem;
  font-family: 'Archivo Black', sans-serif;
  text-decoration: none;
}

.v1-skip:focus {
  left: 0;
}

/* ---- Nav ---- */
.v1-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.5rem;
  border-bottom: 4px solid var(--ink);
  position: sticky;
  top: 0;
  background: var(--paper);
  z-index: 50;
}

.v1-nav-brand {
  font-family: 'Archivo Black', sans-serif;
  font-size: 1.5rem;
  text-decoration: none;
  color: var(--ink);
}

.v1-nav-right {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.v1-nav-links {
  display: flex;
  gap: 0;
}

.v1-nav-link {
  padding: 0.5rem 0.9rem;
  border: 2px solid var(--ink);
  margin-left: -2px;
  text-decoration: none;
  color: var(--ink);
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  transition: background 0.1s, color 0.1s;
}

.v1-nav-link:hover { background: var(--shock); color: var(--paper); }

.v1-nav-lang {
  padding: 0.5rem 0.8rem;
  border: 2px solid var(--ink);
  background: var(--ink);
  color: var(--paper);
  text-decoration: none;
  font-family: 'Archivo Black', sans-serif;
  font-size: 0.75rem;
  letter-spacing: 0.05em;
  transition: background 0.1s, color 0.1s;
}

.v1-nav-lang:hover { background: var(--shock); color: var(--paper); }

.v1-nav-link:focus-visible,
.v1-nav-lang:focus-visible,
.v1-nav-brand:focus-visible {
  outline: 3px solid var(--shock);
  outline-offset: 2px;
}

@media (max-width: 720px) {
  .v1-nav-link { padding: 0.4rem 0.55rem; font-size: 0.6rem; }
}

/* Single-page site: sections are reachable by scroll, so drop the
   in-page anchor links on small screens and keep the bar to brand + lang. */
@media (max-width: 640px) {
  .v1-nav-links { display: none; }
}

/* ---- Hero ---- */
.v1-hero {
  padding: 4rem 1.5rem 3rem;
  border-bottom: 4px solid var(--ink);
}

@media (max-width: 480px) {
  .v1-hero { padding: 3rem 1rem 2.5rem; }
}

.v1-hero-kicker {
  font-size: 0.8rem;
  letter-spacing: 0.2em;
  margin-bottom: 2rem;
  border: 2px solid var(--ink);
  display: inline-block;
  padding: 0.35rem 0.75rem;
  background: var(--shock);
  color: var(--paper);
  box-shadow: 5px 5px 0 var(--ink);
}

.v1-hero-title {
  font-family: 'Archivo Black', sans-serif;
  /* 10vw keeps the longest single word (RO "DEZVOLTATOR", 11 chars, can't
     wrap) inside the viewport at every width; 13vw overflowed below ~1560px. */
  font-size: clamp(2rem, 10vw, 8.5rem);
  line-height: 0.88;
  text-transform: uppercase;
  display: flex;
  flex-direction: column;
  margin: 0;
}

.v1-line { animation: v1-slam 0.5s cubic-bezier(0.2, 0.9, 0.3, 1) both; }
.v1-line:nth-child(2) { animation-delay: 0.12s; }
.v1-line:nth-child(3) { animation-delay: 0.24s; }

.v1-line-offset { margin-left: clamp(2rem, 10vw, 9rem); color: var(--shock); }

.v1-line-outline {
  color: var(--paper);
  -webkit-text-stroke: 3px var(--ink);
}

/* Thick strokes swallow small glyphs, thin them alongside the type scale */
@media (max-width: 640px) {
  .v1-line-outline { -webkit-text-stroke-width: 2px; }
}

@keyframes v1-slam {
  from { transform: translateY(40px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

.v1-hero-bottom {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: space-between;
  gap: 2rem;
  margin-top: 3rem;
}

.v1-hero-sub {
  max-width: 32ch;
  font-size: 1.1rem;
  line-height: 1.5;
  border-left: 6px solid var(--ink);
  padding-left: 1rem;
}

/* ---- Buttons ---- */
.v1-btn {
  display: inline-block;
  font-family: 'Archivo Black', sans-serif;
  font-size: 1.1rem;
  text-decoration: none;
  color: var(--ink);
  background: var(--paper);
  border: 3px solid var(--ink);
  padding: 0.85rem 1.75rem;
  box-shadow: 8px 8px 0 var(--ink);
  transition: transform 0.1s, box-shadow 0.1s, background 0.1s, color 0.1s;
}

.v1-btn:hover {
  transform: translate(4px, 4px);
  box-shadow: 2px 2px 0 var(--ink);
  background: var(--shock);
  color: var(--paper);
}

.v1-btn:focus-visible {
  outline: 3px solid var(--shock);
  outline-offset: 4px;
}

.v1-btn-invert {
  background: var(--ink);
  color: var(--paper);
  border-color: var(--paper);
  box-shadow: 8px 8px 0 var(--shock);
}

.v1-btn-invert:hover {
  box-shadow: 2px 2px 0 var(--shock);
  background: var(--shock);
}

/* ---- Marquee ---- */
.v1-marquee {
  border-bottom: 4px solid var(--ink);
  background: var(--ink);
  color: var(--paper);
  overflow: hidden;
  padding: 0.85rem 0;
}

.v1-marquee-track {
  display: flex;
  width: max-content;
  animation: v1-scroll 24s linear infinite;
}

.v1-marquee:hover .v1-marquee-track { animation-play-state: paused; }

.v1-marquee-content { display: flex; }

.v1-marquee-item {
  font-family: 'Archivo Black', sans-serif;
  font-size: 1.2rem;
  white-space: nowrap;
  padding: 0 1rem;
}

@keyframes v1-scroll {
  to { transform: translateX(-50%); }
}

@media (prefers-reduced-motion: reduce) {
  .v1-marquee-track { animation: none; }
  .v1-line { animation: none; }
}

/* ---- Sections ---- */
.v1-section {
  padding: 4rem 1.5rem;
  border-bottom: 4px solid var(--ink);
  scroll-margin-top: 5rem;
}

.v1-section-title {
  font-family: 'Archivo Black', sans-serif;
  font-size: clamp(2rem, 6vw, 4rem);
  margin: 0 0 2.5rem;
  text-decoration: underline;
  text-decoration-thickness: 8px;
  text-underline-offset: 10px;
  text-decoration-color: var(--shock);
}

/* ---- Services ---- */
.v1-services {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(260px, 100%), 1fr));
  gap: 0;
}

.v1-service {
  border: 3px solid var(--ink);
  margin: 0 -3px -3px 0;
  padding: 1.75rem;
  position: relative;
  transition: background 0.1s, color 0.1s;
}

.v1-service:hover { background: var(--ink); color: var(--paper); }
.v1-service:hover .v1-service-num { color: var(--shock); }

.v1-service-num {
  font-family: 'Archivo Black', sans-serif;
  font-size: 3rem;
  display: block;
  margin-bottom: 1rem;
}

.v1-service h3 {
  font-family: 'Archivo Black', sans-serif;
  font-size: 1.2rem;
  text-transform: uppercase;
  margin: 0 0 0.75rem;
}

.v1-service p { margin: 0; line-height: 1.55; font-size: 0.95rem; }

/* ---- Projects (inverted section) ---- */
.v1-section-inverted {
  background: var(--ink);
  color: var(--paper);
}

.v1-section-inverted .v1-section-title { text-decoration-color: var(--shock); }

.v1-projects {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(280px, 100%), 1fr));
  gap: 1.5rem;
}

.v1-project {
  border: 3px solid var(--paper);
  padding: 1.75rem;
  text-decoration: none;
  color: var(--paper);
  display: flex;
  flex-direction: column;
  gap: 1rem;
  transition: background 0.1s, color 0.1s, transform 0.1s;
}

.v1-project:hover {
  background: var(--shock);
  transform: translate(-4px, -4px);
  box-shadow: 8px 8px 0 var(--paper);
}

.v1-project-head {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
}

.v1-project h3 {
  font-family: 'Archivo Black', sans-serif;
  font-size: 1.15rem;
  text-transform: uppercase;
  margin: 0;
}

.v1-project-arrow { font-size: 1.5rem; }

.v1-project p { margin: 0; line-height: 1.55; font-size: 0.95rem; flex-grow: 1; }

.v1-project-tags { display: flex; flex-wrap: wrap; gap: 0.5rem; }

.v1-project-tags span {
  border: 2px solid currentColor;
  padding: 0.15rem 0.5rem;
  font-size: 0.7rem;
  font-weight: 700;
}

/* ---- Experience ---- */
.v1-exp {
  list-style: none;
  margin: 0;
  padding: 0;
}

.v1-exp-row {
  display: grid;
  grid-template-columns: 160px 1fr auto;
  gap: 1rem;
  align-items: baseline;
  padding: 1.25rem 0;
  border-bottom: 3px solid var(--ink);
  transition: padding-left 0.15s;
}

.v1-exp-row:hover { padding-left: 1rem; background: linear-gradient(to right, var(--shock) 6px, transparent 6px); }

.v1-exp-date { font-size: 0.85rem; }

.v1-exp-role {
  font-family: 'Archivo Black', sans-serif;
  font-size: clamp(1rem, 3vw, 1.6rem);
}

.v1-exp-company { font-weight: 700; color: var(--shock); }

@media (max-width: 640px) {
  .v1-exp-row { grid-template-columns: 1fr; gap: 0.25rem; }
}

/* ---- Contact ---- */
.v1-contact {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 2.5rem;
}

.v1-contact-info {
  display: flex;
  flex-direction: column;
  gap: 0;
  flex: 1;
  min-width: min(280px, 100%);
}

.v1-contact-row {
  display: grid;
  grid-template-columns: 140px 1fr;
  gap: 1rem;
  align-items: baseline;
  padding: 1.1rem 0;
  border-bottom: 3px solid var(--ink);
}

.v1-contact-row:first-child { border-top: 3px solid var(--ink); }

@media (max-width: 640px) {
  .v1-contact-row { grid-template-columns: 1fr; gap: 0.35rem; }
}

.v1-contact-label {
  font-family: 'Archivo Black', sans-serif;
  font-size: 0.8rem;
  letter-spacing: 0.1em;
}

.v1-contact-value { font-size: 1.1rem; }

.v1-socials {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: flex-start;
}

.v1-social {
  font-family: 'Archivo Black', sans-serif;
  font-size: 1rem;
  text-decoration: none;
  color: var(--ink);
  border: 3px solid var(--ink);
  padding: 0.7rem 1.5rem;
  box-shadow: 6px 6px 0 var(--ink);
  transition: transform 0.1s, box-shadow 0.1s, background 0.1s, color 0.1s;
}

.v1-social:hover {
  transform: translate(3px, 3px);
  box-shadow: 2px 2px 0 var(--ink);
  background: var(--shock);
  color: var(--paper);
}

.v1-social:focus-visible {
  outline: 3px solid var(--shock);
  outline-offset: 4px;
}

/* ---- Footer ---- */
.v1-footer {
  background: var(--ink);
  color: var(--paper);
  padding: 4rem 1.5rem;
  overflow-wrap: anywhere;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-end;
  gap: 2rem;
}

.v1-footer-title {
  font-family: 'Archivo Black', sans-serif;
  /* 2rem floor keeps the longest RO word ("CONSTRUIM.") inside narrow viewports */
  font-size: clamp(2rem, 10vw, 7rem);
  line-height: 0.9;
  margin: 0;
  -webkit-text-stroke: 2px var(--paper);
  color: transparent;
}

@media (max-width: 480px) {
  .v1-footer { padding: 3rem 1rem; }
}

.v1-footer-links {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  align-items: flex-start;
}

.v1-footer-links p { font-size: 0.75rem; margin: 0; opacity: 0.7; }
</style>
