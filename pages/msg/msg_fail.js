Page({
  data:{
    message:''
  },

  onLoad: function (res) {
    this.setData({
      message:res.message
    })
  }
});