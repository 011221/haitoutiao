<template>
  <div id="app">
	  <!-- keep-alive这种虚拟组件上  不能加  if else-->
     <keep-alive>  <!-- 缓存返回不会丢失 -->
          <router-view v-if="$route.meta&&$route.meta.keepAlive"></router-view>
	 </keep-alive>
	 <router-view v-if="!($route.meta&&$route.meta.keepAlive)"></router-view>
  </div>
</template>

<script type="text/javascript">

</script>
<style lang="scss">
	// @import 'http://at.alicdn.com/t/font_2663462_ikh0zvv36ei.css';
		@import './assets/fonts/iconfont.css';
	.iconfont{font-size: 16px;}
	* {
		margin: 0;
		padding: 0;
		font-size: 14px;
	}
	html,
	body {
		-webkit-user-select: none; /* 禁止选中文本（如无文本选中需求，此为必选项） */
		user-select: none;
	}
	
	a,
	img {
		-webkit-touch-callout: none; /* 禁止长按链接与图片弹出菜单 */
	}
	
	body,
	input,
	select,
	button {
		font: 1.2rem normal 'Helvetica Neue', Helvetica, STHeiTi, sans-serif;
	}
	h1 {
		font-size: 1.8rem; /* 18px / 12px = 1.5 */
	}
	h2 {
		font-size: 1.6rem;
	}
	h3 {
		font-size: 1.4rem;
	}
	h4,
	h5,
	h6 {
		font-size: 100%;
	}
	address,
	cite,
	dfn,
	em,
	var {
		font-style: normal;
	} /* 将斜体扶正 */
	code,
	kbd,
	pre,
	samp,
	tt {
		font-family: 'Courier New', Courier, monospace;
	} /* 统一等宽字体 */
	small {
		font-size: 1rem;
	} /* 小于 12px 的中文很难阅读，让 small 正常化 */
	
	body, h1, h2, h3, h4, h5, h6, hr, p, blockquote,
	        dl, dt, dd, ul, ol, li, pre, /* text formatting elements 文本格式元素 */
	        fieldset, lengend, button, input, textarea, /* form elements 表单元素 */
	        th, td {
		margin: 0;
		padding: 0;
	}
	input,
	button,
	select,
	img {
		margin: 0;
		line-height: normal;
	}
	select {
		padding: 1px;
	}
	ul,
	ol {
		list-style: none;
	}
	select,
	input,
	button,
	button img,
	label {
		vertical-align: middle;
	}
	header,
	footer,
	section,
	aside,
	nav,
	hgroup,
	figure,
	figcaption {
		display: block;
		margin: 0;
		padding: 0;
		border: none;
	} /*HTML5标签变块级*/
	a {
		text-decoration: none;
	} /*重置链接下划线*/
	input {
		-webkit-box-shadow: 0 0 0 1000px white inset;
	}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: rgba(245,247,249,1);
  min-height: 100vh;
}

.container{
	width: 100%;
	height:100%;
	padding-top: 46px;
}


</style>
