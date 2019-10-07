const app = getApp(),
      common = require('../lib/common.js');    
Page({
  data: {
    // is_match_user:false,
    is_match_user: true,
    // array: [],
    array:[
      {
        "state":0,
        "user_id": 17,
        "day_timestamp": "2018-06-14 00:00:00",
        "sign_rank": 1,
        "sign_major_rank": 1,
        "sign_timestamp": "2018-06-14 03:53:28",
        "nickName": "小十七",
        "avatar": "www.17.io",
        "introduction": "十七的介绍"
      },
      {
        "state": 1,
        "user_id": 12,
        "day_timestamp": "2018-06-14 00:00:00",
        "sign_rank": 2,
        "sign_major_rank": 1,
        "sign_timestamp": "2018-06-14 03:54:11",
        "nickName": "小十二",
        "avatar": "www.12.io",
        "introduction": "十二的介绍"
      },
      {
        "state": 2,
        "user_id": 2,
        "day_timestamp": "2018-06-14 00:00:00",
        "sign_rank": 3,
        "sign_major_rank": 2,
        "sign_timestamp": "2018-06-14 18:19:15",
        "nickName": "一碗",
        "avatar": "www.233.io",
        "introduction": "这里是微信介绍"
      }
    ],
    statusBarHeight: app.globalData.statusBarHeight,
    statusBarHeight2: app.globalData.statusBarHeight + app.globalData.statusBarHeight
  },
  onLoad: function (options) {
    const that = this,
          token = wx.getStorageSync('token'),
          awaitUrl = app.BASE_URL + '/api/user/awaitmatch'

    function h(e) {
      if (e == 0) {
        return e = "已拒绝"
      } else if (e == 1) {
        return e = "已接受"
      } else if (e == 2) {
        return e = "已过期"

      } else if (e == 3) {
        return e = "待处理"
      }
    }

    function hhs(arr) {
      return arr.map(function (item) {
        return Object.assign(item, { state1: h(item.state) })
      })
    }

    // if(this.data.array.state == 0 ){
    //   console.log("state 0")
    // }
    // app.request(awaitUrl,'GET',"",res=>{
    //   console.log("研友申请")
    //   console.log(res)
    //   if (res.data.message == "当前用户没有邀请请求") {
    //     that.setData({ is_match_user: false })
    //   } else {
   
       //   //研友四个状态 test
    //     that.setData({
    //       is_match_user: true,
            //  array: hhs(res.data)
        //  // array: res.data
    //     })
    //   }
    // },res=>{
    //   console.log(res);
    //   console.log("访问失败");
    //   }, { 'Authorization': 'Bearer ' + token })

  },
  friendInfo: function (e) {
    let that = this,
        applyUserId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: "../friendInfo/friendInfo?applyUserId=" + applyUserId + "&" + "accept=true"
    })
  },
  recommend: function () {
    common.navTo('../recommend/recommend')
  },
  onShareAppMessage: function (ops) {//分享转发
    const user_id = wx.getStorageSync('user_id'),
      userInfoStr = wx.getStorageSync('userInfoStr'),
      nickName = userInfoStr.nickName,
      avatarUrl = userInfoStr.avatarUrl;
    if (ops.from === 'button') {
      console.log(ops.target)
    }
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