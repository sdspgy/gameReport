// pages/game/template/portrait/online/online.js
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
      duration: "持续时长",
      durationNumbers: "人数",
      durationRetentionNumbers: "留存用户数"
    },
  },
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
      title: appData.overallData[1].name + '-在线时长'
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

  //表格横行被点击
  onRowTap: function({
    detail
  }) {
    let index = detail.index;
    let firstData = [];
    this.data.tableV.forEach(item => {
      //取出最近一天的
      if (item.ds == this.data.tableV[index].ds) {
        firstData.push(item);
      }
    })

    let charts = [];
    firstData.forEach(item => {
      let peoplesObj = new Object();
      peoplesObj.name = '人数';
      peoplesObj.duration = item.duration;
      peoplesObj.value = item.durationNumbers;
      let dauNumObj = new Object();
      dauNumObj.name = '留存用户数';
      dauNumObj.duration = item.duration;
      dauNumObj.value = item.durationRetentionNumbers;
      charts.push(peoplesObj);
      charts.push(dauNumObj);
    })

    this.setData({
      charts: charts
    })
    this.init_f2()
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
      url: common.requestUrl + '/api/online',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'post',
      data: info,
      success: function(e) {
        wx.hideLoading();
        if (e.data.success === true) {
          let onlines = e.data.onlineDurationDistributions;
          onlines.sort(that.compare);
          let firstData = [];
          onlines.forEach(item => {
            item.ds = common.week(item.ds);
            //取出最近一天的
            if (item.ds == onlines[0].ds) {
              firstData.push(item);
            }
          })
          //处理分组柱状图数据
          let charts = [];
          firstData.forEach(item => {
            let peoplesObj = new Object();
            peoplesObj.name = '人数';
            peoplesObj.duration = item.duration;
            peoplesObj.value = item.durationNumbers;
            let dauNumObj = new Object();
            dauNumObj.name = '留存用户数';
            dauNumObj.duration = item.duration;
            dauNumObj.value = item.durationRetentionNumbers;
            charts.push(peoplesObj);
            charts.push(dauNumObj);
          })

          that.setData({
            tableV: onlines,
            charts: charts
          })
          that.init_f2();
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
   * 层叠柱状图
   */
  init_f2: function() {
    this.retentionComponent = this.selectComponent('#payBehav_one_F2');
    this.retentionComponent.init((canvas, width, height) => {
      const chart = new F2.Chart({
        el: canvas,
        width,
        height,
        animate: true
      });
      // var defs = {
      //   xName: {
      //     range: [0.15, 0.85],
      //     type: 'cat'
      //   }
      // };
      chart.source(this.data.charts, {
        // value: {
        //   tickCount: 5,
        //   min: 0,
        //   // formatter: function formatter(ivalue) {
        //   //   let RTrimValue = ivalue;
        //   //   return RTrimValue;
        //   // },
        // },
      });
      //设置图列居中显示
      chart.legend({
        position: 'top', //图列位置
        align: 'center', //图例的对齐方式
        itemWidth: null
      });
      chart.tooltip({
        // showTitle: true, // 展示  tooltip 的标题
        layout: 'vertical',
        // showCrosshairs: true, //纵坐标线
        showItemMarker: false, //去小原点
      });
      // 坐标轴文本旋转
      // chart.axis('payNum', {
      //   label: {
      //     rotate: -Math.PI / 2.5,
      //     textAlign: 'end',
      //     textBaseline: 'middle'
      //   }
      // });

      // 柱状图添加文本
      // this.data.charts.forEach(function(obj) {
      //   chart.guide().text({
      //     position: [obj.duration, obj.value],
      //     content: obj.value,
      //     style: {
      //       textAlign: 'center',
      //       textBaseline: 'bottom'
      //     },
      //     // offsetX: -2,
      //     // offsetY: -2
      //   });
      // });

      chart.interval()
        .position('duration*value')
        .color('name')
        .adjust({
          type: 'dodge',
          marginRatio: 0.05 // 设置分组间柱子的间距
        });

      chart.render();
      return chart;
    });
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