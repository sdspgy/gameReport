import F2 from '../../../../f2-canvas/lib/f2';
import url from "../../../../utils/util.js";
var appData = require('../../../../app.js');
var common = require("../../../../utils/util.js");
// 全局提示
const {
  $Message
} = require('../../../../dist/base/index');
const app = getApp()
var chart1 = null;
var chart2 = null;
var conf = {
  source: { //按用户或者设备
    user: 0,
    device: 1
  },
  os: { //操作系统 
    all: "0",
    android: "1",
    ios: "2",
    none: "-1"
  },
  timeArea: { //时间区间
    today: 0,
    yestoday: 1,
    week: 7,
    month: 30
  },
  sourceCliCre: {
    client: {
      val: "client",
      choice: [{
          key: -1,
          name: "所有服",
        },
        {
          key: 1,
          name: "1服"
        }, {
          key: 2,
          name: "2服"
        }, {
          key: 3,
          name: "3服"
        }, {
          key: 4,
          name: "4服"
        }, {
          key: 5,
          name: "5服"
        },
        {
          key: 6,
          name: "6服"
        },
        {
          key: 7,
          name: "7服"
        },
        {
          key: 8,
          name: "8服"
        },
        {
          key: 9,
          name: "9服"
        },
        {
          key: 10,
          name: "10服"
        },
      ]
    },
    creative: {
      val: "creative",
      choice: [{
          key: 0,
          name: "全渠道"
        },
        {
          key: 1,
          name: "moegoApp"
        },
        {
          key: 2,
          name: "huawei"
        },
        {
          key: 3,
          name: "m360"
        },
        {
          key: 4,
          name: "meizu"
        },
        {
          key: 5,
          name: "oppo"
        },
        {
          key: 6,
          name: "sougou"
        },
        {
          key: 7,
          name: "vivo"
        },
        {
          key: 8,
          name: "xiaomi"
        },
        {
          key: 9,
          name: "yyb"
        },
        {
          key: 10,
          name: "AppStore"
        },
        {
          key: 11,
          name: "TL10"
        },
        {
          key: 12,
          name: "aliyun"
        },
        {
          key: 13,
          name: "lenovo"
        },
      ]
    },
    daily: {
      val: "daily",
      choice: []
    }
  },
  table: {
    colWidth: 90
  },
};
let titles = {
    installNum: "注册数",
    dauNum: "活跃数",
    payCount: "付费人数",
    payAmount: "付费总额",
    payRate: "付费率", // 付费人数/活跃数 *
    ARPU: "ARPU", //付费总额/活跃数 *
    ARPPU: "ARPPU", //付费总额/付费人数 *

    payInstallRate: "注册付费率", //注册付费人数/注册人数*
    payInstallCount: "注册付费人数",
    payInstallAmount: "注册付费总额",
    payInstallARPU: "注付ARPU", //注册付费总额/注册人数*
    payInstallARPPU: "注付ARPPU", //注册付费总额/注册付费人数*

    payTimes: "付费次数",
    payInstallTimes: "注册付费次数"
  },
  tableDs = {
    ds: "日期（星期）",
  },
  table2 = {
    dr: "注册数",
    oneRetentionPercentage: "1日",
    twoRetentionPercentage: "2日",
    threeRetentionPercentage: "3日",
    fourRetentionPercentage: "4日",
    fiveRetentionPercentage: "5日",
    sixRetentionPercentage: "6日",
    sevenRetentionPercentage: "7日",
    eightRetentionPercentage: "8日",
    nineRetentionPercentage: "9日",
    tenRetentionPercentage: "10日",
    elevenRetentionPercentage: "11日",
    twelveRetentionPercentage: "12日",
    thirteenRetentionPercentage: "13日",
    fourteenRetentionPercentage: "14日",
    fifteenRetentionPercentage: "15日",
    sixteenRetentionPercentage: "16日",
    seventeenRetentionPercentage: "17日",
    eighteenRetentionPercentage: "18日",
    nineteenRetentionPercentage: "19日",
    twentyteenRetentionPercentage: "20日",
    twentyOneteenRetentionPercentage: "21日",
    twentyTwoRetentionPercentage: "22日",
    twentyThreeRetentionPercentage: "23日",
    twentyFourRetentionPercentage: "24日",
    twentyFiveRetentionPercentage: "25日",
    twentySixRetentionPercentage: "26日",
    twentySevenRetentionPercentage: "27日",
    twentyEightRetentionPercentage: "28日",
    twentyNineRetentionPercentage: "29日",
    thirtyRetentionPercentage: "30日",
  },
  tableOs = {
    os: "操作系统"
  },
  tableCreative = {
    creative: "渠道"
  },
  tableClient = {
    clientid: "服"
  },
  tableDayHour = {
    dayOfHour: '～时'
  }

Page({

  /**
   * 生命周期
   * ---------------------------------------------------------------------
   */
  onLoad: function(options) {
    // 页面创建时执行
    this.setData({
      gameid: appData.overallData[0]
    });
    let obj = Object.assign({}, tableDs, titles);
    let payTitlesCC = Object.assign({}, tableDs, tableOs, titles);
    let retentionTitles = Object.assign({}, tableDs, table2);
    this.setData({
      payTitles: obj,
      payTitlesCC: payTitlesCC,
      retentionTitles: retentionTitles
    })
    this.initChart2([]);
    this.queryAndUpdate();
  },
  onShow: function() {
    // 页面出现在前台时执行
  },
  onReady: function() {
    // 页面首次渲染完毕时执行
  },
  onHide: function() {
    // 页面从前台变为后台时执行
  },
  onUnload: function() {
    // 页面销毁时执行
  },
  onPullDownRefresh: function() {
    // 触发下拉刷新时执行
  },
  onReachBottom: function() {
    // 页面触底时执行
  },
  onShareAppMessage: function() {
    // 页面被用户分享时执行
  },
  onPageScroll: function() {
    // 页面滚动时执行
  },
  onResize: function() {
    // 页面尺寸变化时执行
  },
  onTabItemTap(item) {},

  /**
   * 数据
   * -------------------------------------------------------------------------------------------------------
   */
  data: {
    conf: conf,
    source: conf.source.user,
    sourceCliCre: conf.sourceCliCre.daily.val,
    sourceCliCreChoice: 0, //分服和分渠道的选择
    sourceCliCreChoices: conf.sourceCliCre.creative.choice, //分服和分渠道的选择列表
    isShowVanTabs: false,
    os: conf.os.all,
    timeArea: conf.timeArea.week,
    tableData: [],
    chartTitle2: "图表暂无数据",
    navData: conf.navData,
    gameid: '',
    type: {
      0: "info",
      1: "ghost"
    },
    chartData1: [{
        name: '今日',
        value: 90
      },
      {
        name: '昨日',
        value: 83
      },
      {
        name: '7天',
        value: 61
      },
      {
        name: '30天',
        value: 65
      }
    ],
    payTitles: titles,
    handelPayCount: [],
    page: 1,
    payTitlesCC: [],
    retentionTitles: table2,
    showTable: true,
    tableDataCC: [],
    retentionTitlestable: [],
    retentionTitlestableOS: [],
    pieChartArray: [],
    pieChartTitle: '',
  },

  /**
   * 事件绑定
   * ---------------------------------------------------------------------------------
   */

  // 按用户和按设备change
  sourceChange: function(event) {
    // console.log(event);
    let button = event.currentTarget;
    let sourcet = button.dataset.source;
    if (this.data.source != sourcet) {
      let type = this.data.type;
      type[this.data.source] = "ghost";
      type[sourcet] = "info";
      this.setData({
        source: button.dataset.source,
        type: type
      })
      this.reset();
      this.queryAndUpdate();
    }
  },
  //分服和分渠道选择change
  sourceCliCreChange: function({
    detail
  }) {
    if (this.data.sourceCliCre != detail.key) {
      this.setData({
        sourceCliCre: detail.key,
        sourceCliCreChoices: conf.sourceCliCre[detail.key].choice,
        sourceCliCreChoice: 0
      });
      if (detail.key == conf.sourceCliCre.daily.val) {
        this.setData({
          isShowVanTabs: false
        })
      } else {
        this.setData({
          isShowVanTabs: true
        })
      }
      if (detail.key == "daily") {
        if (this.data.os == conf.os.android || this.data.os == conf.os.ios) {
          let obj = Object.assign({}, tableDs, tableOs, titles);
          this.setData({
            payTitles: obj,
            retentionTitles: retentionTitles,
          })
        } else {
          let obj = Object.assign({}, tableDs, titles);
          this.setData({
            payTitles: obj
          })
        }
      }
      if (detail.key == "creative") {
        if (this.data.os == -1) {
          let obj = Object.assign({}, tableDs, tableCreative, titles);
          this.setData({
            payTitles: obj
          })
        } else {
          let obj = Object.assign({}, tableDs, tableOs, tableCreative, titles);
          this.setData({
            payTitles: obj
          })
        }
      }
      if (detail.key == "client") {
        if (this.data.os == -1) {
          let obj = Object.assign({}, tableDs, tableClient, titles);
          this.setData({
            payTitles: obj
          })
        } else {
          let obj = Object.assign({}, tableDs, tableOs, tableClient, titles);
          this.setData({
            payTitles: obj
          })
        }
      }
    }
    this.reset();
    this.queryAndUpdate();
    // console.log(this.data.sourceCliCreChoice);
  },
  sourceCliCreChoiceChange: function({
    detail
  }) {
    if (this.data.sourceCliCreChoice != detail.name) {
      this.setData({
        sourceCliCreChoice: detail.name
      });
      this.reset();
      this.queryAndUpdate();
    }
  },
  //os change
  osChange: function({
    detail
  }) {
    if (detail.key == -1) {
      if (this.data.sourceCliCre == "daily") {
        let obj = Object.assign({}, tableDs, titles);
        this.setData({
          payTitles: obj
        })
      };
      if (this.data.sourceCliCre == "creative") {
        let obj = Object.assign({}, tableDs, tableCreative, titles);
        this.setData({
          payTitles: obj
        })
      };
      if (this.data.sourceCliCre == "client") {
        let obj = Object.assign({}, tableDs, tableClient, titles);
        this.setData({
          payTitles: obj
        })
      }
    } else {
      if (this.data.sourceCliCre == "daily") {
        if (detail.key == "0") {
          let obj = Object.assign({}, tableDs, titles);
          let retentionTitles = Object.assign({}, tableDs, table2);

          this.setData({
            payTitles: obj,
            retentionTitles: retentionTitles,
          })

        } else {
          let obj = Object.assign({}, tableDs, tableOs, titles);
          let retentionTitles = Object.assign({}, tableDs, tableOs, table2);

          this.setData({
            payTitles: obj,
            retentionTitles: retentionTitles,
          })

        }
      };
      if (this.data.sourceCliCre == "creative") {
        let obj = Object.assign({}, tableDs, tableOs, tableCreative, titles);
        let retentionTitles = Object.assign({}, tableDs, table2);
        if (detail.key == "0") {
          this.setData({
            retentionTitles: retentionTitles,
          })
        } else {
          retentionTitles = Object.assign({}, tableDs, tableOs, table2);
          this.setData({
            retentionTitles: retentionTitles,
          })
        }
        this.setData({
          payTitles: obj
        })
      };
      if (this.data.sourceCliCre == "client") {

        let obj = Object.assign({}, tableDs, tableOs, tableClient, titles);
        let retentionTitles = Object.assign({}, tableDs, table2);
        if (detail.key == "0") {
          this.setData({
            retentionTitles: retentionTitles,
          })
        } else {
          retentionTitles = Object.assign({}, tableDs, tableOs, table2);
          this.setData({
            retentionTitles: retentionTitles,
          })
        }

        this.setData({
          payTitles: obj
        })
      };
    }
    if (this.data.os != detail.key) {
      this.setData({
        os: detail.key
      });
      this.reset();
      this.queryAndUpdate();
    }
  },
  //时间区间选择 change
  timeAreaChange: function({
    detail
  }) {
    if (this.data.timeArea != detail.key) {
      this.setData({
        timeArea: detail.key
      })
      this.reset();
      this.queryAndUpdate();
    }
  },
  //表格横行被点击
  onRowTap: function({
    detail
  }) {
    // console.log(detail.index + ":" + JSON.stringify(detail.data));
    let tableData = this.data.tableDataCC,
      indexs = 0,
      pieChartArray = [];
    if (detail != undefined) {
      indexs = detail.index
    }
    if (conf.timeArea.week == this.data.timeArea || conf.timeArea.month == this.data.timeArea) {
      tableData.forEach((item, index) => {
        if (tableData[indexs].ds == item.ds) {
          pieChartArray.push(item);
        }
      })
    }

    if (conf.timeArea.yestoday == this.data.timeArea || conf.timeArea.today == this.data.timeArea) {
      let iOSObject = new Object(),
        androidObject = new Object();
      let iOSInstallTotal = 0,
        iOSDauNumTotal = 0,
        androidInstallTotal = 0,
        androidDauNumTotal = 0;
      tableData.forEach((item) => {
        if (item.os == 'iOS') {
          iOSInstallTotal += item.installNum;
          iOSDauNumTotal += item.dauNum;
        } else if (item.os == 'android') {
          androidInstallTotal += item.installNum;
          androidDauNumTotal += item.dauNum;
        } else {}
      })
      iOSObject.ds = tableData[0].ds;
      iOSObject.os = 'iOS';
      iOSObject.installNum = iOSInstallTotal;
      iOSObject.dauNum = iOSDauNumTotal;
      androidObject.os = 'android';
      androidObject.installNum = androidInstallTotal;
      androidObject.dauNum = androidDauNumTotal;
      pieChartArray.push(iOSObject);
      pieChartArray.push(androidObject);
    }

    this.setData({
      pieChartArray: pieChartArray,
      pieChartTitle: pieChartArray[0].ds,
    })
    this.makePieChart(pieChartArray);
  },

  makePieChart: function(info) {
    let dauNumTotal = 0,
      installNumTotal = 0;
    info.forEach(item => {
      dauNumTotal += item.dauNum;
      installNumTotal += item.installNum;
    })
    var map_pieChartD = {},
      map_pieChartI = {};
    info.map(function(obj) {
      map_pieChartD[obj.os] = (obj.dauNum / dauNumTotal * 100).toFixed(2) + '%';
      map_pieChartI[obj.os] = (obj.installNum / installNumTotal * 100).toFixed(2) + '%';
    })
    this.pieChartComponent = this.selectComponent('#pieChartD');
    this.pieChartComponent.init((canvas, width, height) => {
      const chart = new F2.Chart({
        el: canvas,
        width,
        height,
        animate: true
      });
      chart.source(info, {
        dauNum: {
          formatter: function formatter(val) {
            return val;
          }
        }
      });
      chart.legend({
        position: 'top',
        itemFormatter: function itemFormatter(val) {
          return val + '  ' + map_pieChartD[val];
        },
        align: 'center', //图例的对齐方式
        itemWidth: null
      });
      chart.coord('polar', {
        transposed: true,
        radius: 0.85
      });
      chart.axis(false);
      chart.interval().position('a*dauNum').color("os", ['#1890FF', '#13C2C2', '#2FC25B', '#FACC14', '#F04864', '#8543E0']).adjust('stack').style({
        lineWidth: 1,
        stroke: '#fff',
        lineJoin: 'round',
        lineCap: 'round'
      }).animate({
        appear: {
          duration: 1200,
          easing: 'bounceOut'
        }
      });
      chart.render();
    })
    /**
     * 饼图新增--------------------------------------------------------------   
     */
    this.pieChartComponent = this.selectComponent('#pieChartI');
    this.pieChartComponent.init((canvas, width, height) => {
      const chart = new F2.Chart({
        el: canvas,
        width,
        height,
        animate: true
      });
      chart.source(info, {
        installNum: {
          formatter: function formatter(val) {
            return val;
          }
        }
      });
      chart.legend({
        position: 'top',
        itemFormatter: function itemFormatter(val) {
          return val + '  ' + map_pieChartI[val];
        },
        align: 'center', //图例的对齐方式
        itemWidth: null
      });
      chart.coord('polar', {
        transposed: true,
        radius: 0.85
      });
      chart.axis(false);
      chart.interval().position('a*installNum').color("os", ['#1890FF', '#13C2C2', '#2FC25B', '#FACC14', '#F04864', '#8543E0']).adjust('stack').style({
        lineWidth: 1,
        stroke: '#fff',
        lineJoin: 'round',
        lineCap: 'round'
      }).animate({
        appear: {
          duration: 1200,
          easing: 'bounceOut'
        }
      });
      chart.render();
    })
  },
  //表格竖行被点击
  onColTap: function({
    detail
  }) {
    // console.log(detail.col + ":" + JSON.stringify(detail.data));
    let len = detail.data.length - 1;
    let data = [];
    //chart title设置
    var title = '';

    if (detail.data.length == 0) {
      title = "图表暂无数据";
    } else {
      let timeArea = this.data.timeArea;
      switch (parseInt(timeArea)) {
        case conf.timeArea.today:
          title += "今日";
          break;
        case conf.timeArea.yestoday:
          title += "昨日";
          break;
        case conf.timeArea.week:
          title += "一周内";
          break;
        case conf.timeArea.month:
          title += "一月内";
          break;
      }
      if (this.data.sourceCliCre == conf.sourceCliCre.client.val) {
        title += conf.sourceCliCre.client.choice[this.data.sourceCliCreChoice].name;
      }
      let os = this.data.os;
      switch (os) {
        case conf.os.all:
          title += "全平台";
          break;
        case conf.os.android:
          title += "安卓平台";
          break;
        case conf.os.ios:
          title += "苹果平台";
          break;
      }
      title += conf.table.titles[detail.col] + "变化趋势";
    }
    this.setData({
      chartTitle2: title
    })
    detail.data.forEach((value, index) => {
      let d = new Object();
      d.i = len - index;
      d.value = value;
      data[index] = d;
    })
    this.updateChart2Data(data);
  },

  /**
   * functions
   * -------------------------------------------------------------------------------------------
   */

  //初始化图表
  initChart1: function() {
    var that = this;
    /*在这里改变一下结构即可*/
    that.chartComponent = that.selectComponent('#chart1');
    that.chartComponent.init((canvas, width, height) => {
      const c1 = new F2.Chart({
        el: canvas,
        width,
        height,
        animate: true
      });
      c1.source(this.data.handelPayCount, {
        value: {
          // tickCount: 5,
          formatter: function formatter(value) {
            return value;
          }
        },
        name: {

        }

      });
      c1.tooltip({
        showItemMarker: false,
        onShow(ev) {
          const {
            items
          } = ev;
          items[0].name = null;
          items[0].name = items[0].title;
          items[0].value = items[0].value;
        }
      });

      c1.interval().position('time*value').shape('smooth').color('l(0) 0:#F2C587 0.5:#ED7973 1:#8659AF');
      c1.area().position('year*age').shape('smooth').color('l(0) 0:#F2C587 0.5:#ED7973 1:#8659AF');
      c1.render();
      chart1 = c1;
    })
  },

  initChart2: function() {
    /*在这里改变一下结构即可*/
    let that = this;
    that.chartComponent = that.selectComponent('#chart2');
    that.chartComponent.init((canvas, width, height) => {
      const c2 = new F2.Chart({
        el: canvas,
        width,
        height,
        animate: true
      });
      c2.source(this.data.handelPayCount, {
        value: {
          // tickCount: 5,
          formatter: function formatter(ivalue) {
            return ivalue;
          }
        },
        time: {
          // type: "timeCat",
          // mask: 'MM/DD',
          tickCount: 7,
        }
      });
      //设置图列居中显示
      c2.legend({
        position: 'top', //图列位置
        align: 'center', //图例的对齐方式
        itemWidth: null
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
      c2.line().position('time*value').shape('smooth').color('type');

      c2.render();
      return c2;
    })
  },

  updateChart2Data: function(data) {
    chart2.changeData(data);
  },

  queryAndUpdate: function() {
    let clientid = this.data.sourceCliCre == conf.sourceCliCre.client.val ? conf.sourceCliCre.client.choice[this.data.sourceCliCreChoice].key : null;
    let creative = this.data.sourceCliCre == conf.sourceCliCre.creative.val ? conf.sourceCliCre.creative.choice[this.data.sourceCliCreChoice].key : null;
    if (this.data.os == "0" && this.data.sourceCliCre == "daily") {
      let titleAI = Object.assign({}, tableDayHour, this.data.payTitlesCC);
      delete titleAI.ds;
      let newTitle = Object.assign({}, tableDs, titleAI);
      this.setData({
        showTable: true,
        payTitlesCC: newTitle,
      })
      if (this.data.timeArea == conf.timeArea.week || this.data.timeArea == conf.timeArea.month) {
        delete newTitle.dayOfHour;
        this.setData({
          payTitlesCC: newTitle,
        })
      }
    } else {
      this.setData({
        showTable: false,
      })
    };
    let titleAdd = Object.assign({}, tableDayHour, this.data.payTitles);
    delete titleAdd.ds;
    let newTitle = Object.assign({}, tableDs, titleAdd);
    this.setData({
      payTitles: newTitle
    })

    if (this.data.timeArea == conf.timeArea.week || this.data.timeArea == conf.timeArea.month) {
      delete newTitle.dayOfHour;
      this.setData({
        payTitles: newTitle
      })
    }
    this.query(this.data.source, this.data.gameid, this.data.timeArea, clientid, this.data.os, creative, this.data.page);
  },

  //滚动条底部事件
  onBottomTap: function() {
    this.data.page += 1;
    this.queryAndUpdate();
  },

  back: function() {
    wx.redirectTo({
      url: '../../../index/index',
    })
  },

  //查询
  query: function(source, gameid, day, clientid, os, creative, page) {
    let data = {
      source: source,
      gameid: gameid,
      day: day,
      os: os,
      page: page,
    }
    let deteday = {
      gameid: gameid,
      day: day,
      os: os,
    }
    if (creative != null) {
      data.creative = creative;
    }
    if (clientid != null) {
      data.clientid = clientid;
    }
    // console.log(JSON.stringify(data));
    wx.request({
      url: url.requestUrl + "/api/pay/query",
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'token': wx.getStorageSync("token")
      },
      data: data,
      method: "post",
      success: (res) => {
        //渠道信息
        let creatives = (res.data.creatives).map(item => ({
          key: item.creativeid,
          name: item.creativeName,
        }));
        let allObject = new Object();
        allObject.key = '0';
        allObject.name = '全渠道';
        creatives.unshift(allObject);
        conf.sourceCliCre.creative.choice = creatives;
        //放入Map,creativeid为key
        let creativeMap = new Map();
        creatives.forEach((item, index) => {
          creativeMap.set(item.key, item.name)
        })

        let tableData = this.tableDataProcess(res.data.msg, creativeMap);
        let tableDataCC = [];
        if (res.data.sharePayResultTypesCC) {
          tableDataCC = this.tableDataProcess(res.data.sharePayResultTypesCC, creativeMap);
        };

        if (res.data.msg.length != 0 && this.data.page != 1) {
          wx.showToast({
            title: "加载第" + this.data.page + "页",
            icon: 'success',
            duration: 1000
          });
        }
        if (res.data.msg.length == 0 && this.data.page != 1) {
          wx.showToast({
            title: "已经是最后一页数据",
            icon: 'fail',
            duration: 1000
          });
        }
        let tables = [];
        if (this.data.tableData == null) {
          tables = tableData;
        } else {
          tables = this.data.tableData.concat(tableData);
        }
        let handelPayCount = this.makeCavas(tables, this.data.timeArea);
        if (this.data.timeArea == conf.timeArea.today) {
          // tables.reverse();
          tableDataCC.reverse();
          // handelPayCount.reverse();
        }
        this.setData({
          tableData: tables,
          handelPayCount: handelPayCount,
          chartTitle2: handelPayCount.length == 0 ? "图标暂无数据" : "付费趋势",
          tableDataCC: tableDataCC
        })

        this.initChart2();
        // console.log(tables);
        if (res.data.sharePayResultTypesCC.length > 0) {
          let detail = new Object();
          detail.index = 0;
          this.onRowTap(detail);
        }
      }
    })

    wx.request({
      url: url.requestUrl + "/api/registeredRevenuePercentage",
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'token': wx.getStorageSync("token")
      },
      data: deteday,
      method: "post",
      success: (res) => {
        let a = this.tableprocess2(res.data.msg)
        let b = this.tableprocess2(res.data.msgOS)

        this.retentionTitlestable = a;
        this.retentionTitlestableOS = b;

        if (os == "0") {
          this.setData({
            retentionTitlestable: a,
          })
        } else {
          this.setData({
            retentionTitlestable: b,
          })
        }
      }
    })
  },

  //切换条件，重置page,retentionList
  reset: function() {
    this.setData({
      page: 1,
      tableData: []
    })
  },
  tableprocess2: function(data) {
    if (data) {
      data.forEach((item) => {
        item.ds = common.week(item.ds);
      })
      return data;
    }
  },

  tableDataProcess: function(data, creativeMap) {
    if (data) {
      data.forEach((item) => {
        item.creative = creativeMap.get(item.creative) === undefined ? item.creative : creativeMap.get(item.creative);
        item.payRate = item.dauNum == 0 ? 0 : (item.payCount * 100 / item.dauNum).toFixed(2) + "%";
        item.payAmount = item.payAmount / appData.overallData[1].currencyRate;
        item.ARPU = item.dauNum == 0 ? 0 : (item.payAmount / item.dauNum).toFixed(2);
        item.ARPPU = item.payCount == 0 ? 0 : (item.payAmount / item.payCount).toFixed(2);
        item.payInstallRate = item.installNum == 0 ? 0 : (item.payInstallCount * 100 / item.installNum).toFixed(2) + "%";
        item.payInstallAmount = item.payInstallAmount / appData.overallData[1].currencyRate;
        item.payInstallARPU = item.installNum == 0 ? 0 : (item.payInstallAmount / item.installNum).toFixed(2);
        item.payInstallARPPU = item.payInstallCount == 0 ? 0 : (item.payInstallAmount / item.payInstallCount).toFixed(2);
        item.ds = common.week(item.ds);
      })
    }
    return data;
  },

  makeCavas: (data, date) => {
    if (data) {
      if (date == conf.timeArea.today) {
        data.sort(function(a, b) {
          return b.dayOfHour - a.dayOfHour;
        });
      }

      let handelPayCount = [];
      data.forEach((item, index) => {
        let infopayCount = new Object();
        if (date != conf.timeArea.week && date != conf.timeArea.month) {
          infopayCount.time = item.dayOfHour + '时';
        } else {
          infopayCount.time = (item.ds).substr(5, 5);
        }
        infopayCount.value = item.payCount;
        infopayCount.type = '付费人数';
        handelPayCount.push(infopayCount);
        let infopayAmount = new Object();
        if (date != conf.timeArea.week && date != conf.timeArea.month) {
          infopayAmount.time = item.dayOfHour + '时';
        } else {
          infopayAmount.time = (item.ds).substr(5, 5);
        }
        infopayAmount.value = item.payAmount;
        infopayAmount.type = '付费金额';
        handelPayCount.push(infopayAmount);
        let infopayTimes = new Object();
        if (date != conf.timeArea.week && date != conf.timeArea.month) {
          infopayTimes.time = item.dayOfHour + '时';
        } else {
          infopayTimes.time = (item.ds).substr(5, 5);
        }
        infopayTimes.value = item.payTimes;
        infopayTimes.type = '付费次数';
        handelPayCount.push(infopayTimes);
        let infopayInstallCount = new Object();
        if (date != conf.timeArea.week && date != conf.timeArea.month) {
          infopayInstallCount.time = item.dayOfHour + '时';
        } else {
          infopayInstallCount.time = (item.ds).substr(5, 5);
        }
        infopayInstallCount.value = item.payInstallCount;
        infopayInstallCount.type = '安装付费人数';
        handelPayCount.push(infopayInstallCount);
        let infopayInstallAmount = new Object();
        if (date != conf.timeArea.week && date != conf.timeArea.month) {
          infopayInstallAmount.time = item.dayOfHour + '时';
        } else {
          infopayInstallAmount.time = (item.ds).substr(5, 5);
        }
        infopayInstallAmount.value = item.payInstallAmount;
        infopayInstallAmount.type = '安装付费金额';
        handelPayCount.push(infopayInstallAmount);
        let infoPayInstallTimes = new Object();
        if (date != conf.timeArea.week && date != conf.timeArea.month) {
          infoPayInstallTimes.time = item.dayOfHour + '时';
        } else {
          infoPayInstallTimes.time = (item.ds).substr(5, 5);
        }
        infoPayInstallTimes.value = item.payInstallTimes;
        infoPayInstallTimes.type = '安装付费次数';
        handelPayCount.push(infoPayInstallTimes);
      });
      if (date == conf.timeArea.week || date == conf.timeArea.month || date == conf.timeArea.today) {
        handelPayCount.reverse();
      }
      // console.log("---------payCount:" + JSON.stringify(handelPayCount));
      return handelPayCount;
    }
  },

})