<template>
	<div>
		<!-- 导航栏 -->
		<commonHeader>
			<template #title>
				<div class="title">收藏</div>
			</template>
			<template #back>
				<div class="back" @click="$router.back()">
					<span class="iconfont icon-fanhui"></span>
				</div>
			</template>
		</commonHeader>
		<van-list
		  class="history"
		  v-model="loading"
		  :finished="finished"
		  finished-text="没有更多了"
		  @load="get_list"
		  :immediate-check="false"
		  offset="100"
		>
		  <router-link tag="div" :to='{path:"article",query:{article_id:item._id}}' class="article_list" v-for="(item,index) in list" :key="item._id">
			  <div class="list_item">
				  <div class="title">
				{{item.title}}
				  </div>
				  <div class="img_type1" v-if="item.poster_type==2">
					  <img v-for="(item2,index2) in item.imageSrc" :key='index2' :src="item2" >
				  </div>
				  <div class="img_type2"  v-if="item.poster_type==3">
				  	<img v-for="(item2,index2) in item.imageSrc" :key='index2' :src="item2" >
				  </div>
				  
				  <div class="aricle_bottom">
					  <span>{{item.author}}</span>   <span>{{item.comment}}评论</span> <span>{{item.time|formatTime('Y-m-d')}}</span>
				  </div>
			  </div>
		  </router-link>
		</van-list>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				loading:true,
				finished:false,
				list:[],
				limit:10,
				user_id:''
			}
		},
		created(){
			let user_id=localStorage.getItem('uid')
			this.user_id=user_id
			this.get_list()
		},
		methods:{
			get_list(){
				let {user_id,list,limit}=this
				let skip =list.length
				this.$http.post('/api/get_fav_list',{
					user_id,skip,limit
				}).then(res=>{
					if(res.code==0){
						this.list.push(...res.data)
						if(this.list.length>=res.count){
							this.finished=true
						}else{
							this.loading=false
						}
					}
					this.finished=true
					this.loading=false
				}).catch(err=>{
					console.log(err)
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.history{
		padding-top: 47px;
		background: #fff;
	}
</style>
