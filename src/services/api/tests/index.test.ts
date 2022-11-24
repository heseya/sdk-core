import axios from 'axios'
import { createHeseyaApiService } from '..'

describe('createHeseyaApiService factory', () => {
  it('should create the instance based on the axios instance', async () => {
    const heseya = createHeseyaApiService(axios)
    expect(heseya).toBeDefined()
  })

  it('should create the instance based on the heseya api url', async () => {
    const heseya = createHeseyaApiService('https://api.heseya.com')
    expect(heseya).toBeDefined()
  })

  it('should throw error if nor axios or baseUrl is provided', async () => {
    expect(() => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const heseya = createHeseyaApiService()
    }).toThrowError()
  })
})
