<template>
  <div class="search-container">

    <form action="/">
      <van-search
          v-model="key_word"
          show-action
          placeholder="请输入搜索关键词"
          @search="onSearch"
		  @cancel="onCancel"
      >
	   <template #action>
	      <div @click="onCancel">取消</div>
	    </template>
	  </van-search>
    </form>

    <!-- 历史记录 -->
  <div class="search-history">
    <van-cell
      title="搜索历史"
    >
      <div class="search-history_right">

        <span @click="clear">全部删除 <van-icon name="delete"/></span>
       <!-- &nbsp;&nbsp;
        <span>完成</span> -->
      </div>
      
    </van-cell>
	<div>
		<van-cell @click="navTo(item)" v-for="(item,index) in searchList" :key="item" :title="item">
            <van-icon @click.stop="del_history(index)" name="close"/>
        </van-cell>
	</div>
    
  </div>
    <!-- /历史记录 -->
  </div>
</template>
<script>
	export default{
		data(){
			return{
				key_word:'',
				searchList:[]
			}
		},
		created(){
			let searchList=localStorage.getItem('searchList')
			searchList=searchList?JSON.parse(searchList):[],
			this.searchList=searchList
		},
		// beforeRouteLeave(to,from,next) {
		// 	localStorage.setItem('searchList',JSON.stringify(this.searchList))
		// 	next()
		// },
		methods:{
			onCancel(){
				this.$router.push('/')
			},
			onSearch(e){
				console.log(this.key_word)
				//搜一个存一个
				let index=this.searchList.findIndex(v=>{
					return v==this.key_word
				})//去重
				if(index>=0){
					this.searchList.splice(index,1)
				} 
				this.searchList.unshift(this.key_word)
				localStorage.setItem('searchList',JSON.stringify(this.searchList))
				
				this.$router.push('/history?key_word='+this.key_word)
				
				
				
				
				
			},
			navTo(key_word){
				this.$router.push('/history?key_word='+key_word)
			},
			del_history(index){
				this.searchList.splice(index,1)
				localStorage.setItem('searchList',JSON.stringify(this.searchList))
			},
			clear(){
				this.$dialog.confirm({
				  title: '确定全部删除吗？'
				})
				  .then(() => {
					this.searchList=[]
				    localStorage.setItem('searchList',JSON.stringify(this.searchList))
				  })
				  .catch(() => {
				    // on cancel
				  });
				
			}
		}
	}
</script>

<style  lang="scss">

  .search-result {
    position: fixed;
    left: 0;
    right: 0;
    top: 54px;
    bottom: 0;
    overflow-y: auto;
  }
  .search-history_right span{
	  display: flex;
	  align-items: center;
	  justify-content: flex-end;
  }
</style>
