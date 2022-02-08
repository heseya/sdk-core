import { isNil } from 'lodash'
import { Media } from '../interfaces/Product'
import { SeoMetadata, TwitterCardType } from '../interfaces/Seo'

/**
 * Returns prioretitized SEO metadata.
 * Priority is given to the metadata that was passed first (from left to right)
 */
export const getSeoValues = (...seoMetadatas: SeoMetadata[]): SeoMetadata => {
  const get = (key: keyof SeoMetadata) => {
    return seoMetadatas.find((s) => !isNil(s[key]))?.[key]
  }

  return {
    title: get('title') as string | undefined,
    description: get('description') as string | undefined,
    keywords: get('keywords') as string[] | undefined,
    og_image: get('og_image') as Media | undefined,
    twitter_card: get('twitter_card') as TwitterCardType | undefined,
    no_index: get('no_index') as boolean | undefined,
  }
}

/**
 * Creates prioretitized SEO metadata for a page.
 * Priority is given to the metadata that was passed first (from left to right)
 */
export const createSeoMetatags = (...seoMetadatas: SeoMetadata[]) => {
  const seo = getSeoValues(...seoMetadatas)

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
    ].filter((m) => !isNil(m.content)),
  }
}
