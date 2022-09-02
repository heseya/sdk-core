export const createFormData = async () => {
  if (typeof window === 'undefined') {
    const FormData = await require('form-data')
    return new FormData()
  }
  return new FormData()
}
