import url from "../../../../utils/util.js"
import * as echarts from '../../../../ec-canvas/echarts';
// 全局提示
const {
  $Message
} = require('../../../../dist/base/index');

var datas = [];
var titleName = '';
const titleType = {
  0: '用户留存',
  1: '用户忠诚度',
}

function initChart(canvas, width, height) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);

  var option = {
    title: {
      text: titleName
    },
    tooltip: {
      trigger: 'axis',
      // axisPointer: {
      //   type: 'cross',
      //   label: {
      //     backgroundColor: '#6a7985'
      //   }
      // }
      formatter: "{c}%",
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
        formatter: '{value} %'
      }
    }],
    series: [{
      // name: '留存率',
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
      currentMenu: 1,
      style: 1,
      ico: 'picture_fill',
      fn: 'gotoPublish'
    }, {
      name: "付费",
      currentMenu: 0,
      style: 0,
      ico: 'redpacket_fill',
      fn: 'gotoRecruit'
    }, {
      name: "其他",
      currentMenu: 0,
      style: 0,
      ico: 'task_fill',
      fn: 'gotoMine'
    }, ],
    bType: ['info', 'ghost'],
    bTypeIndex: 0,
    source: '0',
    data: '0',
    ec: {
      lazyLoad: true
      // onInit: initChart
    },
    titleName: '用户留存',
    datas: [25.6, 27, 29, 15, 13, 80, 90, 90, 99],
    titleHead: [{
      "name": "日期"
    }, {
      "name": "第几日留存"
    }, {
      "name": "留存用户数"
    }],
    listData: [],
    gameid: "",
    sysType: "0",
    isOs: 0,
    indexStatu: 0,
    array: ['全渠道', '应用宝', '小米', '华为'],
    arrayOs: ['全渠道', '应用宝', '小米', '华为'],
    arrayOs2: ['全服', '1服', '2服', '3服'],
    index: 0,
    type: "0",
  },

  onLoad: function(options) {
    this.setData({
      gameid: options.gameId
    });
    console.log(options.gameId);

    datas = this.data.datas;
    titleName = this.data.titleName;
    this.oneComponent = this.selectComponent('#mychart-dom-bar');

    //数据初始化
    this.init();
    this.init_one();

  },

  init_one: function() {
    this.oneComponent.init((canvas, width, height) => {
      initChart(canvas, width, height)
    });
  },

  handleClick: function(e) {
    this.setData({
      type: e.currentTarget.id
    });
    if (e.currentTarget.id != this.data.bTypeIndex) {
      this.data.bType[0] = [this.data.bType[1], this.data.bType[1] = this.data.bType[0]][0];
      this.setData({
        bTypeIndex: e.currentTarget.id,
        bType: this.data.bType
      })
    };
    // $Message({
    //   content: e.currentTarget.id == 0 ? "按用户" : "按设备",
    //   type: "default",
    //   duration: 1
    // });
    this.init();
    this.init_one();
  },

  titleTypes: (type) => {
    return titleType[type]
  },

  handleChangeSource({
    detail
  }) {
    this.setData({
      source: detail.key
    });
    $Message({
      content: this.titleTypes(this.data.source),
      type: "default",
      duration: 1
    });
    console.log("type--------" + this.data.source)
    titleName = this.titleTypes(this.data.source);
    this.setData({
      datas: [25.6, 27, 29, 15, 93, 80, 90, 90, 79]
    })
    this.init();
    this.init_one();
  },

  handleChangeData({
    detail
  }) {
    this.setData({
      data: detail.key
    });
    console.log("data---------" + this.data.data)
    this.init();
    this.init_one();
  },

  handleChangeSystem({
    detail
  }) {
    this.setData({
      sysType: detail.key,
      isOs: detail.key == 3 ? 1 : 0
    });
    console.log("设备--------" + detail.key)
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
      this.init();
      this.init_one();
    } else {
      this.setData({
        array: this.data.arrayOs2
      })
      console.log("分服--------" + detail.key)
      this.init();
      this.init_one();
    }
  },

  bindPickerChange: function(e) {
    console.log("渠道/分服--------" + e.detail.value)
    this.setData({
      index: e.detail.value
    })
    this.init();
    this.init_one();
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
  gotoRecruit: function() {
    wx.redirectTo({
      url: '../pay/pay?gameId=' + this.data.gameid,
    });
  },
  gotoMine: function() {
    wx.redirectTo({
      url: '../portrait/portrait?gameId=' + this.data.gameid,
    });
  },

  //数据初始化
  init: function() {
    wx.request({
      url: url.requestUrl + '/api/retention',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'token': wx.getStorageSync("token")
      },
      data: {
        gameid: parseInt(this.data.gameid),
        deviceType: parseInt(this.data.type),
        osType: parseInt(this.data.sysType),
        isOs: this.data.isOs,
        data: parseInt(this.data.data),
        ccType: parseInt(this.data.indexStatu),
        ccNum: parseInt(this.data.index),
      },
      method: "post",
      success: (e) => {
        if (e.data.success === true) {
          this.setData({
            listData: e.data.shareRetentionResultTypes,
          })
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