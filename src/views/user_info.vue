<template>
	<div class="user-profile">
		<!-- 导航栏 -->
		<commonHeader>
			<template #title>
				<div class="title">个人中心</div>
			</template>
			<template #back>
				<div class="back" @click="$router.back()">
					<span class="iconfont icon-fanhui"></span>
				</div>
			</template>
		</commonHeader>

		<div class="container">

			<!-- /导航栏 -->
			<van-cell title="头像" center>
				<van-image width="50" height="50" round fit="cover" :src="userInfo.avatar" />
				<van-uploader :after-read="afterRead" style="position: absolute;right: 0;opacity: 0;"/>
			</van-cell>
			<van-cell title="昵称">
				<van-field v-model="userInfo.nickname" maxlength="10" placeholder="请输入昵称" input-align="right" />
			</van-cell>


			<van-cell title="性别" is-link :value="userInfo.sex" @click="sex_show=true" />
			<van-popup v-model="sex_show" position="bottom" :style="{height:'50%'}">
				<van-picker title="请选择" show-toolbar :columns="columns" @confirm="onConfirm" @cancel="sex_show=false" />

			</van-popup>



			<van-cell title="生日" is-link :value="userInfo.birthday" @click='birthday_show=true' />
			<van-popup v-model="birthday_show" position="bottom" :style="{height:'50%'}">
				<van-datetime-picker v-model="currentDate" @confirm="data_confirm" @cancel="birthday_show=false"
					type="date" title="选择年月日" :min-date="minDate" :max-date="maxDate" />

			</van-popup>



			<div style="margin: 30px 50px;">
				<van-button round block type="primary" color="#036eb8" size="normal" :square="true" @click='submit'>确定</van-button>
			</div>
		</div>

	</div>
</template>
<script>
	import {mapState,mapMutations} from 'vuex'
	export default {
		data() {
			return {
				userInfo:{},
				sex_show: false,
				columns: ['男', '女'],
				birthday_show: false,
				minDate: new Date(1920, 0, 1),
				maxDate: new Date(2025, 7, 1),
				currentDate: '',
				file:{}
			}
		},
		created() {
			//请求接口
			let userInfo = this.$store.state.userInfo;
			userInfo = JSON.parse(JSON.stringify(userInfo))
			
			//引用数据类型的关联  深拷贝一下，去掉他们的关联
			this.userInfo = userInfo;
			
			

			this.currentDate = userInfo.birthday?new Date(userInfo.birthday):new Date(2001, 0, 17)
		},
		computed: {
			...mapState(['token','uid']),
			store_userInfo(){
				return this.$store.state.userInfo
			}
		},
		methods: {
			onConfirm(e) {
				console.log(e)
				this.userInfo.sex = e;
				this.sex_show = false
				console.log(this.userInfo)

			},
			data_confirm(e) {
				console.log(e)
				console.log(this.$date(e.getTime(), 'Y-m-d'))
				this.userInfo.birthday = this.$date(e.getTime(), 'Y-m-d')



				this.birthday_show = false
			},
			afterRead(e) {
				// 此时可以自行将文件上传至服务器
				// console.log(e);
				// console.log(e.content)
				//提交时在上传
				this.file=e.file
				this.userInfo.avatar=e.content
				this.$forceUpdate()
				
				
				
				
				//更换了图片直接上传
				// let formdata= new FormData()
				// formdata.append('file',e.file)
				
				// this.$http.post('https://node.yumesekai.cn/api/upImage',formdata).then(res=>{
				// 	console.log(res)
				// 	if(res.code==0){
				// 		this.userInfo.avatar=res.url
				// 		this.$forceUpdate()
				// 	}
				// }).catch(err=>{
				// 	console.log(err)
				// })
				
			},
		async submit() {
                 let {file,userInfo}=this
                 if(file.name){
					 //开始上传
					this.$toast.loading({
						 message:'上传中...',
						 forbidClick:true
					 })
					 
					 
					 let formdata= new FormData()
					 formdata.append('file',file)
					 
					let  res= await this.$http.post('https://node.yumesekai.cn/api/upImage',formdata);
					this.userInfo.avatar=res.url
				 }
                 // console.log(this.userInfo)
                 this.$http.post('/user/editUserInfo',{
                 	...this.userInfo,
                 	uid:this.uid
                 }).then(res=>{
                 	console.log(res)
					if(res.code==0){
						this.$toast.success('修改成功')
						setTimeout(e=>{
							this.$router.back();
							
							//store_userInfo vuex 老数据
							//userInfo  新数据
							
						   let obj =Object.assign(this.store_userInfo,this.userInfo)
							this.$store.commit('CHANGE_DATA',{name:'userInfo',val:obj})
							
							// this.$store.dispatch('GET_USER_INFO',token)
						},500)
					}
					
					
                 })
			}
			


		}
	}
</script>

<style scoped lang="scss">
	.van-popup {
		background-color: #f5f7f9;
	}

	.update-photo-popup {
		background-color: #000;
	}

	.name-field-wrap {
		padding: 10px;
	}

	.update-photo {
		height: 100%;
	}

	.van-field {
		padding: 0;
	}

	.toolbar {
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: #000;
	}

	/* Ensure the size of the image fit the container perfectly */
	.image {
		display: block;

		/* This rule is very important, please don't ignore this */
		max-width: 100%;
	}
</style>
