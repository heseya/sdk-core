# @heseya/store-core

[![NPM version](https://img.shields.io/npm/v/@heseya/store-core)](https://www.npmjs.com/package/@heseya/store-core) &nbsp;
[![Code Coverage](https://codecov.io/gh/heseya/sdk-core/branch/develop/graph/badge.svg)](https://codecov.io/gh/heseya/sdk-core) &nbsp;
![Downloads](https://img.shields.io/npm/dt/@heseya/store-core) &nbsp;

[Type definitions](https://heseya.github.io/sdk-core/index.html)

## Features

- All Heseya API endpoints are exposed as methods on the SDK object.
- Full typing of all API responses and requests, as well as for the all Heseya models and enums.
- Automatic conversion between JSON and native types.
- Automatic handling request query parameters.
- Support for custom [Axios](https://www.npmjs.com/package/axios) instance.
- Helper functions and class for handling common tasks when creating e-commerce applications.

## Instalation

```bash
$ yarn add @heseya/store-core@next
// or
$ npm i @heseya/store-core@next
```

## Usage

### Type definitions

SDK package contains a set of type definitions for the Heseya API, you can import them directly into your project.

Full list of exported types corresponds to the SDK modules and it is available [here](https://heseya.github.io/sdk-core/index.html).

Each of the Heseya's Models has a corresponding type definition, with different type for the Model list, details, create and update methods.
The convention is following:

- `{ModelName}List` - type for the list of models
- `{ModelName}` - type for the details of a model
- `{ModelName}CreateDto` - type for the create method of a model
- `{ModelName}UpdateDto` - type for the update method of a model

Example for product types:

```ts
import { Product, ProductList, ProductCreateDto, ProductUpdateDto } from '@heseya/store-core'

const productCreateDto: ProductCreateDto = {
  ...
}

await heseya.Products.create(productCreateDto)
```

### Heseya Api Service

#### Initialization

You can initialize the API Service by calling the `createHeseyaApiService` function. It is important to pass the `axios` instance to the function.

Axios instance needs to be configured to use the URL of the Heseya API. Without it the SDK will not be able to make requests to the API.

```ts
import axios from 'axios'
import { createHeseyaApiService, HeseyaApiService } from '@heseya/store-core'

const axiosInstance = axios.create({ baseURL: 'https://api.example.com' })

const heseya: HeseyaApiService = createHeseyaApiService(axiosInstance)
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

Now, you can use the `HeseyaApiService` object to call the API for any of the endpoints.

For example, you can fetch all the products:

```ts
const products = await heseya.Products.get()
```

All the methods on the `HeseyaApiService` object return promises. If the request fails, the promise will be rejected with an default `AxiosError` object. This package provides a helper function to handle that errors `formatApiError`.

##### Authorization

The SDK does not provide any authorization. You need to implement your own authorization mechanism. To do this, you should use the `axios` instance that you injected into the `createHeseyaApiService` function. That instance needs to have interceptors configured to add the authorization header, as well as to handle the token refreshing.

To handle auth requests you can use methods from the `Auth` module.
