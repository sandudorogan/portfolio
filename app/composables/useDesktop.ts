import type { InjectionKey } from 'vue'

const DESK = '(min-width: 1024px) and (pointer: fine)'

/**
 * Window stacking, drag offsets and window-shade state for the Retro OS desktop.
 * Everything starts empty, so server and client render the same markup until the user acts.
 */
export function useDesktop() {
  const order = ref<string[]>([])
  const shut = ref<string[]>([])
  const offsets = reactive<Record<string, { x: number, y: number }>>({})

  const isFront = (id: string) => !order.value.length || order.value.at(-1) === id
  const isShut = (id: string) => shut.value.includes(id)

  function front(id: string) {
    if (order.value.at(-1) !== id) order.value = [...order.value.filter(w => w !== id), id]
  }

  function shade(id: string) {
    shut.value = isShut(id) ? shut.value.filter(w => w !== id) : [...shut.value, id]
  }

  function winStyle(id: string) {
    const z = order.value.indexOf(id)
    const o = offsets[id]
    return {
      'zIndex': z < 0 ? undefined : 10 + z,
      '--dx': o && `${o.x}px`,
      '--dy': o && `${o.y}px`,
    }
  }

  function drag(id: string, e: PointerEvent) {
    if (e.button !== 0 || !window.matchMedia(DESK).matches) return
    if ((e.target as HTMLElement).closest('button, a')) return
    e.preventDefault()
    front(id)
    const bar = e.currentTarget as HTMLElement
    const from = offsets[id] ?? { x: 0, y: 0 }
    const ox = e.clientX - from.x
    const oy = e.clientY - from.y
    const move = (ev: PointerEvent) => {
      offsets[id] = { x: ev.clientX - ox, y: ev.clientY - oy }
    }
    const stop = () => {
      bar.removeEventListener('pointermove', move)
      bar.removeEventListener('pointerup', stop)
      bar.removeEventListener('pointercancel', stop)
    }
    bar.setPointerCapture(e.pointerId)
    bar.addEventListener('pointermove', move)
    bar.addEventListener('pointerup', stop)
    bar.addEventListener('pointercancel', stop)
  }

  return { isFront, isShut, front, shade, winStyle, drag }
}

export const deskKey: InjectionKey<ReturnType<typeof useDesktop>> = Symbol('os-desk')
