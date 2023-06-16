/* eslint-disable @typescript-eslint/no-explicit-any */
import { CdnMedia, SeoMetadata, TwitterCardType } from '../..'
import { getSeoValues } from '../seo'

const EMPTY_SEO: SeoMetadata = {
  title: undefined,
  description: undefined,
  keywords: undefined,
  no_index: undefined,
  og_image: undefined,
  twitter_card: undefined,
  header_tags: [],
}

describe('getSeoValues test', () => {
  test('is resistant to invalid input', () => {
    expect(getSeoValues(undefined as any)).toEqual(EMPTY_SEO)
    expect(getSeoValues(undefined as any, {})).toEqual(EMPTY_SEO)
    expect(getSeoValues(undefined as any, null as any)).toEqual(EMPTY_SEO)
  })

  test('should return what was passed', () => {
    expect(getSeoValues({})).toEqual(EMPTY_SEO)
    expect(getSeoValues({ title: 'test' })).toEqual({ ...EMPTY_SEO, title: 'test' })
    expect(getSeoValues({ description: 'test' })).toEqual({ ...EMPTY_SEO, description: 'test' })
    expect(getSeoValues({ keywords: ['test'] })).toEqual({ ...EMPTY_SEO, keywords: ['test'] })
    expect(getSeoValues({ no_index: true })).toEqual({ ...EMPTY_SEO, no_index: true })
    expect(getSeoValues({ no_index: false })).toEqual({ ...EMPTY_SEO, no_index: false })
    expect(getSeoValues({ og_image: {} as CdnMedia })).toEqual({
      ...EMPTY_SEO,
      og_image: {} as CdnMedia,
    })
    expect(getSeoValues({ twitter_card: TwitterCardType.Summary })).toEqual({
      ...EMPTY_SEO,
      twitter_card: TwitterCardType.Summary,
    })
  })

  test('should filter out null or undefined values', () => {
    expect(getSeoValues({ title: undefined })).toEqual(EMPTY_SEO)
    expect(getSeoValues({ title: null as any })).toEqual(EMPTY_SEO)
    expect(getSeoValues({ title: undefined, description: 'test' })).toEqual({
      ...EMPTY_SEO,
      description: 'test',
    })
    expect(getSeoValues({ keywords: undefined, description: 'test' })).toEqual({
      ...EMPTY_SEO,
      description: 'test',
    })
  })

  test('should filter out empty string values', () => {
    expect(getSeoValues({ title: '' })).toEqual(EMPTY_SEO)
    expect(getSeoValues({ description: '', title: 'test' })).toEqual({
      ...EMPTY_SEO,
      title: 'test',
    })
  })

  test('should filter out empty array values', () => {
    expect(getSeoValues({ keywords: [] })).toEqual(EMPTY_SEO)
    expect(getSeoValues({ keywords: [], title: 'test' })).toEqual({ ...EMPTY_SEO, title: 'test' })
    expect(getSeoValues({ keywords: ['xd'], title: 'test' })).toEqual({
      ...EMPTY_SEO,
      keywords: ['xd'],
      title: 'test',
    })
  })

  test('merge seo definitions from fallback', () => {
    expect(getSeoValues({ title: 'title' }, { description: 'test' })).toEqual({
      ...EMPTY_SEO,
      title: 'title',
      description: 'test',
    })

    expect(
      getSeoValues(
        { title: 'title' },
        { keywords: ['test'], og_image: null as any },
        { description: 'test' },
      ),
    ).toEqual({
      ...EMPTY_SEO,
      title: 'title',
      description: 'test',
      keywords: ['test'],
    })
  })

  test('should fallback seo definitions from left to right', () => {
    expect(
      getSeoValues({ title: 'title', description: 'desc' }, { description: 'fallback' }),
    ).toEqual({
      ...EMPTY_SEO,
      title: 'title',
      description: 'desc',
    })

    expect(
      getSeoValues(
        { title: 'title' },
        { keywords: ['test'], title: 'xD', twitter_card: TwitterCardType.Summary },
        { description: 'test', twitter_card: TwitterCardType.SummaryLargeImage },
      ),
    ).toEqual({
      ...EMPTY_SEO,
      title: 'title',
      description: 'test',
      twitter_card: TwitterCardType.Summary,
      keywords: ['test'],
    })
  })
})
