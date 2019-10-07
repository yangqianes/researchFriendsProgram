function bind(bindtap) {
  bindtap.bind(function (e){
    this.setData({
      bindtap: e.detail.value
    })
  })
  
}
function navTo(url) {
  wx.navigateTo({
    url: url
  })
}
module.exports.bind = bind
module.exports.navTo = navTo