<script setup lang="ts">
// Home card: the "About" window in front of a "Get Info" window, as on the desktop.
withDefaults(defineProps<{
  window?: string
  infoWindow?: string
  role?: string
  description?: string
  stats?: Array<{ value: number, label: string }>
  menus?: string[]
}>(), {
  window: 'About Sandu',
  infoWindow: 'Sandu Info',
  role: 'Full Stack Developer — Bucharest, Romania',
  description: 'Tell me the what and I\'ll show you the how. No fluff, no filler — working software.',
  stats: () => [],
  menus: () => [],
})

const pixel = '\'Pixelify Sans\', \'Pixelify+Sans\''
const reading = '\'Atkinson Hyperlegible\', \'Atkinson+Hyperlegible\''
const meter = 'repeating-linear-gradient(0deg, #6b63d4 0px, #6b63d4 2px, #ccccff 2px, #ccccff 4px)'
</script>

<template>
  <OgDesk :menus="menus">
    <OgWindow :title="infoWindow" :style="{ left: '690px', top: '196px', width: '462px', height: '330px' }">
      <div :style="{ display: 'flex', flexDirection: 'column', justifyContent: 'center', flexGrow: 1, padding: '0 34px 0 96px' }">
        <div
          v-for="stat in stats"
          :key="stat.label"
          class="flex flex-row"
          :style="{ display: 'flex', flexDirection: 'row', alignItems: 'flex-end', margin: '12px 0' }"
        >
          <div :style="{ display: 'flex', flexDirection: 'column', width: '236px' }">
            <div :style="{ display: 'flex', fontFamily: reading, fontSize: '20px', color: '#333333' }">
              {{ stat.label }}
            </div>
            <div class="flex flex-row" :style="{ display: 'flex', flexDirection: 'row', height: '18px', marginTop: '6px', border: '2px solid #111111', backgroundColor: '#ffffff' }">
              <div :style="{ display: 'flex', width: `${(stat.value / Math.max(...stats.map(s => s.value))) * 100}%`, backgroundImage: meter }" />
            </div>
          </div>
          <div :style="{ display: 'flex', flexShrink: 0, width: '64px', marginLeft: '12px', justifyContent: 'flex-end', fontFamily: reading, fontWeight: 700, fontSize: '36px', lineHeight: 1, color: '#111111' }">
            {{ stat.value }}
          </div>
        </div>
      </div>
    </OgWindow>

    <OgWindow
      :title="window"
      active
      :style="{ left: '48px', top: '82px', width: '700px', height: '500px' }"
    >
      <div :style="{ display: 'flex', flexDirection: 'column', justifyContent: 'center', flexGrow: 1, padding: '0 48px' }">
        <div :style="{ display: 'flex', fontFamily: pixel, fontSize: '24px', color: '#4a3fb5' }">
          {{ role }}
        </div>
        <div
          :style="{
            display: 'flex',
            flexDirection: 'column',
            marginTop: '14px',
            fontFamily: pixel,
            fontWeight: 700,
            fontSize: '96px',
            lineHeight: 1.02,
            color: '#111111',
            textShadow: '6px 6px 0 #ccccff',
          }"
        >
          <span>Sandu</span>
          <span>Dorogan</span>
        </div>
        <div :style="{ display: 'flex', marginTop: '26px', fontFamily: reading, fontSize: '26px', lineHeight: 1.4, color: '#222222' }">
          {{ description }}
        </div>
      </div>
    </OgWindow>
  </OgDesk>
</template>
