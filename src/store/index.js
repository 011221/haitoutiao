import Vue from 'vue'
import Vuex from 'vuex'
import {Toast} from "vant"
Vue.use(Vuex)
//vuex  响应式的  全局变量
//1.怎么拿vue仓库里的数据
export default new Vuex.Store({
  state: {
	  //放数据的
	  userInfo:{},
	  token:'',
	  uid:''
  },
  mutations: {
	  //改数据  需要写一个方法
	  CHANGE_DATA(state,obj){
		  // {name:"token",val:222}
		  let {name,val}=obj
		  state[name]=val
	  },
	  LOG_OUT(state){
		  state.uid=''
		  state.token=''
		  state.userInfo={}
		  localStorage.removeItem('tokenExpired')
		  localStorage.removeItem('token')
		  localStorage.removeItem('uid')
	    }
  },
  actions: {
	  //异步情况下 改数据
	  GET_USER_INFO({commit},token){
		  //网络请求，用token获取用户信息
		  
		  Vue.prototype.$http.post("/user/getuserInfo",{token}).then(res=>{
		  	console.log(res)
			if(res.code==0){
				commit('CHANGE_DATA',{
					name:'userInfo',
					val:res.userInfo
				})
				commit('CHANGE_DATA',{
					name:'uid',
					val:res.uid
				})
				commit('CHANGE_DATA',{
					name:'token',
					val:res.token
				})
			}else{
				Toast(res.msg)
			}
		  }).catch(err=>{
		  	console.log(err)
		  })
	  }
  },
  modules: {
	  //模块
  }
})
