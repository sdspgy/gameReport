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
  onLoad: function(options) {
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

  onReady: function() {
    // 页面首次渲染完毕时执行
    this.isAuthor();
  },

  isAuthor: function() {
    wx.login({
      success: info => {
        const code = info.code;
        if (code) {
          wx.request({
            url: url.requestUrl + '/api/user/isAuthor',
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            method: 'post',
            data: {
              code: code,
            },
            success: (info) => {
              if (info.data.isAuthor) {
                this.moreGame();
              }
            }
          })
        }
      }
    })
  },

  moreGame: function() {
    app.login();
    // this.onLoad();
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

  gameUrl: function(e) {
    const gameidUrl = e.currentTarget.id;
    const gameid = gameidUrl.substr(gameidUrl.length - 1, 1);
    let game = new Object();

    wx.request({
      url: url.requestUrl + '/api/report/game',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'token': wx.getStorageSync("token")
      },
      method: 'post',
      data: {
        gameid: gameid
      },
      success: function(data) {
        if (data.data.success === true) {
          game = data.data.game;
          app.gameidEvent(gameid, game);
          wx.switchTab({
            url: gameidUrl,
          })
        }
      },
      fail: function(r) {
        console.log('没有权限')
      },
      error: function(r) {
        console.log("500")
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