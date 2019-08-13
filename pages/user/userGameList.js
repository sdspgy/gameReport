import url from "../../utils/util.js"
Page({
  data: {
    openId: '',
    games: []
  },

  onLoad: function(options) {
    this.setData({
      openId: options.openId
    })
    console.log(this.data.openId)
    this.init();
  },
  init: function() {
    wx.request({
      url: url.requestUrl + '/api/gamesUrl',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'token': wx.getStorageSync("token")
      },
      method: "post",
      data: {
        openId: this.data.openId
      },
      success: (e) => {
        if (e.data.success === true) {
          var gameList = e.data.games;
          for (let i = 0; i < e.data.gamesList.length; i++) {
            for (let n = 0; n < e.data.games.length; n++) {
              if (e.data.gamesList[i].id == e.data.games[n].id) {
                gameList[n].contain = true;
                break;
              }
            }
          }
          this.setData({
            games: gameList
          })
          console.log(gameList)
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

  checkboxChange: function(e) {
    let role_list = this.data.games;
    let ids = e.detail.value;

    for (let n = 0; n < role_list.length; n++) {
      role_list[n].contain = false;
      for (let i = 0; i < ids.length; i++) {
        if (role_list[n].id === parseInt(ids[i])) {
          role_list[n].contain = true;
          break
        }
      }
    }
    this.setData({
      games: role_list
    })
    console.log(role_list);
  },

  save: function() {
    let games = this.data.games;
    let gameIds = [];
    for (let i = 0; i < games.length; i++) {
      if (games[i].contain == true) {
        gameIds.push(games[i].id)
      }
    }
    console.log("gameIds-------" + gameIds)
    wx.request({
      url: url.requestUrl + '/api/gamesIdsByOpenId',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'token': wx.getStorageSync("token")
      },
      method: "post",
      data: {
        openId: this.data.openId,
        gameIds: gameIds
      },
      success: (e) => {
        if (e.data.success === true) {
          wx.showToast({
            title: 'success',
            icon: 'none',
            duration: 1000
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
    });
  }
})