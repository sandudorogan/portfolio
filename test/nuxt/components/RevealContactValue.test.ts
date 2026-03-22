import { mountSuspended, mockNuxtImport, registerEndpoint } from '@nuxt/test-utils/runtime'
import { flushPromises } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import AppRevealContactValue from '../../../app/components/app/RevealContactValue.vue'

const { useI18nMock } = vi.hoisted(() => ({
  useI18nMock: vi.fn(),
}))

mockNuxtImport('useI18n', () => useI18nMock)

async function waitForCondition(condition: () => boolean, attempts = 10) {
  for (let attempt = 0; attempt < attempts; attempt += 1) {
    await flushPromises()
    if (condition()) {
      return
    }

    await new Promise(resolve => setTimeout(resolve, 0))
  }

  throw new Error('Timed out waiting for condition')
}

describe('AppRevealContactValue', () => {
  const cleanupFns: Array<() => void> = []

  afterEach(() => {
    while (cleanupFns.length > 0) {
      cleanupFns.pop()?.()
    }
  })

  beforeEach(() => {
    useI18nMock.mockReset()

    useI18nMock.mockReturnValue({
      t: (key: string) => ({
        'reveal.revealing': 'Revealing...',
        'reveal.retry': 'Click to retry',
        'reveal.failed': 'Failed - click to retry',
        'reveal.clickToReveal': 'Click to reveal',
        'reveal.clickToRevealAria': 'Click to reveal contact info',
      })[key] ?? key,
    })
  })

  it('reveals fetched contact info as a link', async () => {
    cleanupFns.push(registerEndpoint('/api/reveal/email', () => ({
      value: 'hello@example.com',
      link: 'mailto:hello@example.com',
    })))

    const wrapper = await mountSuspended(AppRevealContactValue, {
      props: {
        endpoint: '/api/reveal/email',
        placeholder: 'email@example.com',
      },
      global: {
        stubs: {
          UIcon: true,
        },
      },
    })

    await wrapper.get('button').trigger('click')
    await flushPromises()

    expect(wrapper.get('a').attributes('href')).toBe('mailto:hello@example.com')
    expect(wrapper.text()).toContain('hello@example.com')
  })

  it('blocks duplicate requests while a reveal is already loading', async () => {
    let calls = 0
    let resolveFetch: ((value: { value: string; link: string }) => void) | undefined
    cleanupFns.push(registerEndpoint('/api/reveal/email', async () => {
      calls += 1
      return await new Promise((resolve) => {
        resolveFetch = resolve as (value: { value: string; link: string }) => void
      })
    }))

    const wrapper = await mountSuspended(AppRevealContactValue, {
      props: {
        endpoint: '/api/reveal/email',
      },
      global: {
        stubs: {
          UIcon: true,
        },
      },
    })

    const button = wrapper.get('button')
    await Promise.all([button.trigger('click'), button.trigger('click')])

    expect(calls).toBe(1)

    resolveFetch?.({
      value: 'hello@example.com',
      link: 'mailto:hello@example.com',
    })
    await flushPromises()
  })

  it('shows retry UI and can recover after retrying', async () => {
    cleanupFns.push(registerEndpoint('/api/reveal/phone', () => ({
        value: '+40 700 000 000',
        link: 'tel:+40700000000',
      })))

    const wrapper = await mountSuspended(AppRevealContactValue, {
      props: {
        endpoint: '/api/reveal/phone',
      },
      global: {
        stubs: {
          UIcon: true,
        },
      },
    })

    const setupState = wrapper.vm.$.setupState as {
      error: boolean
      loading: boolean
      revealed: boolean
      data: { value: string; link: string } | null
    }

    setupState.error = true
    setupState.loading = false
    setupState.revealed = false
    setupState.data = null
    await flushPromises()

    expect(wrapper.text()).toContain('Failed - click to retry')

    await wrapper.get('button').trigger('click')
    await waitForCondition(() => wrapper.text().includes('+40 700 000 000'))

    expect(wrapper.get('a').attributes('href')).toBe('tel:+40700000000')
    expect(wrapper.text()).toContain('+40 700 000 000')
  })
})
