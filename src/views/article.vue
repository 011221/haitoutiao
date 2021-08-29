<template>
	<div>
		<!-- 导航栏 -->
		<commonHeader>
			<template #title>
				<div class="title">详情</div>
			</template>
			<template #back>
				<router-link tag="div" class="back" to="/">
					<span class="iconfont icon-fanhui"></span>
				</router-link>
			</template>
		</commonHeader>
		<!-- /导航栏 -->

		<div class="container" style="padding-bottom: 50px;">
			<div class="article-content" v-if="article._id">
				<div id="article_content">
					<h1 class="title">{{article.title}}</h1>
					<van-cell center class="user-info">
						<div slot="title" class="name">{{article.author}}</div>
						<van-image slot="icon" class="avatar" round fit="cover" :src="article.avatar" />
						<div slot="label" class="pubdate">{{article.time|formatTime}}</div>
						<!-- <van-button class="follow-btn" type="default" icon="plus" round size="small">已关注</van-button> -->
					</van-cell>
					<div class="markdown-body" v-html="article.content">
					
					</div>
					<div class="img_type1" v-if="article.poster_type==2" style="background: #fff;">
						<img v-for="(item,index) in article.imageSrc" :key='index' :src="item" >
					</div>
					<div class="img_type2"  v-if="article.poster_type==3" style="background: #fff;">
						<img v-for="(item,index) in article.imageSrc" :key='index' :src="item" >
					</div>
				</div>
				<!-- 文章评论列表 -->
				<div class="comment-group">
					<div class="comment-_header">
						评论：{{article.comment||0}}
					</div>
					<van-list v-model="loading" :finished="finished" finished-text="已经加载全部评论" @load="get_comment_list"
						:immediate-check="false">

						<van-cell class="comment-item" v-for="(item,index) in comment_list" :key="item._id">
							<van-image slot="icon" class="avatar" round fit="cover" :src="item.info.avatar" />
							<div slot="title">
								<div class="title-w">
									<div class="name">{{item.info.nickname||item.info.username}}</div>
									<div class="like-w" @click="comment_like(item,index)">
										<van-icon class="like-icon" :class="{liked:item.is_like}" name="good-job" />
										<span class="like-count">{{item.like_count||'赞'}}</span>
									</div>
								</div>
								<div class="content">{{item.content}}</div>
								<div class="info">
									<span class="pubdate">{{item.create_time|formatTime}}</span>
									<van-button class="reply-btn" @click="reply_content_show(item)" round size="mini">
										{{item.reply_num}} 回复
									</van-button>
								</div>
							</div>
						</van-cell>
					</van-list>
				</div>

				<!-- /文章评论列表 -->
			</div>

			<diV v-else class="skeleton">
				<van-skeleton title avatar :row="6" />
			</diV>

		</div>
		<!-- /发布评论 -->
		<div class="article-bottom">
			<van-button class="comment-btn" type="default" round size="small" @click="show_bottom_popup(0)">写评论
			</van-button>
			<van-icon name="comment-o" color="#777" :badge="article.comment" />
			<van-icon name="star" :color="article.is_fav?'#ef092c':'#777'" @click='toggle_fav' />
			<van-icon :color="article.is_like?'#ef092c':'#777'" @click='toggle_like' name="good-job" />
			<van-icon>
				<van-icon name="share" color="#777" @click="showShare = true" />
				<van-share-sheet v-model="showShare" title="立即分享给好友" :options="options" @select="onSelect" />

			</van-icon>
		</div>
		<!-- 评论回复 -->

		<van-popup v-model="show" position="bottom">
			<div class="post-comment">
				<van-field v-model="content" rows="4" autosize type="textarea" maxlength="1000" placeholder="请发表你的观点"
					show-word-limit />
				<div style="width: 100%;">
					<van-button size="large" type="primary" @click="publish">发布</van-button>
				</div>
			</div>
		</van-popup>
		<!-- /评论回复 -->
		<!-- 二级 -->
		<van-popup closeable v-model="reply_show" position="bottom" :style="{ height: '100%' }">

			<div class="reply-content_header" v-if="reply_content.reply_num>0">
				{{reply_content.reply_num}}条评论
			</div>
			<div class="reply-content_header" v-else>
				评论
			</div>
			<van-cell class="comment-item">
				<van-image slot="icon" class="avatar" round fit="cover"
					:src="reply_content.info&&reply_content.info.avatar" />
				<div slot="title">
					<div class="title-w">
						<div class="name">
							{{reply_content.info&&reply_content.info.nickname||(reply_content.info&&reply_content.info.username)}}
						</div>
						<div class="like-w" @click="reply_content_like(reply_content)">
							<van-icon class="like-icon" :class="{liked:reply_content.is_like}" name="good-job" />
							<span class="like-count">{{reply_content.like_count||'赞'}}</span>
						</div>
					</div>
					<div class="content">{{reply_content.content}}</div>
					<div class="info">
						<span class="pubdate">{{reply_content.create_time|formatTime}}</span>
					</div>
				</div>
			</van-cell>
			<div class="reply_group">
				<div class="reply_group_header">
					全部回复
				</div>
				<van-list v-model="reply_loading" :finished="reply_finished" finished-text="已经加载全部评论"
					@load="get_reply_list" :immediate-check="false">

					<van-cell class="comment-item" v-for="(item,index) in reply_list" :key="item._id">
						<van-image slot="icon" class="avatar" round fit="cover" :src="item.info.avatar" />
						<div slot="title">
							<div class="title-w">
								<div class="name">{{item.info.nickname||item.info.username}}</div>
								<div class="like-w" @click="comment_like(item,index)">
									<van-icon class="like-icon" :class="{liked:item.is_like}" name="good-job" />
									<span class="like-count">{{item.like_count||'赞'}}</span>
								</div>
							</div>
							<div class="content">{{item.content}}</div>
							<div class="info">
								<span class="pubdate">{{item.create_time|formatTime}}</span>
								<van-button class="reply-btn" @click="reply_content_show(item)" round size="mini">
									{{item.reply_num}} 回复
								</van-button>
							</div>
						</div>
					</van-cell>
				</van-list>
			</div>

			<div class="article-bottom">
				<van-button class="comment-btn" type="default" round size="small" @click="show_bottom_popup(1)">写评论
				</van-button>
			
				<van-icon :color="article.is_like?'#ef092c':'#777'" @click='toggle_like' name="good-job" />
			</div>


		</van-popup>
		<!-- 二维码 -->
		<van-popup v-model="erweima" position="top" :style="{ height:'55%' }">
			<div id="qrcode" class="qrcode"></div>
		</van-popup>
	</div>
</template>

<script>
	import '@/utils/github-markdown.css'
	import {mapState} from 'vuex'
	import {qrcanvas} from 'qrcanvas';
	import {copy,copyText} from 'clipboard-vue';
	import html2canvas from 'html2canvas'
	export default {

		data() {
			return {
				show: false,
				content: '',
				article_id: '',
				article: {},
				limit: 10,
				comment_list: [], //一级评论的数据
				loading: false, //如果是true，不加载数据
				finished: false,
				comment_type: 0, //回复类型 0代表回复文章 1代表回复评论
				reply_comment_id: '', //回复的评论ID  comment_type为1时有效
				reply_show: false,
				reply_content: {}, //接受被评论人员信息的数据 临时存储
				reply_list: [], //  回复列表数据
				reply_loading: true, //如果是true，不加载数据
				reply_finished: false,
				showShare: false,
				erweima: false,
				options: [
					{
						name: '微信',
						icon: 'wechat'
					},
					{
						name: 'QQ',
						icon: 'qq'
					},
					{
						name: '微博',
						icon: 'weibo'
					},
					{
						name: '复制链接',
						icon: 'link'
					},
					{
						name: '分享海报', 
						icon: 'poster' ,
					},
					{
						name: '二维码',
						icon: 'qrcode'
					},
				]
			}
		},
		beforeCreate() {

			this.$toast.loading({
				message: '加载中...',
				forbidClick: true,
			});
			
		},
		created() {
			let {
				article_id
			} = this.$route.query
			this.article_id = article_id
			this.get_article_detail()
			this.get_comment_list()
		},
		computed: {
			...mapState(['uid', 'userInfo'])
		},
		methods: {
			onSelect(option) {
				let {article} =this
				if (option.name == "微信") {
					this.$toast({
					  message: '主人，微信暂不支持分享哦！',
					  icon: 'like-o',
					});

				}
				if (option.name == "QQ") {
					window.open('http://connect.qq.com/widget/shareqq/index.html?url='+document.location.href+'?sharesource=qzone&title='+article.title+'&pics='+article.imageSrc[0]+'&desc=嗨头条');
				}
				if (option.name == "微博") {
					window.open('http://service.weibo.com/share/share.php?url='+document.location.href+'?sharesource=weibo&title='+article.title+'&pic='+article.imageSrc[0]+'&appkey=2706825840');
				}
				if (option.name == "复制链接") {
					// const input = document.createElement('input')
					// document.body.appendChild(input)
					// input.setAttribute('value', document.location.href)
					// input.select()
					// if (document.execCommand('copy')) {
					// 	document.execCommand('copy')
					// 	this.$toast.success('复制链接成功')
					// }
					// document.body.removeChild(input)
					
					//下载 npm i clipboard-vue -S  然后引入
					copyText(`${article.title} 详细点-${window.location.href}`).then(e=>{
						this.$toast('链接已经复制成功！')
					}).catch(e=>{
						this.$toast('复制失败啦')
					})
					
				}
				if (option.name == "分享海报") {
					// let contents = document.getElementById('article_content')
					// html2canvas(contents).then(canvas=>{
					// 	// base64编码的图片
					// 	let res =canvas.toDataURL('image/png')
					// 	console.log(res)
					this.$toast({
					  message: '主人，海报暂时不支持哦！',
					  icon: 'like-o',
					});
						
					// })
					
				}
				if (option.name == "二维码") {
					this.erweima = true;
					let that = this;
					that.$nextTick(function() {
						var canvas1 = qrcanvas({
							data: decodeURIComponent(document.location.href), //分享链接（根据需求来）
							size: 128 //二维码大小
						});
						document.getElementById("qrcode").innerHTML = '';
						document.getElementById('qrcode').appendChild(canvas1);
						that.$toast('图片已生成，长按保存分享给你的好友吧');
					})

				}
				this.showShare = false;
			},
			//给评论点赞
			comment_like(item, index) {
				console.log(item)
				let {
					uid: user_id,
					comment_list
				} = this
				if (!user_id) {
					this.$toast("请先登录")
					return
				}
				//知道他原来的状态
				let is_like = item.is_like
				let url = ''
				if (is_like) {
					url = '/api/comment_unlike'
				} else {
					url = '/api/comment_like'
				}
				this.$http.post(url, {
					comment_id: item._id,
					user_id
				}).then(res => {
					console.log(res)
					if (res.code == 0) {
						this.$toast(res.msg)
						if (res.msg == '取消点赞成功') {
							this.comment_list[index].is_like = false

						} else if (res.msg == '点赞成功') {
							this.comment_list[index].is_like = true
						}
						this.comment_list[index].like_count = res.count
					} else {
						this.$toast(res.msg)
					}
				}).catch(err => {
					console.log(err)
				})
			},
			//回复中的点赞
			reply_content_like(reply_content) {
				console.log(reply_content)
				let {
					uid: user_id
				} = this
				if (!user_id) {
					this.$toast("请先登录")
					return
				}
				//知道他原来的状态
				let is_like = reply_content.is_like
				let url = ''
				if (is_like) {
					url = '/api/comment_unlike'
				} else {
					url = '/api/comment_like'
				}
				this.$http.post(url, {
					comment_id: reply_content._id,
					user_id
				}).then(res => {
					console.log(res)
					if (res.code == 0) {
						this.$toast(res.msg)
						if (res.msg == '取消点赞成功') {
							this.reply_content.is_like = false

						} else if (res.msg == '点赞成功') {
							this.reply_content.is_like = true
						}
						this.reply_content.like_count = res.count
					} else {
						this.$toast(res.msg)
					}
				}).catch(err => {
					console.log(err)
				})
			},


			//回复弹出层
			reply_content_show(item) {
				this.reply_show = true
				this.reply_content = item
				this.reply_list = []
				this.reply_finished = false
				this.get_reply_list()

			},
			//收藏和取消收藏
			toggle_fav() {
				let {
					uid: user_id,
					article,
					article_id
				} = this
				if (!user_id) {
					this.$toast("请先登录")
					return
				}
				//知道他原来的状态
				let {
					is_fav
				} = article
				let url = ''
				if (is_fav) {
					//如果原来是收藏的，取消掉
					url = '/api/remove_fav'
				} else {
					//去收藏
					url = '/api/add_fav'
				}
				this.$http.post(url, {
					article_id,
					user_id
				}).then(res => {
					console.log(res)
					if (res.code == 0) {
						this.$toast(res.msg)
						if (res.msg == '取消收藏成功') {
							this.article.is_fav = false
						} else if (res.msg == '收藏成功') {
							this.article.is_fav = true
						}
					} else {
						this.$toast(res.msg)
					}
				}).catch(err => {
					console.log(err)
				})


			},
			//点赞和取消点赞
			toggle_like() {
				let {
					uid: user_id,
					article,
					article_id
				} = this
				if (!user_id) {
					this.$toast("请先登录")
					return
				}
				//知道他原来的状态
				let {
					is_like
				} = article
				let url = ''
				if (is_like) {
					//如果原来是收藏的，取消掉
					url = '/api/unlike'
				} else {
					//去收藏
					url = '/api/like'
				}
				this.$http.post(url, {
					article_id,
					user_id
				}).then(res => {
					console.log(res)
					if (res.code == 0) {
						this.$toast(res.msg)
						if (res.msg == '取消点赞成功') {
							this.article.is_like = false
						} else if (res.msg == '点赞成功') {
							this.article.is_like = true
						}
					} else {
						this.$toast(res.msg)
					}
				}).catch(err => {
					console.log(err)
				})
			},
			//发布
			publish() {
				let {
					uid: user_id,
					article_id,
					comment_type,
					reply_comment_id,
					content
				} = this

				if (!user_id) {
					this.$toast("请先登录")
					return
				}
				if (content.trim().length == 0) {
					this.$toast("内容不能为空")
					return
				}
				if (comment_type == 1) {
					reply_comment_id = this.reply_content._id
				}
				this.$http.post('/api/add_comment', {
					user_id,
					article_id,
					comment_type,
					reply_comment_id,
					content
				}).then(res => {
					console.log(res)
					if (res.code == 0) {
						this.content = ''
						this.show = false
						if (comment_type == 0) {
							let {
								avatar,
								nickname,
								username
							} = this.userInfo
							let obj = {
								article_id,
								comment_type,
								content,
								create_time: new Date().getTime(),
								reply_comment_id,
								reply_num: 0,
								user_id,
								_id: res.data.id,
								info: {
									avatar,
									nickname,
									username
								}
							}
							this.comment_list.unshift(obj)
							this.article.comment++;
						} else {
							this.reply_list = []
							this.reply_finished = false
							this.get_reply_list()
						}
					}
				}).catch(err => {
					console.log(err)
				})
			},
			//显示底部 输入文本域
			show_bottom_popup(type) {
				this.comment_type = type
				this.show = true
			},
			get_article_detail() {
				let {
					article_id,
					uid
				} = this
				let user_id = localStorage.getItem('uid')
				this.$http.post('/api/get_article_detail', {
					article_id,
					user_id //你的ID
				}).then(res => {
					console.log(res)
					if (res.code == 0) {
						this.article = res.data
					} else {
						this.$toast('该用户不存在')
					}
					
				}).catch(err => {
					console.log(err)
				})
			},
			get_comment_list() {
				let {
					article_id,
					limit,
					comment_list
				} = this
				let user_id = localStorage.getItem('uid')
				let skip = comment_list.length
				this.$http.post('/api/get_comment_list', {
					article_id,
					limit,
					skip,
					user_id
				}).then(res => {
					console.log(res)
					if (res.code == 0) {
						this.comment_list.push(...res.data);
						//this.comment_list=res.data
						if (this.comment_list.length >= res.count) {
							this.finished = true
						} else {
							this.loading = false
						}
					} else {
						this.$toast(res.msg)
					}
				}).catch(err => {
					console.log(err)
				})
			},
			get_reply_list() {
				let {
					reply_content,
					limit,
					reply_list,
					article_id
				} = this
				let user_id = localStorage.getItem('uid')
				let skip = reply_list.length
				this.$http.post('/api/get_reply_list', {
					reply_comment_id: reply_content._id,
					limit,
					skip,
					user_id,
					article_id
				}).then(res => {
					console.log(res)
					if (res.code == 0) {
						this.reply_list.push(...res.data);
						if (this.reply_list.length >= res.count) {
							this.reply_finished = true
						} else {
							this.reply_loading = false
						}
					} else {
						this.$toast(res.msg)
					}
				}).catch(err => {
					console.log(err)
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.reply-content_header {
		height: 50px;
		width: 100%;
		@include border;
		display: flex;
		justify-content: center;
		align-items: center;
	}

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

		.info {
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
			color: #777;
		}

		.like-icon.liked {
			color: #ef092c
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

	.comment-group {
		border-top: 1px solid #eee;
		padding-top: 20px;
		background: #fff;
		max-height: calc(100vh - 50px);
	}

	.comment-_header {
		padding: 5px 10px;
		font-size: 18px;
		@include border
	}

	.post-comment {
		padding: 14px;
		display: flex;
		align-items: center;
		flex-wrap: wrap
	}

	.skeleton {
		padding: 20px 0;
	}

	.reply_group {
		.reply_group_header {
			padding: 20px;
			border-bottom: 1px solid #ccc;

		}
	}

	.qrcode {
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 70px;
	}
	.img_type1{
		width: 100%;
		height: auto;
		img{
			width: 100%;
			height: auto;
		}
	}
	.img_type2{
		width: 100%;
		height: 75px;
		display: flex;
		overflow: hidden;
		img{
			width: 32%;
			margin-right: 2%;
		}
		}
</style>
