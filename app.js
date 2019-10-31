import url from "./utils/util.js"
var overallData = [1];
App({
  onLaunch: function(options) {
    console.log('场景值：' + options.scene)
    this.token();
  },
  token: function() {
    wx.setStorageSync("token", "413e3c4a-4d19-45ec-9304-caea6c0e6e25");
  },

  login: function() {
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
    wx.login({
      success: r => {
        var code = r.code;
        if (code) {
          wx.getUserInfo({
            success: function(res) {
              wx.request({
                url: url.requestUrl + '/api/user/login',
                header: {
                  'content-type': 'application/x-www-form-urlencoded'
                },
                method: 'post',
                data: {
                  encryptedData: res.encryptedData,
                  iv: res.iv,
                  code: code,
                },
                success: function(data) {
                  // wx.showToast({
                  //   title: '登录成功',
                  //   icon: 'success',
                  //   duration: 2000
                  // })
                  if (data.data.success === true) {
                    wx.setStorageSync("token", data.data.token);
                    // wx.reLaunch({
                    //   url: '../index/index'
                    // })
                  } else if (data.data.verifyToken === false) {
                    wx.redirectTo({
                      url: '../login/login?data=' + data.data.msg
                    })
                  } else {
                    wx.navigateTo({
                      url: '../msg/msg_fail?message=' + data.data.msg,
                    })
                  }
                },
                fail: function() {
                  console.log('系统错误')
                }
              })
            },
            fail: function() {
              wx.navigateTo({
                url: '../login/login'
              })
            }
          })
        }
      }
    })

  },

  gameidEvent: function(info) {
    overallData[0] = info;
    // console.log(overallData[0]);
    wx.getUserInfo({
      success: function(res) {
        wx.request({
          url: url.requestUrl + '/api/report/game',
          header: {
            'content-type': 'application/x-www-form-urlencoded',
            'token': wx.getStorageSync("token")
          },
          method: 'post',
          data: {
            gameid: info
          },
          success: function(data) {
            if (data.data.success === true) {
              overallData[1] = data.data.game;
            }
          }
        })
      }
    })
  },


  globalData: {
    userInfo: null
  }
})

module.exports = {
  overallData
};