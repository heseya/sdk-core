import {
  HeseyaClientError,
  HeseyaClientErrorCode,
  HeseyaErrorCode,
  HeseyaErrorResponse,
  HeseyaValidationError,
} from '../interfaces/Errors'

/**
 * Checks if given error is a heseya error response
 */
export const isHeseyaErrorResponse = (error: any): error is HeseyaErrorResponse => {
  return (
    error.error?.code !== undefined &&
    error.error?.message !== undefined &&
    error.error?.key !== undefined
  )
}

/**
 * Checks if given error is a heseya validation error
 */
export const isHeseyaValidationError = (error: any): error is HeseyaValidationError => {
  return error?.key === 'VALIDATION_ERROR' && error?.errors !== undefined
}

/**
 * Checks if given error is a heseya client error
 */
export const isHeseyaClientError = (error: any): error is HeseyaClientError => {
  return Object.values(HeseyaClientErrorCode).includes(error.key) && error?.errors !== undefined
}

interface FormattedError {
  title: string
  key?: HeseyaErrorCode
  text: string
}

/**
 * Returns an error message from any given error with more detailed information when Heseya Error is passed into it
 */
export const formatApiError = (error: any): FormattedError => {
  const responseData = error?.response?.data

  if (isHeseyaErrorResponse(responseData)) {
    return {
      title: responseData.error.message, // TODO: translate
      key: responseData.error.key as HeseyaErrorCode,
      text: isHeseyaValidationError(responseData.error)
        ? Object.values(responseData?.error?.errors || {})[0].message || ''
        : '',
    }
  }

  return {
    title: error.message,
    key: undefined,
    text: '',
  }
}
