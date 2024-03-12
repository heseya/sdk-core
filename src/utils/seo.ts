import { CdnMedia } from '../interfaces/CdnMedia'
import { FlatSeoMetadata, TwitterCardType } from '../interfaces/Seo'
import { isNil } from './utils'

/**
 * Returns prioretitized SEO metadata.
 * Priority is given to the metadata that was passed first (from left to right)
 */
export const getSeoValues = (...seoMetadatas: FlatSeoMetadata[]): FlatSeoMetadata => {
  const get = (key: keyof FlatSeoMetadata) => {
    return seoMetadatas.find((s) => {
      if (!s) return false

      const value = s[key]
      if (key === 'og_image' || key === 'no_index') return !isNil(value)
      if (key === 'description' || key === 'title' || key === 'twitter_card')
        return (value as string)?.length > 0
      if (key === 'keywords') return (value as string[])?.length > 0
    })?.[key]
  }

  return {
    title: get('title') as string | undefined,
    description: get('description') as string | undefined,
    keywords: get('keywords') as string[] | undefined,
    og_image: get('og_image') as CdnMedia | undefined,
    twitter_card: get('twitter_card') as TwitterCardType | undefined,
    no_index: get('no_index') as boolean | undefined,
    // TODO: maybe newers tags should override older ones? How this should work?
    header_tags: seoMetadatas.map((s) => s?.header_tags || []).flat(),
  }
}

/**
 * Creates prioretitized SEO metadata for a page.
 * Priority is given to the metadata that was passed first (from left to right)
 */
export const createSeoMetatags = (...seoMetadatas: FlatSeoMetadata[]) => {
  const seo = getSeoValues(...seoMetadatas)

  const metaTags = seo.header_tags?.filter((t) => t.type === 'meta') || []
  const linkTags = seo.header_tags?.filter((t) => t.type === 'link') || []
  const scriptTags = seo.header_tags?.filter((t) => t.type === 'script') || []

  return {
    title: seo.title,
    meta: [
      // Title
      { hid: 'og:title', property: 'og:title', content: seo.title },
      {
        hid: 'twitter:title',
        property: 'twitter:title',
        content: seo.title,
      },

      // Description
      {
        hid: 'description',
        name: 'description',
        content: seo.description,
      },
      {
        hid: 'og:description',
        property: 'og:description',
        content: seo.description,
      },

      // Keywords
      {
        hid: 'keywords',
        name: 'keywords',
        content: seo.keywords?.join(', '),
      },

      // OG image
      {
        hid: 'og:image',
        property: 'og:image',
        content: seo.og_image?.url,
      },

      // Twitter card
      {
        hid: 'twitter:card',
        property: 'twitter:card',
        content: seo.twitter_card,
      },

      // No index
      {
        hid: 'robots',
        name: 'robots',
        content: seo.no_index ? 'noindex, nowfollow' : 'index, follow',
      },

      // Additional meta
      ...metaTags,
    ].filter((m) => !isNil(m.content)),

    // Addtional links
    link: linkTags,

    // Addtional scripts
    script: scriptTags,
  }
}
