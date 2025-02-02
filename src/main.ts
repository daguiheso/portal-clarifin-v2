import { createApp } from "vue"
import router from "./router"
import App from "./App.vue"

import "bootstrap/dist/js/bootstrap.bundle.js"
import simplebar from "simplebar-vue"
import Vue3ColorPicker from "vue3-colorpicker"
import { createPinia } from "pinia"
import VueGoodTablePlugin from "vue-good-table-next"
import { useSession } from "@/hooks/useSession"

import "./style.scss"
import "simplebar/dist/simplebar.min.css"
import "vue3-colorpicker/style.css"
import "vue3-toastify/dist/index.css"
import "vue-good-table-next/dist/vue-good-table-next.css"


const app = createApp(App)

app.use(router)
app.use(createPinia())


const { checkToken } = useSession()

const data = await checkToken()

if (data) {
  app.use(VueGoodTablePlugin)
  app.component("Simplebar", simplebar)

  app.use(Vue3ColorPicker)
  app.mount("#app")
}


// eslint-disable-next-line vue/multi-word-component-names

