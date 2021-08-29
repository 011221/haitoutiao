<template>
	<div class="phone">
		<!-- 导航栏 -->
		<commonHeader>
			<template #title>
				<div class="title">联系我们</div>
			</template>
			<template #back>
				<div class="back" @click="$router.back()">
					<span class="iconfont icon-fanhui"></span>
				</div>
			</template>
		</commonHeader>
		<div class="phone_serve">
			<h4>服务热线</h4>
			<p>注册咨询/软件使用咨询等问题处理</p>
			<p>+86 17516109735</p>
			<button><a :href="'tel:' + 17516109735">立即拨打</a></button>
		</div>
		<div class="phone_email">
			<h4>我们的邮箱</h4>
			<p>补充资料、投诉与建议、变更账户信息、争议处理等问题处理</p>
			<p>2843955779@qq.com</p>
			<button @click="copyUrl">复制</button>  
		</div>
		
	</div>
</template>

<script>
	export default{
		created() {
		    var _this = this;
		},
		methods: {
		    copyUrl() {
		          const input = document.createElement('input')
		          document.body.appendChild(input)
		          input.setAttribute('value',"284395579@qq.com")
		          input.select()
		          if (document.execCommand('copy')) {
		            document.execCommand('copy')
					alert('复制成功')
		          }
		          document.body.removeChild(input)
		}
		}
	}
</script>
<style scoped lang="scss">
	.phone{
		color: #333;
		display: flex;
		flex-direction: column;
		justify-content: center;
		margin:0 30px;
	}
	.phone_serve,.phone_email{
		margin-top: 60px;
		background: #fff;
		padding: 30px;
		border-radius: 10px;
		h4{
			color: #036eb8;
			text-align: center;
			padding: 10px;
		}
		p{
			text-align: center;
			padding: 7px;
		}
		button{
			background: #036eb8;
			margin-top: 10px;
			width: 100%;
			color: #fff;
			padding: 13px;
			border-radius: 15px;
			border: none;
			a{
				color: #fff;
			}
		}
	}
	.phone_email{
		margin-top: 20px;
	}
</style>
