import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/utils/vant' 
import '@/utils/request' 
Vue.config.productionTip = false;

import '@/components'

import mixin from '@/utils/mixin.js'

Vue.mixin(mixin)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
