<template>
  <div class="home">

<van-nav-bar :fixed="true" class="aaa">
	  <template #title>
           <div class="search-btn">
		   </div>
	  </template>
</van-nav-bar>




  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  data(){
	return{
		value:'1'
	}  
  },
  components: {
  }
}
</script>

<style lang="scss" scoped>
.van-nav-bar{
  background-color: $color;
  ::v-deep .van-nav-bar__title{
  	width: 100%;
  }
}

  .search-btn {
    width: 100%;
    height: 32px;
    background: #66d79d;
    border: none;
	border-radius: 32px;
    .van-icon {
      font-size: 16px;
    }
    .van-button__text {
      font-size: 14px;
    }
  }

	
</style>
