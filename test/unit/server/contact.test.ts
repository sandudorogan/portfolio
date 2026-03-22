// @vitest-environment node

import { describe, expect, it } from 'vitest'

import { buildContactEmailPayload, validateContactInput } from '../../../server/utils/contact'

describe('validateContactInput', () => {
  it('rejects a missing name', () => {
    expect(() => validateContactInput({
      email: 'hello@example.com',
      message: 'Hello there',
    })).toThrow('Name is required')
  })

  it('rejects an invalid email address', () => {
    expect(() => validateContactInput({
      name: 'Sandu',
      email: 'hello-at-example.com',
      message: 'Hello there',
    })).toThrow('Invalid email address')
  })

  it('rejects a non-string subject', () => {
    expect(() => validateContactInput({
      name: 'Sandu',
      email: 'hello@example.com',
      subject: 123,
      message: 'Hello there',
    })).toThrow('Subject must be a string')
  })

  it('sanitizes HTML and trims fields to their max length', () => {
    const result = validateContactInput({
      name: `<strong>${'A'.repeat(120)}</strong>`,
      email: '  <em>hello@example.com</em>  ',
      subject: `  <span>${'B'.repeat(220)}</span>  `,
      message: ` <p>${'C'.repeat(6000)}</p> `,
    })

    expect(result).toEqual({
      name: 'A'.repeat(100),
      email: 'hello@example.com',
      subject: 'B'.repeat(200),
      message: 'C'.repeat(5000),
    })
  })
})

describe('buildContactEmailPayload', () => {
  it('uses a fallback subject when the subject is blank', () => {
    const payload = buildContactEmailPayload({
      name: 'Sandu',
      email: 'hello@example.com',
      subject: '',
      message: 'Need help with a portfolio project',
    })

    expect(payload.displaySubject).toBe('New Contact Form Submission')
    expect(payload.subject).toBe('[Portfolio] New Contact Form Submission')
    expect(payload.text).toContain('Subject: New Contact Form Submission')
    expect(payload.html).toContain('<p><strong>Subject:</strong> New Contact Form Submission</p>')
  })
})
