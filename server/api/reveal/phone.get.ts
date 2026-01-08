export default defineEventHandler((event) => {
  const config = useRuntimeConfig()

  if (!config.contactPhone) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Contact phone not configured'
    })
  }

  // Prevent caching so the value isn't stored in CDN/proxy caches
  setHeader(event, 'Cache-Control', 'no-store, max-age=0')

  return {
    value: config.contactPhone,
    link: `tel:${config.contactPhone.replace(/\s/g, '')}`
  }
})
