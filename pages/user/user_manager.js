import url from "../../utils/util.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user_list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.findAllUser()
  },

  findAllUser: function (res) {
    wx.request({
      url: url.requestUrl + '/api/user/findAllUser',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'token': wx.getStorageSync("token")
      },
      method: "post",
      success: e=> {
        if (e.data.success) {
          this.setData({
            user_list:JSON.parse(e.data.msg)
          })
        } else {
          wx.redirectTo({
            url: '../login/login?message=' + e.data.msg
          })
        }
      }
    })
  },

  choose: function (res) {
    var id = res.currentTarget.id;
    wx.showActionSheet({
      itemList: ['查看详情','拉黑'],
      success: r => {
        if (!r.cancel) {
          if (r.tapIndex === 0) {
            this.findUserDetail(id)
          }else{
            this.blackUser(id);
          }
        }
      }
    });
  },

  findUserDetail: function (id) {
    wx.navigateTo({
      url: 'user?message='+id,
    })
  },

  modifyUserRole: function (id) {
    wx.navigateTo({
      url: 'user_change_role?message=' + id,
    })
  },

})