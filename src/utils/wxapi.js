
import wx from 'weixin-js-sdk'
import http from '../public/http' // http是自己封装的axios
const wxApi = {
  wxRegister (callback) {
    // http之所以没有传参是后端直接写参数都写死了，一般会有url：window.location.href.split('#')[0]，可以根据自身需要去改变
    http({method: 'POST', url: '/web/hodge/wxConfig/wxShare'}).then(res => {
      // console.log(res)
      let data = res.data
      if (data.result === 1) {
        let config = data.data
        // config.debug = true
        config.jsApiList = ['updateAppMessageShareData', 'updateTimelineShareData'] // 需要使用的JS接口列表
        wx.config(config)
        wx.ready(() => {
          if (callback) callback()
        })
      }
    }).catch((err) => {
      console.log(err)
    })
  },
  shareAppMessage (option) { // 分享朋友
    wx.updateAppMessageShareData({ 
      title: option.title, // 分享标题
      desc: option.desc, // 分享描述
      link: option.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl: option.imgUrl || 'https://images.ktpis.com/app_logo_new_new.png', // 分享图标
      success () {
        if (option.success) option.success()
        // 设置成功
      }
    })
  },
  shareTimeline (option) { // 分享朋友圈
    wx.updateTimelineShareData({ 
      title: option.title, // 分享标题
      link: option.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl: option.imgUrl || 'https://images.ktpis.com/app_logo_new_new.png', // 分享图标
      success () {
        if (option.success) option.success()
        // 设置成功
      }
    })
  }
}

export default wxApi

