import F2 from '../../../../f2-canvas/lib/f2';
var appData = require('../../../../app.js');
var common = require("../../../../utils/util.js");

var timer;

Page({

  data: {
    gameid: 1,
    currencyRate: 1000,
    smillBorder: [{
      name: '等级分布',
      bgc: false,
      url: './level/level',
    }, {
      name: '付费行为',
      bgc: false,
      url: './level/level',
    }, {
      name: 'Ip匹配',
      bgc: false,
      url: './level/level',
    }, {
      name: '在线时长',
      bgc: false,
      url: './level/level',
    }, {
      name: '大R',
      bgc: false,
      url: './level/level',
    }, {
      name: '机型网络分布',
      bgc: false,
      url: './level/level',
    }, {
      name: '消费道具',
      bgc: false,
      url: './level/level',
    }, {
      name: '产出道具',
      bgc: false,
      url: './level/level',
    }, {
      name: '广告分析',
      bgc: false,
      url: './level/level',
    }],
  },

  /*----------------init-------------*/
  onLoad: function(options) {
    this.setData({
      gameid: appData.overallData[0],
      currencyRate: appData.overallData[1].currencyRate,
    })
    common.log("游戏ID:" + this.data.gameid + "---------" + "汇率：" + this.data.currencyRate)
    // this.delayedTimer();
  },

  /*----------------click小盒子-------------*/
  borderClick(options) {
    let url = options.currentTarget.dataset.url;
    wx.navigateTo({
      url: url
    })
  },

  /*----------------定时器-------------*/
  changeSmillBGC: function() {
    const that = this;
    let borders = that.data.smillBorder;
    let i = 0;
    let math = 0;
    timer = setInterval(function() {
      /*------------跑马灯-----------*/
      // if (i >= borders.length) {
      //   i = 0;
      // }
      // borders.forEach(function(item) {
      //   item.bgc = false;
      // });
      // let current = i == 0 ? borders.length : i;
      // borders[current - 1].bgc = false;
      // borders[i].bgc = true;
      /*------------随机-----------*/
      // let math = common.math(borders.length);

      for (; math == i;) {
        math = common.math(borders.length);
      }
      borders[i].bgc = false;
      borders[math].bgc = true;
      that.setData({
        smillBorder: borders
      });
      i = math;
      // i++;
    }, 1000);
  },

  cleanTimer: function() {
    clearInterval(timer);
  },

  delayedTimer: function() {
    const that = this;
    var disposableTimer = setTimeout(function() {
      that.changeSmillBGC();
    }, 6 * 1000);
  },

  /*----------------返回-------------*/
  back: function() {
    wx.redirectTo({
      url: '../../../index/index',
    })
  },

})