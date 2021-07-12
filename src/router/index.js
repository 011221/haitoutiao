import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import index from '../views/index.vue'

Vue.use(VueRouter)

const routes = [

	{
		path: '/',
		name: 'index',
		component: index,
		children: [{
				path: '/',
				name: 'Home',
				component: Home
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
		component:()=>import('../views/user_info.vue')
	},
	{
		path:"/login",
		name:"login",
		component:()=>import('../views/login.vue')
	},
	{
		path:"/article",
		name:"article",
		component:()=>import('../views/article.vue')
	},
	{
		path:"/reg",
		name:"reg",
		component:()=>import('../views/reg.vue')
	}
	

]

const router = new VueRouter({
	routes
})

export default router
