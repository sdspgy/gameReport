// pages/user/user_change_role.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    role_list: [],
    role_name: [],
    index: 0,
    openId: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var str = new Array();
    str = options.roleId.split(",");
    var roleId = str[0];
    this.setData({
        'openId': str[1],
      }),
      wx.request({
        url: 'http://localhost:8080/api/role/findAllRole',
        header: {
          'content-type': 'application/x-www-form-urlencoded',
          'token': wx.getStorageSync("token"),
        },
        method: 'post',
        success: res => {
          var names = [];
          if (res.data.success) {
            var roles = JSON.parse(res.data.msg);
            this.setData({
              role_list: roles
            })

            for (var i = 0, lenI = roles.length; i < lenI; ++i) {
              names.push(roles[i].name);
              if (roles[i].id === parseInt(roleId)) {
                this.setData({
                  index: i
                })
              }
            }
            this.setData({
              role_name: names
            })
          } else if (!res.data.verifyToken) {
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

  bindRoleChange: function(e) {
    // console.log(this.data.role_list[e.detail.value].id);
    // console.log(this.data.openId);
    wx.request({
      url: 'http://localhost:8080/api/user/GrantUserRole',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'token': wx.getStorageSync("token")
      },
      method: "post",
      data: {
        roleId: this.data.role_list[e.detail.value].id,
        openId: this.data.openId
      },
      success: e => {
        if (e.data.success === true) {
          console.log(e);
          // for (var i = 0, lenI = this.data.role_list.length; i < lenI; ++i) {
          //   if (this.data.role_list[i].id == parseInt(e.data.msgs.roleId)) {
          //     this.setData({
          //       'index': i
          //     })
          //   }
          // }
          wx.navigateBack({
            delta: 2
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

})