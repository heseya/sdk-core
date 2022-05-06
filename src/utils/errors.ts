import { HeseyaErrorCode, HeseyaErrorResponse, HeseyaValidationError } from '../interfaces/Errors'

const isHeseyaErrorResponse = (error: any): error is HeseyaErrorResponse => {
  return (
    error.error?.code !== undefined &&
    error.error?.message !== undefined &&
    error.error?.key !== undefined
  )
}

const isHeseyaValidationError = (error: any): error is HeseyaValidationError => {
  return error.key === 'VALIDATION_ERROR' && error?.errors !== undefined
}

interface FormattedError {
  title: string
  key?: HeseyaErrorCode
  text: string
}

export const formatApiError = (error: any): FormattedError => {
  const responseData = error.response?.data

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
