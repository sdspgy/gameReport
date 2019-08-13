import url from "../../utils/util.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user: [],
    openId: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      openId: options.message
    })
    this.findUserDetail(options.message)
  },

  findUserDetail: function(res) {
    wx.request({
      url: url.requestUrl + '/api/user/findUserDetail',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'token': wx.getStorageSync("token"),
      },
      method: 'post',
      data: {
        openId: res
      },
      success: e => {
        if (e.data.success) {
          this.setData({
            user: JSON.parse(e.data.msg)
          })
        } else if (!e.data.verifyToken) {
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

  resourceList: function(res) {
    var that = this;
    var user = that.data.user;
    wx.navigateTo({
      url: 'user_resource?resources=' + JSON.stringify(user.role.resources)
    })
  },
  roleList: function(res) {
    var that = this;
    var user = that.data.user;
    wx.navigateTo({
      url: 'user_change_role?roleId=' + (user.role.id + "," + this.data.openId)
    })
  },
  gameList: function() {
    wx.navigateTo({
      url: 'userGameList?openId=' + this.data.openId
    })
  }
})