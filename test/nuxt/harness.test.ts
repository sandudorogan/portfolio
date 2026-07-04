import { describe, expect, it } from 'vitest'

declare global {
  var __PORTFOLIO_NUXT_SETUP__: boolean | undefined
}

describe('nuxt test harness', () => {
  it('loads the shared nuxt setup', () => {
    expect(globalThis.__PORTFOLIO_NUXT_SETUP__).toBe(true)
  })
})
