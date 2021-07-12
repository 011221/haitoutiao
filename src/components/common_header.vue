<template>
	<div class="common_header">
		<slot name="back"></slot>
		<slot name="search"></slot>
		<slot name="title"></slot>
	</div>
</template>

<script>
</script>

<style lang="scss">
	.common_header{
		width: 100%;
		height: 46px;
		position: fixed;
		top: 0;
		left: 0;
		background: $color;
		z-index: 999;
		.title{
			width: 70%;
			height: 46px;
			text-align: center;
			line-height: 46px;
			color: #fff;
			margin-left: 15%;
		}
		.back{
			position: absolute;
			left: 10px;
			color: #fff;
			height: 46px;
			line-height: 46px;
			font-weight: bold;
		}
		
	}
	
</style>
