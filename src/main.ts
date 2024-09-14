import { createApp } from 'vue'
import './style.scss'
import router from "./router";
import App from "./App.vue";
import 'bootstrap/dist/js/bootstrap.bundle.js';
import simplebar from 'simplebar-vue';
import 'simplebar/dist/simplebar.min.css';
import Vue3ColorPicker from "vue3-colorpicker";
import "vue3-colorpicker/style.css";
import { createPinia } from 'pinia';

const app = createApp(App);
const pinia = createPinia()
// eslint-disable-next-line vue/multi-word-component-names
app.component("simplebar", simplebar);
app.use(router);
app.use(Vue3ColorPicker);
app.use(pinia)
app.mount("#app");

