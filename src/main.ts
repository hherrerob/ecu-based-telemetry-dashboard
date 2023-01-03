import { createApp } from 'vue'
import App from './App.vue'
import { router } from './routes'
import BootstrapVue3 from 'bootstrap-vue-3'
import VueApexCharts from 'vue3-apexcharts'
import VueVideoPlayer from '@videojs-player/vue'

// Import Bootstrap and BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// Now custom styles
import "./style.scss"

// Video.js
import 'video.js/dist/video-js.css'

createApp(App)
    .use(router)
    .use(BootstrapVue3)
    .use(VueApexCharts)
    .use(VueVideoPlayer)
    .mount('#app')
    .$nextTick(() => {
        postMessage({ payload: 'removeLoading' }, '*')
    })
