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
		<input
		    type="file"
		    hidden
		    accept="image/*"
		    ref="file"
		  >
		  <!-- /导航栏 -->
		  <van-cell title="头像"  center >
		    <van-image
		      width="50"
		      height="50"
		      round
		      fit="cover"
		      src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fupload-images.jianshu.io%2Fupload_images%2F15812333-1a95d3530e01ef61.jpg&refer=http%3A%2F%2Fupload-images.jianshu.io&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1628570323&t=6a254af126fdd0467239aefd9e78e33d"
		    />
		  </van-cell>
		  <van-cell
		    title="昵称"
		    is-link
		    value=""
		
		  />
		  <van-cell
		    title="性别"
		    is-link
		    value=""
		
		  />
		  <van-cell
		    title="生日"
		    is-link
		    value=""
		  />
<div style="margin: 30px 50px;"><van-button round block type="primary" size="normal" :square="true" native-type="submit">确定</van-button></div>
	</div>

  </div>
</template>

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
