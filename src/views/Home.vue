<template>
	<div class="home">
		<van-nav-bar class="aaa">
			<template #title>
				<div class="search-btn">
					<van-icon class-prefix="icon" size="14" name="sousuo" />
					搜索
				</div>
			</template>
		</van-nav-bar>

		<van-tabs color="#07c160" v-model="cate_index" @change="tab_change">
			<van-tab  v-for="(item,index) in cate" :title="item.name" :key="item._id"> 
			</van-tab>
		</van-tabs>
		
		<van-list
		  v-model="loading"
		  :finished="finished"
		  finished-text="没有更多了"
		  @load="get_list"
		  :immediate-check="false"
		>
		  <div class="article_list" >
			  <div class="list_item" v-for="(item,index) in list" :key="index">
				  <div class="title">
				  {{item.title}}
				  </div>
				  <div class="img_wrap_type1" v-if="item.poster_type==2">
					  <img :src="item.imageSrc[0]" alt="">
				  </div>
			  </div>
		 
		  
		  </div>
		</van-list>
		
	</div>
</template>

<script>
// @ is an alias to /src

export default {
	name: 'Home',
	data() {
		let cate = localStorage.getItem('toutiao_cate');
		return {
			 cate: cate? JSON.parse(cate):[],
			 cate_index:0,
			 list: [],
		     loading: true,
		     finished: false,
			 skip:0,
			 limit:10
		};
	},
	components: {},
	mounted() {
		this.get_cate_list()
	},
	methods:{
		
		get_cate_list(){
			this.$http.post('/api/get_cate_list')
			.then(res=>{
				console.log(res)
				if(res.code==0){
					this.cate = res.data;
					
					localStorage.setItem('toutiao_cate',JSON.stringify(res.data))
					
					this.get_list()
				}else{
					  this.$toast('获取失败');
				}
			})
		},
		tab_change(e){
			
			this.cate_index = e;
			
			
			
		},
		get_list(){
			
			let {cate_index,cate,skip,limit} = this;
			let cate_id = cate[cate_index]._id;
			this.$http.post('/api/get_article_list',{
				cate_id,
				skip,
				limit
			}).then(res=>{
				console.log(res)
				this.list = res.data;
			}).catch(err=>{
				
				console.log(err)
			})
			
			
		}
		
	}
};
</script>

<style scoped="scoped" lang="scss">
.van-nav-bar {
	background-color: $color;
	::v-deep .van-nav-bar__title {
		max-width: 278px;
		width: 278px;
	}
}
.van-tabs--line ::v-deep .van-tabs__wrap {
	@include border;
}
::v-deep .van-tab {
	@include border(#eee, right);
}
</style>

<style lang="scss">
.search-btn {
	width: 100%;
	height: 32px;
	background: #66d79d;
	border: none;
	border-radius: 32px;
	display: flex;
	justify-content: center;
	align-items: center;
	color: #fff;
	font-size: 14px;
	.icon {
		margin-right: 5px;
	}
}

.article_list{
	padding:  20px;
	@include border;
	margin-top: 10px;
	
	.list_item{
		width: 100%;
		
	}
	.img_wrap_type1{
		
		img{
			width: 710px;
			height: 350px;
		}
	}
	
}

</style>
