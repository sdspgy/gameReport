Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    url: '',
    type: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  name: function(res) {
    var name = res.detail.value
    this.setData({
      name: name
    })
  },
  url: function(res) {
    var url = res.detail.value
    this.setData({
      url: url
    })
  },
  type: function(res) {
    var type = res.detail.value
    this.setData({
      type: type
    })
  },
  addResource: function() {
    var that = this;
    var name = that.data.name;
    var url = that.data.url;
    var type = that.data.type;
    if (name.length == 0 || url.length == 0 || type.length == 0) {
      wx.showToast({
        title: '有内容未填',
        duration: 2000,
        icon: 'none'
      });
      return false;
    };
    wx.request({
      url: 'http://localhost:8080/api/resource/addResource',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'token': wx.getStorageSync("token")
      },
      method: 'post',
      data: {
        name: name,
        url: url,
        type: type
      },
      success: e => {
        if (e.data.success === true) {
          wx.navigateBack({
            delta: 2
          })
          wx.showToast({
            title: e.data.msg,
            icon: 'none',
            duration: 1000
          });

        } else if (e.data.verifyToken === false) {
          wx.redirectTo({
            url: '../login/login?message=' + e.data.msg
          })
        } else {
          wx.navigateTo({
            url: '../msg/msg_fail?message=' + e.data.msg,
          })
        }
      }
    })
  },

})