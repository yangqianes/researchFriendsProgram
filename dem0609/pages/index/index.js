const app = getApp(),
  common = require('../lib/common.js'),
  countTime = require('../../utils/countTime.js'),
  my_mate = app.my_mate;
  // util = require('../lib/weui.js');
 
Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    //btn置灰 暂时关闭
    // disabled: true,
    disabled: true,

    cannotEntery: true,
    has_match_user:false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    statusBarHeight: app.globalData.statusBarHeight,
    statusBarHeight2: app.globalData.statusBarHeight + app.globalData.statusBarHeight
  },
  onLoad: function (options) {
    
    // console.log("index onLoad")

    // const testkey = wx.getStorageSync('testkey')
    // if(testkey){
    //   console.log('testkey true')
    // }else{
    //   console.log('testkey false')
    // }

    var that = this,
        token = wx.getStorageSync('token'),
      noFirst = wx.getStorageSync('noFirst')

    console.log(token)
    console.log(noFirst);
    if (noFirst){
      console.log('已经不是第一次了 请求')
    }else{
      console.log('test 第一次 不请求')
    }
    // console.log(app.globalData.flag)
   //直接判断那有没有token（第一次没有token，后面都重新请求）
    //   if (!first) {
    //     console.log("token未过期");
    //   } else {
    //   console.log("token过期，重新请求");
    //   let currentUrl = app.BASE_URL + '/api/authorizations/current'
    //   app.request(currentUrl, 'PUT', {}, res => {
    //     wx.setStorageSync('token', res.data.access_token);
    //   }, res => { }, { 'Authorization': 'Bearer' + token })
    // }

    //测试用例
    // if (noFirst) {
    //   console.log('已经不是第一次了 请求')
      // let currentUrl = app.BASE_URL + '/api/authorizations/current'
      // app.request(currentUrl, 'PUT', {}, res => {
      //   wx.setStorageSync('token', res.data.access_token);
      // }, res => { }, { 'Authorization': 'Bearer' + token })
    // } else {
    //   console.log('test 第一次 不请求')
    // }


   
  },


  onShow:function(){
    const that = this,
          openid = wx.getStorageSync('openid'),
          user_id = wx.getStorageSync('user_id'),
          
         
          single_clockIn = wx.getStorageSync('single_clockIn'),
          has_match_user = wx.getStorageSync('has_match_user');



   


    let warmUrl = app.BASE_URL + '/api/warm'
    app.request(warmUrl, 'GET', {}, res => {
      let curTime = countTime.fullTime(new Date())
      res.data < curTime ? wx.setStorageSync('is_warm', false) : wx.setStorageSync('is_warm', true)
    }, fail => { }, { 'content-type': 'application/x-www-form-urlencoded' })
    let toRecommend = wx.getStorageSync('toRecommend');
    let is_warm = wx.getStorageSync('is_warm');
    // if(is_warm){
    //   console.log("isWarm")
    //   this.setData({ disabled: true})
    //   if (toRecommend){
    //     console.log("is toRecommend")
    //     wx.redirectTo({
    //       url: '../countdown/countdown'
    //     })
    //   }
    // }else{
    //   console.log("isNotWarm")
    //   this.setData({ disabled:false})
    //   if (has_match_user || single_clockIn) {//跳转打卡页 有研友 || 单人打卡
    //     // wx.redirectTo({
    //     //   url: '../clockIn/clockIn'
    //     // })
    //     wx.reLaunch({
    //       // url: '../clockIn/clockIn'
    //     })
    //   }
    // }

     const userInfoStr = wx.getStorageSync("userInfoStr"),
      userEnter = wx.getStorageSync('userEnter')
    //判断是否授权进入小程序
    userEnter ? this.setData({ cannotEntery: false }) : this.setData({ cannotEntery: true })
    //判断是否处于预热期 暂时关闭
  },
  
  onReady:function(){
    console.log("index onReady")
  },
  // checksession:function(){
  //   wx.checkSession({
  //     success:function(res){
  //       console.log(res,'登陆为过期')
  //     },
  //     fail:function(res){
  //       console.log(res,'登陆过期')
  //     }
  //   })
  // },
  bindGetUserInfo: function (e) {
    // 查看是否授权
    var that = this;

    wx.getSetting({
      success(res) {
        console.log("authSetting")
        console.log(res.authSetting)
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function (res) {
              console.log("that.onShow")
              that.onShow()
              wx.setStorageSync("userInfoStr", res.userInfo)
              wx.login({
                success(res) {
                  var userInfoStr = wx.getStorageSync("userInfoStr");
                  console.log(userInfoStr)
                  if (res.code) {
                    //发起网络请求
                    let nicN = userInfoStr.nickName,
                        nicA = userInfoStr.avatarUrl,
                        authorizeUrl = app.BASE_URL + '/api/weapp/authorizations',
                        authorizeData = { code: res.code, nickname: nicN, avatar: nicA }





                    app.request(authorizeUrl, 'POST', authorizeData, res => {






                      // console.log("authorizations-res")
                      // console.log(res)
                      // wx.setStorageSync('user_id', res.data.user_id)
                      // // console.log()
                      wx.setStorageSync('token', res.data.access_token)
                      wx.setStorageSync('noFirst', true);
                      // wx.setStorageSync('openid', res.data.weapp_openid)
                      // wx.setStorageSync('wxauthorization', true)
                      var token = wx.getStorageSync('token')
                    



                    //获取个人信息test
                    let baseInfoUrl = app.BASE_URL + '/api/user/baseinfo'
                    app.request(baseInfoUrl, 'GET', "", res => {
                      wx.setStorageSync('user_id', res.data.user_id)
                      console.log(res)
                    }, fail => {}, { 'Authorization': 'Bearer' + token }, '')

                    //获取研友期望期望信息
                      // let targetInfoUrl = app.BASE_URL + '/api/user/targetinfo'
                      // app.request(targetInfoUrl, 'GET', "", res => {
                      //   console.log(res)
                      //   if (res.data.user_target_infos[0].area){
                      //     console.log("setStorage toRecommend")
                      //     wx.setStorageSync('toRecommend', true);
                      //     that.onShow();
                      //   }
                      // }, fail => { }, { 'Authorization': 'Bearer' + token }, '')


                      //获取用户 我的研友
                      // let matchInfoUrl = app.BASE_URL + '/api/user/match/baseinfo'
                      // app.request(matchInfoUrl, 'GET', "", res => {
                      //   if (res.data.match_user_id == 0) {
                      //     wx.setStorageSync('has_match_user', false)
                      //   } else {
                      //     wx.setStorageSync('has_match_user', true)
                      //     //暂不开启
                      //     // common.navTo('../clockIn/clockIn')
                      //     // console.log(res)
                      //   }
                      // }, fail => {}, { 'Authorization': 'Bearer' + token }, '')


                      that.onShow()




                    }, res => {}, { 'content-type': 'application/x-www-form-urlencoded' }, '')
                  










                    // that.onLoad()
                  } else {
                    console.log('登录失败！' + res.errMsg)
                  }
                  // that.onLoad();
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

  onHide:function(){
    console.log("index onHide");
  },

  onUnload:function(){
    console.log("index onUnload");
  },

  single:function(){//单人打卡
    common.navTo('../clockIn/clockIn')
    wx.setStorageSync('single_clockIn', true)
  },

  recommendMates: function () {//进入研友推荐
    const that = this,
          toR = wx.getStorageSync("toRecommend");
    console.log("toRecommend")
    console.log(toR)
    if (toR) {
      common.navTo('../recommend/recommend')
    } else {
      common.navTo('../checkNum/checkNum')
    }
  },


  onShareAppMessage: function (ops) {//分享转发
    const user_id = wx.getStorageSync('user_id'),
          userInfoStr = wx.getStorageSync('userInfoStr'),
          nickName = userInfoStr.nickName,
          avatarUrl = userInfoStr.avatarUrl;
    if (ops.from === 'button') {
      console.log(ops.target)
    }
    // wx.setStorageSync("isMyself", true)
    //邀请好友传送数据
    return {
      title: '快！来学习啦',
      imageUrl: '../imgs/banner.png',
      path: 'pages/beInvited/beInvited?user_id=' + user_id + ' &' + 'nickName=' + nickName + ' &' + 'avatarUrl=' + avatarUrl,
      success: function (res) {},
      fail: function (res) {}
    }
  }
})