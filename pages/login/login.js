// pages/login/login.js

const app = getApp()

Page({

  data: {
    message:"授权"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    
  },

  bindGetUserInfo: function (e) {
    if (e.detail.userInfo) {
      app.login();
    } else {
      console.log("fail")
    }
  }
})