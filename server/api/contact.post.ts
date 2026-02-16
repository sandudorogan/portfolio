import { Resend } from 'resend'

const stripHtml = (str: string) => str.replace(/<[^>]*>/g, '')

function validate(body: unknown) {
  if (!body || typeof body !== 'object')
    throw createError({ statusCode: 400, statusMessage: 'Invalid request body' })

  const { name, email, subject, message } = body as Record<string, unknown>

  if (!name || typeof name !== 'string' || !name.trim())
    throw createError({ statusCode: 400, statusMessage: 'Name is required' })
  if (!email || typeof email !== 'string' || !email.trim())
    throw createError({ statusCode: 400, statusMessage: 'Email is required' })
  if (!message || typeof message !== 'string' || !message.trim())
    throw createError({ statusCode: 400, statusMessage: 'Message is required' })
  if (subject !== undefined && typeof subject !== 'string')
    throw createError({ statusCode: 400, statusMessage: 'Subject must be a string' })

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email.trim()))
    throw createError({ statusCode: 400, statusMessage: 'Invalid email address' })

  return {
    name: stripHtml(name.trim()).slice(0, 100),
    email: stripHtml(email.trim()).slice(0, 254),
    subject: stripHtml((typeof subject === 'string' ? subject : '').trim()).slice(0, 200),
    message: stripHtml(message.trim()).slice(0, 5000),
  }
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()

  if (!config.contactEmail)
    throw createError({ statusCode: 500, statusMessage: 'Contact email not configured' })
  if (!config.resendApiKey)
    throw createError({ statusCode: 500, statusMessage: 'Resend API key not configured' })

  const { name, email, subject, message } = await readValidatedBody(event, validate)

  const resend = new Resend(config.resendApiKey)
  const displaySubject = subject || 'New Contact Form Submission'

  const { error } = await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: config.contactEmail,
    replyTo: email,
    subject: `[Portfolio] ${displaySubject}`,
    text: `Name: ${name}\nEmail: ${email}\nSubject: ${displaySubject}\n\n${message}`,
    html: `
      <h2>New message from your portfolio</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Subject:</strong> ${displaySubject}</p>
      <hr>
      <p>${message.replace(/\n/g, '<br>')}</p>
    `.trim(),
  })

  if (error)
    throw createError({ statusCode: 500, statusMessage: 'Failed to send email' })

  return { success: true }
})
