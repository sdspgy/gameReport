import F2 from '../../../../f2-canvas/lib/f2';
import url from "../../../../utils/util.js";
// 全局提示
const {
  $Message
} = require('../../../../dist/base/index');
const app = getApp()
var chart1 = null;
var chart2 = null;
const conf = {
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
      ]
    },
    creative: {
      val: "creative",
      choice: [{
          key: "all",
          name: "所有渠道"
        },
        {
          key: 1,
          name: "华为"
        },
        {
          key: 2,
          name: "小米"
        },
        {
          key: 3,
          name: "应用宝"
        }
      ]
    },
    daily: {
      val: "daily",
      choice: []
    }
  },
  table: {
    colWidth: 95
  },
  navData: [{
    name: "概况", //文本
    currentMenu: 0, //是否是当前页，0不是  1是
    style: 0, //样式
    ico: 'dynamic_fill', //不同图标
    fn: 'gotoIndex' //对应处理函数
  }, {
    name: "新进",
    currentMenu: 0,
    style: 0,
    ico: 'mine_fill',
    fn: 'gotoOldGoods'
  }, {
    name: "留存",
    currentMenu: 0,
    style: 0,
    ico: 'picture_fill',
    fn: 'gotoPublish'
  }, {
    name: "付费",
    currentMenu: 1,
    style: 0,
    ico: 'redpacket_fill',
    fn: 'gotoRecruit'
  }, {
    name: "其他",
    currentMenu: 0,
    style: 0,
    ico: 'task_fill',
    fn: 'gotoMine'
  }, ]
};
let titles = {
    ds: "日期",
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
    payInstallARPU: "注册付费ARPU", //注册付费总额/注册人数*
    payInstallARPPU: "注册付费ARPPU", //注册付费总额/注册付费人数*

    payTimes: "付费次数",
    payInstallTimes: "注册付费次数"
  },
  tableOs = {
    os: "操作系统"
  },
  tableCreative = {
    creative: "渠道"
  },
  tableClient = {
    clientid: "服"
  }

Page({

  /**
   * 生命周期
   * ---------------------------------------------------------------------
   */
  onLoad: function(options) {
    // 页面创建时执行
    this.setData({
      gameid: options.gameId
    });
    console.log("---------" + options.gameId);
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
    timeArea: conf.timeArea.today,
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
    payTitles: titles
  },

  /**
   * 事件绑定
   * ---------------------------------------------------------------------------------
   */

  // 按用户和按设备change
  sourceChange: function(event) {
    console.log(event);
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
          let obj = Object.assign({}, tableOs, titles);
          this.setData({
            payTitles: obj
          })
        } else {
          let obj = Object.assign({}, titles);
          this.setData({
            payTitles: obj
          })
        }
      }
      if (detail.key == "creative") {
        if (this.data.os == -1) {
          let obj = Object.assign({}, tableCreative, titles);
          this.setData({
            payTitles: obj
          })
        } else {
          let obj = Object.assign({}, tableOs, tableCreative, titles);
          this.setData({
            payTitles: obj
          })
        }
      }
      if (detail.key == "client") {
        if (this.data.os == -1) {
          let obj = Object.assign({}, tableClient, titles);
          this.setData({
            payTitles: obj
          })
        } else {
          let obj = Object.assign({}, tableOs, tableClient, titles);
          this.setData({
            payTitles: obj
          })
        }
      }
    }
    this.queryAndUpdate();
    console.log(this.data.sourceCliCreChoice);
  },
  sourceCliCreChoiceChange: function({
    detail
  }) {
    if (this.data.sourceCliCreChoice != detail.index) {
      this.setData({
        sourceCliCreChoice: detail.index
      });
      this.queryAndUpdate();
    }
  },
  //os change
  osChange: function({
    detail
  }) {
    if (detail.key == -1) {
      if (this.data.sourceCliCre == "daily") {
        let obj = Object.assign({}, titles);
        this.setData({
          payTitles: obj
        })
      };
      if (this.data.sourceCliCre == "creative") {
        let obj = Object.assign({}, tableCreative, titles);
        this.setData({
          payTitles: obj
        })
      };
      if (this.data.sourceCliCre == "client") {
        let obj = Object.assign({}, tableClient, titles);
        this.setData({
          payTitles: obj
        })
      }
    } else {
      if (this.data.sourceCliCre == "daily") {
        if (detail.key == "0") {
          let obj = Object.assign({}, titles);
          this.setData({
            payTitles: obj
          })
        } else {
          let obj = Object.assign({}, tableOs, titles);
          this.setData({
            payTitles: obj
          })
        }
      };
      if (this.data.sourceCliCre == "creative") {
        let obj = Object.assign({}, tableOs, tableCreative, titles);
        this.setData({
          payTitles: obj
        })
      };
      if (this.data.sourceCliCre == "client") {
        let obj = Object.assign({}, tableOs, tableClient, titles);
        this.setData({
          payTitles: obj
        })
      };
    }
    if (this.data.os != detail.key) {
      this.setData({
        os: detail.key
      });
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
      this.queryAndUpdate();
    }
  },
  //表格横行被点击
  onRowTap: function({
    detail
  }) {
    console.log(detail.index + ":" + JSON.stringify(detail.data));
  },
  //表格竖行被点击
  onColTap: function({
    detail
  }) {
    console.log(detail.col + ":" + JSON.stringify(detail.data));
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
  initChart1: function(data) {
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
      c1.source(data, {
        value: {
          tickCount: 5,
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

      c1.interval().position('name*value');
      c1.render();
      chart1 = c1;
    })
  },

  initChart2: function(data) {
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
      c2.source(data.reverse(), {
        value: {
          tickCount: 10,
          formatter: function formatter(ivalue) {
            return ivalue;
          }
        }
      });
      c2.line().position('i*value');
      c2.render();
      chart2 = c2;
    })
  },

  updateChart2Data: function(data) {
    chart2.changeData(data);
  },

  queryAndUpdate: function() {
    let clientid = this.data.sourceCliCre == conf.sourceCliCre.client.val ? conf.sourceCliCre.client.choice[this.data.sourceCliCreChoice].key : null;
    let creative = this.data.sourceCliCre == conf.sourceCliCre.creative.val ? conf.sourceCliCre.creative.choice[this.data.sourceCliCreChoice].key : null;
    this.query(this.data.source, this.data.gameid, this.data.timeArea, clientid, this.data.os, creative);
  },

  //查询
  query: function(source, gameid, day, clientid, os, creative) {
    let data = {
      source: source,
      gameid: gameid,
      day: day,
    }
    if (creative != null) {
      data.creative = creative;
    }
    if (os != conf.os.none) {
      data.os = os;
    }
    if (clientid != null) {
      data.clientid = clientid;
    }
    console.log(JSON.stringify(data));
    wx.request({
      url: url.requestUrl + "/api/pay/query",
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'token': wx.getStorageSync("token")
      },
      data: data,
      method: "post",
      success: (res) => {
        let tableData = this.tableDataProcess(res.data.msg);
        this.setData({
          tableData: tableData
        })
        console.log(tableData);
      }
    })
  },

  tableDataProcess: function(data) {
    data.forEach((item) => {
      item.payRate = (item.payCount * 100 / item.dauNum).toFixed(2) + "%";
      item.ARPU = (item.payAmount / item.dauNum).toFixed(2);
      item.ARPPU = (item.payAmount / item.payCount).toFixed(2);
      item.payInstallRate = (item.payInstallCount * 100 / item.installNum).toFixed(2) + "%";
      item.payInstallARPU = (item.payInstallAmount / item.installNum).toFixed(2);
      item.payInstallARPPU = (item.payInstallAmount / item.payInstallCount).toFixed(2);
    })
    return data;
  },

  //底部菜单
  gotoIndex: function() {
    wx.redirectTo({
      url: '../survey/survey?gameId=' + this.data.gameid,
    });
  },
  gotoOldGoods: function() {
    wx.redirectTo({
      url: '../source/source?gameId=' + this.data.gameid,
    });
  },
  gotoPublish: function() {
    wx.redirectTo({
      url: '../retention/retention?gameId=' + this.data.gameid,
    });
  },
  gotoMine: function() {
    wx.redirectTo({
      url: '../portrait/portrait?gameId=' + this.data.gameid,
    });
  },

})