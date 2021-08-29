<template>
	<div class="about">
		<!-- 导航栏 -->
		<commonHeader>
			<template #title>
				<div class="title">关于我们</div>
			</template>
			<template #back>
				<div class="back" @click="$router.back()">
					<span class="iconfont icon-fanhui"></span>
				</div>
			</template>
		</commonHeader>
		<div class="center">
			<div class="about_img">
				<img src="../assets/1.png" alt="">
			</div>
			<div class="about_main">
				<p>嗨头条 <span>v4.5.0（2100）</span></p>
			</div>
		</div>
		
		<div class="about_footer">
			<div class="footer_img">
				<img src="../assets/3.png" alt="">
			</div>
			<p>河南郑州嗨头条有限公司</p>
			<router-link tag="em" to="/phone">联系我们</router-link>
		</div>

	</div>
</template>

<style scoped lang="scss">
	.about{
		color: #333;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.center{
		margin-top:25%;
		}
	.about_img{
		width: 200px;
		height: 150px;
		margin: 0 auto;
		img{
		width:200px;
		height: 150px;}
	}
	.about_main p{
		font-size: 16px;
		text-align: center;
	}
	
	.about_footer{
		position: absolute;
		bottom: 5%;
		em{
		display: block;
		font-size: 12px;
		text-align: center;
		color: #aaa;
		padding: 7% 0;};
		.footer_img{
			text-align: center;
			margin-bottom: 20px;
		}
		.footer_img img{
			width: 120px;
			height: 120px;
		}
	}
	
</style>
