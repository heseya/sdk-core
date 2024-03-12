export interface LangFallbackParam {
  /**
   * What should be returned if there is no translation for given language
   * - none (default value) - do not return content if there is no translation in wanted language
   * - default - return content in default language
   * - any - return any existing translation
   */
  lang_fallback?: 'none' | 'default' | 'any'
}

export interface TranslationParam {
  /**
   * If true, the `translations` object will be returned to all returned entities
   */
  with_translations?: boolean
}

export type LanguageParams = LangFallbackParam & TranslationParam
