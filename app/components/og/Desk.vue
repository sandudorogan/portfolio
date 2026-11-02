<script setup lang="ts">
// Shared 1200×630 Retro OS desktop for the OgImage templates: dithered desk + menu bar.
defineProps<{
  menus: string[]
}>()

const pixel = '\'Pixelify Sans\', \'Pixelify+Sans\''
</script>

<template>
  <div :style="{ display: 'flex', position: 'relative', width: '1200px', height: '630px', backgroundColor: '#b7b7c7' }">
    <svg width="1200" height="630" :style="{ position: 'absolute', top: '0', left: '0' }">
      <defs>
        <pattern
          id="dither"
          width="8"
          height="8"
          patternUnits="userSpaceOnUse"
        >
          <path d="M0 0h2v2H0zM4 4h2v2H4z" fill="#9595ad" />
        </pattern>
      </defs>
      <rect width="1200" height="630" fill="url(#dither)" />
    </svg>

    <div
      class="flex flex-row"
      :style="{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        top: '0',
        left: '0',
        width: '1200px',
        height: '48px',
        padding: '0 28px',
        backgroundColor: '#eeeeee',
        borderBottom: '2px solid #111111',
        fontFamily: pixel,
        fontSize: '24px',
        color: '#111111',
      }"
    >
      <svg
        width="27"
        height="27"
        viewBox="0 0 9 9"
        shape-rendering="crispEdges"
      >
        <rect width="9" height="9" fill="#4a3fb5" />
        <path d="M3 1h4v1H3zM2 2h1v2H2zM3 4h3v1H3zM6 5h1v2H6zM2 7h4v1H2z" fill="#ffffff" />
      </svg>
      <div :style="{ display: 'flex', marginLeft: '18px', marginRight: '12px', fontWeight: 700 }">
        Sandu
      </div>
      <div
        v-for="menu in menus"
        :key="menu"
        :style="{ display: 'flex', marginLeft: '24px' }"
      >
        {{ menu }}
      </div>
      <div :style="{ display: 'flex', marginLeft: 'auto' }">
        dorogans.com
      </div>
    </div>

    <slot />
  </div>
</template>
