import url from "../../../../utils/util.js";
import F2 from '../../../../f2-canvas/lib/f2';
import * as echarts from '../../../../ec-canvas/echarts';
var gameid = require('../../../../app.js');
// 全局提示
const {
  $Message
} = require('../../../../dist/base/index');
var cavasName = '活跃';
const conf = {
  table: {
    titles: {
      ds: "日期（星期）",
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
      payInstallARPU: "注付ARPU", //注册付费总额/注册人数,*
      payInstallARPPU: "注付ARPPU", //注册付费总额/注册付费人数*

      payTimes: "付费次数",
      payInstallTimes: "注册付费次数"
    },
    retentionTitles: {
      ds: "日期（星期）",
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
    },
    colWidth: 90
  }
}
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
    conf: conf,
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
    sysType: 0,
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
    listData: [],
    listDataRetenttion: [],
    retentionDataList: [],
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
  },
  onLoad: function(e) {
    this.setData({
      gameid: gameid
    })
    // console.log("gameId-----" + this.data.gameid)
    //数据初始化
    this.init();
  },
  //图
  init_one: function() {
    this.oneComponent = this.selectComponent('#mychart-dom-bar');
    this.oneComponent.init((canvas, width, height) => {
      const chart = new F2.Chart({
        el: canvas,
        width,
        height,
        animate: true
      });
      chart.source(this.data.datas, {
        value: {
          tickCount: 5,
          formatter: function formatter(ivalue) {
            return ivalue;
          },
          alias: this.data.current + '人数',
        },
        time: {

        }
      });
      chart.tooltip({
        showCrosshairs: true, //纵坐标线
        showItemMarker: false, //去小原点
      });
      chart.line().position('time*value').shape('smooth').color('l(0) 0:#F2C587 0.5:#ED7973 1:#8659AF');
      chart.point().position('time*value').shape('smooth').style({
        stroke: '#fff',
        lineWidth: 1
      }).color('l(0) 0:#F2C587 0.5:#ED7973 1:#8659AF');
      chart.area().position('time*value').shape('smooth').color('l(0) 0:#F2C587 0.5:#ED7973 1:#8659AF');
      chart.render();
      return chart;

      // const chart = echarts.init(canvas, null, {
      //   width: width,
      //   height: height
      // });
      // canvas.setChart(chart);
      // var option = {
      //   title: {
      //     text: '',
      //     // subtext: cavasName + "数"
      //   },
      //   tooltip: {
      //     trigger: 'axis',
      //     axisPointer: {
      //       type: 'cross',
      //       label: {
      //         backgroundColor: '#b6a2de'
      //       }
      //     },
      //     formatter: "{c}",
      //   },
      //   legend: {
      //     // left: 'left',
      //     data: [],
      //     textStyle: {
      //       fontSize: 10
      //     }
      //   },
      //   grid: {
      //     left: '3%',
      //     right: '5%',
      //     bottom: '10%',
      //     containLabel: true
      //   },
      //   xAxis: [{
      //     type: 'category',
      //     boundaryGap: false,
      //     data: ['1日', '2日', '3日', '4日', '5日', '6日', '7日']
      //   }],
      //   yAxis: [{
      //     type: 'value'
      //   }],
      //   color: '#5cadff',
      //   series: [{
      //     name: '',
      //     type: 'line',
      //     stack: '总量',
      //     label: {
      //       normal: {
      //         show: true,
      //         position: 'top',
      //         fontSize: 15,
      //         rich: {}
      //       }
      //     },
      //     areaStyle: {
      //       normal: {}
      //     },
      //     data: this.data.datas
      //   }]
      // };
      // chart.setOption(option);
      // return chart;
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
          trigger: 'axis',
          align: 'center',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#b6a2de'
            }
          },
          formatter: "",
          padding: [
            0, // 上
            0, // 右
            0, // 下
            0, // 左
          ],
          position: ['90%', '5%'],
        },
        legend: {
          left: 'left',
          data: ['付费人数', '付费金额', '付费次数', '安装付费人数', '安装付费金额', '安装付费次数'],
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
    // this.retentionComponent = this.selectComponent('#mychart-mychartRetention');
    // this.retentionComponent.init((canvas, width, height) => {
    //   const chart = echarts.init(canvas, null, {
    //     width: width,
    //     height: height
    //   });
    //   canvas.setChart(chart);
    //   var option = {
    //     title: {
    //       text: '',
    //       subtext: ''
    //     },
    //     tooltip: {
    //       trigger: 'item',
    //       formatter: "{b} : {c}%",
    //       position: [150, 200]
    //     },
    //     legend: {
    //       data: [],
    //       textStyle: {
    //         fontSize: 10
    //       }
    //     },
    //     calculable: true,
    //     series: [{
    //       name: '',
    //       type: 'funnel',
    //       width: '65%',
    //       itemStyle: {
    //         normal: {
    //           label: {
    //             show: false,
    //             position: 'inside'
    //           },
    //         }
    //       },
    //       data: this.data.retentionEcharts
    //     }]
    //   };
    //   chart.setOption(option);
    //   return chart;
    // });
  },
  handleClick: function(e) {
    if (e.currentTarget.id != parseInt(this.data.type)) {
      this.data.bType[0] = [this.data.bType[1], this.data.bType[1] = this.data.bType[0]][0];
      this.setData({
        type: e.currentTarget.id,
        bType: this.data.bType
      })
    };
    this.init();
  },

  handleChangeSystem({
    detail
  }) {
    this.setData({
      sysType: detail.key
    });
    // console.log("设备--------" + detail.key);
    this.init();
  },

  handleChange({
    detail
  }) {
    this.setData({
      data: detail.key
    });
    // console.log("时间--------" + detail.key);
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
    // console.log("活跃/新增--------" + this.data.currentIndex);
    this.init();
  },

  bindDateChange: function(e) {
    // console.log('rentention时间--------' + e.detail.value)
    this.setData({
      retentionDate: e.detail.value
    });
    this.init();
  },

  onPageScroll: function(e) {

  },

  back: function() {
    wx.redirectTo({
      url: '../../../index/index',
    })
  },

  // 底部跳转
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
    wx.showLoading({
      title: "数据加载中",
      mask: true
    });
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
        setTimeout(() => {
          wx.hideLoading();
        }, 100);
        if (e.data.success === true) {
          this.setData({
            listData: this.tableDataProcess(e.data.shareDailyResultTypes),
            datas: this.f2DI(e.data.dauNumOrInstallNumList),
            payList: e.data.payList,
            retentionEcharts: e.data.echartsRetentions,
            retentionDataList: this.saturday(e.data.shareRetentionList)
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

  saturday: function(data) {
    if (data) {
      data.forEach((item, index) => {
        let week = new Date(item.ds);
        let dateweek = week.getDay();
        let i = 7 - dateweek;
        let saturdays = [];
        switch (i) {
          case 7:
            saturdays = ['oneRetentionPercentage', 'eightRetentionPercentage', 'fifteenRetentionPercentage'];
            item.ds = item.ds + "(七)";
            break
          case 1:
            saturdays = ['sevenRetentionPercentage', 'fourteenRetentionPercentage'];
            item.ds = item.ds + "(六)";
            break
          case 2:
            saturdays = ['sixRetentionPercentage', 'thirteenRetentionPercentage'];
            item.ds = item.ds + "(五)";
            break
          case 3:
            saturdays = ['fiveRetentionPercentage', 'twelveRetentionPercentage'];
            item.ds = item.ds + "(四)";
            break
          case 4:
            saturdays = ['fourRetentionPercentage', 'elevenRetentionPercentage'];
            item.ds = item.ds + "(三)";
            break
          case 5:
            saturdays = ['threeRetentionPercentage', 'tenRetentionPercentage'];
            item.ds = item.ds + "(二)";
            break
          case 6:
            saturdays = ['twoRetentionPercentage', 'nineRetentionPercentage'];
            item.ds = item.ds + "(一)";
            break
          default:
        };
        item.special = saturdays;
        item.oneSpecial = saturdays[0];
        item.twoSpecial = saturdays[1];
      })
      return data;
    }
  },

  f2DI: function(data) {
    let datas = [];
    data.forEach((item, index) => {
      let info = new Object();
      info.time = index + 1;
      info.value = item;
      datas.push(info);
    });
    return datas;
  },

  tableDataProcess: function(data) {
    if (data) {
      data.forEach((item) => {
        item.ds = weekFunction(item.ds);
        item.payAmount = item.payAmount / 100;
        item.payRate = item.dauNum == 0 ? 0 : (item.payCount * 100 / item.dauNum).toFixed(2) + '%';
        item.ARPU = item.dauNum == 0 ? 0 : (item.payAmount / item.dauNum).toFixed(2);
        item.ARPPU = item.payCount == 0 ? 0 : (item.payAmount / item.payCount).toFixed(2);
        item.payInstallAmount = item.payInstallAmount / 100;
        item.payInstallRate = item.installNum == 0 ? 0 : (item.payInstallCount * 100 / item.installNum).toFixed(2) + '%';
        item.payInstallARPU = item.installNum == 0 ? 0 : (item.payInstallAmount / item.installNum).toFixed(2);
        item.payInstallARPPU = item.payInstallCount == 0 ? 0 : (item.payInstallAmount / item.payInstallCount).toFixed(2);
      })
    }
    return data;
  },

})

var weekFunction = function(ds) {
  let week = new Date(ds);
  let dateweek = week.getDay();
  let i = 7 - dateweek;
  switch (i) {
    case 7:
      ds = ds + "(七)";
      break
    case 1:
      ds = ds + "(六)";
      break
    case 2:
      ds = ds + "(五)";
      break
    case 3:
      ds = ds + "(四)";
      break
    case 4:
      ds = ds + "(三)";
      break
    case 5:
      ds = ds + "(二)";
      break
    case 6:
      ds = ds + "(一)";
      break
    default:
  }
  return ds;
}

module.exports = {
  week: weekFunction
};