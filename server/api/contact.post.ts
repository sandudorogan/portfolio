import { Resend } from 'resend'
import { buildContactEmailPayload, validateContactInput } from '../utils/contact'

function validate(body: unknown) {
  try {
    return validateContactInput(body)
  } catch (error) {
    throw createError({
      statusCode: 400,
      statusMessage: error instanceof Error ? error.message : 'Invalid request body',
    })
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
  const payload = buildContactEmailPayload({ name, email, subject, message })

  const { error } = await resend.emails.send({
    from: 'Portfolio Contact <contact@dorogans.com>',
    to: config.contactEmail,
    replyTo: email,
    subject: payload.subject,
    text: payload.text,
    html: payload.html,
  })

  if (error) {
    console.error('[contact] Resend error:', error)
    throw createError({ statusCode: 500, statusMessage: 'Failed to send email' })
  }

  return { success: true }
})
