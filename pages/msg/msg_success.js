Page({
  data: {
    message: ''
  },

  onLoad: function (res) {
    this.setData({
      message: res.message
    })
  },
  return:function(res){
    wx.redirectTo({
      url: '../index/index',
    })
  }
});