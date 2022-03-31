declare module 'formdata-polyfill' {
  const FormData: {
    new (): FormData
    prototype: FormData
  }
  function formDataToBlob(formData: FormData): Blob
}
