<template>
  <div class="container" style="padding-top: 0;">
    <van-cell-group  class="my-info" v-if="is_login">
      <van-cell
        class="base-info"
        center
        :border="false"
		style="height: 180px;"
      >
        <van-image
          class="avatar"
          slot="icon"
          round
          fit="cover"
          :src="userInfo.avatar"
        />
        <div class="name" slot="title">{{userInfo.nickname||userInfo.username}}</div>
        <van-button
          class="update-btn"
          size="small"
          round
          to="/user_info"
        >编辑资料</van-button>
      </van-cell>
      <!-- <van-grid class="data-info" :border="false" column-num="2">
        <van-grid-item class="data-info-item">
          <div slot="text" class="text-wrap">
            <div class="count">1</div>
            <div class="text">头条</div>
          </div>
        </van-grid-item>
        <van-grid-item class="data-info-item">
          <div class="text-wrap" slot="text">
            <div class="count">3</div>
            <div class="text">获赞</div>
          </div>
        </van-grid-item>
      </van-grid> -->
    </van-cell-group>

    <router-link tag="div" to="/login"  class="not-login" v-else>
      <div >
        <img class="mobile" src="~@/assets/tel.png">
      </div>
      <div class="text">登录 / 注册</div>
    </router-link>

    <van-grid class="nav-grid mb-4" :column-num="2">
	  
	    <router-link tag='van-grid-item' to='/collect'  class="nav-grid-item">
			
	     <span class="iconfont icon-shoucang2"></span>
		 <span>收藏</span>
	    </router-link>
		<router-link tag='van-grid-item' to='/zan'  class="nav-grid-item">
	     <span class="iconfont icon-dianzan2"></span>
		 <span>点赞</span>
	    </router-link>
    </van-grid>
    <van-cell title="修改密码" is-link to="/revise" />
    <van-cell title="联系我们" is-link to="/phone" />
    <van-cell
      class="mb-4"
      title="关于我们"
      is-link
      to="/about"
    />
    <van-cell
	  v-if="is_login" 
      class="logout-cell"
      title="退出登录"
	  @click='logout'
    />
  </div>
</template>

<script>
	//登陆状态维护
	//判断有没有token，token是否过期，没过期请求用户数据
	//路由守卫
	//辅助函数
	import {mapState,mapMutations} from 'vuex'
	
	
	export default{
		
		data(){
			return{
			}
		},
		computed:{
			is_login(){
				return !!this.$store.state.uid  //如果有
			},
			// userInfo(){
			// 	return this.$store.state.userInfo
			// },
			...mapState(['userInfo','uid'])
		},
		created(){
			
		},
		methods:{
			...mapMutations(['LOG_OUT']),
			logout(){
				this.$dialog.confirm({
				  title: '你确定退出登录吗？',
				  message: '',
				})
				  .then(() => {
				    // on confirm
					// this.$store.commit('LOG_OUT')
					this.LOG_OUT()
				  })
				  .catch(() => {
				    // on cancel
				  });
			},
			go(){
				console.log(4)
			}
		}
		
	}

</script>

<style  lang="scss">
.container {
  .my-info {
     background: url("~@/assets/bg01.png") no-repeat;
    background-size: cover;
    .base-info {
      box-sizing: border-box;
      height: 115px;
      background-color: unset;
      padding-top: 38px;
      padding-bottom: 11px;
      .avatar {
        box-sizing: border-box;
        width: 66px;
        height: 66px;
        border: 1px solid #fff;
        margin-right: 11px;
      }
      .name {
        font-size: 15px;
        color: #fff;
      }
      .update-btn {
        height: 24px;
        font-size: 12px;
        color: #666666;
		line-height: 24px;
		
      }
    }
    .data-info {
      .data-info-item {
        height: 65px;
        color: #fff;
        .text-wrap {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          .count {
            font-size: 18px;
          }
          .text {
            font-size: 11px;
          }
        }
      }
    }
     .van-grid-item__content {
      background-color: unset;
    }
  }
.icon-dianzan2{
	color: #eb5253;
	font-weight: bold;
}
  .not-login {
    height: 180px;
    background: url("~@/assets/bg01.png") no-repeat;
    background-size: cover;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .mobile {
      width: 66px;
      height: 66px;
    }
    .text {
      font-size: 14px;
      color: #fff;
    }
  }

   .nav-grid {
    .nav-grid-item {
      height: 70px;
      .iconfont {
        font-size: 22px;
		margin-bottom: 5px;
      }
      .icon-shoucang2 {
        color: #eb5253;
		font-weight: bold;
      }
      .icon-lishi {
        color: #ff9d1d;
      }
      .van-grid-item__text {
        font-size: 14px;
        color: #333333;
      }
    }
  }

  .logout-cell {
    text-align: center;
    color: #d86262;
  }
  .mb-4 {
    margin-bottom: 4px;
  }
}
</style>
