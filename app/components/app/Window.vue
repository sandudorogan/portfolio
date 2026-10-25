<script setup lang="ts">
// A draggable OS 8 window for the Retro OS pages. Styles live in ~/assets/css/os.css.
import { deskKey } from '~/composables/useDesktop'

const props = withDefaults(defineProps<{
  /** Window key for stacking, dragging and shading. */
  win: string
  title: string
  /** Render the title as the section's h2. */
  heading?: boolean
  /** Grey panel body without the decorative scrollbar. */
  flat?: boolean
  zoom?: boolean
}>(), { heading: true, flat: false, zoom: true })

const desk = inject(deskKey)!
const { t } = useI18n()

function onDoubleClick(e: MouseEvent) {
  if (!(e.target as HTMLElement).closest('button')) desk.shade(props.win)
}
</script>

<template>
  <section
    class="os-win"
    :class="{ 'is-front': desk.isFront(win) }"
    :style="desk.winStyle(win)"
    :aria-labelledby="`os-t-${win}`"
    @pointerdown="desk.front(win)"
    @focusin="desk.front(win)"
  >
    <div class="os-titlebar" @pointerdown="desk.drag(win, $event)" @dblclick="onDoubleClick">
      <span class="os-box" aria-hidden="true" />
      <component :is="heading ? 'h2' : 'p'" :id="`os-t-${win}`" class="os-title">
        {{ title }}
      </component>
      <span v-if="zoom" class="os-box os-box-zoom" aria-hidden="true" />
      <button
        type="button"
        class="os-box os-box-shade"
        :aria-label="t('window.collapse', { title })"
        :aria-controls="`os-body-${win}`"
        :aria-expanded="!desk.isShut(win)"
        @click="desk.shade(win)"
      />
    </div>
    <div
      v-show="!desk.isShut(win)"
      :id="`os-body-${win}`"
      class="os-body"
      :class="{ 'os-body-flat': flat }"
    >
      <div class="os-body-main">
        <slot />
      </div>
      <div v-if="!flat" class="os-scroll" aria-hidden="true">
        <span class="os-arrow" /><span class="os-track"><span class="os-thumb" /></span><span class="os-arrow os-arrow-down" /><span class="os-grow" />
      </div>
    </div>
  </section>
</template>
