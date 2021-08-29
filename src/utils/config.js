//  做生产环境和开发环境的区分  
let baseURL=''
if(process.env.NODE_ENV==='production'){
	//生产环境  打包以后
	baseURL='https://1ef2a05f-0d49-4c7a-88e5-d09968b0bed8.bspapp.com/http'
	
}else{
	//开发或者测试环境
	baseURL='/api'
	
}
export default {
	
	baseURL
	
	
	
}
