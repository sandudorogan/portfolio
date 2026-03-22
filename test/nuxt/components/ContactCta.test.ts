import { mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, expect, it } from 'vitest'

import AppContactCta from '../../../app/components/app/ContactCta.vue'

describe('AppContactCta', () => {
  it('falls back to the localized contact route when no target is provided', async () => {
    const wrapper = await mountSuspended(AppContactCta, {
      props: {
        title: 'Ready?',
        description: 'Let us talk.',
      },
      global: {
        stubs: {
          UiNeonBorder: { template: '<div><slot /></div>' },
          UiSparklesText: { template: '<div><slot /></div>' },
          UiGradientButton: {
            props: ['to'],
            template: '<a :data-to="to"><slot /></a>',
          },
          UIcon: true,
        },
      },
    })

    expect(wrapper.get('[data-to]').attributes('data-to')).toBe('/contact')
  })

  it('uses the explicit target when one is provided', async () => {
    const wrapper = await mountSuspended(AppContactCta, {
      props: {
        title: 'Ready?',
        description: 'Let us talk.',
        to: '/contact#form',
      },
      global: {
        stubs: {
          UiNeonBorder: { template: '<div><slot /></div>' },
          UiSparklesText: { template: '<div><slot /></div>' },
          UiGradientButton: {
            props: ['to'],
            template: '<a :data-to="to"><slot /></a>',
          },
          UIcon: true,
        },
      },
    })

    expect(wrapper.get('[data-to]').attributes('data-to')).toBe('/contact#form')
  })
})
