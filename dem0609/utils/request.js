const request = function (url, method, data, succ, fail, header, dataType) {
    wx.request({
      url: url,
      data: data,
      dataType: dataType,
      header: header,
      method: method,
      success: res => {
        if (succ) succ(res);
        if(res.data.statusCode == '401'){
          wx.setStorageSync('tkcur',true)
        }else{
          wx.setStorageSync('tkcur',false)
        }
      },
      fail: err => {
        if (fail) fail(err);
      }
    })
}
module.exports = {
  request
};