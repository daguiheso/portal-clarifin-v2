// import useContainerStore from "@/container/store"
// import { useRouter } from "vue-router"
import useActionResult from "@/hooks/useActionResult"

const { showSnackBar } = useActionResult()

interface CustomError {
    error: unknown
    errorKey: string
}

interface NonBlockingCustomError extends CustomError {
  contactSupport?: boolean
}

// interface SemiBlockingCustomError extends CustomError {
//   path?: string
// }

// interface ParsedError {
//   error: unknown
//   title: string
//   message: string
//   path?: string
// }

const useErrorManagement = () => {
  // const store = useContainerStore()

  // const router = useRouter()

  // const cleanError = () => (store.semiBlockingError = null)


  // const addSemiBlockingError = (error: SemiBlockingCustomError) => {
  //   // store.semiBlockingError = getParsedError(error)
  // }

  const addSnackbarError = (error: NonBlockingCustomError) => { // TODO: Replace this for nonBlockingError the complete migration is ready
    const parsedError: Record<string, unknown> = {
      message: error.error,
      type: "error",
      btnLabel: ""
    }

    showSnackBar(parsedError)
  }

  // const getParsedError = (error: SemiBlockingCustomError) => {
  //   const customError: ParsedError = {
  //     error: error.error,
  //     title: i18n.global.t(`errors.${error.errorKey}.title`),
  //     message: i18n.global.t(`errors.${error.errorKey}.message`)
  //   }

  //   if (error.path) {
  //     customError.path = error.path
  //   }

  //   return customError
  // }

  // const handlePrimaryAction = () => {
  //   if (store.semiBlockingError?.path) {
  //     router.push(store.semiBlockingError?.path)
  //   } else {
  //     window.location.href = "/"
  //   }
  //   cleanError()
  // }


  return {
    // addSemiBlockingError,
    // handlePrimaryAction,
    addSnackbarError
  }
}

export default useErrorManagement
