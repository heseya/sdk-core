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

/**
 *
 * @param redirectsList List of all Redirects that are considered
 * @param currentUrl Current relative URL (ex. `/products`)
 * @returns Tuple representing the target URL and the type of redirect
 */
export const resolveRedirect = (
  redirectsList: Redirect[],
  currentUrl: string,
): [redirectUrl: string, redirectCode: number] | null => {
  const result = {
    target: '',
    type: 0,
  }

  redirectsList.forEach((redirect) => {
    const regExp = new RegExp(`^${replaceVariablesInPathPattern(trimSlash(redirect.source_url))}$`)
    if (redirect.enabled && regExp.test(trimSlash(currentUrl))) {
      const variables = extractVariables(trimSlash(currentUrl), trimSlash(redirect.source_url))
      result.target = pushVariablesToUrl(trimSlash(redirect.target_url), variables)
      result.type = redirect.type
    }
  })
  return result.target ? [result.target, result.type] : null
}
