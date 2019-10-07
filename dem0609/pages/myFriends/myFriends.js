const app = getApp(),
  common = require('../lib/common.js'),
  user_id = wx.getStorageSync('user_id');
var userInfoStr = wx.getStorageSync("userInfoStr");
Page({
  data: {
    phone:"",
    has_m_user:false,
    // has_m_user:true,
    nocancel: false,
    hidden:true,
    name: "",
    avatar: "",

    statusBarHeight: app.globalData.statusBarHeight,
    statusBarHeight2: app.globalData.statusBarHeight + app.globalData.statusBarHeight
  },
  onLoad: function (options) {
    console.log("myFriends onLoad")
    const token = wx.getStorageSync('token')
    var that = this

    // let baseInfoUrl = app.BASE_URL + '/api/user/match/baseinfo'
    // app.request(baseInfoUrl, 'GET', "", res => {
    //   console.log("请求研友信息成功");
    //   console.log(res)
    //   if (res.data.match_user_id == 0) {
    //     console.log("还未匹配研友")
    //     wx.setStorageSync('has_match_user', false)
    //     that.setData({
    //       has_m_user: false,
    //       // has_m_user2:true
    //     })
    //     console.log(that.data.has_m_user)
    //   } else {
    //     console.log("已匹配研友")
    //     console.log(that.data.has_m_user)
    //     wx.setStorageSync('has_match_user', true)
    //     console.log(res)
    //     that.setData({
    //       has_m_user: true,
    //       // has_m_user2:false,
    //       name: res.data.match_user_info.name,
    //       avatar: res.data.match_user_info.avatar,
    //       phone: res.data.match_user_info.phone
    //     })
    //   }
    // }, fail => { }, { 'Authorization': 'Bearer' + token }, '')
  },
  
 
  onShow: function () { },
  delFirends: function () {
    var that = this
    this.setData({
      hidden: false,
      
    })
    //删除研友

  },
  cancel: function () {
    this.setData({
      hidden: true,
    });
  },
  confirm: function () {
    let that = this
    this.setData({
      hidden: true,
      has_m_user: false
    });
    
    const token = wx.getStorageSync('token')
    
    // let deleUrl = app.BASE_URL + '/api/user/match'
    // app.request(deleUrl, 'DELETE', "", res => {
    //   console.log(res);
    //   console.log("myFir onShow again")
      
    //   wx.showToast({
    //     title: res.data.message,
    //     icon: 'success',
    //     duration: 2000
    //   });  
    // }, fail => { }, { 'Authorization': 'Bearer' + token }, '')
  },
  recommend: function () {
    common.navTo('../recommend/recommend')
  },

  onReady: function () {

  },
  onShareAppMessage: function (ops) {//分享转发
    const user_id = wx.getStorageSync('user_id'),
      userInfoStr = wx.getStorageSync('userInfoStr'),
      nickName = userInfoStr.nickName,
      avatarUrl = userInfoStr.avatarUrl;
    if (ops.from === 'button') {
      console.log(ops.target)
    }
    return {
      title: '快！来学习啦',
      imageUrl: '../imgs/banner.png',
      path: 'pages/beInvited/beInvited?user_id=' + user_id + ' &' + 'nickName=' + nickName + ' &' + 'avatarUrl=' + avatarUrl,
      success: function (res) {},
      fail: function (res) {}
    }
  }
})