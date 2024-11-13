export const objectToQueryParams = (params: object) => {
  let result = ""

  for (const [index, [key, value]] of Object.entries(params).entries()) {
    const isValueValid = value || value === 0 || value === false

    if (isValueValid) {
      result += `${index === 0 ? "?" : "&"}${key}=${value}`
    }
  }

  return result
}
