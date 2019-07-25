import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import api from '@/api'
import 'element-ui/lib/theme-chalk/index.css'
// import vueParticleLine from 'vue-particle-line'
// import 'vue-particle-line/dist/vue-particle-line.css'

Vue.config.productionTip = false
Vue.use(ElementUI)
// Vue.use(vueParticleLine)
Vue.prototype.$api = api

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
