// formatTime

import axios from 'axios';
import Vue from 'vue'
import config from '@/utils/config.js';

axios.defaults.baseURL = config.baseURL;

axios.interceptors.request.use((config)=>{
	let token=localStorage.getItem('token')
	config.headers.token=token
	return config
	
},(err)=>{
	
	return Promise.reject(err)
	
})
axios.interceptors.response.use((data)=>{
	
	// console.log(data.status)
	
	if(data&&data.status===200){
		return data.data
	}else{
		return Promise.reject(data)
	}
	
},(err)=>{
	
	return Promise.reject(err)
	
})


Vue.prototype.$http = axios;