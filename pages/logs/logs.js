var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置

Page({
  data: {
    tabs: ["选项一", "选项二", "选项三"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    list:[]
  },
  onLoad: function () {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
      }
    });

    wx.request({
      url: 'http://localhost:8080/findAll',
      method:'get',
      header:{
        'Content-Type':'application/json'
      },

      success:function(res){
        console.log(res.data.userList)
        that.setData({list:res.data.userList})
      }
    })
  },
  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  }
});