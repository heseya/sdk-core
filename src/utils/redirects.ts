import { Redirect } from '../interfaces/Redirect'

export const pushVariablesToUrl = (
  patternPath: string,
  variables: Array<string> | null,
): string => {
  if (variables === null) return patternPath

  variables.forEach((element: string) => {
    patternPath = patternPath.replace(/\{([^}]+)}/, element)
  })
  return patternPath
}

export const replaceVariablesInPathPattern = (pattern: string): string => {
  return pattern.replaceAll(/\{([^}]+)}/g, '([^/]+)')
}

export const extractVariables = (path: string, pattern: string) => {
  const regex = replaceVariablesInPathPattern(pattern)
  const match = path.match(regex)
  return match ? match.slice(1) : null
}

export const trimSlash = (path: string) => path.replace(/\/$/, '')

export const splitUrl = (url: string): [pathname: string, search: string, hash: string] => {
  const { pathname, search, hash } = new URL(url, 'https://example.com')
  return [pathname, search, hash]
}

/**
 * Resolves redirect for given URL
 * ! For now, all of the SearchParams are ignored in resolving redirects, but they are passed to the target URL
 * ! Fragments are also ignored
 * @param redirectsList List of all Redirects that are considered
 * @param currentUrl Current relative URL (ex. `/products`)
 * @returns Tuple representing the target URL and the type of redirect or null if no redirect is found
 */
export const resolveRedirect = (
  redirectsList: Redirect[],
  currentUrl: string,
  config: { redirectsLimit?: number; redirectsQueryParam?: string } = {},
): [redirectUrl: string, redirectCode: number] | null => {
  if (!config.redirectsLimit) config.redirectsLimit = 10
  if (!config.redirectsQueryParam) config.redirectsQueryParam = '_rc'

  const result = {
    target: '',
    type: 0,
  }

  const [rawCurrentUrl, query] = splitUrl(currentUrl)
  const searchParams = new URLSearchParams(query)

  /**
   * Determined by `?_rc=1` query parameter in currentUrl
   */
  const redirectsCount = parseInt(searchParams.get(config.redirectsQueryParam) || '0')

  redirectsList.forEach((redirect) => {
    const regExp = new RegExp(`^${replaceVariablesInPathPattern(trimSlash(redirect.source_url))}$`)
    if (redirect.enabled && regExp.test(trimSlash(rawCurrentUrl))) {
      const variables = extractVariables(trimSlash(rawCurrentUrl), trimSlash(redirect.source_url))
      result.target = pushVariablesToUrl(trimSlash(redirect.target_url), variables)
      result.type = redirect.type
    }
  })

  const isTargetSameAsSource = result.target === rawCurrentUrl
  const isRedirectsLimitReached = redirectsCount >= config.redirectsLimit

  searchParams.set(config.redirectsQueryParam, `${redirectsCount + 1}`)
  const targetUrl = `${result.target}${
    searchParams.toString() ? `?${searchParams.toString()}` : ''
  }`

  if (isRedirectsLimitReached)
    // eslint-disable-next-line no-console
    console.warn(`Redirects limit reached for ${currentUrl} [max: ${config.redirectsLimit}]]`)

  return result.target && !isTargetSameAsSource && !isRedirectsLimitReached
    ? [targetUrl, result.type]
    : null
}
