import url from "../../../../utils/util.js"
import * as echarts from '../../../../ec-canvas/echarts';
// 全局提示
const {
  $Message
} = require('../../../../dist/base/index');

var datas = [];
var cavasName = '活跃';

function initChart(canvas, width, height) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);

  var option = {
    title: {
      text: cavasName + "数",
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985'
        }
      },
      formatter: "{c}",
    },
    legend: {
      data: ['xxx', '留存率']
    },
    toolbox: {
      feature: {
        saveAsImage: {
          show: false
        }
      }
    },
    grid: {
      left: '3%',
      right: '5%',
      bottom: '10%',
      containLabel: true
    },
    xAxis: [{
      type: 'category',
      boundaryGap: false,
      data: ['1日', '2日', '3日', '4日', '5日', '6日', '7日']
    }],
    yAxis: [{
      type: 'value',
      axisLabel: {
        formatter: '{value} '
      }
    }],
    series: [{
      name: '访问量',
      type: 'line',
      stack: '总量',
      label: {
        normal: {
          show: true,
          position: 'top'
        }
      },
      // areaStyle: {
      //   normal: {}
      // },
      data: datas
    }]
  };

  chart.setOption(option);
  return chart;
}

Page({

  data: {
    menu: [{
        name: '概况',
        url: '',
        icon: 'dynamic_fill'
      }, {
        name: '新进',
        url: '../source/source',
        icon: 'barrage'
      },
      {
        name: '留存',
        url: '../retention/retention',
        icon: 'createtask'
      },
      {
        name: '付费',
        url: '../behavior/behavior',
        icon: 'other'
      },
      {
        name: '其他',
        url: '../portrait/portrait',
        icon: 'group'
      }
    ],
    gameid: "",
    swiperView: [{
        title1: '访问人数',
        num1: '0',
        time1: '昨日：0',
        title2: '新用户',
        num2: '0',
        time2: '昨日：0',
        title3: '活跃数',
        num3: '0',
        time3: '昨日：0'
      },
      {
        title1: '访问次数',
        num1: '0',
        time1: '昨日：0',
        title2: '次均停留时长',
        num2: '0',
        time2: '昨日：0',
        title3: '跳出率',
        num3: '0',
        time3: '昨日：0'
      }
    ],
    indicatorDots: false,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    easingFunction: "easeInOutCubic",

    data: "7",
    sysType: "5",
    type: "0",

    indexStatu: 0,
    array: ['全渠道', '应用宝', '小米', '华为'],
    arrayOs: ['全渠道', '应用宝', '小米', '华为'],
    arrayOs2: ['全服', '1服', '2服', '3服'],
    index: 0,
    types: ['访问人数', '打开次数', '新用户数'],
    indexType: 0,
    datas: [],
    titleHead: [{
        "name": "日期"
      },
      {
        "name": "总用户数"
      },
      {
        "name": "活跃数"
      },
      {
        "name": "注册数"
      },
      {
        "name": "付费人数"
      },
      {
        "name": "付费金额"
      },
      {
        "name": "付费次数"
      },
      {
        "name": "安装付费人数"
      },
      {
        "name": "安装付费金额"
      },
      {
        "name": "安装付费次数"
      }
    ],
    titleHeadRetention: [{
      "name": "日期"
    }, {
      "name": "第几日留存"
    }, {
      "name": "留存用户数"
    }, {
      "name": "百分比留存"
    }],
    listData: [],
    listDataRetenttion: [],
    fruit: [{
      id: 0,
      name: '活跃',
    }, {
      id: 1,
      name: '新增'
    }],
    current: '活跃',
    currentIndex: 0,
    position: 'left',
  },

  onLoad: function(e) {
    this.setData({
      gameid: e.gameId
    })
    console.log("gameId-----" + this.data.gameid)
    //路径带上gameid
    var menusById = [];
    for (let i = 0; i < this.data.menu.length; i++) {
      this.data.menu[i].url = this.data.menu[i].url + "?gameid=" + this.data.gameid,
        menusById.push(this.data.menu[i]);
    }
    this.setData({
      menu: menusById
    })
    //数据初始化
    this.init();
    //图初始化
    this.oneComponent = this.selectComponent('#mychart-dom-bar');
    this.init_one()
  },

  handleClick: function(e) {
    this.setData({
      type: e.currentTarget.id
    });
    $Message({
      content: e.currentTarget.id == 0 ? "按用户" : "按设备",
      type: "default",
      duration: 1
    });
    this.init();
  },

  handleGameDaily({
    detail
  }) {
    this.setData({
      sysType: detail.key
    });
    console.log("游戏概况--------" + detail.key);
    this.init();
  },

  handleChangeSystem({
    detail
  }) {
    this.setData({
      sysType: detail.key
    });
    console.log("设备--------" + detail.key);
    this.init();
  },

  bindMultiPickerChange: function(e) {
    this.setData({
      multiIndex: e.detail.value
    })
  },

  handleChange({
    detail
  }) {
    this.setData({
      data: detail.key
    });
    console.log("时间--------" + detail.key);
    this.init();
    this.init_one();
  },

  handleUserChange({
    detail = {}
  }) {
    this.setData({
      current: detail.value,
      currentIndex: detail.value == '活跃' ? 0 : 1
    });
    cavasName = detail.value;
    console.log("活跃/新增--------" + this.data.currentIndex);
    this.init();
    this.init_one();
  },

  handleChangeStatus({
    detail
  }) {
    this.setData({
      indexStatu: detail.key,
      index: 0
    });
    if (detail.key == 0) {
      this.setData({
        array: this.data.arrayOs
      })
      console.log("渠道--------" + detail.key)
    } else {
      this.setData({
        array: this.data.arrayOs2
      })
      console.log("分服--------" + detail.key)
    };
    this.init();
  },

  bindPickerChange: function(e) {
    console.log("渠道/分服--------" + e.detail.value)
    this.setData({
      index: e.detail.value
    });
    this.init();
  },

  bindPickerChangeType: function(e) {
    console.log("展示/分类--------" + e.detail.value)
    this.setData({
        indexType: e.detail.value
      }),
      cavasName = this.data.types[e.detail.value];
    this.init_one();
  },

  //图
  init_one: function() {
    this.oneComponent.init((canvas, width, height) => {
      initChart(canvas, width, height)
    });
  },

  // 底部跳转
  viewButton: function(e) {
    wx.navigateTo({
      url: e.currentTarget.id + '?gameId=' + this.data.gameid
    })
  },

  //数据初始化
  init: function() {
    console.log("---------" + url.requestUrl)
    wx.request({
      url: url.requestUrl + '/api/daily',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'token': wx.getStorageSync("token")
      },
      data: {
        gameid: parseInt(this.data.gameid),
        deviceType: parseInt(this.data.type),
        osType: this.data.sysType,
        data: parseInt(this.data.data),
        hxType: parseInt(this.data.currentIndex)
      },
      method: "post",
      success: (e) => {
        if (e.data.success === true) {
          this.setData({
            listData: e.data.shareDailyResultTypes,
            listDataRetenttion: e.data.shareRetentionResultTypes,
          });
          datas = e.data.dauNumOrInstallNumList;
          this.init_one();
        } else {
          wx.showToast({
            title: e.data.msg,
            icon: 'none',
            duration: 1000
          })
        }
      },
      error: function(e) {

      }
    })
  },
})