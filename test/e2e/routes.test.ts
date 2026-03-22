import { fetch, setup } from '@nuxt/test-utils/e2e'
import { describe, expect, it } from 'vitest'

await setup({
  browser: false,
  env: {
    NUXT_PUBLIC_SITE_URL: 'https://dorogans.com',
  },
})

describe('route smoke tests', () => {
  it.each([
    ['/', 'en-US', 'Sandu Dorogan', null],
    ['/about', 'en-US', 'About', 'Sandu Dorogan'],
    ['/contact', 'en-US', 'Contact', 'Get In Touch'],
    ['/ro', 'ro-RO', 'Sandu Dorogan', null],
    ['/ro/about', 'ro-RO', 'Despre', 'Sandu Dorogan'],
    ['/ro/contact', 'ro-RO', 'Contact', 'Hai să vorbim'],
  ])('renders %s with page-specific output', async (path, language, title, bodyText) => {
    const response = await fetch(path)
    const html = await response.text()

    expect(response.status).toBe(200)
    expect(html).toContain(`lang="${language}"`)
    expect(html).toContain(`<title>${title}</title>`)
    if (bodyText) {
      expect(html).toContain(bodyText)
    }
  })
})
