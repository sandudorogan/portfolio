<script setup lang="ts">
definePageMeta({ layout: false })

const { t, tm, rt } = useI18n()

usePageSeo({
  title: () => t('seo.ai.title'),
  description: () => t('seo.ai.description'),
})

defineOgImage({
  component: 'Default',
  props: {
    title: t('seo.ai.ogTitle'),
    description: t('seo.ai.ogDescription'),
  },
})

const statValues = ['406', '~400', '3']

// month is 1-based; labels come from ai.pace.months so server and client agree
const pace = [
  { month: 11, year: 2025, value: 18 },
  { month: 12, year: 2025, value: 18 },
  { month: 1, year: 2026, value: 29 },
  { month: 2, year: 2026, value: 30 },
  { month: 3, year: 2026, value: 24 },
  { month: 4, year: 2026, value: 8 },
  { month: 5, year: 2026, value: 28 },
  { month: 6, year: 2026, value: 45 },
  { month: 7, year: 2026, value: 73 },
  { month: 8, year: 2026, value: 53 },
  { month: 9, year: 2026, value: 155 },
  { month: 10, year: 2026, value: 182 },
]

const scale = Math.ceil(Math.max(...pace.map(m => m.value)) / 50) * 50
const ticks = Array.from({ length: scale / 50 + 1 }, (_, i) => i * 50)
const pct = (value: number) => `${(value / scale) * 100}%`

const arsenalMeta = [
  { name: 'tmux-pane-tree', tags: ['Python', 'tmux'], url: 'https://github.com/sandudorogan/tmux-pane-tree' },
  { name: 'review-queue', tags: ['Python', 'launchd'], url: '' },
  { name: 'agent-delegator', tags: ['Claude Code', 'Codex'], url: '' },
  { name: 'pr-lens', tags: ['Bun', 'SQLite'], url: '' },
  { name: 'harness.nvim', tags: ['Lua', 'Bun', 'SQLite'], url: 'https://github.com/sandudorogan/harness.nvim' },
  { name: 'the-orar', tags: ['React', 'PWA', 'Web Worker'], url: 'https://github.com/sandudorogan/the-orar' },
  { name: 'neo-vue3-d3-network', tags: ['Vue', 'TypeScript', 'd3'], url: 'https://www.npmjs.com/package/neo-vue3-d3-network' },
]

const texts = (key: string) => (tm(key) as string[]).map(item => rt(item))
const entries = (key: string) =>
  (tm(key) as Array<Record<string, string>>).map(item =>
    Object.fromEntries(Object.entries(item).map(([k, v]) => [k, rt(v)])) as Record<string, string>)

const stats = computed(() => texts('ai.stats').map((label, i) => ({ label, value: statValues[i] })))
const months = computed(() => texts('ai.pace.months'))
const bars = computed(() => pace.map((m, i) => ({
  ...m,
  label: months.value[m.month - 1] ?? '',
  newYear: i === 0 || pace[i - 1]?.year !== m.year,
})))
const first = computed(() => bars.value[0])
const last = computed(() => bars.value.at(-1))
const shipped = computed(() => entries('ai.shipped.items'))
const steps = computed(() => entries('ai.pipeline.steps'))
const rules = computed(() => texts('ai.rules.items'))
const arsenal = computed(() => {
  const items = entries('ai.arsenal.items')
  return arsenalMeta.map((meta, i) => ({ ...meta, ...items[i] }))
})

const flowGlyphs = [
  ['M3.5 2.5h9v12h-9z', 'M5.5 6.5h5M5.5 8.5h5M5.5 10.5h3', 'M6.5 1.5h3v2h-3z'],
  ['M5.5 5.5h2v9h-2z', '', 'M2.5 2.5h8v3h-8z'],
  ['M10.5 9.5 14 13', '', 'M5.5 1.5h3l2 2v3l-2 2h-3l-2-2v-3z'],
  ['M2.5 13.5l6-6', '', 'M9.5 1.5h3l-2 2 2 2 2-2v3l-2 2h-3l-1-1z'],
  ['M4.5 1.5v5l3.5 3.5M11.5 1.5v5L8 10v4.5', '', 'M5.5 12.5h5v2h-5z'],
]
</script>

<template>
  <AppDesktop ai>
    <AppWindow
      win="readme"
      :title="t('ai.readme')"
      :heading="false"
      class="os-w-readme"
      aria-labelledby="os-ai-title"
    >
      <div class="os-pane os-readme">
        <p class="os-kicker">
          {{ t('ai.document') }}
        </p>
        <h1 id="os-ai-title" class="os-ai-title">
          {{ t('ai.title') }}
        </h1>
        <p class="os-motto">
          <mark>{{ t('ai.motto') }}</mark>
        </p>
        <p class="os-lede">
          {{ t('ai.lede') }}
        </p>
        <dl class="os-ai-stats">
          <div v-for="stat in stats" :key="stat.label">
            <dt>{{ stat.label }}</dt>
            <dd>{{ stat.value }}</dd>
          </div>
        </dl>
      </div>
    </AppWindow>

    <AppWindow win="pace" :title="t('ai.pace.title')" class="os-w-pace">
      <p class="os-strip-head">
        <span>{{ t('ai.pace.axis') }}</span><span>{{ first?.label }} {{ first?.year }} – {{ last?.label }} {{ last?.year }}</span>
      </p>
      <figure class="os-chart">
        <div class="os-plot">
          <span
            v-for="tick in ticks"
            :key="tick"
            class="os-tick"
            :style="{ bottom: pct(tick) }"
            aria-hidden="true"
          >{{ tick }}</span>
          <ol class="os-bars">
            <li v-for="(m, i) in bars" :key="`${m.month}-${m.year}`" class="os-bar-slot">
              <span class="os-bar" :style="{ height: pct(m.value) }">
                <span class="os-bar-value" aria-hidden="true">{{ m.value }}{{ i === bars.length - 1 ? '*' : '' }}</span>
              </span>
              <span class="os-sr">{{ t('ai.pace.bar', { month: m.label, year: m.year, n: m.value }) }}</span>
            </li>
          </ol>
        </div>
        <ol class="os-axis" aria-hidden="true">
          <li v-for="m in bars" :key="`${m.month}-${m.year}`">
            {{ m.label }}<span v-if="m.newYear" class="os-axis-year">{{ m.year }}</span>
          </li>
        </ol>
        <figcaption class="os-chart-caption">
          {{ t('ai.pace.caption') }} <span class="os-chart-note">* {{ t('ai.pace.note') }}</span>
        </figcaption>
      </figure>
    </AppWindow>

    <AppWindow win="shipped" :title="t('ai.shipped.title')" class="os-w-shipped">
      <p class="os-strip-head">
        <span>{{ t('window.items', { n: shipped.length }) }}</span><span>IPRally</span>
      </p>
      <ul class="os-ship">
        <li v-for="item in shipped" :key="item.title" class="os-ship-item">
          <span class="os-ship-tri" aria-hidden="true" />
          <svg
            class="os-ship-icon"
            viewBox="0 0 16 16"
            shape-rendering="crispEdges"
            aria-hidden="true"
          >
            <path d="M2.5 .5h8l3 3v12h-11z" fill="#fff" stroke="#000" />
            <path d="M10.5 .5v3h3" fill="var(--lav)" stroke="#000" />
            <path d="M4.5 6.5h7M4.5 8.5h7M4.5 10.5h4" stroke="var(--accent)" />
          </svg>
          <div>
            <h3 class="os-ship-title">
              {{ item.title }}
            </h3>
            <p class="os-ship-text">
              {{ item.description }}
            </p>
          </div>
        </li>
      </ul>
    </AppWindow>

    <AppWindow
      win="flow"
      :title="t('ai.pipeline.title')"
      flat
      class="os-w-flow"
    >
      <ol class="os-pane os-flow">
        <li v-for="(step, i) in steps" :key="step.title" class="os-step">
          <span class="os-step-tile" aria-hidden="true">
            <svg viewBox="0 0 16 16" shape-rendering="crispEdges">
              <path :d="flowGlyphs[i]?.[0]" fill="#fff" stroke="#000" />
              <path v-if="flowGlyphs[i]?.[1]" :d="flowGlyphs[i]?.[1]" stroke="var(--accent)" />
              <path :d="flowGlyphs[i]?.[2]" fill="var(--lav)" stroke="#000" />
            </svg>
          </span>
          <h3 class="os-step-title">
            <span class="os-step-num">{{ i + 1 }}</span>{{ step.title }}
          </h3>
          <p class="os-step-text">
            {{ step.description }}
          </p>
        </li>
      </ol>
    </AppWindow>

    <AppWindow
      win="rules"
      :title="t('ai.rules.title')"
      flat
      :zoom="false"
      class="os-w-rules os-sticky"
    >
      <ol class="os-rules">
        <li v-for="rule in rules" :key="rule">
          {{ rule }}
        </li>
      </ol>
    </AppWindow>

    <AppWindow win="arsenal" :title="t('ai.arsenal.title')" class="os-w-arsenal">
      <p class="os-strip-head">
        <span>{{ t('window.items', { n: arsenal.length }) }}</span><span>{{ t('ai.arsenal.caption') }}</span>
      </p>
      <ul class="os-apps">
        <li v-for="item in arsenal" :key="item.name" class="os-app">
          <svg
            class="os-app-icon"
            viewBox="0 0 20 20"
            shape-rendering="crispEdges"
            aria-hidden="true"
          >
            <path d="M9 .5 17.5 9 9 17.5.5 9z" fill="var(--lav)" stroke="#000" />
            <text
              x="9"
              y="11.5"
              text-anchor="middle"
              class="os-app-letter"
            >{{ item.name.charAt(0) }}</text>
            <g v-if="!item.url">
              <path d="M12.5 13.5h7v6h-7z" fill="#fff" stroke="#000" />
              <path d="M14.5 13.5v-2h3v2" fill="none" stroke="#000" />
              <path d="M15.5 15.5h1v2h-1z" fill="#000" />
            </g>
          </svg>
          <div class="os-app-info">
            <h3 class="os-app-name">
              <a
                v-if="item.url"
                :href="item.url"
                target="_blank"
                rel="noopener"
              >{{ item.name }}<span aria-hidden="true"> ↗</span><span class="os-sr"> {{ t('window.newTab') }}</span></a>
              <template v-else>
                {{ item.name }}
              </template>
            </h3>
            <p class="os-app-status" :class="{ 'is-private': !item.url }">
              <svg
                v-if="!item.url"
                viewBox="0 0 8 9"
                shape-rendering="crispEdges"
                aria-hidden="true"
              >
                <path d="M.5 3.5h7v5h-7z" fill="#fff" stroke="#000" />
                <path d="M2.5 3.5v-2h3v2" fill="none" stroke="#000" />
              </svg>
              {{ item.status }}
            </p>
            <p class="os-app-text">
              {{ item.description }}
            </p>
            <ul class="os-tags os-app-tags" :aria-label="t('window.tags')">
              <li v-for="tag in item.tags" :key="tag">
                {{ tag }}
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </AppWindow>
  </AppDesktop>
</template>

<style src="~/assets/css/os.css"></style>

<style scoped>
/* Read Me */

.os-readme {
  max-width: 46rem;
}

.os-ai-title {
  margin-top: 0.35rem;
  font-family: 'Pixelify Sans', monospace;
  font-size: clamp(2.4rem, 7vw, 4.5rem);
  font-weight: 600;
  line-height: 1;
  text-shadow: 4px 4px 0 var(--lav);
}

.os-motto {
  margin-top: 1.1rem;
  font-family: 'Pixelify Sans', monospace;
  font-size: clamp(1.3rem, 2.6vw, 1.75rem);
  font-weight: 500;
  line-height: 1.3;
}

.os-motto mark {
  padding: 0 0.15em;
  background: var(--lav);
  color: #000;
  box-decoration-break: clone;
  -webkit-box-decoration-break: clone;
}

.os-lede {
  max-width: 58ch;
  margin-top: 1rem;
  color: #333;
}

.os-ai-stats {
  display: grid;
  gap: 0.75rem;
  margin-top: 1.75rem;
}

.os-ai-stats div {
  display: flex;
  flex-direction: column-reverse;
  justify-content: flex-end;
  padding: 0.75rem 0.9rem;
  border: 1px solid #000;
  background: var(--plat-1);
  box-shadow: var(--bevel-out), 2px 2px 0 #000;
}

.os-ai-stats dd {
  font-size: 2.25rem;
  font-weight: 700;
  line-height: 1;
}

.os-ai-stats dt {
  margin-top: 0.35rem;
  font-size: 0.9rem;
  line-height: 1.3;
}

/* Pace chart */

.os-chart {
  margin: 0;
  padding: 2rem 1.25rem 1.25rem 0.75rem;
}

.os-plot {
  position: relative;
  height: 15rem;
  margin-left: 2.25rem;
  border-bottom: 1px solid #000;
  border-left: 1px solid #000;
}

.os-tick {
  position: absolute;
  left: 0;
  right: 0;
  height: 0;
  border-top: 1px dotted var(--plat-3);
  font-size: 0.75rem;
  line-height: 0;
  text-indent: -2.25rem;
}


.os-bars {
  position: absolute;
  inset: 0;
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  gap: 0.35rem;
  align-items: end;
  padding: 0 0.35rem;
}

.os-bar-slot {
  display: flex;
  align-items: flex-end;
  height: 100%;
}

.os-bar {
  position: relative;
  width: 100%;
  border: 1px solid #000;
  border-bottom: 0;
  background: repeating-linear-gradient(to top, var(--accent-hi) 0 2px, var(--lav) 2px 4px);
  box-shadow: inset 1px 1px 0 #fff;
}

.os-bar-value {
  position: absolute;
  bottom: calc(100% + 0.25rem);
  left: 50%;
  translate: -50% 0;
  font-size: 0.85rem;
  font-weight: 700;
  line-height: 1;
  white-space: nowrap;
}

.os-axis {
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  gap: 0.35rem;
  margin-left: 2.25rem;
  padding: 0.4rem 0.35rem 0;
  font-family: 'Pixelify Sans', monospace;
  font-size: 0.75rem;
  text-align: center;
}

.os-axis li {
  display: flex;
  flex-direction: column;
}

.os-axis-year {
  font-family: 'Atkinson Hyperlegible', sans-serif;
  color: var(--accent);
}

.os-chart-caption {
  max-width: 60ch;
  margin-top: 1.25rem;
  margin-left: 2.25rem;
  font-size: 0.95rem;
  color: #333;
}

.os-chart-note {
  display: block;
  margin-top: 0.25rem;
  font-family: 'Pixelify Sans', monospace;
  font-size: 0.8rem;
}

/* Shipped */

.os-ship {
  display: grid;
}

.os-ship-item {
  display: grid;
  grid-template-columns: auto auto 1fr;
  gap: 0.6rem;
  align-items: start;
  padding: 0.9rem 1rem;
  border-bottom: 1px dotted var(--plat-3);
}

.os-ship-item:hover {
  background: #f4f4ff;
}

.os-ship-tri {
  width: 9px;
  height: 6px;
  margin-top: 0.55rem;
  background: #000;
  clip-path: polygon(0 0, 100% 0, 50% 100%);
}

.os-ship-icon {
  width: 24px;
  height: 24px;
}

.os-ship-title {
  font-family: 'Pixelify Sans', monospace;
  font-size: 1.1rem;
  font-weight: 600;
}

.os-ship-text {
  margin-top: 0.25rem;
  font-size: 0.95rem;
  color: #333;
}

/* Pipeline */

.os-flow {
  display: grid;
  gap: 2.25rem;
}

.os-step {
  position: relative;
}

.os-step + .os-step::before {
  content: '';
  position: absolute;
  top: -1.9rem;
  left: 12px;
  width: 20px;
  height: 1.5rem;
  background: #000;
  clip-path: polygon(40% 0, 60% 0, 60% 60%, 90% 60%, 50% 100%, 10% 60%, 40% 60%);
}

.os-step-tile {
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  border: 1px solid #000;
  background: #fff;
  box-shadow: var(--bevel-in), 2px 2px 0 #000;
}

.os-step-tile svg {
  width: 32px;
  height: 32px;
}

.os-step-title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.75rem;
  font-family: 'Pixelify Sans', monospace;
  font-size: 1.2rem;
  font-weight: 600;
}

.os-step-num {
  display: grid;
  place-items: center;
  width: 1.4rem;
  height: 1.4rem;
  border-radius: 50%;
  background: var(--accent);
  color: #fff;
  font-family: 'Atkinson Hyperlegible', sans-serif;
  font-size: 0.8rem;
  font-weight: 700;
}

.os-step-text {
  margin-top: 0.35rem;
  font-size: 0.95rem;
  color: #333;
}

/* Stickies */

.os-win.os-sticky {
  --sticky: #fff3a0;
  --sticky-deep: #f0dc6a;

  background: var(--sticky);
  box-shadow: var(--shadow);
}

.os-win.os-sticky :deep(.os-titlebar) {
  height: 1.4rem;
  background: var(--sticky-deep);
  border-bottom: 1px solid #000;
}

.os-win.os-sticky :deep(.os-title) {
  background: transparent;
  color: #000;
  font-size: 0.85rem;
  line-height: 1.4rem;
}

.os-win.os-sticky :deep(.os-box) {
  background: var(--sticky-deep);
  box-shadow: none;
  border-color: #000;
}

.os-win.os-sticky :deep(.os-body) {
  margin: 0;
  border: 0;
  background: transparent;
}

.os-rules {
  display: grid;
  gap: 0.8rem;
  padding: 1.25rem 1.4rem 1.6rem;
  counter-reset: rule;
}

.os-rules li {
  display: grid;
  grid-template-columns: 1.6rem 1fr;
  font-size: 1.05rem;
  line-height: 1.4;
  counter-increment: rule;
}

.os-rules li::before {
  content: counter(rule) '.';
  font-weight: 700;
}

/* Arsenal */

.os-apps {
  display: grid;
  gap: 1px;
  background: var(--plat-3);
}

.os-app {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 0.9rem;
  align-items: start;
  padding: 1.1rem 1rem;
  background: #fff;
}

.os-app-icon {
  width: 48px;
  height: 48px;
}

.os-app-letter {
  font-family: 'Pixelify Sans', monospace;
  font-size: 7px;
  font-weight: 700;
  fill: var(--accent);
}

.os-app-name {
  font-family: 'Pixelify Sans', monospace;
  font-size: 1.15rem;
  font-weight: 600;
  overflow-wrap: anywhere;
}

.os-app-name a {
  text-decoration: underline;
  text-decoration-color: var(--accent);
  text-underline-offset: 3px;
}

.os-app-name a:hover {
  background: var(--lav);
}

.os-app-status {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  margin-top: 0.15rem;
  font-family: 'Pixelify Sans', monospace;
  font-size: 0.8rem;
  color: var(--accent);
}

.os-app-status.is-private {
  color: #000;
}

.os-app-status svg {
  width: 10px;
  height: 11px;
}

.os-app-text {
  margin-top: 0.4rem;
  font-size: 0.95rem;
  color: #333;
}

.os-app-tags {
  justify-content: flex-start;
}

@media (min-width: 640px) {
  .os-readme {
    padding: 2rem 2.25rem 2.25rem;
  }

  .os-ai-stats {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .os-ship,
  .os-apps {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .os-app:last-child:nth-child(odd) {
    grid-column: 1 / -1;
  }

  .os-ship-item:nth-child(odd) {
    border-right: 1px dotted var(--plat-3);
  }

  .os-plot {
    height: 18rem;
  }
}

@media (min-width: 1024px) {
  .os-w-readme {
    grid-area: 1 / 1 / 2 / 9;
  }

  .os-w-rules {
    grid-area: 1 / 9 / 2 / 13;
    align-self: start;
    margin-top: 6rem;
    rotate: -1.5deg;
  }

  .os-w-pace {
    grid-area: 2 / 3 / 3 / 13;
  }

  .os-w-flow {
    grid-area: 3 / 1 / 4 / 13;
  }

  .os-flow {
    grid-template-columns: repeat(5, minmax(0, 1fr));
    gap: 2.5rem;
    padding: 1.75rem 1.75rem 2rem;
  }

  .os-step + .os-step::before {
    top: 12px;
    left: -2.1rem;
    width: 1.7rem;
    height: 20px;
    clip-path: polygon(0 40%, 60% 40%, 60% 10%, 100% 50%, 60% 90%, 60% 60%, 0 60%);
  }

  .os-w-shipped {
    grid-area: 4 / 1 / 5 / 11;
  }

  .os-w-arsenal {
    grid-area: 5 / 2 / 6 / 13;
  }
}

@media (max-width: 639px) {
  .os-ai-stats div {
    flex-direction: row-reverse;
    align-items: center;
    gap: 0.9rem;
  }

  .os-ai-stats dd {
    min-width: 4.5rem;
    font-size: 1.9rem;
  }

  .os-ai-stats dt {
    margin-top: 0;
  }

  .os-chart {
    padding-right: 0.75rem;
  }

  .os-bars,
  .os-axis {
    gap: 0.15rem;
    padding-inline: 0.15rem;
  }

  .os-bar-value {
    font-size: 0.65rem;
  }

  .os-axis {
    font-size: 0.6rem;
  }

  .os-chart-caption {
    margin-left: 0;
  }
}
</style>
