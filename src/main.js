import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/utils/vant' 

Vue.config.productionTip = false;

import axios from 'axios';
axios.defaults.baseURL = 'https://d33a5037-6c63-4e92-8bb1-30018ab701ea.bspapp.com/http';

axios.interceptors.request.use((config)=>{
	
	return config
	
},(err)=>{
	
	return Promise.reject(err)
	
})
axios.interceptors.response.use((data)=>{
	
	console.log(data.status)
	
	if(data&&data.status===200){
		return data.data
	}else{
		return Promise.reject(data)
	}
	
},(err)=>{
	
	return Promise.reject(err)
	
})

Vue.prototype.$http = axios;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
