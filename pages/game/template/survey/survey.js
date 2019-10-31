import url from "../../../../utils/util.js";
import F2 from '../../../../f2-canvas/lib/f2';
import * as echarts from '../../../../ec-canvas/echarts';
var appData = require('../../../../app.js');
// 全局提示
const {
  $Message
} = require('../../../../dist/base/index');
var cavasName = '活跃';
const conf = {
    table: {
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
      colWidth: 90
    }
  },
  titles = {
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
  titleDs = {
    ds: "日期（星期）",
  }
Page({
  data: {
    gameid: "",
    bType: ['info', 'ghost'],
    conf: conf,
    titles: titles,
    tableDayHour: {
      dayOfHour: '～时',
    },
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
    realtimeStatis: [{
        title: '活跃',
        value: 0
      },
      {
        title: '新增',
        value: 0
      },
    ],
    isShowRealtime: false,
    handelPayCount: null,
    proportions: [],
  },
  onLoad: function(e) {
    this.setData({
      gameid: appData.overallData[0],
    })
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
          // tickCount: 5,
          formatter: function formatter(ivalue) {
            return ivalue;
          },
          alias: this.data.current + '人数',
          min: 0,
        },
        time: {
          tickCount: 6,
        }
      });
      chart.tooltip({
        showCrosshairs: true, //纵坐标线
        showItemMarker: false, //去小原点
      });
      // 坐标轴文本旋转
      chart.axis('time', {
        label: {
          rotate: -Math.PI / 2.5,
          textAlign: 'end',
          textBaseline: 'middle'
        }
      });
      chart.line().position('time*value').shape('smooth').color('l(0) 0:#F2C587 0.5:#ED7973 1:#8659AF');
      chart.point().position('time*value').shape('smooth').style({
        stroke: '#fff',
        lineWidth: 1
      }).color('l(0) 0:#F2C587 0.5:#ED7973 1:#8659AF');
      chart.area().position('time*value').shape('smooth').color('l(0) 0:#F2C587 0.5:#ED7973 1:#8659AF');
      chart.render();
      return chart;
    });

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
          tickCount: 6,
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

  //数据初始化
  init: function() {
    //实时和昨日的单独处理下表头
    if (this.data.data == 0 || this.data.data == 1) {
      let tablesDayHour = Object.assign({}, titleDs, this.data.tableDayHour, titles);
      this.setData({
        titles: tablesDayHour,
        isShowRealtime: true,
      });
    } else {
      this.setData({
        titles: Object.assign({}, titleDs, titles),
        isShowRealtime: false,
      });
    }
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
          let percentage = this.androidIosProportions(e.data.androidIosProportions);
          this.setData({
            listData: this.tableDataProcess(e.data.shareDailyResultTypes, percentage),
            payList: e.data.payList,
            retentionDataList: this.saturday(e.data.shareRetentionList),
          });
          let handelPayCount = this.makeCavas(this.data.listData, this.data.data);
          this.setData({
            datas: this.f2DI(e.data.dauNumOrInstallNumList, this.data.data, this.data.listData, this.data.currentIndex),
            handelPayCount: handelPayCount,
          })
          this.init_one();
          this.makePieChart(e.data.androidIosProportions);
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

  androidIosProportions: (data) => {
    if (data) {
      let dauNumSum = 0,
        installNumSum = 0,
        androidDauNum = 0,
        androidInstallNum = 0,
        iosDauNum = 0,
        iosInstallNum = 0,
        info = [];
      data.forEach((item) => {
        dauNumSum += item.dauNum;
        installNumSum += item.installNum;
        if (item.os == 'android') {
          androidDauNum = item.dauNum;
          androidInstallNum = item.installNum;
        }
        if (item.os == 'iOS') {
          iosDauNum = item.dauNum;
          iosInstallNum = item.installNum;
        }
      })
      info.push(((androidDauNum / dauNumSum * 100).toFixed(2)) + '%');
      info.push(((iosDauNum / dauNumSum * 100).toFixed(2)) + '%');
      info.push(((androidInstallNum / installNumSum * 100).toFixed(2)) + '%');
      info.push(((iosInstallNum / installNumSum * 100).toFixed(2)) + '%');
      return info;
    }
  },

  makePieChart: function(info) {
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
        position: 'right',
        // itemFormatter: function itemFormatter(val) {
        //   return val + '  ' + info[val];
        // }
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
        position: 'right',
        // itemFormatter: function itemFormatter(val) {
        //   return val + '  ' + info[val];
        // }
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

  makeCavas: (data, date) => {
    if (data) {
      if (date == 0) {
        data.sort(function(a, b) {
          return b.dayOfHour - a.dayOfHour;
        });
      }
      let handelPayCount = [];
      data.forEach((item, index) => {
        let infopayCount = new Object();
        if (date != 7 && date != 30) {
          infopayCount.time = item.dayOfHour + '时';
        } else {
          infopayCount.time = (item.ds).substr(5, 5);
        }
        infopayCount.value = item.payCount;
        infopayCount.type = '付费人数';
        handelPayCount.push(infopayCount);
        let infopayAmount = new Object();
        if (date != 7 && date != 30) {
          infopayAmount.time = item.dayOfHour + '时';
        } else {
          infopayAmount.time = (item.ds).substr(5, 5);
        }
        infopayAmount.value = item.payAmount;
        infopayAmount.type = '付费金额';
        handelPayCount.push(infopayAmount);
        let infopayTimes = new Object();
        if (date != 7 && date != 30) {
          infopayTimes.time = item.dayOfHour + '时';
        } else {
          infopayTimes.time = (item.ds).substr(5, 5);
        }
        infopayTimes.value = item.payTimes;
        infopayTimes.type = '付费次数';
        handelPayCount.push(infopayTimes);
        let infopayInstallCount = new Object();
        if (date != 7 && date != 30) {
          infopayInstallCount.time = item.dayOfHour + '时';
        } else {
          infopayInstallCount.time = (item.ds).substr(5, 5);
        }
        infopayInstallCount.value = item.payInstallCount;
        infopayInstallCount.type = '安装付费人数';
        handelPayCount.push(infopayInstallCount);
        let infopayInstallAmount = new Object();
        if (date != 7 && date != 30) {
          infopayInstallAmount.time = item.dayOfHour + '时';
        } else {
          infopayInstallAmount.time = (item.ds).substr(5, 5);
        }
        infopayInstallAmount.value = item.payInstallAmount;
        infopayInstallAmount.type = '安装付费金额';
        handelPayCount.push(infopayInstallAmount);
        let infoPayInstallTimes = new Object();
        if (date != 7 && date != 30) {
          infoPayInstallTimes.time = item.dayOfHour + '时';
        } else {
          infoPayInstallTimes.time = (item.ds).substr(5, 5);
        }
        infoPayInstallTimes.value = item.payInstallTimes;
        infoPayInstallTimes.type = '安装付费次数';
        handelPayCount.push(infoPayInstallTimes);
      });
      if (date == 7 || date == 30 || date == 0) {
        handelPayCount.reverse();
      }
      // console.log("---------payCount:" + JSON.stringify(handelPayCount));
      return handelPayCount;
    }
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

  f2DI: function(data, date, listData, type) {
    let datas = [];
    if (date == 0 || date == 1) {
      debugger
      listData.forEach(info => {
        let item = new Object();
        if (type == 0) {
          item.value = info.dauNum;
        } else {
          item.value = info.installNum;
        }
        item.time = info.dayOfHour + '时';
        datas.push(item);
      });
    } else {
      data.forEach((item, index) => {
        let info = new Object();
        info.time = this.getTime(index);
        info.value = item;
        datas.push(info);
      });
    }
    if (date == "7" || date == "30" || date == "0") {
      //该方法会改变原来的数组，而不会创建新的数组
      datas.reverse();
    }
    return datas;
  },

  getTime: function(index) {
    let myDate = new Date();
    myDate.setTime(myDate.getTime() - 24 * 60 * 60 * 1000 * (index + 1));
    let dateTime = (myDate.getMonth() + 1) + "-" + myDate.getDate();
    return dateTime;
  },

  tableDataProcess: function(data, info) {
    if (data) {
      let activeNum = 0,
        newIntall = 0,
        payTotal = 0,
        payCount = 0;

      data.forEach((item) => {
        activeNum += item.dauNum;
        newIntall += item.installNum;
        payTotal += item.payAmount;
        payCount += item.payCount;

        item.ds = weekFunction(item.ds);
        item.payAmount = item.payAmount / appData.overallData[1].currencyRate;
        item.payRate = item.dauNum == 0 ? 0 : (item.payCount * 100 / item.dauNum).toFixed(2) + '%';
        item.ARPU = item.dauNum == 0 ? 0 : (item.payAmount / item.dauNum).toFixed(2);
        item.ARPPU = item.payCount == 0 ? 0 : (item.payAmount / item.payCount).toFixed(2);
        item.payInstallAmount = item.payInstallAmount / appData.overallData[1].currencyRate;
        item.payInstallRate = item.installNum == 0 ? 0 : (item.payInstallCount * 100 / item.installNum).toFixed(2) + '%';
        item.payInstallARPU = item.installNum == 0 ? 0 : (item.payInstallAmount / item.installNum).toFixed(2);
        item.payInstallARPPU = item.payInstallCount == 0 ? 0 : (item.payInstallAmount / item.payInstallCount).toFixed(2);
      });

      let realtimeArray = [];
      let realtimeObject1 = new Object();
      realtimeObject1.title = '活跃';
      realtimeObject1.value = '人数:' + activeNum;
      realtimeObject1.payRate = 'Android:' + info[0];
      realtimeObject1.payARPU = 'iOS:' + info[1];
      let realtimeObject2 = new Object();
      realtimeObject2.title = '新增';
      realtimeObject2.payRate = 'Android:' + info[2];
      realtimeObject2.payARPU = 'iOS:' + info[3];
      realtimeObject2.value = '人数:' + newIntall;
      let realtimeObject3 = new Object();
      realtimeObject3.title = '付费';
      realtimeObject3.value = '总额:' + payTotal / appData.overallData[1].currencyRate;
      realtimeObject3.payRate = ' 付费率:' + (activeNum == 0 ? 0 : (payCount * 100 / activeNum).toFixed(2) + '%');
      realtimeObject3.payARPUs = 'ARPU:' + (activeNum == 0 ? 0 : (payTotal / appData.overallData[1].currencyRate / activeNum).toFixed(2));
      realtimeObject3.payARPPU = 'ARPPU:' + (payCount == 0 ? 0 : (payTotal / appData.overallData[1].currencyRate / payCount).toFixed(2));

      realtimeArray.push(realtimeObject1);
      realtimeArray.push(realtimeObject2);
      realtimeArray.push(realtimeObject3);
      this.setData({
        realtimeStatis: realtimeArray,
      });
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