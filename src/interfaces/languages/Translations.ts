import { UUID } from '../UUID'

export interface PublishedTranslations {
  /**
   * Array of language ids for which this entity is published
   */
  published: UUID[]
}

/**
 * Map that contains translations for any given language (UUID is id of language)
 */
export type Translations<Content extends object> = {
  translation: Record<UUID, Content>
}

export type Translatable<Content extends object> = Translations<Content> & Content

/**
 * ? --------------------------------------------------------------------------------
 * ? TEST INTERFACES
 * ? --------------------------------------------------------------------------------
 */

interface TestProductTranslatableContent {
  name: string
  description: string
}

export interface TestProduct extends TestProductTranslatableContent, PublishedTranslations {
  id: UUID
  public: boolean
}

export type TestProductWithTranslations = TestProduct & Translations<TestProductTranslatableContent>

export interface TestProductList extends TestProductTranslatableContent, PublishedTranslations {
  id: UUID
  public: boolean
}

export type TestProductListWithTranslations = TestProductList &
  Translations<TestProductTranslatableContent>

export interface TestProductCreateDto
  extends Translations<TestProductTranslatableContent>,
    PublishedTranslations {
  public: boolean
}

export type TestProductUpdateDto = Partial<TestProductCreateDto>

/**
 * ? --------------------------------------------------------------------------------
 * ? TEST VALUES
 * ? --------------------------------------------------------------------------------
 */

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const prod1: TestProduct = {
  id: 'xd',
  public: true,
  name: 'xd',
  description: 'xd',
  published: ['pl-PL'],
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const prod2: TestProductWithTranslations = {
  id: 'xd',
  public: true,
  name: 'xd',
  description: 'xd',
  published: ['pl-PL'],
  translation: {
    'pl-PL': {
      name: 'xd',
      description: 'xd',
    },
  },
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const createProd: TestProductCreateDto = {
  public: true,
  translation: {
    'pl-PL': {
      name: 'xd',
      description: 'xd',
    },
  },
  published: ['pl-PL'],
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const updateProd: TestProductUpdateDto = {
  translation: {
    'pl-PL': {
      name: 'xddd',
    },
  },
}
