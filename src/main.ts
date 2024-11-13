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

// eslint-disable-next-line vue/multi-word-component-names
app.component("Simplebar", simplebar)
app.use(router)
app.use(Vue3ColorPicker)
app.use(createPinia())
app.mount("#app")

