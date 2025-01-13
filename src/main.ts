import { createApp } from "vue"
import "./style.scss"
import router from "./router"
import App from "./App.vue"
import "bootstrap/dist/js/bootstrap.bundle.js"
import simplebar from "simplebar-vue"
import "simplebar/dist/simplebar.min.css"
import Vue3ColorPicker from "vue3-colorpicker"
import "vue3-colorpicker/style.css"
import "vue3-toastify/dist/index.css"
import { createPinia } from "pinia"
const app = createApp(App)

import VueGoodTablePlugin from "vue-good-table-next"

// import the styles
import "vue-good-table-next/dist/vue-good-table-next.css"
import axios from "axios"
import { getIdentityProviderUrlBase } from "./commons/utils"

const baseURL = getIdentityProviderUrlBase()

async function checkToken () {
  try {
    const urlParams = new URLSearchParams(window.location.search)
    const idSession = urlParams.get("token") || window.localStorage.getItem("idSession") || ""
    const realm = urlParams.get("id")

    localStorage.setItem("idSession", `${idSession}`)
    localStorage.setItem("realm", `${realm}`)

    if (idSession) return await getUserData(idSession)

    redirectToAuth()

    return null
  } catch (error) {
    redirectToAuth()

    return null
  }
}

async function getUserData (idSession: string) {
  window.history.replaceState({}, "", window.location.pathname)

  const response = await axios.get(`${baseURL}/profile/me`, {
    headers: {
      Token: idSession
    }
  })

  window.localStorage.setItem("tokenSession", response.data.access_token)

  return response.data
}

function redirectToAuth () {
  window.location.href = `${baseURL}/auth`
}

const data = await checkToken()

if (data) {
  app.use(VueGoodTablePlugin)
  app.component("Simplebar", simplebar)
  app.use(router)
  app.use(Vue3ColorPicker)
  app.use(createPinia())
  app.mount("#app")
}


// eslint-disable-next-line vue/multi-word-component-names

