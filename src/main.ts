import setupIntercetors from "./apiResources/setupInterceptors"
import { createApp } from "vue"
import { createPinia } from "pinia"
import { defineValidatorRules } from "./common/validationRules"

import App from "./App.vue"
import "./index.css"
import "./assets/css/main.css"
import "./assets/css/dashboard.css"
import "./assets/css/animate.css"
import "./assets/css/sidebar/styles-lg.css"
import "./assets/css/sidebar/styles-sm.css"
import createRouter from "./router/index"

import Toast from "vue-toastification"
import "vue-toastification/dist/index.css"
import Vidle from "v-idle-3"
import VueApexCharts from "vue3-apexcharts"

defineValidatorRules()
const app = createApp(App)

setupIntercetors()

const store = createPinia()
const router = createRouter()

app.use(store)
app.use(router)
app.use(Toast)
app.use(Vidle)
app.use(VueApexCharts)

app.mount("#app")
