// @vitest-environment node

import { describe, expect, it } from 'vitest'

import { cn } from '../../../../app/utils/utils'

describe('cn', () => {
  it('merges conflicting Tailwind classes predictably', () => {
    expect(cn('px-2 text-sm', 'px-4', false && 'hidden', ['font-bold'])).toBe('text-sm px-4 font-bold')
  })
})
