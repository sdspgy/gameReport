import url from "../../utils/util.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    resources:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      resources:JSON.parse(options.resources)
    })
  },
})