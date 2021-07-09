<template>
  <div class="home">

<van-nav-bar fixed placeholder >
	
	<van-button slot="title" class="search-btn" icon="search" type="info" round size="small" to="/search">搜索</van-button>
	
</van-nav-bar>




  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  data(){
	return{
	}  
  },
  components: {
  }
}
</script>

<style lang="scss" scoped="scoped">
>>>.van-nav-bar{
  background-color: #f00!important;
}

  .search-btn {
    width: 277px;
    height: 32px;
    background: #66d79d;
    border: none;
    .van-icon {
      font-size: 16px;
    }
    .van-button__text {
      font-size: 14px;
    }
  }

	
</style>
