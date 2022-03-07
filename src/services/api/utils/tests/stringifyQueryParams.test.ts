import { stringifyQueryParams } from '../stringifyQueryParams'

describe('stringifyQueryParams', () => {
  it('should transform simple object to string', () => {
    expect(stringifyQueryParams({ sort: 'asc' })).toBe('sort=asc')
    expect(stringifyQueryParams({ price: 252 })).toBe('price=252')
    expect(stringifyQueryParams({ sort: 'asc', set: 'yes' })).toBe('set=yes&sort=asc')
    expect(stringifyQueryParams({ sort: 'asc', available: undefined })).toBe('sort=asc')
    expect(stringifyQueryParams({ test: null })).toBe('')
  })

  it('should transform booleans fields into 0/1 values', () => {
    expect(stringifyQueryParams({ avilable: true })).toBe('avilable=1')
    expect(stringifyQueryParams({ avilable: false })).toBe('avilable=0')
  })

  it('should transform array fields into arrays strings', () => {
    expect(stringifyQueryParams({ tags: ['a', 'b'] })).toBe('tags[]=a&tags[]=b')
    expect(stringifyQueryParams({ tags: [] })).toBe('')
  })

  it('should transform complex object into strings', () => {
    // expect(stringifyQueryParams({ attribute: {} })).toBe('')
    expect(stringifyQueryParams({ attribute: { cpu: 'i5' } })).toBe('attribute.cpu=i5')
    expect(stringifyQueryParams({ attribute: { cpu: 'i5', data: true } })).toBe(
      'attribute.cpu=i5&attribute.data=1',
    )
    expect(stringifyQueryParams({ attribute: { price: { max: 100, min: 2 } } })).toBe(
      'attribute.price.max=100&attribute.price.min=2',
    )
  })

  it('should transform dates into iso strings', () => {
    expect(stringifyQueryParams({ date: new Date('2020-04-13T00:00:00.000+08:00') })).toBe(
      'date=2020-04-12T16%3A00%3A00.000Z',
    )
    expect(stringifyQueryParams({ date: new Date('2014-02-12T15:19:22.000+02:00') })).toBe(
      'date=2014-02-12T13%3A19%3A22.000Z',
    )
  })
})
