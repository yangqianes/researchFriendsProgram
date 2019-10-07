//条件判定使用下划线命名法
App({
  BASE_URL:"https://yanyou.uliuli.fun",
  globalData:{
    my_mate:false,
    userInfo: null,
    n:0,
    year:"",
    mon: "",
    day: "",
    hour: "",
    min: "",
    sed:"",
    statusBarHeight: wx.getSystemInfoSync()['statusBarHeight']
  },
  onShow: function () {
    console.log("app onShow")
   
  },
  onLaunch: function () {

    var that = this;
    var token = wx.getStorageSync('token')
    console.log(token)
  
    this.request = require('./utils/request.js').request;
    this.util = require('./utils/request.js');
    this.countTime = require('./utils/countTime.js');
    // let warmUrl = this.BASE_URL + '/api/warm'
    // let curTime = this.countTime.fullTime(new Date())
    // console.log(curTime)
    // let testTime = "2019-08-17 05:00:00"
    // console.log(testTime > curTime)
    // console.log("app onLaunch")
  
    // this.request(warmUrl, 'GET', {}, res => {
    //   console.log("coundow")
    //   console.log(res)

    //   let gdata = that.globalData;
    //   let rdata = res.data.warm_time;
    //   gdata.year = rdata.substring(0, 4);
    //   gdata.mon = rdata.substring(5,7);
    //   gdata.day = rdata.substring(8,10);
    //   gdata.hour = rdata.substring(11,13);
    //   gdata.min = rdata.substring(14,16);
    //   gdata.sed = rdata.substring(17,19);
      
      
    //   var timer = setInterval(function () {
    //     const time = that.countTime.leftTimer(2019, 6, 3, 18, 43, 0)//填写倒计时日期
    //     // const time = that.countTime.leftTimer(gdata.year, gdata.mon, gdata.day, gdata.hour, gdata.min, gdata.sed)
    //     time <= "00天00小时00分00秒" ? wx.setStorageSync('is_warm', false) : wx.setStorageSync('is_warm', true);
    //   }, 1000);
    // }, res => { }, { 'content-type': 'application/x-www-form-urlencoded' })  
  },



  onHide:function(){
    // console.log("app onHide")
  },
  showLoadToast: function (title, duration) {
    
    wx.showToast({
      title: title || '加载中',
      icon: 'loading',
      duration: duration || 10000
    });
  },
  showErrorModal: function (content, title) {
    wx.showModal({
      title: title || '加载失败',
      content: content || '未知错误',
      showCancel: false
    });
  }
})