const app = getApp(),
  countTime = require('../../utils/countTime.js'),
      common = require('../lib/common.js'),
      has_match_user = wx.getStorageSync('has_match_user'),
  mottos = ["走过很多弯路，也好过原地踏步", "别让去年的计划，成为今年的笑话", "上天不会亏待努力的人", "想都是问题,  努力才是答案", "要走的路还很长，戒骄成躁", "为了梦想，一路狂奔", "心里有梦，就要付诸行动", "即使慢，也要迟而不息", "即使走得慢，也绝不后退","世界上最大的谎言是你不行"];
Page({
  data: {
    selected:true,
    selected1:false,
    timeTip: "当前时间",
    clickClockIn: "点击打卡",
    motto: "",
    timer:"",//定时器
    yourFri:"",//你的研友是否打卡提示
    showCurrentTime:true,
    has_match_user:false,//是否单人打卡
    is_clocked:false,
    is_sign_today:false,
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),

    clockImg:'../imgs/clock_a.png',
    userImg:'../imgs/user.png',

    statusBarHeight: app.globalData.statusBarHeight,
    statusBarHeight2: app.globalData.statusBarHeight + app.globalData.statusBarHeight,

    disabled:false
  },
onShow:function(){
  this.onLoad();
},
  onLoad: function (options) {
    var that = this,
      motto = mottos[parseInt(Math.random() * 10)];
      that.setData({
        timer: setInterval(function(){
          that.setData({
            time: countTime.formatTime(new Date()),
          });
        },500)
      })
      // timer = setInterval(function () {
      //   that.setData({
      //     time: countTime.formatTime(new Date()),
      //   });
      // }, 500);
      that.setData({
        motto: motto
      })
    const token = wx.getStorageSync('token'), 
          sign_day = wx.getStorageSync('sign_day');
    that.setData({time:that.data.timer})

    //判断研友是否打卡并显示相应文案
    // let matchInfoUrl = app.BASE_URL + '/api/user/match/baseinfo'
    // app.request(matchInfoUrl, 'GET', "", res => {
    //   console.log("请求研友信息成功");
    //   console.log("user/match/baseinfo")
    //   console.log(res)

    //   if (res.data.match_user_id != 0) {
    //     console.log(res)
    //     //获取研友信息
    //     let getMacth = app.BASE_URL + '/api/user/match/baseinfo'
    //     app.request(getMacth, 'GET', '', res => {
    //       console.log(res)
    //       let is_match_sign = res.data.is_match_user_sign_today
    //       is_match_sign ? that.setData({ yourFri: "你的研友已打卡" }) : that.setData({ yourFri: "你的研友还没有打卡哦" })
    //     }, res => {}, { 'Authorization': 'Bearer ' + token }, '')
    //   }
    // }, fail => {}, { 'Authorization': 'Bearer' + token }, '')

  


    // //获取用户某天的打卡详情信息
    // let getRank = app.BASE_URL + '/api/user/sign/rank'
    // app.request(getRank, 'GET', '', res => {
    //   console.log("user/sign/rank")
    //   console.log(res);
    //   const rData = res.data
    //   if (rData.sign_timestamp) {
      // clearInterval(that.data.timer)//清除定时器
    //     var ts = rData.sign_timestamp
    //     var sign_timestamp = ts.substring(11, 16)
    //     that.setData({
    //       sign_timestamp: sign_timestamp
    //     })
    //   }
    //   if (rData.user_major){
    //     rData.user_major ? that.setData({
    //       sign_major_rank: rData.sign_major_rank,
    //       has_match_user: false,//不显示 想看看你是报考该专业第几早起的吗？选择意向专业
    //       is_clocked: true
    //     }) : that.setData({
    //       has_match_user: true,//显示 想看看你是报考该专业第几早起的吗？选择意向专业
    //       is_clocked: false
    //     })
    //   }
    //   that.setData({
    //     user_major: rData.user_major
    //   })
    // }, res => { }, { 'Authorization': 'Bearer ' + token }, '')

  // 获取用户打卡信息
    // let getMyInfo = app.BASE_URL + '/api/user/sign'
    // app.request(getMyInfo, 'GET', '', res => {
    //   console.log("获取用户打卡信息");
    //   console.log(res)
    //   const rData = res.data
    //   that.setData({
    //     sign_day: rData.sign_day,
    //     sign_score: rData.sign_score
    //   })
      
    //   rData.is_sign_today ? that.setData({
    //     showCurrentTime: false,
    //     sign_timestamp: that.data.sign_timestamp,
    //     is_sign_today: true,
    //     timeTip: '今日打卡时间',
    //     clickClockIn: '今日已打卡'
    //   }) : that.setData({
    //     showCurrentTime: true,
    //     time: timer,
    //     is_sign_today: false,
    //     timeTip: '当前时间',
    //     clickClockIn: '点击打卡'
    //   })
    // }, res => {}, { 'Authorization': 'Bearer ' + token }, '')
  },
  clickClockIn: function () {
    var that = this;
    if (!that.data.is_sign_today){
       //发起用户打卡请求
      const token = wx.getStorageSync('token')
        app.request(app.BASE_URL + '/api/user/today/sign','GET','',res=>{
          console.log("更新成功");
          console.log("user/today/sign")
          console.log(res);
          let rData = res.data
          if (rData.message) {
            console.log('打卡提示')
            wx.showToast({
              title: res.data.message,
              icon: 'none',
              duration: 1500
            });
          }else{
            //测试是否可
            that.onLoad()

          //待测试
            rData.sign_rank ? that.setData({ has_match_user: false }) : that.setData({ has_match_user: true })
          }
        },res=>{}, { 'Authorization': 'Bearer' + token },'')
    }
  },
  toRank:function(){
    common.navTo('../rank/rank')
  },
  myFriends: function () {
    common.navTo('../myFriends/myFriends')
  },
  friendInvitation: function () {
    common.navTo('../apply/apply')
  },
  choiceField:function(e){
    common.navTo('../choice/choice')
  },
  clockPage:function(e){
    this.setData({
      clockImg: '../imgs/clock_a.png',
      userImg: '../imgs/user.png',
      selected:true,
      selected1:false
    })
  },
  userPage:function(e){
    this.setData({
      clockImg: '../imgs/clock.png',
      userImg: '../imgs/user_a.png',
      selected: false,
      selected1: true
    })
  },
  onUnload:function(){
    clearInterval(that.data.timer)//清除定时器
  }  
})