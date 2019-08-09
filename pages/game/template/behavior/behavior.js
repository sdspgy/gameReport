import * as echarts from '../../../../ec-canvas/echarts';
// 全局提示
const {
  $Message
} = require('../../../../dist/base/index');
var datas = [];
var titleName = '';
const titleType = {
  0: '分享概览',
  1: '页面分析',
  2: '事件分析'
}

function initChart(canvas, width, height) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);

  var option = {
    title: {
      text: titleName + ''
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
      data: ['1日', '2日', '3日', '4日', '5日', '6日', '7日', '15日', '30日']
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
    status: '0',
    isShow: true,
    des: {
      num1: 1,
      num2: 1,
      num3: 1,
    },
    ec: {
      lazyLoad: true
      // onInit: initChart
    },
    titleName: '地域',
    datas: [25.6, 27, 29, 15, 13, 80, 90, 90, 99],
    titleHead: [{
        "name": "地域名称"
      },
      {
        "name": "访问人数"
      },
      {
        "name": "新用户"
      },
      {
        "name": "新用户占比"
      }
    ],
    listData: [{
        "ds": "2019:07:20",
        "totalNum": "2000",
        "dauNum": "500",
        "installNum": "200",
        "payCount": "200",
        "payAmount": "50000",
        "payTimes": "20",
        "payInstallCount": "50",
        "payInstallAmount": "10000",
        "payInstallTimes": "10"
      },
      {
        "ds": "2019:07:20",
        "totalNum": "2000",
        "dauNum": "500",
        "installNum": "200",
        "payCount": "200",
        "payAmount": "50000",
        "payTimes": "20",
        "payInstallCount": "50",
        "payInstallAmount": "10000",
        "payInstallTimes": "10"
      },
      {
        "ds": "2019:07:20",
        "totalNum": "2000",
        "dauNum": "500",
        "installNum": "200",
        "payCount": "200",
        "payAmount": "50000",
        "payTimes": "20",
        "payInstallCount": "50",
        "payInstallAmount": "10000",
        "payInstallTimes": "10"
      },
      {
        "ds": "2019:07:20",
        "totalNum": "2000",
        "dauNum": "500",
        "installNum": "200",
        "payCount": "200",
        "payAmount": "50000",
        "payTimes": "20",
        "payInstallCount": "50",
        "payInstallAmount": "10000",
        "payInstallTimes": "10"
      },
      {
        "ds": "2019:07:20",
        "totalNum": "2000",
        "dauNum": "500",
        "installNum": "200",
        "payCount": "200",
        "payAmount": "50000",
        "payTimes": "20",
        "payInstallCount": "50",
        "payInstallAmount": "10000",
        "payInstallTimes": "10"
      },
      {
        "ds": "2019:07:20",
        "totalNum": "2000",
        "dauNum": "500",
        "installNum": "200",
        "payCount": "200",
        "payAmount": "50000",
        "payTimes": "20",
        "payInstallCount": "50",
        "payInstallAmount": "10000",
        "payInstallTimes": "10"
      },
      {
        "ds": "2019:07:20",
        "totalNum": "2000",
        "dauNum": "500",
        "installNum": "200",
        "payCount": "200",
        "payAmount": "50000",
        "payTimes": "20",
        "payInstallCount": "50",
        "payInstallAmount": "10000",
        "payInstallTimes": "10"
      },
      {
        "ds": "2019:07:20",
        "totalNum": "2000",
        "dauNum": "500",
        "installNum": "200",
        "payCount": "200",
        "payAmount": "50000",
        "payTimes": "20",
        "payInstallCount": "50",
        "payInstallAmount": "10000",
        "payInstallTimes": "10"
      },
      {
        "ds": "2019:07:20",
        "totalNum": "2000",
        "dauNum": "500",
        "installNum": "200",
        "payCount": "200",
        "payAmount": "50000",
        "payTimes": "20",
        "payInstallCount": "50",
        "payInstallAmount": "10000",
        "payInstallTimes": "10"
      },
      {
        "ds": "2019:07:20",
        "totalNum": "2000",
        "dauNum": "500",
        "installNum": "200",
        "payCount": "200",
        "payAmount": "50000",
        "payTimes": "20",
        "payInstallCount": "50",
        "payInstallAmount": "10000",
        "payInstallTimes": "10"
      },
      {
        "ds": "2019:07:20",
        "totalNum": "2000",
        "dauNum": "500",
        "installNum": "200",
        "payCount": "200",
        "payAmount": "50000",
        "payTimes": "20",
        "payInstallCount": "50",
        "payInstallAmount": "10000",
        "payInstallTimes": "10"
      }
    ],
    gameid: "",
  },

  onLoad: function(options) {
    this.setData({
      gameid: options.gameid
    });
    console.log(options.gameid);
    datas = this.data.datas;
    titleName = this.data.titleName;
    this.oneComponent = this.selectComponent('#mychart-dom-bar');
    this.init_one();

    //数据初始化
    this.init();
  },

  init_one: function() {
    this.oneComponent.init((canvas, width, height) => {
      initChart(canvas, width, height)
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
    this.setData({
      isShow: this.titleTypes(this.data.source) == this.titleTypes(0) ? true : false
    })
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
    console.log(this.data.data)
  },
  handleChangeStatus({
    detail
  }) {
    this.setData({
      status: detail.key
    });
    console.log(this.data.status)
  },

  //数据初始化
  init: function() {
    wx.request({
      url: 'http://localhost:8080/api/daily',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'token': wx.getStorageSync("token")
      },
      data: {

      },
      method: "post",
      success: (e) => {
        if (e.data.success === true) {

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