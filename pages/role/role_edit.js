// pages/role/role_edit.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    role_list:[],
    role_id:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var roleId = options.roleId;
    this.setData({
      role_id: roleId
    })
   this.findRoleResource(options.roleId)
  },

  checkboxChange: function (e) {
    var role_list = this.data.role_list;
    var values = e.detail.value;
    for (var i = 0, lenI = role_list.length; i < lenI; ++i) {
      role_list[i].contain = false;
      
      for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
        if (role_list[i].id === parseInt(values[j])){
          role_list[i].contain = true;
          break;
        }
      }
    }
    this.setData({
      role_list: role_list
    });
  },

  findRoleResource: function (id) {
    wx.request({
      url: 'http://localhost:8080/api/role/findRoleResource',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'token': wx.getStorageSync("token")
      },
      method: 'post',
      data: {
        roleId: id
      },
      success: e => {
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
  save:function(res){
    var ids = [];
    var role_list = this.data.role_list;
    var roleId = this.data.role_id;
    for (var i = 0, lenI = role_list.length; i < lenI; ++i) {
      if(role_list[i].contain){
        ids.push(role_list[i].id);
      }
    }
    wx.request({
      url: 'http://localhost:8080/api/role/modifyRoleResource',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'token': wx.getStorageSync("token")
      },
      method: "post",
      data: {
        resourceIds: ids,
        roleId: roleId
      },
      success: e=> {
        if(e.data.success === true){
          wx.showToast({
            title: e.data.msg,
            duration: 2000,
            icon: 'none'
          });
          // wx.redirectTo({
          //   url: '../msg/msg_success?message=' + e.data.msg
          // })
        }
        else if(e.data.verifyToken === false) {
          wx.redirectTo({
            url: '../login/login?message=' + e.data.msg
          })
        } else {
          wx.navigateTo({
            url: '../msg/msg_fail?message=' + e.data.msg
          })
        }
      }
    })
  }
})