import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import index from '../views/index.vue'
import {Toast} from "vant"
import store from '@/store'
Vue.use(VueRouter)

const routes = [

	{
		path: '/',
		name: 'index',
		component: index,
		children: [{
				path: '/',
				name: 'Home',
				component: Home,
				meta:{
					keepAlive:true
				}
			}, {
				path: '/publish',
				name: 'publish',
				component: () => import('../views/publish.vue')
			},
			{
				path: '/my',
				name: 'my',
				component: () => import('../views/my.vue')
			}
		]
	},{
		path:"/search",
		name:"search",
		component:()=>import('../views/search.vue')
	},{
		path:"/user_info",
		name:"user_info",
		meta:{
			checkAuch:true
		},
		component:()=>import('../views/user_info.vue')
	},
	{
		path:"/login",
		name:"login",
		component:()=>import('../views/login.vue')
	},
	{
		path:"/collect",
		name:"collect",
		meta:{
			checkAuch:true
		},
		component:()=>import('../views/collect.vue')
	},
	{
		path:"/article",
		name:"article",
		component:()=>import('../views/article.vue')
	},
	{
		path:"/zan",
		name:"zan",
		meta:{
			checkAuch:true
		},
		component:()=>import('../views/zan.vue')
	},
	{
		path:"/history",
		name:"history",
		component:()=>import('../views/history.vue')
	},
	{
		path:"/about",
		name:"about",
		component:()=>import('../views/about.vue')
	},
	{
		path:"/phone",
		name:"phone",
		component:()=>import('../views/phone.vue')
	},
	{
		path:"/revise",
		name:"revise",
		meta:{
			checkAuch:true
		},
		component:()=>import('../views/revise.vue')
	},
	{
		path:"/reg",
		name:"reg",
		component:()=>import('../views/reg.vue')
	},
	{
		path:"/resetting",
		name:"resetting",
		component:()=>import('../views/resetting.vue')
	}

]

const router = new VueRouter({
	routes
})

//
router.beforeEach((to,from,next)=>{
	//判断想去的页面是需要验证的页面吗
	//如果是，满足条件
	if(to.meta&&to.meta.checkAuch){
		let token =localStorage.getItem('token')
		if(token){
			next()
		}else{
			console.log(from)
			if(from.path=='/'||!from.path){
				next('/')
				return
			}
			
			
			
			Toast('请先登录账号')
			setTimeout(e=>{
				router.replace('/login')
			},500)
		}
	}else{
		next()
	}
})


export default router
