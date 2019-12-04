// pages/game/template/portrait/visit/visit.js
import F2 from '../../../../../f2-canvas/lib/f2';
var appData = require('../../../../../app.js');
var common = require("../../../../../utils/util.js");

const conf = {
  ds: { //时间区间
    today: 0,
    yestoday: 1,
    week: 7,
    month: 30,
  },
  table: {
    colWidth: 90,
    tableV: {
      ds: "日期(星期)",
      visits: "访问次数",
      averageVisits: "平均访问次数",
      averageStayTime: "平均停留时间"
    },
  },
  visitType: [{
      name: 'visits',
      value: 0
    },
    {
      name: 'averageVisits',
      value: 1,
    }, {
      name: 'averageStayTime',
      value: 2
    }
  ]
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    conf: conf,
    active_ds: conf.ds.week,
    ds_bottom: false,

    gameid: 1,
    currencyRate: 1000,
    value_visitType: 0,

    option_visitType: [{
        text: '访问次数',
        value: 0
      },
      {
        text: '平均访问次数',
        value: 1
      },
      {
        text: '平均停留时间',
        value: 2
      }
    ],
    tableV: [],
    charts: []
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
      title: appData.overallData[1].name + '-访问趋势'
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
   * 访问趋势折线图的类型
   */
  visitTypeChange: function(event) {
    let visitType = event.detail;
    this.setData({
      value_visitType: visitType
    })
    this.init();
  },

  //图
  init_one: function() {
    this.oneComponent = this.selectComponent('#mychart-dom-bar');
    this.oneComponent.init((canvas, width, height) => {
      const chart = new F2.Chart({
        el: canvas,
        width,
        height,
        animate: true
      });
      chart.source(this.data.charts, {
        value: {
          // tickCount: 5,
          formatter: function formatter(ivalue) {
            return ivalue;
          },
          alias: ' ',
          min: 0,
        },
        ds: {
          tickCount: 6,
        }
      });
      chart.tooltip({
        showCrosshairs: true, //纵坐标线
        showItemMarker: false, //去小原点
      });
      // 坐标轴文本旋转
      chart.axis('ds', {
        label: {
          rotate: -Math.PI / 2.5,
          textAlign: 'end',
          textBaseline: 'middle'
        }
      });
      chart.line().position('ds*value').shape('smooth').color('l(0) 0:#F2C587 0.5:#ED7973 1:#8659AF');
      chart.point().position('ds*value').shape('smooth').style({
        stroke: '#fff',
        lineWidth: 1
      }).color('l(0) 0:#F2C587 0.5:#ED7973 1:#8659AF');
      chart.area().position('ds*value').shape('smooth').color('l(0) 0:#F2C587 0.5:#ED7973 1:#8659AF');
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
      date: parseInt(that.data.active_ds)
    }
    //请求--------------
    common.showLoading();
    wx.request({
      url: common.requestUrl + '/api/visitTrending',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'post',
      data: info,
      success: function(e) {
        wx.hideLoading();
        if (e.data.success === true) {
          let visits = e.data.visitTrendings;
          visits.forEach(item => {
            item.ds = common.week(item.ds);
            item.averageVisits = Number(item.averageVisits).toFixed(2);
            item.averageStayTime = Number(item.averageStayTime).toFixed(2);
          })

          let typeString = '';
          for (let key in that.data.conf.visitType) {
            if (that.data.conf.visitType[key].value == that.data.value_visitType) {
              typeString = that.data.conf.visitType[key].name;
              break;
            }
          }
          let charts = [];
          visits.forEach(item => {
            let chartObject = new Object();
            chartObject.ds = item.ds.substr(5, 5);
            chartObject.value = Number(item[typeString]);
            charts.push(chartObject);
          })

          that.setData({
            tableV: visits,
            charts: charts
          })
          that.init_one();
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
})