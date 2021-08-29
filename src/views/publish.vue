<template>
	<div class="publish">
		<commonHeader>
			<template #title>
				<div class="title">发布</div>
			</template>
		</commonHeader>

		<div class="container">
			<van-form :show-error="false" :show-error-message="false"   validate-first 
			@submit="submit"
			@failed="onFailed">
				<!-- 通过 pattern 进行正则校验 -->
				<van-field
					style="margin-top: 10px;"
					v-model="title"
					name="title"
					placeholder="请输入标题"
					:rules="[{ pattern: /.{4,}/, message: '提交至少4个字符' }]"
				/>

				<van-field readonly clickable 
				:rules="[{ pattern: /./, message: '请选择分类' }]" 
				name="cate_name" :value="cate_name"  placeholder="请选择" @click="showPicker = true" />
				<van-popup v-model="showPicker" position="bottom"><van-picker show-toolbar
				 value-key="name"
				 :columns="columns" @confirm="onConfirm" @cancel="showPicker = false" /></van-popup>

				<van-field
					style="margin-top: 10px;"
					v-model="content"
					rows="5"
					autosize
					type="textarea"
					name="content"
					:rules="[{ pattern: /[\w\W]{10,}/, message: '内容至少10个字符' }]"
					placeholder="请输入内容"
					show-word-limit
				/>
				<van-field name="uploader" style="margin-top: 10px;">
					<template #input>
						<van-uploader v-model="fileList" multiple :max-count="3" />
					</template>
				</van-field>

				<div style="margin: 30px 50px;"><van-button round block type="primary" color="#036eb8" size="normal" :square="true" native-type="submit">提交</van-button></div>
			</van-form>
		</div>
	</div>
</template>

<script>
import { Toast } from 'vant';
import {mapState} from 'vuex'
export default {
	data() {
		return {
			fileList: [],
			cate_name: '',
			columns: [],
			showPicker: false,
			cate_id:'',
			title:'',
			content:''
		};
	},
	computed:{
		...mapState(['uid','userInfo'])
	 },
	created() {
		let cate =localStorage.getItem("toutiao_cate")
		
		if(cate){
			this.columns =JSON.parse(cate)
		}else{
			this.$http.post('/api/get_cate_list')
				.then(res=>{
					console.log(res)
					if(res.code==0){
						this.columns = res.data;
						localStorage.setItem('toutiao_cate',JSON.stringify(res.data))
					}
					
				}).catch(err=>{
					console.log(err)
				})
		}
		
	},
	methods: {
		onFailed(errorInfo) {
			console.log('failed', errorInfo);
			this.$toast.fail(errorInfo.errors[0].message)
		},
		onConfirm(value) {
			this.cate_name = value.name;
			this.cate_id = value._id;
			this.showPicker = false;
		},
		async submit(e){
			console.log(e)
			//一个是传了图片
			let imageSrc=[];
			let {cate_id,uid,userInfo}=this
			if(!uid){
				this.$toast('请先登录')
				this.$router.push('/login')
				return
			}
			
			
			if(e.uploader.length>0){
				let formdata =new FormData()
				
				e.uploader.forEach(v=>{
					formdata.append('file',v.file)
				})
				formdata.append('title',e.title)
				let res=await this.$http.post('http://81.70.99.163:8000/common/upload',formdata)
				console.log(res)
				imageSrc = res.split(',').map(v=>{
					return 'http://81.70.99.163:8000'+v
				})
				
			}
			//一个是没传图片
			
			delete e.Uploader
			
			this.$http.post('/api/add_article',{
				...e,cate_id,author:userInfo.nickname||userInfo.username,author_id:uid,imageSrc
			}).then(res=>{
				console.log(res)
			}).catch(err=>{
				console.log(err)
			})
			
			this.$toast.success("发布成功")
			this.$router.push('/')
		}
	}
};
</script>
<style lang="scss">
h1 {
	color: $color;
}
</style>
