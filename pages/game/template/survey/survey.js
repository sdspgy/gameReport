import url from "../../../../utils/util.js"
import * as echarts from '../../../../ec-canvas/echarts';
// 全局提示
const {
  $Message
} = require('../../../../dist/base/index');
var cavasName = '活跃';
Page({
  data: {
    navData: [{
      name: "概况", //文本
      currentMenu: 1, //是否是当前页，0不是  1是
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
    gameid: "",
    bType: ['info', 'ghost'],
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
    payList: [],
    titleHead: [{
        "name": "日期"
      },
      {
        "name": "注册数"
      },
      {
        "name": "活跃数"
      },
      {
        "name": "付费人数"
      },
      {
        "name": "付费总额"
      },
      {
        "name": "付费率"
      },
      {
        "name": "ARPU"
      },
      {
        "name": "ARPPU"
      },
      {
        "name": "注册付费率"
      },
      {
        "name": "注册付费人数"
      },
      {
        "name": "注册付费总额"
      },
      {
        "name": "注册付费ARPU"
      },
      {
        "name": "注册付费ARPPU"
      },
      {
        "name": "付费次数"
      },
      {
        "name": "注册付费次数"
      }
    ],
    titleHeadRetention: [{
      "name": "日期"
    }, {
      "name": "几日留存"
    }, {
      "name": "留存用户数"
    }, {
      "name": "百分比留存"
    }, {
      "name": "几日留存"
    }, {
      "name": "留存用户数"
    }, {
      "name": "百分比留存"
    }, {
      "name": "几日留存"
    }, {
      "name": "留存用户数"
    }, {
      "name": "百分比留存"
    }, {
      "name": "几日留存"
    }, {
      "name": "留存用户数"
    }, {
      "name": "百分比留存"
    }, {
      "name": "几日留存"
    }, {
      "name": "留存用户数"
    }, {
      "name": "百分比留存"
    }, {
      "name": "几日留存"
    }, {
      "name": "留存用户数"
    }, {
      "name": "百分比留存"
    }, {
      "name": "几日留存"
    }, {
      "name": "留存用户数"
    }, {
      "name": "百分比留存"
    }, {
      "name": "几日留存"
    }, {
      "name": "留存用户数"
    }, {
      "name": "百分比留存"
    }, {
      "name": "几日留存"
    }, {
      "name": "留存用户数"
    }, {
      "name": "百分比留存"
    }, {
      "name": "几日留存"
    }, {
      "name": "留存用户数"
    }, {
      "name": "百分比留存"
    }, {
      "name": "几日留存"
    }, {
      "name": "留存用户数"
    }, {
      "name": "百分比留存"
    }, {
      "name": "几日留存"
    }, {
      "name": "留存用户数"
    }, {
      "name": "百分比留存"
    }, {
      "name": "几日留存"
    }, {
      "name": "留存用户数"
    }, {
      "name": "百分比留存"
    }, {
      "name": "几日留存"
    }, {
      "name": "留存用户数"
    }, {
      "name": "百分比留存"
    }, {
      "name": "几日留存"
    }, {
      "name": "留存用户数"
    }, {
      "name": "百分比留存"
    }, ],
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
    retentionDate: '昨日',
    retentionEcharts: [],
    ec: {
      lazyLoad: true,
    },
    mychartPay: {
      lazyLoad: true,
    },
    mychartRetention: {
      lazyLoad: true,
    }
  },
  onLoad: function(e) {
    this.setData({
      gameid: e.gameId
    })
    console.log("gameId-----" + this.data.gameid)
    //数据初始化
    this.init();
  },
  //图
  init_one: function() {
    this.oneComponent = this.selectComponent('#mychart-dom-bar');
    this.oneComponent.init((canvas, width, height) => {
      const chart = echarts.init(canvas, null, {
        width: width,
        height: height
      });
      canvas.setChart(chart);
      var option = {
        title: {
          text: '',
          // subtext: cavasName + "数"
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#b6a2de'
            }
          },
          formatter: "{c}",
        },
        legend: {
          // left: 'left',
          data: [],
          textStyle: {
            fontSize: 10
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
          textStyle: {
            fontsize: '15px'
          },
          data: ['1日', '2日', '3日', '4日', '5日', '6日', '7日']
        }],
        yAxis: [{
          textStyle: {
            fontsize: '15px'
          },
          type: 'value'
        }],
        color: '#5cadff',
        series: [{
          name: '',
          type: 'line',
          stack: '总量',
          label: {
            normal: {
              show: true,
              position: 'top',
              fontSize: 15,
              rich: {}
            }
          },
          areaStyle: {
            normal: {}
          },
          data: this.data.datas
        }]
      };
      chart.setOption(option);
      return chart;
    });
    this.payComponent = this.selectComponent('#mychart-pay');
    this.payComponent.init((canvas, width, height) => {
      const chart = echarts.init(canvas, null, {
        width: width,
        height: height
      });
      canvas.setChart(chart);
      var option = {
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          left: 'left',
          data: ['付费人数', '付费金额', '付费次数', '安装付费人数', '安装付费金额', '安装付费次数'],
          textStyle: {
            fontSize: 10
          }
        },
        toolbox: {
          show: false,
          feature: {
            mark: {
              show: true
            },
            dataView: {
              show: true,
              readOnly: false
            },
            magicType: {
              show: true,
              type: ['line', 'bar', 'stack', 'tiled']
            },
            restore: {
              show: true
            },
            saveAsImage: {
              show: true
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
          // axisLabel: {
          //   show: true,
          //   textStyle: {
          //     color: '#5ab1ef',
          //     fontSize: 10
          //   }
          // },
          type: 'value'
        }],
        series: this.data.payList
      };
      chart.setOption(option);
      return chart;
    });
    this.retentionComponent = this.selectComponent('#mychart-mychartRetention');
    this.retentionComponent.init((canvas, width, height) => {
      const chart = echarts.init(canvas, null, {
        width: width,
        height: height
      });
      canvas.setChart(chart);
      var option = {
        title: {
          text: '',
          subtext: ''
        },
        tooltip: {
          trigger: 'item',
          formatter: "{b} : {c}%"
        },
        toolbox: {
          show: false,
          feature: {
            mark: {
              show: true
            },
            dataView: {
              show: true,
              readOnly: false
            },
            restore: {
              show: true
            },
            saveAsImage: {
              show: true
            }
          }
        },
        legend: {
          data: [],
          textStyle: {
            fontSize: 10
          }
        },
        calculable: true,
        series: [{
          name: '',
          type: 'funnel',
          width: '65%',
          itemStyle: {
            normal: {
              label: {
                show: false,
                position: 'inside'
              },
            }
          },
          data: this.data.retentionEcharts
        }]
      };
      chart.setOption(option);
      return chart;
    });
  },
  handleClick: function(e) {
    if (e.currentTarget.id != parseInt(this.data.type)) {
      this.data.bType[0] = [this.data.bType[1], this.data.bType[1] = this.data.bType[0]][0];
      this.setData({
        type: e.currentTarget.id,
        bType: this.data.bType
      })
    };
    // $Message({
    //   content: e.currentTarget.id == 0 ? "按用户" : "按设备",
    //   type: "default",
    //   duration: 1
    // });
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
  handleChange({
    detail
  }) {
    this.setData({
      data: detail.key
    });
    console.log("时间--------" + detail.key);
    this.init();
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
  },
  bindDateChange: function(e) {
    console.log('rentention时间--------' + e.detail.value)
    this.setData({
      retentionDate: e.detail.value
    });
    this.init();
  },
  // 底部跳转
  viewButton: function(e) {
    wx.navigateTo({
      url: e.currentTarget.id + '?gameId=' + this.data.gameid
    })
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
        hxType: parseInt(this.data.currentIndex),
        retentionDate: this.data.retentionDate
      },
      method: "post",
      success: (e) => {
        if (e.data.success === true) {
          this.setData({
            listData: e.data.shareDailyResultTypes,
            listDataRetenttion: e.data.shareRetentionResultTypes,
            datas: e.data.dauNumOrInstallNumList,
            payList: e.data.payList,
            retentionEcharts: e.data.echartsRetentions
          });
          this.init_one();
        } else {
          wx.showToast({
            title: e.data.msg,
            icon: 'none',
            duration: 1000
          })
        }
      },
      error: function(e) {}
    })
  },
})