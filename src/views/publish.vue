<template>
	<div class="publish">
		<commonHeader>
			<template #title>
				<div class="title">发布</div>
			</template>
		</commonHeader>

		<div class="container">
			<van-form validate-first @failed="onFailed">
				<!-- 通过 pattern 进行正则校验 -->
				<van-field
					style="margin-top: 10px;"
					v-model="title"
					name="pattern"
					placeholder="请输入标题"
					:rules="[{ pattern: /\.{6,}/, message: '至少6个字符' }]"
				/>

				<van-field readonly clickable name="picker" :value="value"  placeholder="请选择" @click="showPicker = true" />
				<van-popup v-model="showPicker" position="bottom"><van-picker show-toolbar :columns="columns" @confirm="onConfirm" @cancel="showPicker = false" /></van-popup>

				<van-field
					style="margin-top: 10px;"
					v-model="content"
					rows="5"
					autosize
					type="textarea"
					:rules="[{ pattern: /[\w\W]{20,}/, message: '至少20个字符' }]"
					placeholder="请输入内容"
					show-word-limit
				/>
				<van-field name="uploader" style="margin-top: 10px;">
					<template #input>
						<van-uploader v-model="fileList" multiple :max-count="3" />
					</template>
				</van-field>

				<div style="margin: 30px 50px;"><van-button round block type="primary" size="normal" :square="true" native-type="submit">提交</van-button></div>
			</van-form>
		</div>
	</div>
</template>

<script>
import { Toast } from 'vant';

export default {
	data() {
		return {
			title: '',
			content: '',
			fileList: [],
			value: '',
			columns: ['本地头条', '招聘求职'],
			showPicker: false
		};
	},
	methods: {
		onFailed(errorInfo) {
			console.log('failed', errorInfo);
		},
		onConfirm(value) {
			this.value = value;
			this.showPicker = false;
		}
	}
};
</script>
<style lang="scss">
h1 {
	color: $color;
}
</style>
