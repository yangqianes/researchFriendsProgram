const app = getApp(),
      common = require('../lib/common.js'),
      countTime = require('../../utils/countTime.js');
Page({
  data: {
    day1:"",
    hour1:"",
    min1:"",
    sed1:"",
    index_MBA:"",
    timer:"",//定时器
    statusBarHeight: app.globalData.statusBarHeight,
    statusBarHeight2: app.globalData.statusBarHeight + app.globalData.statusBarHeight
  },
  onLoad:function(res){
   
  },
  onShow: function (res) {
   var that =this;
    var user_id = wx.getStorageSync('user_id')
    // console.log(user_id)
    that.setData({
      index_MBA: user_id
    })
    // console.log("countdown onShow")
    // console.log(app.globalData.year)
    var is_warm = wx.getStorageSync('is_warm')
    // console.log(is_warm)
    if (!is_warm){
      console.log("countdown to recommend")
    //   common.navTo('../recommend/recommend')
    }
    const userInfoStr = wx.getStorageSync("userInfoStr")
    let warmUrl = app.BASE_URL + '/api/warm'
    app.request(warmUrl, 'GET', {}, res => {
      console.log(res)
      let rdata = res.data.warm_time;
      let year = rdata.substring(0, 4);
      let mon = rdata.substring(5, 7);
      let day = rdata.substring(8, 10);
      let hour = rdata.substring(11, 13);
      let min = rdata.substring(14, 16);
      let sed = rdata.substring(17, 19);

  
      // var timer = setInterval(function () {
      //   // const time = countTime.leftTimer(year, mon, day, hour, min, sed),
      //   const time = countTime.leftTimer(2019, 7, 3, 18, 43, 0),//填写倒计时日期
      //     day1 = time.substring(0, 2),
      //     hour1 = time.substring(3, 5),
      //     min1 = time.substring(6, 8);
      //   that.setData({
      //     day1: day1,
      //     hour1: hour1,
      //     min1: min1,
      //   });
      //   time <= "00天00小时00分00秒" ? wx.setStorageSync('is_warm', false) : wx.setStorageSync('is_warm', true);
      // }, 1000);

      that.setData({
        timer: setInterval(function(){
          const time = countTime.leftTimer(2019, 7, 3, 18, 43, 0),//填写倒计时日期
            day1 = time.substring(0, 2),
            hour1 = time.substring(3, 5),
            min1 = time.substring(6, 8);
          that.setData({
            day1: day1,
            hour1: hour1,
            min1: min1,
          });
          console.log(that.data.timer)
          if (time <= "00天00小时00分00秒"){
            wx.setStorageSync('is_warm', false)
            clearInterval(that.data.timer)
          }else{
            wx.setStorageSync('is_warm', true);
          }
        }, 1000)
      })
    }, res => { }, { 'content-type': 'application/x-www-form-urlencoded' })  
  },
  onUnload:function(){
    clearInterval(this.data.timer)
    console.log("清除定时器")
  }
})