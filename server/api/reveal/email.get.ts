export default defineEventHandler((event) => {
  const config = useRuntimeConfig()

  if (!config.contactEmail) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Contact email not configured'
    })
  }

  // Prevent caching so the value isn't stored in CDN/proxy caches
  setHeader(event, 'Cache-Control', 'no-store, max-age=0')

  return {
    value: config.contactEmail,
    link: `mailto:${config.contactEmail}`
  }
})
