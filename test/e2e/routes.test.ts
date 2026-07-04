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
    ['/', 'en-US', 'Full Stack Developer', 'SELECTED WORK'],
    ['/ro', 'ro-RO', 'Dezvoltator Full Stack', 'PROIECTE SELECTATE'],
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

  it('no longer serves the old multi-page routes', async () => {
    const about = await fetch('/about')
    expect(about.status).toBe(404)

    const contact = await fetch('/contact')
    expect(contact.status).toBe(404)
  })
})
