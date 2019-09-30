import url from "../../utils/util.js"
//获取应用实例
const app = getApp()
Page({
  data: {
    message: "",
    imgUrls: [
      '../../images/menu/three.jpeg',
      '../../images/menu/one.jpeg',
      '../../images/menu/two.jpeg',
      '../../images/menu/four.jpeg',
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 1000,
    easingFunction: "easeInOutCubic",
    games: [],

    resources: [],
    index: {},
    moreGame: true,
  },

  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../table/table'
    })
  },
  onLoad: function() {
    if (app.globalData.userInfo) {
      this.getReourceType();
      this.init();
      this.setData({
        moreGame: false
      })
    } else {
      app.userInfoReadyCallback = res => {
        if (res.userInfo) {
          this.getReourceType();
          this.init();
          this.setData({
            moreGame: false
          })
        }
      }
    }
  },

  moreGame: function() {
    app.login();
    this.onLoad();
  },

  init: function() {
    wx.request({
      url: url.requestUrl + '/api/gamesUrl',
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
          if (e.data.gamesList.length == 0) {
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
      url: url.requestUrl + '/api/resourceType',
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

  gameUrl: function(e) {
    const gameidUrl = e.currentTarget.id;
    const gameid = gameidUrl.substr(gameidUrl.length - 1, 1);
    app.gameidEvent(gameid);
    wx.switchTab({
      url: e.currentTarget.id,
    })
  },

  viewButton: function(e) {
    wx.navigateTo({
      url: e.currentTarget.id
    })
  },
  findAllResource: function(res) {
    wx.request({
      url: url.requestUrl + '/api/role/findAllResource',
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
      url: url.requestUrl + '/api/user/test',
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