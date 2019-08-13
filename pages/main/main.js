import url from "../../utils/util.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  userManager: function (res) {
    wx.request({
      url: url.requestUrl + '/api/user/userManager',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'token': wx.getStorageSync("token")
      },
      method: "post",
      success: e => {
        if (e.data.success === true) {
          console.log(e);
          wx.navigateTo({
            url: '../user/user_manager',
          })
        } else if (e.data.verifyToken === false) {
          wx.redirectTo({
            url: '../login/login?message=' + e.data.msg
          })
        } else {
          wx.showToast({
            title: e.data.msg,
            icon: 'none',
            duration: 1000
          })
        }
      }
    })
  },
  roleManager: function (res) {
    wx.request({
      url: url.requestUrl + '/api/role/roleManager',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'token': wx.getStorageSync("token")
      },
      method: "post",
      success: function (e) {
        if (e.data.success === true) {
          wx.navigateTo({
            url: '../role/role_manager',
          })
        } else if (e.data.verifyToken === false) {
          wx.redirectTo({
            url: '../login/login?message=' + e.data.msg
          })
        } else {
          wx.showToast({
            title: e.data.msg,
            icon: 'none',
            duration: 1000
          })
        }
      }
    })
  },
  resourceManager: function (res) {
    wx.request({
      url: url.requestUrl + '/api/resource/resourceManager',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'token': wx.getStorageSync("token")
      },
      method: "post",
      success: function (e) {
        console.log(e);
        if (e.data.success === true) {
          wx.navigateTo({
            url: '../resource/resource_manager',
          })
        } else if (e.data.verifyToken === false) {
          wx.redirectTo({
            url: '../login/login?message=' + e.data.msg
          })
        } else {
          wx.showToast({
            title: e.data.msg,
            icon: 'none',
            duration: 1000
          })
          // wx.navigateTo({
          //   url: '../msg/msg_fail?message=' + e.data.msg,
          // })
        }
      }
    })
  },

})