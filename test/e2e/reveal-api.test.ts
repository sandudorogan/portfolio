import { fetch, setup } from '@nuxt/test-utils/e2e'
import { describe, expect, it } from 'vitest'

await setup({
  browser: false,
  env: {
    NUXT_CONTACT_EMAIL: 'hello@example.com',
    NUXT_CONTACT_PHONE: '+40 700 000 000',
  },
})

describe('reveal APIs', () => {
  it('returns email info with no-store caching disabled', async () => {
    const response = await fetch('/api/reveal/email')
    const payload = await response.json()

    expect(response.status).toBe(200)
    expect(response.headers.get('cache-control')).toBe('no-store, max-age=0')
    expect(payload).toEqual({
      value: 'hello@example.com',
      link: 'mailto:hello@example.com',
    })
  })

  it('returns phone info with a normalized tel link', async () => {
    const response = await fetch('/api/reveal/phone')
    const payload = await response.json()

    expect(response.status).toBe(200)
    expect(response.headers.get('cache-control')).toBe('no-store, max-age=0')
    expect(payload).toEqual({
      value: '+40 700 000 000',
      link: 'tel:+40700000000',
    })
  })
})
