// pages/login/login.js

const app = getApp()

Page({

  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    message: "请登录",
    loginShow: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(e) {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true,
        loginShow: false,
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: (res) => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    };
  },

  bindGetUserInfo: function(e) {
    if (e.detail.userInfo) {
      app.login();
    } else {
      console.log("fail")
    }
  },

  back:function() {
    wx.redirectTo({
      url: '../index/index'
    })
  }
})