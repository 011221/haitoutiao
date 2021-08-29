<template>
	<div class="home">
		<commonHeader>
			<template #search>
				<div class="tx">
					H头条
				</div>
				<router-link class="search-btn" to="/search" tag="div">
					<span class="iconfont icon-sousuo"></span>
					搜索
				</router-link>
			</template>
		</commonHeader>

<div class="home_tabs">
	<van-tabs color="#036eb8" @change="tabChange" v-model="cate_index">
		<van-tab v-for="(item,index) in cate" :key="item._id"  :title="item.name"></van-tab>
	</van-tabs>
</div>
<div class="container" style="padding-bottom: 50px;padding-top: 90px;background: #fff;">
		
		<van-pull-refresh v-model="refreshing" @refresh="onRefresh">
		<van-list
		  v-model="loading"
		  :finished="finished"
		  finished-text="没有更多了"
		  @load="get_list"
		  :immediate-check="false"
		  offset="100"
		>
		  <router-link tag="div" :to='{path:"article",query:{article_id:item._id}}' class="article_list" v-for="(item,index) in list" :key="item._id">
			  <div class="list_item0" v-if="item.poster_type==1">
				  <div class="title">
				{{item.title}}
				  </div>
			     <div v-if="item.poster_type==1">
			     </div>
				 
			  </div>
			  <div class="list_item" v-if="item.poster_type==2">
				  <div class="title1">
				  {{item.title}}
				    </div>
			  	  <div class="img_type1" v-if="item.poster_type==2">
			  		<img v-for="(item2,index2) in item.imageSrc" :key='index2' :src="item2" >
			      </div>
			  </div>
			  
			  <div class="list_item1"  v-if="item.poster_type==3">
				  <div class="title">
				  {{item.title}}
				    </div>
				    <div class="img_type2"  v-if="item.poster_type==3">
				    	<img v-for="(item2,index2) in item.imageSrc" :key='index2' :src="item2" >
				    </div>
			  </div>
				<div class="aricle_bottom">
					<span>{{item.author}}</span>   <span>{{item.comment}}评论</span> <span>{{item.time|formatTime('Y-m-d')}}</span>
				</div>
		  </router-link>
		</van-list>
	</van-pull-refresh>
	
</div>

	</div>
</template>

<script>
// @ is an alias to /src
export default {
	name: 'Home',
	data() {
		let cate = localStorage.getItem('toutiao_cate'); //
		// try{   严谨的写
		// 	cate = cate?JSON.parse(cate):[]
		// }catch(e){
		// 	//TODO handle the exception
		// 	cate = []
		// }
		return {
			 cate:cate?JSON.parse(cate):[],
			 cate_index:0,
			 list: [],
		     loading: false, //加载  有一个圆圈在转  加载中的状态   他是true的时候 不会请求数据
		     finished: false, //完成  把所有的数据加载完了  你再次滑动到底部  不会触发请求了
			 limit:10,
			 refreshing:false
		};
	},
	created() {
		this.get_cate()
		this.$http.post('/api/get_fav_list',{
			user_id:localStorage.getItem('uid')
		}).then(res=>{
			console.log(res)
		})
	},
	methods:{
		get_cate(){
			this.$http.post('/api/get_cate_list')
			.then(res=>{
				console.log(res)
				if(res.code==0){
					this.cate = res.data;
					
					localStorage.setItem('toutiao_cate',JSON.stringify(res.data))
					
					this.get_list()
					
				}else{
					this.$toast(res.msg)
				}
				
			}).catch(err=>{
				console.log(err)
			})
		},
		get_list(){
			
			let {limit,cate,cate_index} = this;
			let skip = this.list.length; //  skip （开始数）  其实等于页面上加载的数据的个数
			let cate_id = cate[cate_index]._id;   //拿到当前高亮的分类的ID
			
			this.$http.post('/api/get_article_list',{
				cate_id,
				skip,
				limit
			})
			.then(res=>{
				
				console.log(res)
				if(res.code==0){
					
					this.list.push(...res.data)
					
					if(this.list.length>=res.count){
						//加载完了
						this.finished = true
					}else{
						
						this.loading = false;
					}
				
					
				}else{
					this.$toast(res.msg||'获取失败')
				}
				
				this.refreshing = false
			
				
			}).catch(err=>{
				console.log(err)
				this.refreshing = false
			})
			
		},
		//导航改变事件
		tabChange(e){
			// console.log(e)
			this.cate_index = e;
			// 原来的数据 清空  
			this.list = []; 
			this.finished = false;
			this.loading = true
			
			this.get_list()
		},
		//下拉刷新 
		onRefresh(){
			this.list = [];
			this.finished = false;
			this.loading = true;
			this.get_list()
			
			
			}

		
	}
};
</script>

<style scoped="scoped" lang="scss">
.van-tabs--line ::v-deep .van-tabs__wrap {
	@include border;
}
::v-deep .van-tab {
	@include border(#eee, right);
}
</style>

<style lang="scss">
.tx{
	width: 60px;
	height: 46px;
	font-size: 18px;
	color: #0df7ff;
	font-weight: bold;
	display: flex;
	justify-content: flex-end;
	align-items: center;
}
.search-btn {
	width: 75%;
	position: absolute;
	top: 6px;
	left: 18%;
	height: 32px;
	background:rgba(255,255,255,0.7);
	border: none;
	border-radius: 32px;
	display: flex;
	justify-content: center;
	align-items: center;
	color: #fff;
	font-size: 14px;
	.iconfont {
		margin-right: 5px;
		font-size: 16px;
	}
}
.home_tabs{
	width: 100%;
	height: 44px; 
	 position: fixed;
	 top: 46px;
	 z-index: 999;
}
.article_list{
	padding:  0 20px;
	.title{
			margin: 0 0 10px 0;
		}
	.list_item0{
		width: 100%;
		padding: 12px 0 0 0;
		display: flex;
		
		
	}
	.list_item{
		width: 100%;
		padding: 12px 0 0 0;
		display: flex;
		.title1{
			margin: 0 0 10px 0;
			width: 70%;
		}
		.img_type1{
			width:30%;
			display: flex;
			justify-content: center;
			img{
				width: 80%;
				height: 80%;
			}
			}
		
	}
	.list_item1{
		width: 100%;
		padding: 12px 0 0 0;
		.img_type2{
		width: 100%;
		height: 75px;
		display: flex;
		overflow: hidden;
		img{
			width: 32%;
			margin-right: 2%;
		}
	}
	}
	
	
	.aricle_bottom{
		display: flex;
		height: 40px;
		align-items: center;
		color: #888;
		@include border;
		font-size: 14px;
		span{
			margin-right: 20px;
		}
		}
	
}

</style>
