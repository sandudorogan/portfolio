import { fetch, setup } from '@nuxt/test-utils/e2e'
import { describe, expect, it } from 'vitest'

await setup({
  browser: false,
  env: {
    NUXT_CONTACT_EMAIL: '',
    NUXT_CONTACT_PHONE: '',
  },
})

describe('reveal APIs without runtime config', () => {
  it('fails fast when email is not configured', async () => {
    const response = await fetch('/api/reveal/email')
    const payload = await response.json()

    expect(response.status).toBe(500)
    expect(payload.statusMessage).toBe('Contact email not configured')
  })

  it('fails fast when phone is not configured', async () => {
    const response = await fetch('/api/reveal/phone')
    const payload = await response.json()

    expect(response.status).toBe(500)
    expect(payload.statusMessage).toBe('Contact phone not configured')
  })
})
