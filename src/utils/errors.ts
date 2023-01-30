/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  HeseyaClientError,
  HeseyaClientErrorCode,
  HeseyaErrorCode,
  HeseyaErrorResponse,
  HeseyaValidationError,
  HeseyaValidationSubErrors,
} from '../interfaces/Errors'

/**
 * Checks if given error is a heseya error response
 */
export const isHeseyaErrorResponse = (error: any): error is HeseyaErrorResponse => {
  return (
    error?.error?.code !== undefined &&
    error?.error?.message !== undefined &&
    error?.error?.key !== undefined
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
  errors?: HeseyaValidationSubErrors
}

/**
 * Returns an error message from any given error with more detailed information when Heseya Error is passed into it
 */
export const formatApiError = (error: any): FormattedError => {
  const responseData = error?.response?.data

  if (isHeseyaErrorResponse(responseData)) {
    return {
      title: responseData.error.message,
      key: responseData.error.key as HeseyaErrorCode,
      text: isHeseyaValidationError(responseData.error)
        ? Object.values(responseData?.error?.errors || {})[0][0].message || ''
        : '',
      errors: isHeseyaValidationError(responseData.error) ? responseData.error?.errors : undefined,
    }
  }

  return {
    title: error.message,
    key: undefined,
    text: '',
  }
}
