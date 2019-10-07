const app = getApp()
// const token = wx.getStorageSync('token');
const common = require('../lib/common.js')
Page({
  data:{
    rec_user2_id: 0,
    apply_user2_id:0,
    user2_id:0,

    invite:true,//邀请成为研友
    accept:false,//收到邀请
    // disabled:false,
    // disabled2:false,
    cannotEntery:false,
    cannotEntery2: false,
    nocancel: false,
    hidden: true,

    statusBarHeight: app.globalData.statusBarHeight,
    statusBarHeight2: app.globalData.statusBarHeight + app.globalData.statusBarHeight
  },  
  onLoad: function (option) {
    const that = this,
          token = wx.getStorageSync('token'),
          has_match_user = wx.getStorageSync('has_match_user');
    var invite = option.invite,
        accept = option.accept,
        recUserId = option.recUserId,
        applyUserId = option.applyUserId

    if (option.finish) {
      wx.navigateBack({ delta: 1 })
    }
    // console.log(option.recUserId)
    // has_match_user ? that.setData({ disabled2: true }) : that.setData({ disabled2:false})
    this.setData({
      rec_user2_id: recUserId,
      apply_user2_id: applyUserId
    })

    console.log(invite)
    invite ? that.setData({ invite: true }) : that.setData({ invite: true })
    accept ? that.setData({ accept: true }) : that.setData({ accept: false })  
    if (invite){//推荐列表
      
      let matchUrl = app.BASE_URL + '/api/user/match'
      app.request(matchUrl,'GET',{},res=>{
        console.log(res.data[recUserId])
        let rD = res.data[recUserId];
        console.log(rD.user_id)
            that.setData({
              "user2_id": rD.user_id,
              "name": rD.name,
              "avatar":rD.avatar,
              "phone": rD.phone,
              "sex": rD.sex,
              "hometown": rD.hometown,
              "area": rD.area,
              "school_place": rD.school_place,
              "school_name": rD.school_name,
              "school_field": rD.school_field,
              "school_type": rD.school_type,
              "study_style": rD.study_style,
              "good_subject": rD.good_subject
            })
            if(rD.sex=="男"){
              that.setData({
                sexImg:"../imgs/boy.png"
              })
            }else{
              that.setData({
                sexImg: "../imgs/girl.png"
              })
            }
      },res=>{}, { 'Authorization': 'Bearer' + token },'')
    } 
    if (accept){//待匹配列表
      let matchUrl = app.BASE_URL + '/api/user/awaitmatch'
      app.request(matchUrl, 'GET', {}, res => {
        console.log(res.data[applyUserId])
        let rD = res.data[applyUserId];
        that.setData({
          "user2_id": rD.user_id,
          "name": rD.name,
          "phone": rD.phone,
          "avatar": rD.avatar,
          "sex": rD.sex,
          "hometown": rD.hometown,
          "area": rD.area,
          "school_place": rD.school_place,
          "school_name": rD.school_name,
          "school_field": rD.school_field,
          "school_type": rD.school_type,
          "study_style": rD.study_style,
          "good_subject": rD.good_subject
        })
      }, res => {}, { 'Authorization': 'Bearer' + token }, '')
    }
  },
  onShow:function(){

  },
  invite:function () {
    let that = this
    const token = wx.getStorageSync('token')

    //获取用户xinxi 我的研友
    let matchInfoUrl = app.BASE_URL + '/api/user/match/baseinfo'
    app.request(matchInfoUrl, 'GET', "", res => {
      if (res.data.match_user_id == -1) {
        that.setData({
          cannotEntery2: true,
        })
      } else {
        if (that.data.rec_user2_id) {
          let inviteUrl = app.BASE_URL + '/api/user/awaitmatch'
          let inviteData = { user2_id: that.data.rec_user2_id }
          app.request(inviteUrl, 'POST', inviteData, res => {
            console.log(res)
            console.log("发送研友邀请")
            that.setData({
              cannotEntery1: true,
            })
            if (res.data.expired_at) {
              wx.setStorageSync('invited_expire', res.data.expired_at)
            }
          }, res => {
            console.log("请求失败")
          }, { 'Authorization': 'Bearer ' + token }, '')
          common.navTo("../clockIn/clockIn")
        }
      }
    }, fail => { }, { 'Authorization': 'Bearer' + token }, '')

   
  },
  agree:function(){
    let that = this
    if (that.data.apply_user2_id) {
      let agreeUrl = app.BASE_URL + '/api/user/match'
      let agreeData = { user2_id: that.data.apply_user2_id }
      const token = wx.getStorageSync('token')
      app.request(agreeUrl, 'POST', agreeData, res => {
        console.log(res)
        wx.showToast({
          title: "成为研友,前往打卡吧",
          icon: 'none',
          duration: 1500
        });
        common.navTo("../clockIn/clockIn")
      }, res => {
        console.log("请求失败")
      }, { 'Authorization': 'Bearer ' + token }, '')
    }
  },
  refuse:function(){
    let that = this
    if (that.data.apply_user2_id) {
      let refuseUrl = app.BASE_URL + '/api/user/awaitmatch'
      let refuseData = { user2_id: that.data.apply_user2_id }
      const token = wx.getStorageSync('token')
      app.request(refuseUrl, 'DELETE', '', res => {
        console.log(res)
        wx.showToast({
          title: "你已拒绝该申请",
          icon: 'none',
          duration: 1500
        });
        wx.navigateBack({ changed: true })
      }, res => {
        console.log("请求失败")
      }, { 'Authorization': 'Bearer ' + token }, '')
    }
  },
  goClockIn:function(){
    wx.reLaunch({
      url: '../clockIn/clockIn'
    })
    wx.setStorageSync('single_clockIn', true)
  },
  goApply:function(){
    common.navTo('../apply/apply')
  }
})
