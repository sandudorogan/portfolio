interface PageSeoOptions {
  title: MaybeRefOrGetter<string>
  description: MaybeRefOrGetter<string>
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
    let url = ''
    if (runtimeConfig.public.siteUrl) {
      url = runtimeConfig.public.siteUrl
    } else if (import.meta.server && requestUrl) {
      // Fallback to request URL origin in SSR
      url = requestUrl.origin
    } else if (import.meta.client) {
      url = window.location.origin
    }
    // Strip trailing slash to prevent double slashes in canonical URLs
    return url.replace(/\/$/, '')
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
