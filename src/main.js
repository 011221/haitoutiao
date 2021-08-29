import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/utils/vant' //vant组件库
import '@/utils/request'  // 引入请求库

Vue.config.productionTip = false;

import '@/components'

import mixin from '@/utils/mixin.js';

Vue.mixin(mixin); 
//判断有没有token token是否过期
//如果有，没有过期，满足免登录的条件
//用token /user/getuserInfo 拿到用户数据
//否则重新登
let token =localStorage.getItem("token")
let tokenExpired =localStorage.getItem("tokenExpired")
let now =new Date().getTime()
if(token&&now<tokenExpired){
	//请求获取用户信息的接口
	store.dispatch('GET_USER_INFO',token)
	
	
}else{
     store.commit('LOG_OUT')
}



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
