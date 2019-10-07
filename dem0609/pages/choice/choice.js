const common = require('../lib/common.js');
const app = getApp();

Page({
  data: {
    statusBarHeight: app.globalData.statusBarHeight,
    statusBarHeight2: app.globalData.statusBarHeight + app.globalData.statusBarHeight
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
  },
  my_school_field_single: function () { common.navTo('../test/test?id=7') },
  choiceField:function(e){
    //请求成功后
    var my_school_field_single = wx.getStorageSync('my_school_field_single');
    console.log(my_school_field_single)
    const token = wx.getStorageSync('token')
    let data = { school_field: my_school_field_single}
    // let data = { school_field: "" }
    app.request(app.BASE_URL + '/api/user/baseinfo/update', 'POST', data, res => {
      console.log(my_school_field_single)
      console.log(res);
    }, res => {
      console.log("获取打卡积分排行失败");
      }, {  'Authorization': 'Bearer' + token  }, '')
  },
  onShow:function(){
    // var my_school_field_single = wx.getStorageSync('my_school_field_single');
    this.setData({
      my_school_field_single: wx.getStorageSync('my_school_field_single')
    })
  },
  onShareAppMessage: function () {

  }
})