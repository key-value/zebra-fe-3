import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import axios, { AxiosInstance } from 'axios'
import '@/assets/css/common.scss'

Vue.config.productionTip = false
Vue.prototype.$axios = axios
declare module 'Vue/types/vue' {
  interface Vue {
    $axios: AxiosInstance
  }
}

Vue.use(ElementUI)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
