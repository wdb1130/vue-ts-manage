import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import api from '@/api'
import 'element-ui/lib/theme-chalk/index.css'
import i18n from "./lang"; 
// import vueParticleLine from 'vue-particle-line'
// import 'vue-particle-line/dist/vue-particle-line.css'

Vue.config.productionTip = false
Vue.use(ElementUI, {
  i18n: (key:string, value:string) => i18n.t(key, value)
})
// Vue.use(vueParticleLine)
Vue.prototype.$api = api

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
