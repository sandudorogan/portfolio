const DEFAULT_SUBJECT = 'New Contact Form Submission'

const stripHtml = (value: string) => value.replace(/<[^>]*>/g, '')

export interface ContactInput {
  name: string
  email: string
  subject?: string
  message: string
}

export interface ContactEmailPayload {
  displaySubject: string
  subject: string
  text: string
  html: string
}

export function validateContactInput(body: unknown): ContactInput {
  if (!body || typeof body !== 'object')
    throw new Error('Invalid request body')

  const { name, email, subject, message } = body as Record<string, unknown>

  if (!name || typeof name !== 'string' || !name.trim())
    throw new Error('Name is required')
  if (!email || typeof email !== 'string' || !email.trim())
    throw new Error('Email is required')
  if (!message || typeof message !== 'string' || !message.trim())
    throw new Error('Message is required')
  if (subject !== undefined && typeof subject !== 'string')
    throw new Error('Subject must be a string')

  const normalizedEmail = stripHtml(email.trim()).slice(0, 254)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(normalizedEmail))
    throw new Error('Invalid email address')

  return {
    name: stripHtml(name.trim()).slice(0, 100),
    email: normalizedEmail,
    subject: stripHtml((typeof subject === 'string' ? subject : '').trim()).slice(0, 200),
    message: stripHtml(message.trim()).slice(0, 5000),
  }
}

export function buildContactEmailPayload(input: ContactInput): ContactEmailPayload {
  const displaySubject = input.subject || DEFAULT_SUBJECT

  return {
    displaySubject,
    subject: `[Portfolio] ${displaySubject}`,
    text: `Name: ${input.name}\nEmail: ${input.email}\nSubject: ${displaySubject}\n\n${input.message}`,
    html: `
      <h2>New message from your portfolio</h2>
      <p><strong>Name:</strong> ${input.name}</p>
      <p><strong>Email:</strong> ${input.email}</p>
      <p><strong>Subject:</strong> ${displaySubject}</p>
      <hr>
      <p>${input.message.replace(/\n/g, '<br>')}</p>
    `.trim(),
  }
}
