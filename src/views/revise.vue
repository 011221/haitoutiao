<template>
	<div class="login-container">
		<!-- 导航栏 -->
		<commonHeader>
			<template #title>
				<div class="title">修改密码</div>
			</template>
			<template #back>
				<div class="back" @click="$router.back()"><span class="iconfont icon-fanhui"></span></div>
			</template>
		</commonHeader>

		<div class="container">
			<van-form :show-error="false" :show-error-message="false"   validate-first 
			@submit="submit"
			@failed="onFailed">
				<van-field center placeholder="请输入老密码" type="password" name="oldPassword" 
				 :rules="[{ pattern:/^\w{6,12}$/, message: '老密码格式错误' }]"
				v-model="oldPassword">
					<template #left-icon>
						<span class="iconfont icon-mima"></span>
					</template>
				</van-field>
				<van-field center placeholder="请输入新密码" name="newPassword"
				:rules="[{ pattern:/^\w{6,12}$/, message: '新密码格式错误'}]"
				type="password" v-model="newPassword" >
					<template #left-icon>
						<span class="iconfont icon-mima"></span>
					</template>
				</van-field>

				<div style="margin: 30px 30px;">
					<van-button round block type="primary" color="#036eb8" size="normal" :square="true" native-type="submit">提交</van-button>
					
				</div>
			</van-form>
		</div>

		<!-- /登录表单 -->
	</div>
</template>

<script>
	export default{
		data(){
			return{
				oldPassword:'',
				newPassword:""
			}
		},
		methods:{
			submit(e){ 
				console.log(e)
				
				this.$http.post('/user/updatePwd',{
					oldPassword:this.oldPassword,
					newPassword:this.newPassword,
					uid:this.$store.state.uid
				})
				.then(res=>{
					console.log(res)
					if(res.code==0){
						this.$toast.success('修改成功')
						//页面返回
						this.$router.push('/login')
						
					}else{
						this.$toast(res.msg||"修改失败")
					}
					}).catch(err=>{
					console.log(err)
				})
				
			},
			onFailed(e){
				this.$toast.fail(e.errors[0].message)
			}
		}
	}
	
	
	
	
	
</script>

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
