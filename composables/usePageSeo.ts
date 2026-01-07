interface PageSeoOptions {
  title: string
  description: string
  ogType?: 'website' | 'article' | 'profile'
}

/**
 * Sets page-level SEO metadata including title, description, canonical URL,
 * and OpenGraph/Twitter meta. OG images should be defined in each page using
 * the OgImage component or defineOgImage at the page level for static generation.
 */
export function usePageSeo(options: PageSeoOptions) {
  const route = useRoute()
  const runtimeConfig = useRuntimeConfig()

  // Get request URL at composable call time (must be called in setup context)
  const requestUrl = import.meta.server ? useRequestURL() : null

  const siteUrl = computed(() => {
    if (runtimeConfig.public.siteUrl) {
      return runtimeConfig.public.siteUrl
    }
    // Fallback to request URL origin in SSR or window location in client
    if (import.meta.server && requestUrl) {
      return requestUrl.origin
    }
    if (import.meta.client) {
      return window.location.origin
    }
    return ''
  })

  const canonicalUrl = computed(() => `${siteUrl.value}${route.path}`)

  useSeoMeta({
    title: options.title,
    description: options.description,
    ogTitle: options.title,
    ogDescription: options.description,
    ogType: options.ogType || 'website',
    ogUrl: canonicalUrl,
    twitterCard: 'summary_large_image',
    twitterTitle: options.title,
    twitterDescription: options.description
  })

  useHead({
    link: [
      { rel: 'canonical', href: canonicalUrl }
    ]
  })
}
