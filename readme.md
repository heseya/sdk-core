# @heseya/store-core

[![NPM version](https://img.shields.io/npm/v/@heseya/store-core)](https://www.npmjs.com/package/@heseya/store-core) &nbsp;
[![Code Coverage](https://codecov.io/gh/heseya/sdk-core/branch/develop/graph/badge.svg)](https://codecov.io/gh/heseya/sdk-core) &nbsp;
![Downloads](https://img.shields.io/npm/dt/@heseya/store-core) &nbsp;

[Type definitions](https://heseya.github.io/sdk-core/index.html)

## Instalation

```bash
$ yarn add @heseya/store-core@dev
```

// or
$ npm i @heseya/store-core@dev

````

## Usage

### Heseya Api Service

#### Initialization

You can create the Heseya Api Service using the factory method.

```typescript
import { createHeseyaApiService } from '@heseya/store-core'

const heseya = createHeseyaApiService(axios)
````

You need to pass the `axios` instance to the factory method. This allows you to modify axios instance to your needs. For example you can add a custom header to the request or implement a custom interceptor. **Remember to pass the BaseUrl to the axios instance!**

Example of the simple axios instance:

```typescript
import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://api.heseya.com',
  headers: {
    'X-Custom-Header': 'Custom Value',
  },
})
```

##### Initialization in Nuxt.js

In nuxt, you can inject the service into the context. This allows you to use the service in your components. To do this you need to create the following plugin:

```typescript
import { Plugin } from '@nuxt/types'
import { createHeseyaApiService } from '@heseya/store-core'

const heseyaPlugin: Plugin = ({ $axios }, inject) => {
  inject('heseya', createHeseyaApiService($axios))
}

export default heseyaPlugin
```

#### Usage

After creating the instance, you can use the service as you wish. Below are usage examples. Every method in the service is fully typed and documented.

```typescript
heseya.Products.get({ search: 'test' }) // Returns the products that was found by the search term
heseya.Orders.getOneByCode('ORDERCODE') // Returns the order summary with the given code
```
