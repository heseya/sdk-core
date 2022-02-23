import { stringifyQueryParams } from '../stringifyQueryParams'

describe('stringifyQueryParams', () => {
  it('should transform simple object to string', () => {
    expect(stringifyQueryParams({ sort: 'asc' })).toBe('sort=asc')
    expect(stringifyQueryParams({ price: 252 })).toBe('price=252')
    expect(stringifyQueryParams({ sort: 'asc', available: true })).toBe('available=true&sort=asc')
    expect(stringifyQueryParams({ sort: 'asc', available: undefined })).toBe('sort=asc')
    expect(stringifyQueryParams({ test: null })).toBe('')
  })

  it('should transform array fields into arrays strings', () => {
    expect(stringifyQueryParams({ tags: ['a', 'b'] })).toBe('tags[]=a&tags[]=b')
    expect(stringifyQueryParams({ tags: [] })).toBe('')
  })

  it('should transform complex object into strings', () => {
    // expect(stringifyQueryParams({ attribute: {} })).toBe('')
    expect(stringifyQueryParams({ attribute: { cpu: 'i5' } })).toBe('attribute.cpu=i5')
    expect(stringifyQueryParams({ attribute: { cpu: 'i5', data: true } })).toBe(
      'attribute.cpu=i5&attribute.data=true',
    )
    expect(stringifyQueryParams({ attribute: { price: { max: 100, min: 2 } } })).toBe(
      'attribute.price.max=100&attribute.price.min=2',
    )
  })
})
