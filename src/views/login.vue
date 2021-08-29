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
			<van-form :show-error="false" :show-error-message="false"   validate-first 
			@submit="submit"
			@failed="onFailed">
				<van-field center placeholder="请输入手机号" name="username" 
				 :rules="[{ pattern:/^1[3-9]\d{9}$/, message: '请输入正确的手机号' }]"
				v-model="username">
					<template #left-icon>
						<span class="iconfont icon-shouji"></span>
					</template>
				</van-field>
				<van-field center placeholder="请输入密码" name="password"
				:rules="[{ pattern:/^\w{6,12}$/, message: '密码格式错误'}]"
				type="password" v-model="password" >
					<template #left-icon>
						<span class="iconfont icon-mima"></span>
					</template>
				</van-field>

				<div style="margin: 30px 30px;">
					<van-button round block type="primary" color="#036eb8"  size="normal" :square="true" native-type="submit">提交</van-button>
					<div style="display: flex;justify-content: space-between;">
						<router-link to="/resetting" class="link">忘记密码</router-link>
					    <router-link to="/reg" class="link">还没账号? 立即注册</router-link>
					</div>
					
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
				username:'',
				password:""
			}
		},
		methods:{
			submit(e){ 
				console.log(e)
				
				this.$http.post('/user/login',e)
				.then(res=>{
					console.log(res)
					if(res.code==0){
						this.$toast.success('登录成功')
						//页面返回
						
						let {token,tokenExpired,userInfo,uid}=res
						localStorage.setItem("token",token)
						localStorage.setItem("tokenExpired",tokenExpired)
						localStorage.setItem("uid",uid)
						//防止刷新数据丢失
						sessionStorage.setItem("userInfo",JSON.stringify(userInfo))
						//数据存到变量中，判断这个变量   ——vuex
						
						this.$store.commit('CHANGE_DATA',{name:'token',val:token})
						this.$store.commit('CHANGE_DATA',{name:'uid',val:uid})
						this.$store.commit('CHANGE_DATA',{name:'userInfo',val:userInfo})
						
						
						setTimeout(e=>{
							this.$router.push('/my')
						},10)
						
						
					}else{
						this.$toast(res.msg||"登录失败")
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
