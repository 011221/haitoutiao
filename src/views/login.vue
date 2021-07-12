<template>
	<div class="login-container">
		<!-- 导航栏 -->
		<commonHeader>
			<template #title>
				<div class="title">登录</div>
			</template>
			<template #back>
				<div class="back" @click="$router.back()"><span class="iconfont icon-fanhui"></span></div>
			</template>
		</commonHeader>

		<div class="container">
			<van-form :show-error="false" :show-error-message="false" validate-first>
				<van-field center placeholder="请输入手机号" name="mobile">
					<template #left-icon>
						<span class="iconfont icon-shouji2"></span>
					</template>
				</van-field>
				<van-field center placeholder="请输入密码" name="password">
					<template #left-icon>
						<span class="iconfont icon-icon-mima"></span>
					</template>
				</van-field>

				<div style="margin: 30px 30px;">
					<van-button round block type="primary" size="normal" :square="true" native-type="submit">提交</van-button>
					<router-link to="/reg" class="link">还没账号? 立即注册</router-link>
				</div>
			</van-form>
		</div>

		<!-- /登录表单 -->
	</div>
</template>

<style scoped lang="scss">
.login-container {
	.send-btn {
		width: auto;
		height: 30px;
		padding: 1px 8px;
		background-color: #ededed;
		.van-button__text {
			font-size: 12px;
			color: #666666;
		}
	}
	.login-btn-wrap {
		padding: 26px 16px;
		.login-btn {
			background-color: #6db4fb;
			border: none;
			.van-button__text {
				font-size: 15px;
			}
		}
	}
	.link {
		color: #999;
		float: right;
		margin-top: 18px;
	}
}
</style>
