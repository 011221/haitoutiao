<template>
  <div >
    <!-- 导航栏 -->
	<commonHeader>
		<template #title>
			<div class="title">详情</div>
		</template>
		<template #back>
			<div class="back" @click="$router.back()">
				<span class="iconfont icon-fanhui"></span>
			</div>
		</template>
	</commonHeader>
    <!-- /导航栏 -->

<div class="container">
	<div class="article-content">
	  <h1 class="title">关键时刻，莫迪受重挫</h1>
	  <van-cell center class="user-info">
	    <div slot="title" class="name">作者</div>
	    <van-image slot="icon" class="avatar" round fit="cover" src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fupload-images.jianshu.io%2Fupload_images%2F15812333-1a95d3530e01ef61.jpg&refer=http%3A%2F%2Fupload-images.jianshu.io&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1628570323&t=6a254af126fdd0467239aefd9e78e33d" />
	    <div slot="label" class="pubdate">2021-12-2</div>
	    <van-button class="follow-btn" type="default" icon="plus" round size="small">已关注</van-button>
	  </van-cell>
	  <div class="markdown-body">
	    在新冠疫情肆虐的印度，总理莫迪面临新的政治麻烦。 据英国《卫报》报道 ，印度总理莫迪在关键的西孟加拉邦选举中遭遇罕见的政治失败。有迹象表明选民对他处理新冠疫情的做法不满。
	    报道称，5月2日，莫迪所在的印度人民党未能取得西孟加拉邦的选举胜利。强大的地区政治家、著名的莫迪批评者马马塔班纳吉赢得第三个首席部长任期。班纳吉的党，在294个席位的议会中斩获216个席位，轻松拿下多数席位。印度人民党只得到75个席位，表现虽好于2016年，但远低于预测。
	    西孟加拉邦是印度人民党未能掌控议会多数席位的少数几个邦之一。外界原本预计莫迪会在此次选举取得重大突破。要知道，莫迪十分重视西孟加拉邦的选举，疫情期间多次参加竞选活动，发表了数十次演讲。最近一次是上周末，与内政部长阿米特沙阿齐赴西孟加拉邦。两人都被指无视疫情，只顾选举政治。
	    之前，科学家们警告说印度第二波疫情蓄势待发，但莫迪在2月和3月期间，在西孟加拉邦的大型集会上发表讲话。他拒绝戴口罩，也没有保持社交距离的意思。最近几周，西孟加拉邦选举几乎是莫迪政府的工作重心。批评者还说，3月和4月期间，莫迪政府允许数百万基本不戴面具的人参加5个邦的宗教节日和拥挤的政治集会。从那时起，这些邦的日确诊病例激增。
	    另据官方数据，截至2日，印度新增病例略有下降，但仍有创纪录的3689例新死亡病例。悲剧继续上演，人们在医院走廊、道路上和家中无助地死亡。停车场变成火葬场，绝望的人们拼命寻找药品和氧气。当局报告了392488个新病例，目前总病例1956万。据官方数字，该病毒已造成215542人死亡。据估计，实际死亡人数比这一数字高两到五倍。
	    报道称，这次选举是西孟加拉邦历史上最漫长的一次。早先反对党建议，疫情期间缩短投票时间，并将选举活动转到网上，但由印度人民党控制的选举委员会拒绝了该提议。在首府加尔各答，一些实验室称，检测结果显示新冠阳性比例高达50%。
	    莫迪未能夺取孟加拉，原因跟他处理疫情不力有关。
	    当天，专栏作家斯瓦迪查图尔维第在新德里电视台网站撰文评论：“印人党并非一股不可阻挡的力量。它可以被一个根基强固的地区领导人打败。政治钟摆现在正离开印度人民党。中央政府对汹涌疫情的糟糕处理及其悲剧性的缺氧将使莫迪付出代价。”
	  </div>
	  <!-- 文章评论列表 -->
	  <van-cell class="comment-item">
	    <van-image
	      slot="icon"
	      class="avatar"
	      round
	      fit="cover"
	      src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fupload-images.jianshu.io%2Fupload_images%2F15812333-1a95d3530e01ef61.jpg&refer=http%3A%2F%2Fupload-images.jianshu.io&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1628570323&t=6a254af126fdd0467239aefd9e78e33d"
	    />
	    <div slot="title">
	      <div class="title-w">
	        <div class="name">小张</div>
	        <div class="like-w">
	          <van-icon class="like-icon liked"  name="good-job" />
	          <span class="like-count">21</span>
	        </div>
	      </div>
	      <div class="content">不错</div>
	      <div class="info">
	        <span class="pubdate">2021-05-12</span>
	        <van-button class="reply-btn" round size="mini">3 回复</van-button>
	      </div>
	    </div>
	  </van-cell>
	  <!-- /文章评论列表 -->
	</div>
	
</div>
    <!-- /发布评论 -->
    <div class="article-bottom">
      <van-button
        class="comment-btn"
        type="default"
        round
        size="small"
      >写评论</van-button>
      <van-icon
        name="comment-o"
        color="#777"
      />
      <van-icon
        name="star"
		 color="#777"
      />
      <van-icon
        color="#777"
        name="good-job"
      />
      <van-icon name="share" color="#777777"></van-icon>
    </div>
    <!-- 评论回复 -->

    <van-popup v-model="show" position="bottom">
      <div class="post-comment">
        <van-field
          v-model="value"
          rows="4"
          autosize
          type="textarea"
          maxlength="1000"
          placeholder="请输入留言"
          show-word-limit
        />
		<div style="width: 100%;">
		  <van-button
		  size="large"
			 type="primary"
		  >发布</van-button>
		</div>
      </div>
    </van-popup>
    <!-- /评论回复 -->
  </div>
</template>

<script>
import '@/utils/github-markdown.css'
export default {

  data () {
    return {
      show: false,
      value: ''
    }
  }
}
</script>

<style scoped lang="scss">
.article-content {
  overflow-y: auto;
  padding-bottom: 44px;
  .title {
    font-size: 20px;
    color: #3a3a3a;
    padding: 24px 20px 18px;
    background-color: #fff;
    margin: 0;
  }
}



.user-info {
  .avatar {
    width: 35px;
    height: 35px;
    margin-right: 8px;
  }
  .name {
    font-size: 12px;
    color: #333333;
  }
  .pubdate {
    font-size: 11px;
    color: #b4b4b4;
  }
  .follow-btn {
    width: 85px;
    height: 29px;
  }
}

ul {
  list-style: unset;
}

.markdown-body {
  padding: 14px;
  background-color: #fff;
}

.article-bottom {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  box-sizing: border-box;
  height: 44px;
  border-top: 1px solid #d8d8d8;
  background-color: #fff;
  .comment-btn {
    width: 141px;
    height: 23px;
    border: 1px solid #eeeeee;
    font-size: 15px;
    line-height: 23px;
    color: #a7a7a7;
  }
  .van-icon {
    font-size: 20px;
    .van-info {
      font-size: 11px;
      background-color: #e22829;
    }
  }
}
.comment-item {
  .avatar {
    width: 36px;
    height: 36px;
    margin-right: 13px;
  }
  .name {
    font-size: 16px;
    color: #555;
  }
  .content {
    font-size: 16px;
    color: #222222;
	margin: 10px 0;
  }
  .info{
	  display: flex;
	  height: 36px;
	  align-items: center;
  }
  .pubdate {
    font-size: 12px;
    margin-right: 12px;
  }
  .title-w {
    display: flex;
    justify-content: space-between;
	height: 36px;
	align-items: center;
  }
  .like-w {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .like-icon.liked {
    color:#ef092c
  }
}

.article-bottom {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  box-sizing: border-box;
  height: 44px;
  border-top: 1px solid #d8d8d8;
  background-color: #fff;
  .comment-btn {
    width: 200px;
    height: 30px;
    border: 1px solid #eeeeee;
    font-size: 15px;
    line-height: 23px;
    color: #a7a7a7;
  }
}

.post-comment {
  padding: 14px;
  display: flex;
  align-items: center;
  flex-wrap:wrap
}
</style>
