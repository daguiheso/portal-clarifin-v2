// @ts-nocheck

import { toast } from "vue3-toastify"

export  const claToast = {
  toster (
    text = "",
    dangerouslyHTMLString = false,
    theme = "auto",
    icon = true,
    hideProgressBar = false,
    transition = "bounce",
    autoclose = 5000,
    position = "top-right",
    delay = 1000,
    closeOnClick = false,
    newestOnTop = true
  ) {
    toast.success(String(text), {
      theme,
      dangerouslyHTMLString,
      icon,
      hideProgressBar,
      transition,
      autoClose: autoclose,
      position,
      delay,
      closeOnClick,
      newestOnTop,
    })
  },

  successToast (
    text,
    dangerouslyHTMLString = false,
    theme = "auto",
    icon = true,
    hideProgressBar = false,
    transition = "bounce",
    autoclose = 5000,
    position = "top-right"
  ) {
    toast.success(String(text), {
      theme,
      dangerouslyHTMLString,
      icon,
      hideProgressBar,
      transition,
      autoClose: autoclose,
      position,
    })
  },

  infoToast (
    text,
    dangerouslyHTMLString = false,
    theme = "auto",
    icon = true,
    hideProgressBar = false,
    transition = "bounce",
    autoclose = 5000,
    position = "top-right"
  ) {
    toast.info(String(text), {
      theme,
      dangerouslyHTMLString,
      icon,
      hideProgressBar,
      transition,
      autoClose: autoclose,
      position,
    })
  },

  warningToast (
    text,
    dangerouslyHTMLString = false,
    theme = "auto",
    icon = true,
    hideProgressBar = false,
    transition = "bounce",
    autoclose = 5000,
    position = "top-right"
  ) {
    toast.warning(String(text), {
      theme,
      dangerouslyHTMLString,
      icon,
      hideProgressBar,
      transition,
      autoClose: autoclose,
      position,
    })
  },

  errorToast (
    text,
    dangerouslyHTMLString = false,
    theme = "auto",
    icon = true,
    hideProgressBar = false,
    transition = "bounce",
    autoclose = 5000,
    position = "top-right"
  ) {
    toast.error(String(text), {
      theme,
      dangerouslyHTMLString,
      icon,
      hideProgressBar,
      transition,
      autoClose: autoclose,
      position,
    })
  },

  showliveToast (event) {
    const target = event.currentTarget
    const ele = target.nextElementSibling?.querySelector("#liveToast")

    ele?.classList.add("show")
  }
}
