/**
 * Creates a FormData object. The method of creating a FormData object is different between node and browser environments.
 * For browsers, we use native FormData object.
 * For node, we use a `form-data` package.
 * @returns {FormData}
 */
export const createFormData = async (): Promise<FormData> => {
  if (typeof window === 'undefined') {
    const FormData = await require('form-data')
    return new FormData()
  }
  return new FormData()
}
