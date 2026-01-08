<template>
  <div ref="mapContainer" class="w-full h-full" />
</template>

<script setup lang="ts">
import L from 'leaflet'

// Bucharest coordinates (same as in layouts/default.vue meta tags)
const BUCHAREST_LAT = 44.4268
const BUCHAREST_LNG = 26.1025
const DEFAULT_ZOOM = 13

const mapContainer = ref<HTMLElement | null>(null)
let map: L.Map | null = null

onMounted(() => {
  if (!mapContainer.value) return

  // Fix Leaflet default marker icon paths broken by Vite bundling
  // https://github.com/Leaflet/Leaflet/issues/4968
  delete (L.Icon.Default.prototype as unknown as Record<string, unknown>)._getIconUrl
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: new URL('leaflet/dist/images/marker-icon-2x.png', import.meta.url).href,
    iconUrl: new URL('leaflet/dist/images/marker-icon.png', import.meta.url).href,
    shadowUrl: new URL('leaflet/dist/images/marker-shadow.png', import.meta.url).href,
  })

  map = L.map(mapContainer.value, {
    center: [BUCHAREST_LAT, BUCHAREST_LNG],
    zoom: DEFAULT_ZOOM,
    scrollWheelZoom: false, // Prevent accidental zoom while scrolling the page
  })

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 19,
  }).addTo(map)

  L.marker([BUCHAREST_LAT, BUCHAREST_LNG])
    .addTo(map)
    .bindPopup('Bucharest, Romania')
    .openPopup()
})

onUnmounted(() => {
  if (map) {
    map.remove()
    map = null
  }
})
</script>
