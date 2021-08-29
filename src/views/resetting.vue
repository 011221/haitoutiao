<template>
	<div class="login-container">
		<!-- 导航栏 -->
		<commonHeader>
			<template #title>
				<div class="title">重置</div>
			</template>
			<template #back>
				<div class="back" @click="$router.back()"><span class="iconfont icon-fanhui"></span></div>
			</template>
		</commonHeader>

		<div class="container">
			<van-form :show-error="false" :show-error-message="false"   validate-first 
			@submit="submit"
			@failed="onFailed">
				<van-field center placeholder="请输入手机号" 
				name="username" maxlength="11"
				 :rules="[{ pattern:/^1[3-9]\d{9}$/, message: '请输入正确的手机号' }]"
				v-model="username">
					<template #left-icon>
						<span class="iconfont icon-shouji"></span>
					</template>
				</van-field>
				<van-field center placeholder="请输入验证码" 
				:rules="[{ pattern:/^\d{6}$/, message: '验证码错误'}]"
				name="vercode"  v-model="vercode">
					<template #left-icon>
						<span class="iconfont icon-mima1"></span>
					</template>
					<template #button>
						<van-button 
						class="send-btn" 
						size="mini" 
						color="#036eb8"
						@click="sendSms"
						native-type="button"
						>{{msg}}</van-button>
					</template>
				</van-field>
				
				
				<van-field center placeholder="请输入新密码" name="password"
				:rules="[{ pattern:/^\w{6,12}$/, message: '密码格式错误'}]"
				type="password" v-model="password" >
					<template #left-icon>
						<span class="iconfont icon-mima"></span>
					</template>
				</van-field>
				
				<div style="margin: 30px 30px;"><van-button round block type="primary" color="#036eb8"  size="normal" :square="true" native-type="submit">提交</van-button></div>
			</van-form>
		</div>

		<!-- /登录表单 -->
	</div>
</template>
<script>
	let timer=null  //定时器
	let time =60
	export default{
		
		data(){
			
			return{
				vercode:'',
				username:'',
				password:'',
				disabled:false, //默认可以点击
				msg:"发送验证码"
			}
		},
		methods:{
			submit(e){
				//   两种你都得会  
				console.log(e)
				
				this.$http.post('/user/forget',e)
				.then(res=>{
					console.log(res)
					if(res.code==0){
						//页面返回
						setTimeout(e=>{
							this.$toast.success('修改成功')
							this.$router.back()
						},1000)
					}else{
						this.$toast(res.msg||"修改失败")
					}
				}).catch(err=>{
					console.log(err)
				})
				
			},
			onFailed(e){
				this.$toast.fail(e.errors[0].message)
			},
			//发送短信
			sendSms(){
				if(this.disabled){
					return false
				}
				let {username}=this
				if(!/^1[3-9]\d{9}$/.test(username)){
					this.$toast('手机号格式错误')
					return
				}
				//让按钮不可点击
				this.disabled=true
				this.$http.post('/user/sendSms',{
					type:'login',mobile:username
				}).then(res=>{
					console.log(res)
					if(res.code==0){
						//提示，短息发送成功
						//倒计时  60 59 0  不能点击
						 //再次发送 可以点击
						 this.$toast("验证码已发送")
						 
						this.msg=time+"s"
						timer=setInterval(e=>{
							time--
							this.msg=time+"s"
							if(time<=0){
								clearInterval(timer)
								time=60
								this.disabled=false
								this.msg="再次发送"
							}
							
							
						},1000)
						
					}else{
						this.$toast(res.msg)
						//恢复可以点击
						this.disabled=false
					}
				}).catch(err=>{
					this.disabled=false
				})
				
				
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
