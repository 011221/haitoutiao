<template>
	<div class="home">
		<commonHeader>
			<template #search>
				<div class="search-btn">
					<span class="iconfont icon-sousuo"></span>
					搜索
				</div>
			</template>
		</commonHeader>

<div class="home_tabs">
	<van-tabs color="#07c160" >
		<van-tab  title="本地头条"></van-tab>
		<van-tab  title="招聘求职"></van-tab>
		<van-tab  title="二手置换"></van-tab>
		<van-tab  title="房屋出租"></van-tab>
		<van-tab  title="生意转让"></van-tab>
		<van-tab  title="婚恋交友"></van-tab>
	</van-tabs>
</div>
<div class="container" style="padding-bottom: 50px;padding-top: 90px;background: #fff;">
	

		
		<van-list
		  v-model="loading"
		  :finished="finished"
		  finished-text="没有更多了"
		  :immediate-check="false"
		>
		  <div class="article_list" >
			  <div class="list_item">
				  <div class="title">
				 三次出演陈独秀，于和伟是如何打破事不过三的魔咒的？
				  </div>
				  <div class="img_type1" >
					  <img src="~@/assets/1.jpg" >
				  </div>
				  
				  
				  <div class="aricle_bottom">
					  <span>小张</span>   <span>2评论</span> <span>2021-07-11</span>
				  </div>
			  </div>
		  </div>
		  
		  <div class="article_list" >
		  			  <div class="list_item">
		  				  <div class="title">
		  				 三次出演陈独秀，于和伟是如何打破事不过三的魔咒的？
		  				  </div>
		  				  <div class="img_type2" >
		  					  <img src="~@/assets/1.jpg" >
		  					  <img src="~@/assets/1.jpg" >
		  					  <img src="~@/assets/1.jpg" >
		  					  <img src="~@/assets/1.jpg" >
		  				  </div>
		  				  
		  				  
		  				  <div class="aricle_bottom">
		  					  <span>小张</span>   <span>2评论</span> <span>2021-07-11</span>
		  				  </div>
		  			  </div>
		  </div>
		</van-list>
	
	
</div>

		
	</div>
</template>

<script>
// @ is an alias to /src

export default {
	name: 'Home',
	data() {
		
		return {
			 cate:[],
			 cate_index:0,
			 list: [],
		     loading: true, //加载
		     finished: false //完成
		};
	},
	mounted() {
	
	},
	methods:{
		

		
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
	
.search-btn {
	width: 70%;
	position: absolute;
	top: 6px;
	left: 15%;
	height: 32px;
	background: #66d79d;
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
	.list_item{
		width: 100%;
		padding: 12px 0 0 0;
		.title{
			margin: 0 0 10px 0;
		}
		
	}
	.img_type1{
		width: 100%;
		height: 210px;
		img{
			width: 100%;
			height: 210px;
		}
	}
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
