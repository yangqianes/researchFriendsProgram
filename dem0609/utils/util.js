function navigateTo(url) {
  wx.navigateTo({
    url: url
  })
}
const navTo = url=>wx.navigateTo({url: url})
module.exports = {
  navTo:navTo,
}


