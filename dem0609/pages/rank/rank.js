const app = getApp()
const map = (array,fn) =>{
  let results = []
  for(const value of array)
    results.push(fn(value))
  return results;
}
const filter = (array,fn) =>{
  let results = {}
  for (const value of array)
    fn(value) ? results.push(value) : undefined
  return results;
}
// sum_clock_day
Page({
  data: {
    selected: true,
    selected1: false,
    myClockTime:"",
    myRank:0,
    friendClockTime:"",
    sum_clock_day:"",
    rank:[],
    accumulate: [],
    statusBarHeight: app.globalData.statusBarHeight,
    statusBarHeight2: app.globalData.statusBarHeight + app.globalData.statusBarHeight
  },
  onLoad: function (options) {
    const rank_icon = this.data.rank_icon;
    const rank = this.data.rank;
    const accumulate = this.data.accumulate;
    const token = wx.getStorageSync('token')
    function sortNumber(a, b) {
      return a.sign_rank - b.sign_rank
    }
  
//获取当天打卡排行
//点击查看排行榜
const that = this
    function hhimg(arr) {
      return arr.map(function (item, imgs) {
        return Object.assign(item, { rankImg: "../imgs/" + item.sign_rank + ".png" })
      })
    }

    app.request(app.BASE_URL + '/api/user/sign/ranks','GET','',res=>{
      console.log("获取当天打卡排行");
      console.log("users/sign/ranks")
      console.log(res)
      that.setData({
        rank:res.data
      })
      // rank.sort(sortNumber);
      // // accumulate.sort(sortNumber);
      // for (let i = 0; i < 10; i++) {
      //   console.log("rankImg");
      //   rank[i].rankImg = "../imgs/" + (i + 1) + ".png";
      //   // accumulate[i].accumulateImg = "../accumulateImg/" + (i + 1) + ".png";
      //   rank[i].sign_timestamp = rank[i].sign_timestamp.substring(11, 16);
      // }
     
      that.setData({
        rank: hhimg(res.data, rankImg)
      })
      console.log(that.data.rank)
    },res=>{}, { 'content-type': 'application/json'},'')
   

   //获取打卡积分排行
    app.request(app.BASE_URL + '/api/user/sign/score/ranks', 'GET', '', res => {
      console.log("获取打卡积分排行");
      console.log("user/sign/score/ranks")
      console.log(res);
      // console.log(res.data.avatar)
      that.setData({
        accumulate: hhimg(res.data, accumulateImg)
      }) 
      console.log(that.date.accumulate)
    }, res => {
      console.log("获取打卡积分排行失败");
    }, { 'content-type': 'application/json' }, '')

  // //获取所有用户打卡天数排行
  //   app.request(app.BASE_URL + '/api/user/sign/day/ranks', 'GET', '', res => {
  //     console.log("获取打卡积分排行");
  //     console.log("user/sign/day/ranks")
  //     console.log(res);
  //     // console.log(res.data.avatar)
  //     that.setData({
  //       accumulate: res.data
  //     })
  //   }, res => {
  //     console.log("获取打卡积分排行失败");
  //   }, { 'content-type': 'application/json' }, '')



    //获取用户某天的打卡详情信息
    wx.request({
      url: app.BASE_URL + '/api/user/sign/rank',
      method: 'GET',
      data: {},
      header: { 'Authorization': 'Bearer' + token },
      success(res) {
        console.log(res)
        console.log("获取用户某天的打卡详情信息");
        console.log("user/sign/rank")
        console.log(res);
        var ts = res.data.sign_timestamp
        var sign_timestamp = ts.substring(11, 16)
        that.setData({
          myClockTime: sign_timestamp,
          myRank:res.data.sign_rank,
        })
      },
      fail: function (res) {}
    })
    this.setData({
      rank: rank,
      accumulate: accumulate
    })

    // 获取用户信息
    app.request(app.BASE_URL + '/api/user/sign', 'GET', '', res => {
      console.log("获取用户信息成功");
      console.log(res)
      that.setData({
        sum_clock_day:res.data.sign_day,
        mySumRank:res.data.sign_rank
      })
    }, res => {}, { 'Authorization': 'Bearer' + token }, '')
  },
  onShow: function () {
  
  },
  early_rank:function(){
    this.setData({
      selected: true,
      selected1: false,
    })
  },
  sum_rank:function(){
    this.setData({
      selected: false,
      selected1: true,
    })
  }
})