import url from "../../../../utils/util.js";
import F2 from '../../../../f2-canvas/lib/f2';
var appData = require('../../../../app.js');
var common = require("../../../../utils/util.js");
// 全局提示
const {
  $Message
} = require('../../../../dist/base/index');

const titleType = {
  0: '用户留存',
  1: '用户忠诚度',
};
const conf = {
  table: {
    retentionTitles: {
      ds: "日期（星期）",
      os: "操作系统",
      clientid: "服",
      creative: "渠道",
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
    colWidth: 90,
    tableOs: {
      os: "操作系统"
    }
  }
}
let retentionTitles = {
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
  tableDs = {
    ds: "日期(星期)"
  },
  tableOs = {
    os: "操作系统"
  },
  tableCreative = {
    creative: "渠道"
  },
  tableClient = {
    client: "服"
  },
  payRenDayTitles = {
    '1day': "1日",
    '2day': "2日",
    '3day': "3日",
    '4day': "4日",
    '5day': "5日",
    '6day': "6日",
    '7day': "7日",
    '8day': "8日",
    '9day': "9日",
    '10day': "10日",
    '11day': "11日",
    '12day': "12日",
    '13day': "13日",
    '14day': "14日",
    '15day': "15日",
    '16day': "16日",
    '17day': "17日",
    '18day': "18日",
    '19day': "19日",
    '20day': "20日",
    '21day': "21日",
    '22day': "22日",
    '23day': "23日",
    '24day': "24日",
    '25day': "25日",
    '26day': "26日",
    '27day': "27日",
    '28day': "28日",
    '29day': "29日",
    '30day': "30日",
  }

Page({

  data: {
    ishowDevice: true,
    backData: {
      event: 'back'
    },
    bType: ['info', 'ghost'],
    bTypeIndex: 0,
    source: '0',
    data: 7,
    optsRetentionF2: {
      lazyLoad: true
    },
    retentionlist: [],
    gameid: "",
    sysType: 0,
    isOs: 0,
    indexStatu: 2,
    array: ['全渠道', '应用宝', '小米', '华为'],
    arrayCreate: ['全渠道', 'moegoApp', 'huawei', 'm360', 'meizu', 'oppo', 'sougou', 'vivo', 'xiaomi', 'yyb', 'AppStore', 'TL10', 'aliyun', 'lenovo'],
    arrayClient: ['全服', '1服', '2服', '3服', '4服', '5服', '6服', '7服', '8服', '9服'],
    index: 0,
    type: 0,
    conf: conf,
    titles: retentionTitles,
    payRenDayTitles: payRenDayTitles,
    os: tableOs,
    pickerShow: false,
    page: 1,
    handelRetentionOne: [],
    chartTitle2: "图表暂无数据",
    test: [{
      ds: '2019-09-04',
      oneRetentionPercentage: '26',
      twoRetentionPercentage: 30
    }],
    payRentenTable: [],
    payInstallRetenTable: [],
    creatives: [],
    clients: [],
    clientMap: {},
    creativeMap: {}
  },

  onLoad: function(options) {
    this.setData({
      gameid: appData.overallData[0],
      ishowDevice: appData.overallData[1].parentId == 1 ? false : true
    });
    //改标题
    wx.setNavigationBarTitle({
      title: appData.overallData[1].name + '-留存'
    })
    let obj = Object.assign({}, tableDs, retentionTitles);
    let payRen = Object.assign({}, tableDs, payRenDayTitles);
    this.setData({
      titles: obj,
      payRenDayTitles: payRen
    })
    this.init();
  },

  init_f2: function() {
    this.retentionComponent = this.selectComponent('#retentionF2');
    this.retentionComponent.init((canvas, width, height) => {
      const chart = new F2.Chart({
        el: canvas,
        width,
        height,
        animate: true
      });
      chart.source(this.data.handelRetentionOne, {
        value: {
          tickCount: 4,
          formatter: function formatter(ivalue) {
            let RTrimValue = ivalue;
            return RTrimValue + '%';
          },
        },
        time: {
          range: [0, 1],
          min: 1,
          max: 15,
        }
      });
      chart.tooltip({
        showCrosshairs: true,
        showItemMarker: false,
        onShow: function onShow(ev) {
          var items = ev.items;
          items[0].name = items[0].title + '日留存率';
          items[0].value = items[0].value;
        }
      });
      chart.line().position('time*value').shape('smooth').color('l(0) 0:#F2C587 0.5:#ED7973 1:#8659AF');
      chart.point().position('time*value').shape('smooth').style({
        stroke: '#fff',
        lineWidth: 1
      }).color('l(0) 0:#F2C587 0.5:#ED7973 1:#8659AF');
      chart.area().position('time*value').shape('smooth').color('l(0) 0:#F2C587 0.5:#ED7973 1:#8659AF');
      chart.render();
      // return chart;
    });
  },
  // 用户设备
  handleClick: function(e) {
    this.setData({
      type: e.currentTarget.id
    });
    if (e.currentTarget.id != this.data.bTypeIndex) {
      this.data.bType[0] = [this.data.bType[1], this.data.bType[1] = this.data.bType[0]][0];
      this.setData({
        bTypeIndex: e.currentTarget.id,
        bType: this.data.bType,
      })
    };
    this.reset();
    this.init();
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
    titleName = this.titleTypes(this.data.source);
    this.reset();
    this.init();
  },
  // 日期
  handleChangeData({
    detail
  }) {
    this.setData({
      data: detail.key
    });
    // console.log("日期---------" + detail.key)
    this.reset();
    this.init();
  },
  // OS
  handleChangeSystem({
    detail
  }) {
    if (detail.key != 3) {
      if (this.data.indexStatu == 0) {
        let obj = Object.assign({}, tableDs, tableOs, tableCreative, retentionTitles);
        let payRen = Object.assign({}, tableDs, tableOs, tableCreative, payRenDayTitles);
        this.setData({
          titles: obj,
          payRenDayTitles: payRen,
        })
      }
      if (this.data.indexStatu == 1) {
        let obj = Object.assign({}, tableDs, tableOs, tableClient, retentionTitles);
        let payRen = Object.assign({}, tableDs, tableOs, tableClient, payRenDayTitles);
        this.setData({
          titles: obj,
          payRenDayTitles: payRen,
        })
      }
      if (this.data.indexStatu == 2) {
        let obj = Object.assign({}, tableDs, tableOs, retentionTitles);
        let payRen = Object.assign({}, tableDs, tableOs, payRenDayTitles);
        this.setData({
          titles: obj,
          payRenDayTitles: payRen,
        })
      }
      if (this.data.indexStatu == 2 && detail.key == 0) {
        let obj = Object.assign({}, tableDs, retentionTitles);
        let payRen = Object.assign({}, tableDs, payRenDayTitles);
        this.setData({
          titles: obj,
          payRenDayTitles: payRen,
        })
      }

    } else {
      if (this.data.indexStatu == 0) {
        let obj = Object.assign({}, tableDs, tableCreative, retentionTitles);
        let payRen = Object.assign({}, tableDs, tableCreative, payRenDayTitles);
        this.setData({
          titles: obj,
          payRenDayTitles: payRen,
        })
      }
      if (this.data.indexStatu == 1) {
        let obj = Object.assign({}, tableDs, tableClient, retentionTitles);
        let payRen = Object.assign({}, tableDs, tableClient, payRenDayTitles);
        this.setData({
          titles: obj,
          payRenDayTitles: payRen,
        })
      }
      if (this.data.indexStatu == 2) {
        let obj = Object.assign({}, tableDs, retentionTitles);
        let payRen = Object.assign({}, tableDs, payRenDayTitles);
        this.setData({
          titles: obj,
          payRenDayTitles: payRen,
        })
      }

    }
    this.setData({
      sysType: detail.key,
      isOs: detail.key == 3 ? 1 : 0,
    });
    // console.log("设备--------" + detail.key)
    this.reset();
    this.init();
  },
  //渠道/分服
  handleChangeStatus({
    detail
  }) {
    this.setData({
      indexStatu: detail.key,
      index: 0
    });
    if (detail.key == 2) {
      this.setData({
        pickerShow: false,
      })
      if (this.data.sysType == 1 || this.data.sysType == 2) {
        let obj = Object.assign({}, tableDs, tableOs, retentionTitles);
        let payRen = Object.assign({}, tableDs, tableOs, payRenDayTitles);
        this.setData({
          titles: obj,
          payRenDayTitles: payRen,
        })
      } else {
        let obj = Object.assign({}, tableDs, retentionTitles);
        let payRen = Object.assign({}, tableDs, payRenDayTitles);
        this.setData({
          titles: obj,
          payRenDayTitles: payRen,
        })
      }
      this.reset();
      this.init();
    } else {
      this.setData({
        pickerShow: true
      });
      if (detail.key == 0) {
        if (this.data.sysType == 3) {
          let obj = Object.assign({}, tableDs, tableCreative, retentionTitles);
          let payRen = Object.assign({}, tableDs, tableCreative, payRenDayTitles);
          this.setData({
            titles: obj,
            payRenDayTitles: payRen,
          })
        } else {
          let obj = Object.assign({}, tableDs, tableOs, tableCreative, retentionTitles);
          let payRen = Object.assign({}, tableDs, tableOs, tableCreative, payRenDayTitles);
          this.setData({
            titles: obj,
            payRenDayTitles: payRen,
          })
        }
        this.setData({
          array: this.data.arrayCreate,
        })
        // console.log("渠道--------" + detail.key)
        this.reset();
        this.init();
      } else {
        if (this.data.sysType == 3) {
          let obj = Object.assign({}, tableDs, tableClient, retentionTitles);
          let payRen = Object.assign({}, tableDs, tableClient, payRenDayTitles);
          this.setData({
            titles: obj,
            payRenDayTitles: payRen,
          })
        } else {
          let obj = Object.assign({}, tableDs, tableOs, tableClient, retentionTitles);
          let payRen = Object.assign({}, tableDs, tableOs, tableClient, payRenDayTitles);
          this.setData({
            titles: obj,
            payRenDayTitles: payRen,
          })
        }
        this.setData({
          array: this.data.arrayClient
        })
        // console.log("分服--------" + detail.key)
        this.reset();
        this.init();
      }
    }
  },
  // 具体CC
  bindPickerChange: function(e) {
    // console.log("渠道/分服--------" + e.detail.value)
    this.setData({
      index: e.detail.value
    })
    this.reset();
    this.init();
  },

  //表格横行被点击
  onRowTap: function({
    detail
  }) {
    // console.log(detail.index + ":" + JSON.stringify(detail.data));
    let handelRetentionOne = this.makeRetentionOne(detail.data);
    this.setData({
      handelRetentionOne: handelRetentionOne,
      chartTitle2: handelRetentionOne.length == 0 ? "图表暂无数据" : detail.data.ds + "留存趋势"
    })
    this.init_f2();
  },

  //滚动条底部事件
  onBottomTap: function() {
    this.data.page += 1;
    this.init();
  },

  //切换条件，重置page,retentionList
  reset: function() {
    this.setData({
      page: 1,
      retentionList: []
    })
  },

  back: function() {
    wx.redirectTo({
      url: '../../../index/index',
    })
  },

  //数据初始化
  init: function() {
    wx.showLoading({
      title: "数据加载中",
      mask: true
    });

    let data = {
      gameid: parseInt(this.data.gameid),
      deviceType: parseInt(this.data.type),
      osType: parseInt(this.data.sysType),
      isOs: this.data.isOs,
      data: parseInt(this.data.data),
      ccType: parseInt(this.data.indexStatu),
      ccNum: this.data.index,
      page: this.data.page,
    }
    if (this.data.indexStatu == 1) {
      data.ccNum = this.data.index;
    }
    if (this.data.indexStatu == 0) {
      data.ccNum = this.data.creatives[this.data.index].key
    }
    wx.request({
      url: url.requestUrl + '/api/retention',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'token': wx.getStorageSync("token")
      },
      data: data,
      method: "post",
      success: (e) => {
        setTimeout(() => {
          wx.hideLoading();
        }, 100);
        if (e.data.success === true) {
          // console.log(e.data.shareRetentionList)
          if (e.data.shareRetentionList) {
            if (e.data.shareRetentionList.length != 0 && this.data.page != 1 && this.data.data != 1) {
              wx.showToast({
                title: "加载第" + this.data.page + "页",
                icon: 'success',
                duration: 1000
              });
            }
            if (e.data.shareRetentionList.length == 0 && this.data.page != 1) {
              wx.showToast({
                title: "已经是最后一页数据",
                icon: 'fail',
                duration: 1000
              });
            }
            let retentionList = [];
            retentionList = this.saturday(e.data.shareRetentionList);
            //放入Map,creativeid为key
            let creativeMap = new Map();
            (e.data.creatives).forEach((item, index) => {
              creativeMap.set(item.creativeid, item.creativeName)
            })
            
            let clientMap = new Map();
            (e.data.clients).forEach((item, index) => {
              clientMap.set(item.serverid, item.serverName)
            })

            retentionList.forEach(item => {
              item.creative = creativeMap.get(item.creative) === undefined ? item.creative : creativeMap.get(item.creative);
              item.client = clientMap.get(String(item.clientid)) === undefined ? item.client : clientMap.get(String(item.clientid));
            })
            if (this.data.retentionList == null) {
              retentionList = retentionList;
            } else {
              if (this.data.data != 1) {
                retentionList = this.data.retentionList.concat(retentionList);
              }
            }
            this.setData({
              retentionList: retentionList,
            });
            let handelRetentionOne = this.makeRetentionOne(retentionList[5]);
            this.setData({
              handelRetentionOne: handelRetentionOne,
              chartTitle2: handelRetentionOne.length == 0 ? "图表暂无数据" : retentionList[5].ds + "留存趋势"
            })
            this.init_f2();
          }
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
    });

    let payRentenData = {
      gameid: parseInt(this.data.gameid),
      date: parseInt(this.data.data),
      device: parseInt(this.data.type) == 0 ? false : true,
    }
    if (this.data.sysType != 3) {
      payRentenData.os = this.data.sysType;
    }
    if (this.data.indexStatu == 1) {
      payRentenData.clientid = this.data.index;
    }
    if (this.data.indexStatu == 0) {
      payRentenData.creative = this.data.creatives[this.data.index].key
    }

    wx.request({
      url: url.requestUrl + '/api/payRetention',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'token': wx.getStorageSync("token")
      },
      data: payRentenData,
      method: "post",
      success: (e) => {
        if (e.data.success === true) {
          const payReten = e.data.sharePayRetentionMap;
          const installPayReten = e.data.shareInstallPayRetentionMap;
          /**
           * 渠道信息
           * @param creativeMap 替换表格数据
           * @param creativeNames 替换选择头
           */
          let creatives = (e.data.creatives).map(item => ({
            key: item.creativeid,
            name: item.creativeName,
          }));

          let clients = (e.data.clients).map(item => ({
            key: item.serverid,
            name: item.serverName,
          }));

          let creativeNames = [];
          creativeNames.push('全渠道');
          (e.data.creatives).forEach(item => {
            creativeNames.push(item.creativeName);
          });

          let allObject = new Object();
          allObject.key = '0';
          allObject.name = '全渠道';
          creatives.unshift(allObject);
          //放入Map,creativeid为key
          let creativeMap = new Map();
          creatives.forEach((item, index) => {
            creativeMap.set(item.key, item.name)
          })

          let clientNames = [];
          clientNames.push('所有服');
          (e.data.clients).forEach(item =>{
            clientNames.push(item.serverName);
          });
          let clientMap = new Map();
          clients.forEach((item,indx) =>{
            clientMap.set(item.key,item.name)
          })

          this.setData({
            arrayCreate: creativeNames,
            creatives: creatives,
            creativeMap: creativeMap,
            arrayClient:clientNames,
            clients: clients,
            clientMap: clientMap
          })
          /**
           * -----------------安装付费留存-------------
           */
          if (installPayReten) {
            let payInstallRetenArray = [];
            for (let key in installPayReten) {
              let payInstallRentenObj = {};
              payInstallRentenObj.ds = common.week(installPayReten[key][0].ds);
              payInstallRentenObj.os = installPayReten[key][0].os;
              payInstallRentenObj.creative = creativeMap.get(installPayReten[key][0].creative) === undefined ? installPayReten[key][0].creative : creativeMap.get(installPayReten[key][0].creative);
              payInstallRentenObj.client = clientMap.get(String(installPayReten[key][0].clientid));
              for (let i = 1; i <= 30; i++) {
                payInstallRentenObj[i + 'day'] = 0;
              }
              installPayReten[key].forEach(item => {
                payInstallRentenObj[item.dr + 'day'] = item.payInstallCount == 0 ? 0 : (item.retention / item.payInstallCount * 100).toFixed(2);
              })
              payInstallRetenArray.push(payInstallRentenObj);
            }
            payInstallRetenArray.sort(this.compare);
            this.setData({
              payInstallRetenTable: payInstallRetenArray,
            })
          }
          /**
           * -------------付费留存---------------
           */
          if (payReten) {
            let payRetenArray = [];
            for (let key in payReten) {
              let payRentenObj = {};
              payRentenObj.ds = common.week(payReten[key][0].ds);
              payRentenObj.os = payReten[key][0].os;
              payRentenObj.creative = creativeMap.get(payReten[key][0].creative) === undefined ? payReten[key][0].creative : creativeMap.get(payReten[key][0].creative);
              payRentenObj.client = clientMap.get(String(payReten[key][0].clientid));
              for (let i = 1; i <= 30; i++) {
                payRentenObj[i + 'day'] = 0;
              }
              payReten[key].forEach(item => {
                payRentenObj[item.dr + 'day'] = item.payCount == 0 ? 0 : (item.retention / item.payCount * 100).toFixed(2);
              })
              payRetenArray.push(payRentenObj);
            }
            payRetenArray.sort(this.compare);
            this.setData({
              payRentenTable: payRetenArray,
            })
          }
        }
      }
    })
  },

  compare: function(obj1, obj2) {
    var val1 = obj1.ds;
    var val2 = obj2.ds;
    if (val1 < val2) {
      return 1;
    } else if (val1 > val2) {
      return -1;
    } else {
      return 0;
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
            break
          case 1:
            saturdays = ['sevenRetentionPercentage', 'fourteenRetentionPercentage'];
            break
          case 2:
            saturdays = ['sixRetentionPercentage', 'thirteenRetentionPercentage'];
            break
          case 3:
            saturdays = ['fiveRetentionPercentage', 'twelveRetentionPercentage'];
            break
          case 4:
            saturdays = ['fourRetentionPercentage', 'elevenRetentionPercentage'];
            break
          case 5:
            saturdays = ['threeRetentionPercentage', 'tenRetentionPercentage'];
            break
          case 6:
            saturdays = ['twoRetentionPercentage', 'nineRetentionPercentage'];
            break
          default:
        };
        item.special = saturdays;
        item.oneSpecial = saturdays[0];
        item.twoSpecial = saturdays[1];
        item.ds = common.week(item.ds);
      })
      return data;
    }
  },

  makeRetentionOne: function(data) {
    let handelRetentionOne = [];
    if (data) {
      let info1 = new Object();
      info1.time = 1;
      info1.value = parseFloat(data.oneRetentionPercentage);
      handelRetentionOne.push(info1);
      let info2 = new Object();
      info2.time = 2;
      info2.value = parseFloat(data.twoRetentionPercentage);
      handelRetentionOne.push(info2);
      let info3 = new Object();
      info3.time = 3;
      info3.value = parseFloat(data.threeRetentionPercentage);
      handelRetentionOne.push(info3);
      let info4 = new Object();
      info4.time = 4;
      info4.value = parseFloat(data.fourRetentionPercentage);
      handelRetentionOne.push(info4);
      let info5 = new Object();
      info5.time = 5;
      info5.value = parseFloat(data.fiveRetentionPercentage);
      handelRetentionOne.push(info5);
      let info6 = new Object();
      info6.time = 6;
      info6.value = parseFloat(data.sixRetentionPercentage);
      handelRetentionOne.push(info6);
      let info7 = new Object();
      info7.time = 7;
      info7.value = parseFloat(data.sevenRetentionPercentage);
      handelRetentionOne.push(info7);
      let info8 = new Object();
      info8.time = 8;
      info8.value = parseFloat(data.eightRetentionPercentage);
      handelRetentionOne.push(info8);
      let info9 = new Object();
      info9.time = 9;
      info9.value = parseFloat(data.nineRetentionPercentage);
      handelRetentionOne.push(info9);
      let info10 = new Object();
      info10.time = 10;
      info10.value = parseFloat(data.tenRetentionPercentage);
      handelRetentionOne.push(info10);
      let info11 = new Object();
      info11.time = 11;
      info11.value = parseFloat(data.elevenRetentionPercentage);
      handelRetentionOne.push(info11);
      let info12 = new Object();
      info12.time = 12;
      info12.value = parseFloat(data.twelveRetentionPercentage);
      handelRetentionOne.push(info12);
      let info13 = new Object();
      info13.time = 13;
      info13.value = parseFloat(data.thirteenRetentionPercentage);
      handelRetentionOne.push(info13);
      let info14 = new Object();
      info14.time = 14;
      info14.value = parseFloat(data.fourteenRetentionPercentage);
      handelRetentionOne.push(info14);
      let info15 = new Object();
      info15.time = 15;
      info15.value = parseFloat(data.fifteenRetentionPercentage);
      handelRetentionOne.push(info15);
    }
    return handelRetentionOne;
  }
})