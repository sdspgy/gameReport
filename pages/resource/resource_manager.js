// pages/manager/resource_manager.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    resource_list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.findAllResource();
  },


  findAllResource: function(res) {
    var that = this;
    wx.request({
      url: 'http://localhost:8080/api/resource/findAllResource',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'token': wx.getStorageSync("token")
      },
      method: "post",
      success: function(e) {
        if (e.data.success === true) {
          that.setData({
            resource_list: JSON.parse(e.data.msg)
          })
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


  choose: function(res) {
    var id = res.currentTarget.id;
    wx.showActionSheet({
      itemList: ['删除', '权限详情'],
      success: r => {
        if (!r.cancel) {
          if (r.tapIndex === 0) {
            this.deleteResource(id)
          } else if (r.tapIndex === 1) {
            this.modifyResource(id);
          }
        }
      }
    });
  },

  deleteResource: function(id) {
    var that = this;
    wx.request({
      url: 'http://localhost:8080/api/resource/deleteResource',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'token': wx.getStorageSync("token")
      },
      method: 'post',
      data: {
        id: id
      },
      success: e => {
        if (e.data.success === true) {
          wx.showToast({
            title: e.data.msg,
            icon: 'none',
            duration: 1000
          });
          that.findAllResource();
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

  modifyResource: (id) => {
    wx.navigateTo({
      url: 'resource_edit?id=' + id,
    })
  },

  addResource: () => {
    wx.navigateTo({
      url: 'resource_add',
    })
  }

})