// @vitest-environment node

import { describe, expect, it } from 'vitest'

declare global {
  var __PORTFOLIO_UNIT_SETUP__: boolean | undefined
}

describe('unit test harness', () => {
  it('loads the shared unit setup', () => {
    expect(globalThis.__PORTFOLIO_UNIT_SETUP__).toBe(true)
  })
})
