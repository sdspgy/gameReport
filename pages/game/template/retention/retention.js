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
    indexStatu: 0,
    array: ['全渠道', '应用宝', '小米', '华为'],
    arrayOs: ['全渠道', '应用宝', '小米', '华为'],
    arrayOs2: ['全服', '1服', '2服', '3服'],
    index: 0,
    type: "0",
  },

  onLoad: function(options) {
    this.setData({
      gameid: options.gameid
    });
    console.log(options.gameid);

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
    $Message({
      content: e.currentTarget.id == 0 ? "按用户" : "按设备",
      type: "default",
      duration: 1
    });
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
    this.init_one()
  },

  handleChangeData({
    detail
  }) {
    this.setData({
      data: detail.key
    });
    console.log("data---------" + this.data.data)
  },

  handleChangeSystem({
    detail
  }) {
    this.setData({
      sysType: detail.key
    });
    console.log("设备--------" + detail.key)
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
    }
  },

  bindPickerChange: function(e) {
    console.log("渠道/分服--------" + e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },

  //数据初始化
  init: function() {
    wx.request({
      url: 'http://localhost:8080/api/retention',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'token': wx.getStorageSync("token")
      },
      data: {
        gameid: parseInt(this.data.gameid),
        deviceType: parseInt(this.data.type),
        osType: parseInt(this.data.sysType),
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