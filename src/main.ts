import { createApp } from 'vue'
import "./style.css"
import App from './App.vue'
import './samples/node-api'
import { router } from './routes'
import BootstrapVue3 from 'bootstrap-vue-3'
import VueApexCharts from "vue3-apexcharts";

// Import Bootstrap and BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

createApp(App)
    .use(router)
    .use(BootstrapVue3)
    .use(VueApexCharts)
    .mount('#app')
    .$nextTick(() => {
        postMessage({ payload: 'removeLoading' }, '*')
    })
