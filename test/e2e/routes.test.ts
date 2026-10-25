import { fetch, setup } from '@nuxt/test-utils/e2e'
import { describe, expect, it } from 'vitest'

await setup({
  browser: false,
  env: {
    NUXT_PUBLIC_SITE_URL: 'https://dorogans.com',
  },
})

describe('single-page i18n smoke tests', () => {
  it.each([
    ['/', 'en-US', 'Full Stack Developer', 'Selected Work'],
    ['/ro', 'ro-RO', 'Dezvoltator Full Stack', 'Proiecte selectate'],
  ])('renders %s in the right language', async (path, language, title, bodyText) => {
    const response = await fetch(path)
    const html = await response.text()

    expect(response.status).toBe(200)
    expect(html).toContain(`lang="${language}"`)
    expect(html).toContain(title)
    expect(html).toContain(bodyText)
    // multilingual SEO: canonical + hreflang alternates
    expect(html).toContain('rel="canonical"')
    expect(html).toContain('hreflang="ro-RO"')
  })

  it.each([
    ['/ai', 'en-US', 'AI, in practice'],
    ['/ro/ai', 'ro-RO', 'AI, în practică'],
  ])('renders the AI page %s in the right language', async (path, language, heading) => {
    const response = await fetch(path)
    const html = await response.text()

    expect(response.status).toBe(200)
    expect(html).toContain(`lang="${language}"`)
    expect(html).toContain(heading)
    expect(html).toContain('rel="canonical"')
  })

  it.each([
    ['/about', '/#experience'],
    ['/contact', '/#contact'],
    ['/ro/about', '/ro#experience'],
    ['/ro/contact', '/ro#contact'],
  ])('permanently redirects the old multi-page route %s to %s', async (path, target) => {
    const response = await fetch(path, { redirect: 'manual' })

    expect(response.status).toBe(301)
    expect(response.headers.get('location')).toBe(target)
  })
})
