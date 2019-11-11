// pages/game/template/portrait/portrait/level.js
import F2 from '../../../../../f2-canvas/lib/f2';
var appData = require('../../../../../app.js');
var common = require("../../../../../utils/util.js");

const conf = {
  source: { //按用户或者设备
    user: 0,
    device: 1,
  },
  os: { //操作系统 
    all: "0",
    android: "1",
    ios: "2",
    none: "-1",
  },
  ds: { //时间区间
    today: 0,
    yestoday: 1,
    week: 7,
    month: 30,
  },
  table: {
    colWidth: 90,
    tableDs: {
      ds: "日期(星期)"
    },
  },
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    conf: conf,
    active_os: conf.os.all,
    active_ds: conf.ds.week,
    ds_bottom: false,

    gameid: 1,
    currencyRate: 1000,

    dauLevelTitles: {},
    dauLevelSumTitles: {},
    dauLevelData: [],
    dauLevelDataSum: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      gameid: appData.overallData[0],
      currencyRate: appData.overallData[1].currencyRate,
    })
    common.log("游戏ID:" + this.data.gameid + "---------" + "汇率：" + this.data.currencyRate)
    this.init();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  /**
   * --------操作系统----------
   */
  osChange(event) {
    let os_active = event.detail.key;
    this.setData({
      active_os: os_active,
    });
    this.init();
  },

  /**
   * -----------时间-----------
   */
  dsChange: function(event) {
    let ds_active = event.detail;
    this.setData({
      active_ds: ds_active,
    })
    this.init();
  },

  /**
   * ------------Request--------
   */
  init: function() {
    //整理参数-----------
    const that = this;
    let info = {
      gameid: parseInt(that.data.gameid),
      date: parseInt(that.data.active_ds),
    }
    //请求--------------
    common.showLoading();
    wx.request({
      url: common.requestUrl + '/api/levelDistribution',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'post',
      data: info,
      success: function(e) {
        wx.hideLoading();
        if (e.data.success === true) {
          const dauLevel = e.data.levelDau;
          const dauLevelSum = e.data.levelDauSum;

          //最大等级-----------
          let maxLevel = 0;
          let dauLevelKeys = Object.keys(dauLevel).sort(function(o1, o2) {
            if (o1 < o2) {
              return 1;
            } else if (o1 > o2) {
              return -1;
            } else {
              return 0;
            }
          });
          let maxDate = dauLevelKeys[0];
          let maxDauLevel = dauLevel[maxDate];
          maxLevel = maxDauLevel[maxDauLevel.length - 1].level;

          // 处理表头-----------
          let dauLevelTitle = new Object();
          for (let i = 1; i <= maxLevel; i++) {
            dauLevelTitle[i + 'level'] = i + '级';
          }
          let dauLevelTitles = Object.assign({}, conf.table.tableDs, dauLevelTitle);
          if (dauLevel && dauLevelSum) {
            let dauLevels = [],
              dauLevelSuns = [];
            for (let key in dauLevel) {
              let dauLevelObj = {};
              dauLevelObj.ds = common.week(dauLevel[key][0].ds);
              for (let i = 1; i <= maxLevel; i++) {
                dauLevelObj[i + 'level'] = 0;
              }
              dauLevel[key].forEach(item => {
                dauLevelObj[item.level + 'level'] = item.dauNum == 0 ? 0 : (item.dauLevelNumbers / item.dauNum * 100).toFixed(2);
              })
              dauLevels.push(dauLevelObj);
            }
            //聚合数据----------
            let dauLevelSumTitleNum = Math.ceil(maxLevel / 10);
            let dauLevelSumTitle = new Object();
            for (let i = 1; i <= dauLevelSumTitleNum; i++) {
              dauLevelSumTitle[i * 10 + 'level'] = i * 10 + '级';
            }
            let dauLevelSumTitles = Object.assign({}, conf.table.tableDs, dauLevelSumTitle);

            for (let key in dauLevelSum) {
              let dauLevelSumObject = {};
              dauLevelSumObject.ds = common.week(dauLevelSum[key][0].ds);
              dauLevelSum[key].forEach((item, index) => {
                dauLevelSumObject[(index + 1) * 10 + 'level'] = item.dauNum == 0 ? 0 : (item.dauLevelNumbers / item.dauNum * 100).toFixed(2);
              })
              dauLevelSuns.push(dauLevelSumObject);
            }

            dauLevels.sort(that.compare);
            dauLevelSuns.sort(that.compare);

            that.setData({
              dauLevelTitles: dauLevelTitles,
              dauLevelSumTitles: dauLevelSumTitles,
              dauLevelData: dauLevels,
              dauLevelDataSum: dauLevelSuns,
            })
          }
        } else {
          common.showSuccess("请联系管理员！");
        }
      },
      error: function(e) {
        wx.hideLoading();
        common.showSuccess("请求失败！");
      }
    })
  },

  /**
   * -------------排序------------
   */
  compare: function(obj1, obj2) {
    var val1 = obj1.ds;
    var val2 = obj2.ds;
    if (val1 < val2) {
      return 1;
    } else if (val1 > val2) {
      return -1;
    } else {
      return 0;
    }
  },

})