// pages/manager/role_manager.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    role_list: [],
    value: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.findAllRole();
  },

  findAllRole: function(res) {
    wx.request({
      url: 'http://localhost:8080/api/role/findAllRole',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'token': wx.getStorageSync("token")
      },
      method: "post",
      success: (e) => {
        if (e.data.success === true) {
          this.setData({
            'role_list': JSON.parse(e.data.msg)
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

  addRole: function(res) {
    var that = this;
    if (!(/^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,8}$/.test(this.data.value))) {
      wx.showToast({
        title: '角色名必须2-8位，且必须是中文',
        duration: 2000,
        icon: 'none'
      });
      return false;
    }

    wx.request({
      url: 'http://localhost:8080/api/role/addRole',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'token': wx.getStorageSync("token")
      },
      method: "post",
      data: {
        'name': this.data.value
      },
      success: function(e) {
        if (e.data.success === true) {
          that.findAllRole()
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
      itemList: ['删除', '角色授权'],
      success: r => {
        if (!r.cancel) {
          if (r.tapIndex === 0) {
            this.deleteRole(id)
          } else if (r.tapIndex === 1) {
            this.modifyRole(id);
          }
        }
      }
    });
  },

  modifyRole: function(id) {
    wx.navigateTo({
      url: 'role_edit?roleId=' + id,
    })
  },

  deleteRole: function(res) {
     var that = this;
    wx.request({
      url: 'http://localhost:8080/api/role/deleteRole',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'token': wx.getStorageSync("token")
      },
      method: 'post',
      data: {
        roleId: res
      },
      success: e => {
        if (e.data.success === true) {

          that.findAllRole();
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

  name: function(res) {
    this.setData({
      value: res.detail.value
    })
  }
})