import { Media, TwitterCardType } from '../..'
import { getSeoValues } from '../seo'

describe('getSeoValues test', () => {
  test('is resistant to invalid input', () => {
    expect(getSeoValues(undefined as any)).toEqual({})
    expect(getSeoValues(undefined as any, {})).toEqual({})
    expect(getSeoValues(undefined as any, null as any)).toEqual({})
  })

  test('should return what was passed', () => {
    expect(getSeoValues({})).toEqual({})
    expect(getSeoValues({ title: 'test' })).toEqual({ title: 'test' })
    expect(getSeoValues({ description: 'test' })).toEqual({ description: 'test' })
    expect(getSeoValues({ keywords: ['test'] })).toEqual({ keywords: ['test'] })
    expect(getSeoValues({ no_index: true })).toEqual({ no_index: true })
    expect(getSeoValues({ no_index: false })).toEqual({ no_index: false })
    expect(getSeoValues({ og_image: {} as Media })).toEqual({ og_image: {} as Media })
    expect(getSeoValues({ twitter_card: TwitterCardType.Summary })).toEqual({
      twitter_card: TwitterCardType.Summary,
    })
  })

  test('should filter out null or undefined values', () => {
    expect(getSeoValues({ title: undefined })).toEqual({})
    expect(getSeoValues({ title: null as any })).toEqual({})
    expect(getSeoValues({ title: undefined, description: 'test' })).toEqual({ description: 'test' })
    expect(getSeoValues({ keywords: undefined, description: 'test' })).toEqual({
      description: 'test',
    })
  })

  test('should filter out empty string values', () => {
    expect(getSeoValues({ title: '' })).toEqual({})
    expect(getSeoValues({ description: '', title: 'test' })).toEqual({ title: 'test' })
  })

  test('should filter out empty array values', () => {
    expect(getSeoValues({ keywords: [] })).toEqual({})
    expect(getSeoValues({ keywords: [], title: 'test' })).toEqual({ title: 'test' })
    expect(getSeoValues({ keywords: ['xd'], title: 'test' })).toEqual({
      keywords: ['xd'],
      title: 'test',
    })
  })

  test('merge seo definitions from fallback', () => {
    expect(getSeoValues({ title: 'title' }, { description: 'test' })).toEqual({
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
      title: 'title',
      description: 'test',
      keywords: ['test'],
    })
  })

  test('should fallback seo definitions from left to right', () => {
    expect(
      getSeoValues({ title: 'title', description: 'desc' }, { description: 'fallback' }),
    ).toEqual({
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
      title: 'title',
      description: 'test',
      twitter_card: TwitterCardType.Summary,
      keywords: ['test'],
    })
  })
})
