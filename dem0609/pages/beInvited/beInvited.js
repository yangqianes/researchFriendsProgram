const app = getApp();
const appData = app.globalData;
const common = require('../lib/common.js');
var userInfoStr = wx.getStorageSync("userInfoStr");
Page({
  data: {
    src:'',
    nickName:'',
    userInfo: {},
    user_id:"",
    disabled:false,
    hasUserInfo: false,
    cannotEntery: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    statusBarHeight: app.globalData.statusBarHeight,
    statusBarHeight2: app.globalData.statusBarHeight + app.globalData.statusBarHeight
  },
 
  // getStroageSync
  onLoad:function(res){
    const that = this;
    let wxauthorization = wx.getStorageSync('wxauthorization')
    let getavatarUrl = res.avatarUrl
    let getnickName = res.nickName
    let user_id = res.user_id
    let token = wx.getStorageSync('token')
    let has_match_user = wx.getStorageSync('has_match_user')
    let w_user_id = wx.getStorageSync('user_id')
    // let isMyself = wx.getStorageSync('isMyself')

    //判断是否由邀请方打开该页面
    //待测试
    console.log("w_user_id")
    console.log(w_user_id)
    console.log(user_id)
    // console.log(isMyself)
    if (w_user_id == user_id){
      common.navTo('../index/index')
    }

    has_match_user ? that.setData({ disabled: true }) : that.setData({ disabled:false})

    this.setData({
      src: getavatarUrl,
      nickName: getnickName,
      user_id:user_id
    })
    console.log("isNotToken?1")
    console.log(token)
    if (!token) {
      console.log("no token")
      this.setData({
        hasUserInfo: false,
        cannotEntery: true,
      })
    }
  },
  onshow:function(){
    // console.log("beInvited onShow")
    // let token = wx.getStorageSync('token');
    // console.log(token)
    // if(!token){
    //   this.setData({
    //     hasUserInfo: false,
    //     cannotEntery: false,
    //   })
    // }



    // var userEnter = wx.getStorageSync('userEnter')
    // //判断是否授权进入小程序
    // userEnter ? this.setData({ cannotEntery: false }) : this.setData({ cannotEntery: true})
  },
  bindGetUserInfo(e) {
    // 查看是否授权
    var that = this;
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function (res) {
              wx.setStorageSync("userInfoStr", res.userInfo)
              wx.login({
                success(res) {
                  let resCode = res.code
                  console.log(resCode);
                  if (resCode) {
                    //发起网络请求
                    let nicN = userInfoStr.nickName,
                      nicA = userInfoStr.avatarUrl,
                      authorizeUrl = app.BASE_URL + '/api/weapp/authorizations',
                      authorizeData = { code: resCode, nickName: nicN, avatar: nicA }
                    console.log(nicN)
                    console.log(nicA)
                    app.request(authorizeUrl, 'POST', authorizeData, res => {
                      wx.setStorageSync('token', res.data.access_token)
                      console.log("isNotToken?2")
                      console.log(res.data.access_token)
                      if (getavatarUrl && getnickName) {
                        that.setData({
                          src: getavatarUrl,
                          nickName: getnickName
                        })
                      }


                    }, res => { }, '', '')
                    that.onLoad()
                  } else {
                    console.log('登录失败！' + res.errMsg)
                  }
                }
              })
            }
          })
          wx.setStorageSync("userEnter", true)
          that.setData({
            cannotEntery: false,
          })
        } else {
          console.log("用户拒绝登录")
        }
      }
    })
  },
  beFriends:function(res){
    const that = this,
          token = wx.getStorageSync('token'),
          beFriendsUrl = app.BASE_URL + '/api/user/match',
          beFriendsData = { user2_id: that.data.user_id }
    app.request(beFriendsUrl, 'POST', beFriendsData, res => {
      // console.log("邀请成为好友")
      wx.showToast({
        title: res.data.message,
        icon: 'none',
        duration: 1500
      });
      console.log(res)
      console.log("beFriends")
      console.log(res.data.message);
      common.navTo('../clockIn/clockIn')
     
      // wx.setStorageSync('token', res.data.access_token)
      // console.log("isNotToken?3")
      // console.log(res.data.access_token)
      // common.navTo('../clockIn/clockIn') 
    }, res => {}, { 'Authorization': 'Bearer ' + token }, '')
  },
  refuse:function(){
    const that = this,
      token = wx.getStorageSync('token'),
      refuseUrl = app.BASE_URL + '/api/user/awaitmatch?user_id=' + that.data.user_id,
      refuseData = { user_id: that.data.user_id }
    app.request(refuseUrl, 'DELETE', refuseData, res => {
      console.log(res)
      // wx.showToast({
      //   title: "拒绝邀请",
      //   icon: 'none',
      //   duration: 1500
      // });
      common.navTo('../index/index') 
    }, res => {}, { 'Authorization': 'Bearer ' + token }, '')
  }
})