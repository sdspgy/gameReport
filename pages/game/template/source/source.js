import * as echarts from '../../../../ec-canvas/echarts';
// 全局提示
const {
  $Message
} = require('../../../../dist/base/index');

const conf = {
  navData: [{
    name: "概况", //文本
    currentMenu: 0, //是否是当前页，0不是  1是
    style: 0, //样式
    ico: 'dynamic_fill', //不同图标
    fn: 'gotoIndex' //对应处理函数
  }, {
    name: "新进",
    currentMenu: 1,
    style: 0,
    ico: 'mine_fill',
    fn: 'gotoOldGoods'
  }, {
    name: "留存",
    currentMenu: 0,
    style: 1,
    ico: 'picture_fill',
    fn: 'gotoPublish'
  }, {
    name: "付费",
    currentMenu: 0,
    style: 0,
    ico: 'redpacket_fill',
    fn: 'gotoRecruit'
  }, {
    name: "其他",
    currentMenu: 0,
    style: 0,
    ico: 'task_fill',
    fn: 'gotoMine'
  }, ],
}
Page({

  onLoad: function(e) {
    this.setData({
      gameid: e.gameId
    })
    console.log("gameId-----" + this.data.gameid)
  },

  data: {
    navData: conf.navData,
    gameid: '',
  },

  // 底部跳转
  gotoIndex: function() {
    wx.redirectTo({
      url: '../survey/survey?gameId=' + this.data.gameid,
    });
  },
  gotoPublish: function() {
    wx.redirectTo({
      url: '../retention/retention?gameId=' + this.data.gameid,
    });
  },
  gotoRecruit: function() {
    wx.redirectTo({
      url: '../pay/pay?gameId=' + this.data.gameid,
    });
  },
  gotoMine: function() {
    wx.redirectTo({
      url: '../portrait/portrait?gameId=' + this.data.gameid,
    });
  },

})