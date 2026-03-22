import { mountSuspended, mockNuxtImport } from '@nuxt/test-utils/runtime'
import { describe, expect, it, vi } from 'vitest'

const { useSeoMetaMock, useHeadMock } = vi.hoisted(() => ({
  useSeoMetaMock: vi.fn(),
  useHeadMock: vi.fn(),
}))

mockNuxtImport('useSeoMeta', () => useSeoMetaMock)
mockNuxtImport('useHead', () => useHeadMock)

describe('usePageSeo', () => {
  it('sets canonical and social metadata from the route and site URL', async () => {
    const { defineComponent } = await import('vue')
    const { usePageSeo } = await import('../../../app/composables/usePageSeo')

    const TestComponent = defineComponent({
      setup() {
        usePageSeo({
          title: 'About',
          description: 'About page description',
        })

        return () => 'SEO'
      },
    })

    await mountSuspended(TestComponent, { route: '/about' })

    const seoMeta = useSeoMetaMock.mock.calls
      .map(([payload]) => payload)
      .find((payload) => payload.title === 'About')
    const head = useHeadMock.mock.calls
      .map(([payload]) => payload)
      .find((payload) => payload.link?.some((link: { rel: string }) => link.rel === 'canonical'))

    expect(seoMeta?.title).toBe('About')
    expect(seoMeta?.description).toBe('About page description')
    expect(seoMeta?.ogUrl.value).toBe('https://dorogans.com/about')
    expect(head?.link[0].href.value).toBe('https://dorogans.com/about')
  })
})
