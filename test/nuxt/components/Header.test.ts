import { mountSuspended, mockNuxtImport } from '@nuxt/test-utils/runtime'
import { flushPromises } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'

import AppHeader from '../../../app/components/app/Header.vue'

const { navigateToMock } = vi.hoisted(() => ({
  navigateToMock: vi.fn(),
}))

mockNuxtImport('navigateTo', () => navigateToMock)

describe('AppHeader', () => {
  it('marks the active route in the navigation', async () => {
    const wrapper = await mountSuspended(AppHeader, {
      route: '/about',
      global: {
        stubs: {
          UIcon: true,
        },
      },
    })

    const links = wrapper.findAll('a')
    const aboutLink = links.find((link) => link.text().includes('About'))

    expect(aboutLink?.classes()).toContain('text-highlighted')
  })

  it('switches locale using the computed switchLocalePath target', async () => {
    navigateToMock.mockReset()

    const wrapper = await mountSuspended(AppHeader, {
      route: '/about',
      global: {
        stubs: {
          UIcon: true,
        },
      },
    })

    const switchButtons = wrapper.findAll('button').filter((button) => button.text().trim() === 'RO')

    await switchButtons[0].trigger('click')
    await flushPromises()

    expect(navigateToMock).toHaveBeenCalledWith('/ro/about')
  })
})
