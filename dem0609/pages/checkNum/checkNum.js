const app = getApp(),
      common = require('../lib/common.js')
Page({
  data: {
    username:'',
    password:'',
    statusBarHeight: app.globalData.statusBarHeight,
    statusBarHeight2: app.globalData.statusBarHeight + app.globalData.statusBarHeight
  },
  onLoad: function (options) { 

  },
  userName:function(e){this.setData({username:e.detail.value})},
  password: function (e) {this.setData({password: e.detail.value})},
  checkNum:function(e){
    // const that = this,
    //       username = that.data.username,
    //       password = that.data.password;
    const that = this;
    // if (username === "" || password === "") {
    //    app.showErrorModal('账号及密码不能为空', '提醒');
    //  }else{
      let openid = wx.getStorageSync('openid'),
          checkNumUrl = app.BASE_URL + '/api/authorizations' ,
          checkNumData = {
            username: that.data.username,
            password: that.data.password,
            openid: openid
          }
   
      app.request(checkNumUrl, 'POST', checkNumData,res=>{
        console.log(res)
        const rData = res.data;
        if (rData.access_token) {
          // wx.setStorageSync('student_verify',true)
          common.navTo('../fillInInformation/fillInInformation');
        } else {
          // app.showErrorModal("用户名或密码错误。", '提醒');
          wx.showToast({
            title: rData.message,
            icon: 'none',
            duration: 1500
          });
          // wx.setStorageSync('student_verify', false)
        }
        },res=>{}, {'content-type': 'application/json'},'')
     }  
  // },
})