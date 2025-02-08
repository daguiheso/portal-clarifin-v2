import { claToast } from "@/commons/utils/toast"
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

export const handleError = (error: unknown) => {
  const errorMessage = error instanceof Error ? error.message : "An unknown error occurred"

  claToast.errorToast(errorMessage)
}

export const getLastDayOfMonth = (yearMonth: string) => {
  const [year, month] = yearMonth.split("-").map(Number)

  const lastDay = new Date(year, month, 0)

  return lastDay.getDate()
}

export function getIdentityProviderUrlBase () {
  return "https://session.clarifin.co/v2/entity/sessions/clarifin"
}

export const getClientId = () => {
  return localStorage.getItem("clientId") || ""
}

export const formattedDate = (date: string) => {
  const convertDate = new Date(date)

  const formattedDate = new Intl.DateTimeFormat("es-ES", {
    dateStyle: "medium", // Puedes usar "short", "medium", "long", "full"
    timeStyle: "short", // Muestra la hora en formato legible
  }).format(convertDate)

  return formattedDate
}

export const formattedMonthAndYear = (date: string) => {
  const convertDate = new Date(date)

  const formattedDate = new Intl.DateTimeFormat("es-ES", {
    month: "long",
    year: "numeric",
  }).format(convertDate)

  return formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1)
}

