import { Redirect, RedirectType } from '../../interfaces/Redirect'
import {
  pushVariablesToUrl,
  extractVariables,
  replaceVariablesInPathPattern,
  resolveRedirect,
  trimSlash,
  splitUrl,
} from '../redirects'

const mockRedirect = (source: string, target: string, type: RedirectType = 301): Redirect => ({
  id: 'id',
  enabled: true,
  name: 'name',
  type,
  source_url: source,
  target_url: target,
})

describe('Redirects | extractVariables', () => {
  test('should extract uuid from url', () => {
    const path = '/old-product/1c31110b-48c2-4013-9365-bf200c5d122f/'
    const pattern = '/old-product/{id}/'
    expect(extractVariables(path, pattern)).toEqual(['1c31110b-48c2-4013-9365-bf200c5d122f'])
  })

  test('should extract slug from url', () => {
    const path = '/old-category/super-extra-slug/'
    const pattern = '/old-category/{slug}/'
    expect(extractVariables(path, pattern)).toEqual(['super-extra-slug'])
  })

  test('should extract slug and uuid from url', () => {
    const path = '/old-category/super-extra-slug/old-product/1c31110b-48c2-4013-9365-bf200c5d122f/'
    const pattern = '/old-category/{slug}/old-product/{id}/'
    expect(extractVariables(path, pattern)).toEqual([
      'super-extra-slug',
      '1c31110b-48c2-4013-9365-bf200c5d122f',
    ])
  })
})

describe('Redirects | pushVariablesToUrl', () => {
  test('should push variables to path', () => {
    const patternPath = '/new-category/{slug}/new-product/{id}/'
    const variables = ['super-extra-slug', '1c31110b-48c2-4013-9365-bf200c5d122f']
    expect(pushVariablesToUrl(patternPath, variables)).toEqual(
      '/new-category/super-extra-slug/new-product/1c31110b-48c2-4013-9365-bf200c5d122f/',
    )
  })
})

describe('Redirects | replaceVariablesInPathPattern', () => {
  test('should replace variables in path to any string regex', () => {
    const patternPath = '/new-category/{slug}/new-product/{id}/'
    expect(replaceVariablesInPathPattern(patternPath)).toEqual(
      '/new-category/([^/]+)/new-product/([^/]+)/',
    )
  })
})

describe('Redirects | trimSlash', () => {
  test('should replace end trailing slash with empty string', () => {
    const path = '/new-category/{slug}/new-product/{id}/'
    const expected = '/new-category/{slug}/new-product/{id}'
    expect(trimSlash(path)).toEqual(expected)
  })
})

describe('Redirects | splitUrl', () => {
  test('should split url into parts', () => {
    const url = '/new-category?limit=5#test'
    expect(splitUrl(url)).toEqual(['/new-category', '?limit=5', '#test'])
  })

  test('should split url if query does not exists', () => {
    const url = '/new-category#test'
    expect(splitUrl(url)).toEqual(['/new-category', '', '#test'])
  })

  test('should split url if fragment does not exists', () => {
    const url = '/new-category?limit=5'
    expect(splitUrl(url)).toEqual(['/new-category', '?limit=5', ''])
  })
})

describe('Redirects | resolveRedirect', () => {
  test('should not return redirect if pattern not match', () => {
    const sourceUrl = '/test'

    const sourcePattern = '/category/{slug}'
    const targetPattern = '/categories/{slug}'
    const redirects = [mockRedirect(sourcePattern, targetPattern)]

    expect(resolveRedirect(redirects, sourceUrl)).toEqual(null)
  })

  test('should create redirect to given path', () => {
    const source = '/products/some-prod'
    const target = '/promotions'
    const redirects = [mockRedirect(source, target, 301)]
    expect(resolveRedirect(redirects, source)).toEqual([`${target}?_rc=1`, 301])
  })

  test('should create redirect to given path and ignore slashes', () => {
    const source = '/produkty/prod-slug/'
    const target = '/products/prod-slug'
    const redirects = [mockRedirect(source, target, 301)]
    expect(resolveRedirect(redirects, source)).toEqual([`${target}?_rc=1`, 301])
  })

  test('should not redirect if pattern match only partialy', () => {
    const sourceUrl = '/category/promocje-t-mobile'

    const sourcePattern = '/category/promo'
    const targetPattern = '/category/promocje'
    const redirects = [mockRedirect(sourcePattern, targetPattern)]

    expect(resolveRedirect(redirects, sourceUrl)).toEqual(null)
  })

  test('should redirect if pattern has unused variable at the end', () => {
    const sourceUrl = '/category/promocje-t-mobile'
    const targetUrl = '/promocje?_rc=1'

    const sourcePattern = '/category/promo{any}'
    const targetPattern = '/promocje'
    const redirects = [mockRedirect(sourcePattern, targetPattern)]

    expect(resolveRedirect(redirects, sourceUrl)).toEqual([targetUrl, 301])
  })

  test('should handle multiple variables in path', () => {
    const sourceUrl = '/new-category/test-slug/new-product/test-id'
    const targetUrl = '/categories/test-slug/product/test-id?_rc=1'

    const sourcePattern = '/new-category/{slug}/new-product/{id}'
    const targetPattern = '/categories/{slug}/product/{id}'
    const redirects = [mockRedirect(sourcePattern, targetPattern)]

    expect(resolveRedirect(redirects, sourceUrl)).toEqual([targetUrl, 301])
  })

  test('should ignore trailing slashes in source', () => {
    const sourceUrl = '/produkty/prod-slug'
    const targetUrl = '/products/prod-slug?_rc=1'

    const sourcePattern = '/produkty/prod-slug/'
    const targetPattern = '/products/prod-slug'
    const redirects = [mockRedirect(sourcePattern, targetPattern)]

    expect(resolveRedirect(redirects, sourceUrl)).toEqual([targetUrl, 301])
  })

  test('should ignore trailing slashes in target', () => {
    const sourceUrl = '/produkty/prod-slug'
    const targetUrl = '/products/prod-slug?_rc=1'

    const sourcePattern = '/produkty/prod-slug'
    const targetPattern = '/products/prod-slug/'
    const redirects = [mockRedirect(sourcePattern, targetPattern)]

    expect(resolveRedirect(redirects, sourceUrl)).toEqual([targetUrl, 301])
  })

  test('should not create a redirect to itself', () => {
    const sourceUrl = '/produkty/prod-slug'

    const sourcePattern = '/produkty/prod-slug'
    const targetPattern = '/produkty/prod-slug'
    const redirects = [mockRedirect(sourcePattern, targetPattern)]

    expect(resolveRedirect(redirects, sourceUrl)).toEqual(null)
  })

  test('should create a redirect if max redirects limit is not met', () => {
    const sourceUrl = '/produkty/prod-slug?_rc=3'
    const targetUrl = '/products/prod-slug?_rc=4'

    const sourcePattern = '/produkty/prod-slug'
    const targetPattern = '/products/prod-slug'
    const redirects = [mockRedirect(sourcePattern, targetPattern)]

    expect(resolveRedirect(redirects, sourceUrl)).toEqual([targetUrl, 301])
  })

  test('should not create a redirect if max redirects limit is met', () => {
    const sourceUrl = '/produkty/prod-slug?_rc=10'

    const sourcePattern = '/produkty/prod-slug'
    const targetPattern = '/products/prod-slug'
    const redirects = [mockRedirect(sourcePattern, targetPattern)]

    expect(resolveRedirect(redirects, sourceUrl)).toEqual(null)
  })

  test('should handle custom redirect config', () => {
    const sourceUrl = '/produkty/prod-slug?limit=5'

    const sourcePattern = '/produkty/prod-slug'
    const targetPattern = '/products/prod-slug'
    const redirects = [mockRedirect(sourcePattern, targetPattern)]

    expect(
      resolveRedirect(redirects, sourceUrl, { redirectsLimit: 5, redirectsQueryParam: 'limit' }),
    ).toEqual(null)
  })
})
