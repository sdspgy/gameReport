// pages/game/template/portrait/paybehav/paybehav.js
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
    tableM: {
      ds: "日期(星期)",
      one: "[0,10}",
      two: "(10,50]",
      three: "(50,100]",
      foure: "(100,200]",
      five: "(200,500]",
      six: "(500,1000]",
      seven: "1000以上"
    },
    tableP: {
      ds: "日期(星期)",
      onePeople: "[0,10]",
      twoPeople: "(10,50]",
      threePeople: "(50,100]",
      fourePeople: "(100,200]",
      fivePeople: "(200,500]",
      sixPeople: "(500,1000]",
      sevenPeople: "1000以上"
    }
  }
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

    payBehavs: [],
    payBehavesChart: {},
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
      title: appData.overallData[1].name + '-付费行为'
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
      url: common.requestUrl + '/api/paymentBehavior',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'post',
      data: info,
      success: function(e) {
        wx.hideLoading();
        if (e.data.success === true) {
          let shareDailyResultTypes = e.data.shareDailyResultTypes;
          let payBehav = e.data.payBehavMap;

          let payBehavs = [];
          let numberMap = new Map();
          for (let key in payBehav) {
            //每天总付费次数
            let i = 0;
            for (let keys in payBehav[key]) {
              i += payBehav[key][keys].length;
            }
            numberMap.set(key, i);

            let payBehavObject = new Object();
            payBehavObject.ds = common.week(key);

            let sunMoneyOne = 0,
              sunMoneyTwo = 0,
              sunMoneyThree = 0,
              sunMoneyFoure = 0,
              sunMoneyFive = 0,
              sunMoneySix = 0,
              sunMoneySeven = 0;
            let peopleSetOne = new Set(),
              peopleSetTwo = new Set(),
              peopleSetThree = new Set(),
              peopleSetFoure = new Set(),
              peopleSetFive = new Set(),
              peopleSetSix = new Set(),
              peopleSetSeven = new Set();

            payBehav[key].collectOne.forEach(item => {
              sunMoneyOne += item.amount;
              peopleSetOne.add(item.userid);
            })
            let sumPeopleOne = peopleSetOne.size;
            payBehavObject.one = sunMoneyOne / appData.overallData[1].currencyRate;
            payBehavObject.onePeople = sumPeopleOne;

            payBehav[key].collectTwo.forEach(item => {
              sunMoneyTwo += item.amount;
              peopleSetTwo.add(item.userid);
            })
            let sumPeopleTwo = peopleSetTwo.size;
            payBehavObject.two = sunMoneyTwo / appData.overallData[1].currencyRate;
            payBehavObject.twoPeople = sumPeopleTwo;

            payBehav[key].collectThree.forEach(item => {
              sunMoneyThree += item.amount;
              peopleSetThree.add(item.userid);
            })
            let sumPeopleThree = peopleSetThree.size;
            payBehavObject.three = sunMoneyThree / appData.overallData[1].currencyRate;
            payBehavObject.threePeople = sumPeopleThree;

            payBehav[key].collectFoure.forEach(item => {
              sunMoneyFoure += item.amount;
              peopleSetFoure.add(item.userid);
            })
            let sumPeopleFoure = peopleSetFoure.size;
            payBehavObject.foure = sunMoneyFoure / appData.overallData[1].currencyRate;
            payBehavObject.fourePeople = sumPeopleFoure;

            payBehav[key].collectFive.forEach(item => {
              sunMoneyFive += item.amount;
              peopleSetFive.add(item.userid);
            })
            let sumPeopleFive = peopleSetFive.size;
            payBehavObject.five = sunMoneyFive / appData.overallData[1].currencyRate;
            payBehavObject.fivePeople = sumPeopleFive;

            payBehav[key].collectSix.forEach(item => {
              sunMoneySix += item.amount;
              peopleSetSix.add(item.userid);
            })
            let sumPeopleSix = peopleSetSix.size;
            payBehavObject.six = sunMoneySix / appData.overallData[1].currencyRate;
            payBehavObject.sixPeople = sumPeopleSix;

            payBehav[key].collectSeven.forEach(item => {
              sunMoneySeven += item.amount;
              peopleSetSeven.add(item.userid);
            })
            let sumPeopleSeven = peopleSetSeven.size;
            payBehavObject.seven = sunMoneySeven / appData.overallData[1].currencyRate;
            payBehavObject.sevenPeople = sumPeopleSeven;

            payBehavs.push(payBehavObject);
          }

          //折线图
          let charts = [];
          shareDailyResultTypes.sort(that.compareR);
          shareDailyResultTypes.forEach(item => {
            let i = item.dauNum == 0 ? 0 : ((numberMap.get(item.ds) || 0) / item.dauNum).toFixed(3);
            let chartObject = new Object();
            chartObject.ds = item.ds.substr(5, 5);
            chartObject.value = i;
            charts.push(chartObject);
          })

          payBehavs.sort(that.compare);

          //付费行为汇总--分组柱状图
          let payBehavTotalOne = 0,
            payBehavTotalOneP = 0,
            payBehavTotalTwo = 0,
            payBehavTotalTwoP = 0,
            payBehavTotalThree = 0,
            payBehavTotalThreeP = 0,
            payBehavTotalFoure = 0,
            payBehavTotalFoureP = 0,
            payBehavTotalFive = 0,
            payBehavTotalFiveP = 0,
            payBehavTotalSix = 0,
            payBehavTotalSixP = 0,
            payBehavTotalSeven = 0,
            payBehavTotalSevenP = 0;

          payBehavs.forEach(item => {
            payBehavTotalOne += item.one;
            payBehavTotalOneP += item.onePeople;
            payBehavTotalTwo += item.two;
            payBehavTotalTwoP += item.twoPeople;
            payBehavTotalThree += item.three;
            payBehavTotalThreeP += item.threePeople;
            payBehavTotalFoure += item.foure;
            payBehavTotalFoureP += item.fourePeople;
            payBehavTotalFive += item.five;
            payBehavTotalFiveP += item.fivePeople;
            payBehavTotalSix += item.six;
            payBehavTotalSixP += item.sixPeople;
            payBehavTotalSeven += item.seven;
            payBehavTotalSevenP += item.sevenPeople;
          })

          let payBehavesChart = [];

          let payBehavTotalOneObjectChart = new Object();
          payBehavTotalOneObjectChart.name = '付费额';
          payBehavTotalOneObjectChart.payNum = '[0,10]';
          payBehavTotalOneObjectChart.value = payBehavTotalOne;
          payBehavesChart.push(payBehavTotalOneObjectChart);

          let payBehavTotalOnePObjectChart = new Object();
          payBehavTotalOnePObjectChart.name = '付费人数';
          payBehavTotalOnePObjectChart.payNum = '[0,10]';
          payBehavTotalOnePObjectChart.value = payBehavTotalOneP;
          payBehavesChart.push(payBehavTotalOnePObjectChart);

          let payBehavTotalTwoObjectChart = new Object();
          payBehavTotalTwoObjectChart.name = '付费额';
          payBehavTotalTwoObjectChart.payNum = '(10,50]';
          payBehavTotalTwoObjectChart.value = payBehavTotalTwo;
          payBehavesChart.push(payBehavTotalTwoObjectChart);

          let payBehavTotalTwoPObjectChart = new Object();
          payBehavTotalTwoPObjectChart.name = '付费人数';
          payBehavTotalTwoPObjectChart.payNum = '(10,50]';
          payBehavTotalTwoPObjectChart.value = payBehavTotalTwoP;
          payBehavesChart.push(payBehavTotalTwoPObjectChart);

          let payBehavTotalThreeObjectChart = new Object();
          payBehavTotalThreeObjectChart.name = '付费额';
          payBehavTotalThreeObjectChart.payNum = '(50,100]';
          payBehavTotalThreeObjectChart.value = payBehavTotalThree;
          payBehavesChart.push(payBehavTotalThreeObjectChart);

          let payBehavTotalThreePObjectChart = new Object();
          payBehavTotalThreePObjectChart.name = '付费人数';
          payBehavTotalThreePObjectChart.payNum = '(50,100]';
          payBehavTotalThreePObjectChart.value = payBehavTotalThreeP;
          payBehavesChart.push(payBehavTotalThreePObjectChart);

          let payBehavTotalFoureObjectChart = new Object();
          payBehavTotalFoureObjectChart.name = '付费额';
          payBehavTotalFoureObjectChart.payNum = '(100,200]';
          payBehavTotalFoureObjectChart.value = payBehavTotalFoure;
          payBehavesChart.push(payBehavTotalFoureObjectChart);

          let payBehavTotalFourePObjectChart = new Object();
          payBehavTotalFourePObjectChart.name = '付费人数';
          payBehavTotalFourePObjectChart.payNum = '(100,200]';
          payBehavTotalFourePObjectChart.value = payBehavTotalFoureP;
          payBehavesChart.push(payBehavTotalFourePObjectChart);

          let payBehavTotalFiveObjectChart = new Object();
          payBehavTotalFiveObjectChart.name = '付费额';
          payBehavTotalFiveObjectChart.payNum = '(200,500]';
          payBehavTotalFiveObjectChart.value = payBehavTotalFive;
          payBehavesChart.push(payBehavTotalFiveObjectChart);

          let payBehavTotalFivePObjectChart = new Object();
          payBehavTotalFivePObjectChart.name = '付费人数';
          payBehavTotalFivePObjectChart.payNum = '(200,500]';
          payBehavTotalFivePObjectChart.value = payBehavTotalFiveP;
          payBehavesChart.push(payBehavTotalFivePObjectChart);

          let payBehavTotalSixObjectChart = new Object();
          payBehavTotalSixObjectChart.name = '付费额';
          payBehavTotalSixObjectChart.payNum = '(500,1000]';
          payBehavTotalSixObjectChart.value = payBehavTotalSix;
          payBehavesChart.push(payBehavTotalSixObjectChart);

          let payBehavTotalSixPObjectChart = new Object();
          payBehavTotalSixPObjectChart.name = '付费人数';
          payBehavTotalSixPObjectChart.payNum = '(500,1000]';
          payBehavTotalSixPObjectChart.value = payBehavTotalSixP;
          payBehavesChart.push(payBehavTotalSixPObjectChart);

          let payBehavTotalSevenObjectChart = new Object();
          payBehavTotalSevenObjectChart.name = '付费额';
          payBehavTotalSevenObjectChart.payNum = '1000以上';
          payBehavTotalSevenObjectChart.value = payBehavTotalSeven;
          payBehavesChart.push(payBehavTotalSevenObjectChart);

          let payBehavTotalSevenPObjectChart = new Object();
          payBehavTotalSevenPObjectChart.name = '付费人数';
          payBehavTotalSevenPObjectChart.payNum = '1000以上';
          payBehavTotalSevenPObjectChart.value = payBehavTotalSevenP;
          payBehavesChart.push(payBehavTotalSevenPObjectChart);

          that.setData({
            payBehavs: payBehavs,
            payBehavesChart: payBehavesChart,
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
      chart.source(this.data.payBehavesChart, {
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
      chart.interval()
        .position('payNum*value')
        .color('name')
        .adjust({
          type: 'dodge',
          marginRatio: 0.05 // 设置分组间柱子的间距
        });

      chart.render();
      return chart;
    });
    //折线图
    this.chartComponent = this.selectComponent('#chart2');
    this.chartComponent.init((canvas, width, height) => {
      const c2 = new F2.Chart({
        el: canvas,
        width,
        height,
        animate: true
      });
      c2.source(this.data.charts, {
        value: {
          tickCount: 4,
          formatter: function formatter(ivalue) {
            return ivalue;
          },
          alias: '人均付费数',
          min: 0,
        },
        ds: {
          // type: "timeCat",
          // mask: 'MM/DD',
          tickCount: 7,
        }
      });
      c2.tooltip({
        showCrosshairs: true, //纵坐标线
        showItemMarker: false, //去小原点
      });
      // 坐标轴文本旋转
      c2.axis('time', {
        label: {
          rotate: -Math.PI / 2.5,
          textAlign: 'end',
          textBaseline: 'middle'
        }
      });
      c2.line().position('ds*value').shape('smooth').color('l(0) 0:#F2C587 0.5:#ED7973 1:#8659AF');
      c2.area().position('ds*value').shape('smooth').color('l(0) 0:#F2C587 0.5:#ED7973 1:#8659AF');
      c2.point().position('ds*value').shape('smooth').style({
        stroke: '#fff',
        lineWidth: 1
      }).color('l(0) 0:#F2C587 0.5:#ED7973 1:#8659AF');
      c2.render();
      return c2;
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
  compareR: function(obj1, obj2) {
    var val1 = obj1.ds;
    var val2 = obj2.ds;
    if (val1 < val2) {
      return -1;
    } else if (val1 > val2) {
      return 1;
    } else {
      return 0;
    }
  },

})