import F2 from '../../../../f2-canvas/lib/f2';
import url from "../../../../utils/util.js";
// 全局提示
const {
  $Message
} = require('../../../../dist/base/index');
const app = getApp()
const conf = {
  source: { //按用户或者设备
    user: 0,
    device: 1
  },
  os: { //操作系统 
    all: "0",
    android: "1",
    ios: "2",
    none: "none"
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
    }
  },
}

Page({

  /**
   * 生命周期
   * ---------------------------------------------------------------------
   */
  onLoad: function(options) {
    // 页面创建时执行
    this.initChart(this.data.chartData1, '#chart1');
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
    sourceCliCre: conf.sourceCliCre.creative.val,
    sourceCliCreChoice: conf.sourceCliCre.creative.choice[0].key, //分服和分渠道的选择
    sourceCliCreChoices: conf.sourceCliCre.creative.choice, //分服和分渠道的选择列表
    os: conf.os.all,
    timeArea: conf.timeArea.today,
    datas: [],
    chartTitle: "用户付费情况",
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
    ]
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
      this.update();
    }
  },
  //分服和分渠道选择change
  sourceCliCreChange: function({
    detail
  }) {
    if (this.data.sourceCliCre != detail.key) {
      this.setData({
        sourceCliCreChoices: conf.sourceCliCre[detail.key].choice,
        sourceCliCreChoice: conf.sourceCliCre[detail.key].choice[0].key,
        sourceCliCre: detail.key
      });
      this.update();
    }
  },
  sourceCliCreChoiceChange: function({
    detail
  }) {
    if (this.data.sourceCliCreChoice != detail.key) {
      this.setData({
        sourceCliCreChoice: detail.key
      });
      this.update();
    }
  },
  //os change
  osChange: function({
    detail
  }) {
    if (this.data.os != detail.key) {
      this.setData({
        os: detail.key
      });
      this.update();
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
      this.update();
    }
  },

  /**
   * functions
   * -------------------------------------------------------------------------------------------
   */

  //初始化图表
  initChart: function(data, select) {
    var that = this;
    /*在这里改变一下结构即可*/
    that.chartComponent = that.selectComponent(select);
    that.chartComponent.init((canvas, width, height) => {
      const chart = new F2.Chart({
        el: canvas,
        width,
        height,
        animate: true
      });
      chart.source(data, {
        sales: {
          tickCount: 5,
          formatter: function formatter(value) {
            return value;
          }
        }

      });
      chart.tooltip({
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

      chart.interval().position('name*value');
      chart.render();
    })
  },

  update: function() {
    let clientid = this.data.sourceCliCre == conf.sourceCliCre.client.val ? this.data.sourceCliCreChoice : null;
    let creative = this.data.sourceCliCre == conf.sourceCliCre.creative.val ? this.data.sourceCliCreChoice : null;
    this.query(this.data.source, 1, this.data.timeArea, clientid, this.data.os, creative);
  },

  //查询
  query: function (source, gameid, day, clientid, os, creative) {
    let data = {
      source: source,
      gameid: gameid,
      day: day,
    }
    if (creative != null){
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
      method:"post",
      success:(res) => {
        console.log(res.data);
      }
    })
  }



})