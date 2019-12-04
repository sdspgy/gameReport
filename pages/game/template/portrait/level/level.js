// pages/game/template/portrait/portrait/level.js
import F2 from '../../../../../f2-canvas/lib/f2';
var appData = require('../../../../../app.js');
var common = require("../../../../../utils/util.js");

var chartArr = null;
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
    tableOs: {
      os: "操作系统"
    },
  },
  levelType: {
    dau_level: 0,
    install_level: 1,
    pay_level: 2,
    new_pay_level: 3,
    pay_install_level: 4
  }
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
    chartArr: [],

    option_levelType: [{
        text: '活跃等级分布',
        value: 0
      },
      {
        text: '注册等级分布',
        value: 1
      },
      {
        text: '付费等级分布',
        value: 2
      },
      {
        text: '新付费等级分布',
        value: 3
      },
      {
        text: '新注册付费等级分布',
        value: 4
      },
    ],
    value_levelType: 0,
    title: '活跃等级分布',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      gameid: appData.overallData[0],
      currencyRate: appData.overallData[1].currencyRate,
    })
    //改标题
    wx.setNavigationBarTitle({
      title: appData.overallData[1].name + '-等级分布'
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
   * 等级分布的类型
   */
  leveTypeChange: function(event) {
    let levelType = event.detail;
    this.setData({
      value_levelType: levelType
    })
    this.init();
  },

  /**
   * 层叠柱状图
   */
  init_f2: function() {
    this.retentionComponent = this.selectComponent('#level_one_F2');
    this.retentionComponent.init((canvas, width, height) => {
      const chart = new F2.Chart({
        el: canvas,
        width,
        height,
        animate: true
      });
      var defs = {
        xName: {
          range: [0.15, 0.85],
          type: 'cat'
        }
      };
      chart.source(this.data.chartArr, {
        value: {
          tickCount: 5,
          min: 0,
          formatter: function formatter(ivalue) {
            let RTrimValue = ivalue;
            return RTrimValue + '%';
          },
        },
      });
      //设置图列居中显示
      chart.legend({
        position: 'top', //图列位置
        align: 'center', //图例的对齐方式
        itemWidth: null
      });
      chart.tooltip({
        showCrosshairs: true, //纵坐标线
        showItemMarker: false, //去小原点
      });
      // 坐标轴文本旋转
      chart.axis('time', {
        label: {
          rotate: -Math.PI / 2.5,
          textAlign: 'end',
          textBaseline: 'middle'
        }
      });
      chart.interval().position('time*value').color('name').adjust('stack').shape('text');
      chart.render();
      return chart;
    });
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
      levelType: parseInt(that.data.value_levelType),
    }
    if (this.data.active_os != conf.os.none) {
      info.os = this.data.active_os;
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
          if (dauLevel && dauLevelSum) {
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
            if (Object.keys(dauLevel).length > 0 && Object.keys(dauLevelSum).length > 0) {
              let maxDate = dauLevelKeys[0];
              let maxDauLevel = dauLevel[maxDate];
              maxLevel = maxDauLevel[maxDauLevel.length - 1].level;
            }

            // 处理表头-----------
            let dauLevelTitle = new Object();
            for (let i = 1; i <= maxLevel; i++) {
              dauLevelTitle[i + 'level'] = i + '级';
            }

            let dauLevels = [],
              dauLevelSuns = [];
            for (let key in dauLevel) {
              let dauLevelObj = {};
              dauLevelObj.ds = common.week(dauLevel[key][0].ds);
              dauLevelObj.os = common.week(dauLevel[key][0].os);
              for (let i = 1; i <= maxLevel; i++) {
                dauLevelObj[i + 'level'] = 0;
              }
              dauLevel[key].forEach(item => {
                if (that.data.value_levelType == that.data.conf.levelType.dau_level) {
                  dauLevelObj[item.level + 'level'] = item.dauNum == 0 ? 0 : (item.dauLevelNumbers / item.dauNum * 100).toFixed(2);
                } else if (that.data.value_levelType == that.data.conf.levelType.install_level) {
                  dauLevelObj[item.level + 'level'] = item.installNum == 0 ? 0 : (item.installLevelNumbers / item.dauNum * 100).toFixed(2);
                } else if (that.data.value_levelType == that.data.conf.levelType.pay_level) {
                  dauLevelObj[item.level + 'level'] = item.payCount == 0 ? 0 : (item.payLevelNumbers / item.dauNum * 100).toFixed(2);
                } else if (that.data.value_levelType == that.data.conf.levelType.new_pay_level) {
                  dauLevelObj[item.level + 'level'] = item.newPayCount == 0 ? 0 : (item.newPayLevelNumbers / item.dauNum * 100).toFixed(2);
                } else if (that.data.value_levelType == that.data.conf.levelType.pay_install_level) {
                  dauLevelObj[item.level + 'level'] = item.payInstallCount == 0 ? 0 : (item.payInstallLevelNumbers / item.dauNum * 100).toFixed(2);
                }
              })
              dauLevels.push(dauLevelObj);
            }
            //聚合数据----------
            let dauLevelSumTitleNum = Math.ceil(maxLevel / 10);
            let dauLevelSumTitle = new Object();
            let chartArr = [];
            for (let i = 1; i <= dauLevelSumTitleNum; i++) {
              dauLevelSumTitle[i * 10 + 'level'] = (i * 10 - 9) + "~" + i * 10 + '级';
            }

            for (let key in dauLevelSum) {
              let dauLevelSumObject = {};
              dauLevelSumObject.ds = common.week(dauLevelSum[key][0].ds);
              dauLevelSumObject.os = common.week(dauLevelSum[key][0].os);
              dauLevelSum[key].forEach((item, index) => {
                //层叠柱状图data处理
                let chartObj = new Object();
                chartObj.name = ((index + 1) * 10 - 9) + "~" + (index + 1) * 10 + '级';
                chartObj.time = key.substr(5, 5);

                dauLevelSumObject[(index + 1) * 10 + 'level'] = item.dauNum == 0 ? 0 : (item.dauLevelNumbers / item.dauNum * 100).toFixed(2);
                chartObj.value = item.dauNum == 0 ? 0 : parseFloat((item.dauLevelNumbers / item.dauNum * 100).toFixed(2));

                chartArr.push(chartObj);
              })
              dauLevelSuns.push(dauLevelSumObject);
            }
            chartArr.sort(function(a, b) {
              if (a.time < b.time) {
                return -1;
              } else if (a.time > b.time) {
                return 1;
              } else {
                return 0;
              }
            })
            dauLevels.sort(that.compare);
            dauLevelSuns.sort(that.compare);

            let dauLevelTitles = new Object();
            let dauLevelSumTitles = new Object();
            if (that.data.active_os == conf.os.android || that.data.active_os == conf.os.ios) {
              dauLevelTitles = Object.assign({}, conf.table.tableDs, conf.table.tableOs, dauLevelTitle);
              dauLevelSumTitles = Object.assign({}, conf.table.tableDs, conf.table.tableOs, dauLevelSumTitle);
            } else {
              dauLevelTitles = Object.assign({}, conf.table.tableDs, dauLevelTitle);
              dauLevelSumTitles = Object.assign({}, conf.table.tableDs, dauLevelSumTitle);
            }

            //处理标题
            let titles = '';
            that.data.option_levelType.forEach((item, index) => {
              if (item.value == that.data.value_levelType) {
                titles = item.text;
                return
              }
            })

            that.setData({
              dauLevelTitles: dauLevelTitles,
              dauLevelSumTitles: dauLevelSumTitles,
              dauLevelData: dauLevels,
              dauLevelDataSum: dauLevelSuns,
              chartArr: chartArr,
              title: titles
            })
            that.init_f2();
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