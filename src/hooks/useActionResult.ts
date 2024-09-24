import { createToast, withProps, clearToasts } from "mosha-vue-toastify"
import "mosha-vue-toastify/dist/style.css"
// import useContainerStore from "../container/store"

import ClaSnackBar from "@/MFEs/UploadTemplate/components/ClaSnackBar.vue";

interface SnackBarProps {
  type?: "success" | "error";
  message?: string;
  btnLabel?: string;
  btnAction?: () => void | Promise<void>;
  showCloseButton?: boolean;
}

// interface ActionResult {
//   title: string
//   message?: string
//   hasCloseButton?: boolean
//   icon?: "error" | "success" | "warning"| "info" | "otp" | null
//   labelPrimary?: string
//   labelSecondary?: string
//   isLoadingBtnPrimary?: boolean
//   actionPrimary?: () => void
//   actionSecondary?: () => void
//   autoClose?: boolean
//   closeTime?: number
//   themeBtnPrimary?: any
// }

export const showSnackBar = (props: Record<string, unknown>) => {

  const type = props.type === "error" ? "danger" : "success"

  const newProps = { ...props, closeToast: () => clearToasts() }

  return createToast(withProps(ClaSnackBar, newProps), {
    type,
    position: "bottom-center",
    hideProgressBar: true,
    transition: "slide",
    timeout: 6000,
    showCloseButton: false,
  })
}

const useActionResult = () => {
  // const store = useContainerStore()

  // const addActionResult = (action: ActionResult) => {
  //   store.actionResult = action
  // }

  const addSnackBarActionResult = (props: SnackBarProps) => {
    showSnackBar(props as  Record<string, unknown>)
  }

  return {
    // addActionResult,
    addSnackBarActionResult,
    showSnackBar
  }
}

export default useActionResult
