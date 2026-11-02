<script setup lang="ts">
import { aiStatValues } from '~/utils/ai-stats'

// AI card: the "Read Me" window in front of the "Pace" chart of merged PRs per month.
const props = withDefaults(defineProps<{
  window?: string
  paceWindow?: string
  title?: string
  motto?: string
  stat?: { value: string, label: string }
  bars?: Array<{ label: string, value: number }>
  menus?: string[]
}>(), {
  window: 'Read Me',
  paceWindow: 'Pace',
  title: 'AI, in practice',
  motto: 'Agents do the typing. I do the deciding.',
  stat: () => ({ value: aiStatValues[0]!, label: 'more PRs merged per month than a year ago' }),
  bars: () => [],
  menus: () => [],
})

const pixel = '\'Pixelify Sans\', \'Pixelify+Sans\''
const reading = '\'Atkinson Hyperlegible\', \'Atkinson+Hyperlegible\''
const fill = 'repeating-linear-gradient(0deg, #6b63d4 0px, #6b63d4 2px, #ccccff 2px, #ccccff 4px)'
const chartHeight = 300
const peak = computed(() => Math.max(1, ...props.bars.map(bar => bar.value)))
</script>

<template>
  <OgDesk :menus="menus">
    <OgWindow :title="paceWindow" :style="{ left: '520px', top: '82px', width: '632px', height: '500px' }">
      <div class="flex flex-row" :style="{ display: 'flex', flexDirection: 'row', alignItems: 'flex-end', flexGrow: 1, padding: '0 22px 18px 112px' }">
        <div
          v-for="bar in bars"
          :key="bar.label"
          :style="{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', flexGrow: 1, flexBasis: 0 }"
        >
          <div :style="{ display: 'flex', fontFamily: reading, fontWeight: 700, fontSize: '17px', color: '#111111' }">
            {{ bar.value }}
          </div>
          <div
            :style="{
              display: 'flex',
              width: '30px',
              height: `${Math.max(4, (bar.value / peak) * chartHeight)}px`,
              marginTop: '4px',
              border: '2px solid #111111',
              backgroundImage: fill,
            }"
          />
          <div :style="{ display: 'flex', marginTop: '8px', fontFamily: reading, fontSize: '15px', color: '#555555' }">
            {{ bar.label }}
          </div>
        </div>
      </div>
    </OgWindow>

    <OgWindow
      :title="window"
      active
      :style="{ left: '48px', top: '82px', width: '580px', height: '440px' }"
    >
      <div :style="{ display: 'flex', flexDirection: 'column', justifyContent: 'center', flexGrow: 1, padding: '0 44px' }">
        <div :style="{ display: 'flex', fontFamily: pixel, fontWeight: 700, fontSize: '64px', lineHeight: 1.05, color: '#111111', textShadow: '5px 5px 0 #ccccff' }">
          {{ title }}
        </div>
        <div class="flex flex-row" :style="{ display: 'flex', flexDirection: 'row', marginTop: '20px' }">
          <div :style="{ display: 'flex', padding: '4px 10px', backgroundColor: '#ccccff', fontFamily: pixel, fontSize: '28px', lineHeight: 1.3, color: '#111111' }">
            {{ motto }}
          </div>
        </div>
        <div class="flex flex-row" :style="{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: '30px' }">
          <div :style="{ display: 'flex', fontFamily: reading, fontWeight: 700, fontSize: '64px', lineHeight: 1, color: '#4a3fb5' }">
            {{ stat.value }}
          </div>
          <div :style="{ display: 'flex', maxWidth: '300px', marginLeft: '20px', fontFamily: reading, fontSize: '24px', lineHeight: 1.3, color: '#333333' }">
            {{ stat.label }}
          </div>
        </div>
      </div>
    </OgWindow>
  </OgDesk>
</template>
