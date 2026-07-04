// @vitest-environment node

import { describe, expect, it } from 'vitest'

import { cn } from '../../../../app/utils/utils'

describe('cn', () => {
  it('merges conflicting Tailwind classes predictably', () => {
    const isHidden = false
    expect(cn('px-2 text-sm', 'px-4', isHidden && 'hidden', ['font-bold'])).toBe('text-sm px-4 font-bold')
  })
})
