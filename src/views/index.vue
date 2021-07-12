<template>
	<div>
		<router-view></router-view>

		<van-tabbar v-model="active" active-color="#07c160" route>
			<van-tabbar-item to="/">
				<span>首页</span>
				<template #icon="props">
					<span class="iconfont icon-shouye"></span>
				</template>
			</van-tabbar-item>
			<van-tabbar-item to="/publish">
				<span>发布</span>
				<template #icon="props">
					<span class="iconfont icon-iconset0186"></span>
				</template>
			</van-tabbar-item>
			<van-tabbar-item to="/my">
				<span>我的</span>
				<template #icon="props">
					<span style="font-size: 24px;" class="iconfont icon-biaoqiankuozhan_wode-330"></span>
				</template>
			</van-tabbar-item>
		</van-tabbar>
	</div>
</template>

<script>
export default {
	data() {
		return {
			active: 0
		};
	}
};
</script>

<style></style>
