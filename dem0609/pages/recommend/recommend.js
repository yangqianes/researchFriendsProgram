var app = getApp();
const is_warm = wx.getStorageSync('is_warm');
Page({
  data: {
    gets:[],
    statusBarHeight: app.globalData.statusBarHeight,
    statusBarHeight2: app.globalData.statusBarHeight + app.globalData.statusBarHeight
  },
  onShow: function (options) {
    let that = this
    const token = wx.getStorageSync('token')
    let matchUrl = app.BASE_URL + '/api/user/match'
    app.request(matchUrl,'GET','',res=>{
      console.log(res)
      console.log(res.data);
      let data = res.data
      that.setData({
        gets: data
      })
    },res=>{
      console.log(res);
      console.log("访问失败");
    }, { 'Authorization': 'Bearer' + token })
  },
  friendInfo:function(e){
    var that = this
    var recUserId = e.currentTarget.dataset.id;
    console.log(inedx)
    console.log(recUserId)
    wx.navigateTo({
      url: "../friendInfo/friendInfo?recUserId=" + recUserId + "&" + "invite=true"
    })
  },
})