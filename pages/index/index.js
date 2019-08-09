//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    message: "",
    imgUrls: [
      'https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640',
      'https://images.unsplash.com/photo-1551214012-84f95e060dee?w=640',
      'https://images.unsplash.com/photo-1551446591-142875a901a1?w=640'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 1000,
    easingFunction: "easeInOutCubic",
    games: [],

    resources: [],
    index: {},

  },

  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../table/table'
    })
  },
  onLoad: function() {
    this.getReourceType();
    this.init();

  },

  init: function() {
    wx.request({
      url: 'http://localhost:8080/api/gamesUrl',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'token': wx.getStorageSync("token")
      },
      method: "post",
      success: (e) => {
        if (e.data.success === true) {
          this.setData({
            games: e.data.gamesList,
          })
          if (e.data.gamesList.length == 0){
            this.setData({
              message: '请联系管理员,申请游戏权限！'
            })
          }
        } else {
          wx.showToast({
            title: e.data.msg,
            icon: 'none',
            duration: 1000
          })
        }
      },
      error: function(e) {

      }
    })
  },

  getReourceType: function() {
    wx.request({
      url: 'http://localhost:8080/api/resourceType',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'token': wx.getStorageSync("token")
      },
      method: "post",
      success: (e) => {
        if (e.data.success === true) {
          this.setData({
            'resources': e.data.resourceType,
          })
        }
      },
      error: function(e) {
        debugger;
      }
    })
  },

  viewButton: function(e) {
    wx.navigateTo({
      url: e.currentTarget.id
    })
  },
  findAllResource: function(res) {
    wx.request({
      url: 'http://localhost:8080/api/role/findAllResource',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'token': wx.getStorageSync("token")
      },
      method: "post",
      success: function(e) {
        if (e.data.success === true) {
          wx.navigateTo({
            url: '../user/user?message=' + e.data.msgs,
          })
        } else if (e.data.verifyToken === false) {
          wx.redirectTo({
            url: '../login/login?message=' + e.data.msgs
          })
        } else {
          wx.navigateTo({
            url: '../msg/msg_fail?message=' + e.data.msg,
          })
        }
      }
    })
  },
  test: function(res) {
    wx.request({
      url: 'http://localhost:8080/api/user/test',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        token: wx.getStorageSync("token")

      },
      method: 'post',
      data: {
        token: wx.getStorageSync("token")
      }
    })
  },

})