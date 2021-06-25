export const formatApiError = (error: any) => {
  const responseData = error.response?.data

  return {
    title: responseData?.error?.message || error.message,
    text: Object.values(responseData?.error?.errors || {})[0] || '',
  }
}
