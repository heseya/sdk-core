import { HeseyaErrorResponse, HeseyaValidationError } from '../interfaces/Errors'

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

export const formatApiError = (error: any) => {
  const responseData = error.response?.data

  if (isHeseyaErrorResponse(responseData)) {
    return {
      title: responseData.error.message, // TODO: translate
      key: responseData.error.key,
      text: isHeseyaValidationError(responseData.error)
        ? Object.values(responseData?.error?.errors || {})[0]
        : '',
    }
  }

  return {
    title: error.message,
    text: '',
  }
}
