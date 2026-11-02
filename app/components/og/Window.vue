<script setup lang="ts">
// OS 8 window frame for the OgImage templates. Position it with a `style` from the parent.
defineProps<{
  title: string
  /** Front window: striped title bar. Back windows get a plain grey bar. */
  active?: boolean
}>()

const stripes = 'repeating-linear-gradient(180deg, #888888 0px, #888888 2px, #ffffff 2px, #ffffff 4px)'
const box = { display: 'flex', width: '22px', height: '22px', backgroundColor: '#eeeeee', border: '2px solid #111111' }
</script>

<template>
  <div
    :style="{
      display: 'flex',
      flexDirection: 'column',
      position: 'absolute',
      backgroundColor: '#dddddd',
      border: '2px solid #111111',
      boxShadow: '8px 8px 0 #111111',
    }"
  >
    <div class="flex flex-row" :style="{ display: 'flex', flexDirection: 'row', alignItems: 'center', height: '42px', padding: '0 12px' }">
      <div :style="active ? box : { ...box, opacity: 0 }" />
      <div :style="{ display: 'flex', flexGrow: 1, height: '20px', margin: '0 14px', ...(active && { backgroundImage: stripes }) }" />
      <div
        :style="{
          display: 'flex',
          fontFamily: '\'Pixelify Sans\', \'Pixelify+Sans\'',
          fontSize: '22px',
          color: active ? '#111111' : '#777777',
        }"
      >
        {{ title }}
      </div>
      <div :style="{ display: 'flex', flexGrow: 1, height: '20px', margin: '0 14px', ...(active && { backgroundImage: stripes }) }" />
      <div :style="active ? box : { ...box, opacity: 0 }" />
    </div>
    <div
      :style="{
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        margin: '0 6px 6px',
        backgroundColor: '#ffffff',
        border: '2px solid #111111',
      }"
    >
      <slot />
    </div>
  </div>
</template>
