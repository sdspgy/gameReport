import url from "../../../../utils/util.js";
import F2 from '../../../../f2-canvas/lib/f2';
var gameid = require('../../../../app.js');
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
      ds: "日期",
      os: "操作系统",
      clientid: "服",
      creative: "渠道",
      oneRetentionPercentage: "1日留存",
      twoRetentionPercentage: "2日留存",
      threeRetentionPercentage: "3日留存",
      fourRetentionPercentage: "4日留存",
      fiveRetentionPercentage: "5日留存",
      sixRetentionPercentage: "6日留存",
      sevenRetentionPercentage: "7日留存",
      eightRetentionPercentage: "8日留存",
      nineRetentionPercentage: "9日留存",
      tenRetentionPercentage: "10日留存",
      elevenRetentionPercentage: "11日留存",
      twelveRetentionPercentage: "12日留存",
      thirteenRetentionPercentage: "13日留存",
      fourteenRetentionPercentage: "14日留存",
      fifteenRetentionPercentage: "15日留存",
    },
    colWidth: 95,
    tableOs: {
      os: "操作系统"
    }
  }
}
let retentionTitles = {
    oneRetentionPercentage: "1日留存",
    twoRetentionPercentage: "2日留存",
    threeRetentionPercentage: "3日留存",
    fourRetentionPercentage: "4日留存",
    fiveRetentionPercentage: "5日留存",
    sixRetentionPercentage: "6日留存",
    sevenRetentionPercentage: "7日留存",
    eightRetentionPercentage: "8日留存",
    nineRetentionPercentage: "9日留存",
    tenRetentionPercentage: "10日留存",
    elevenRetentionPercentage: "11日留存",
    twelveRetentionPercentage: "12日留存",
    thirteenRetentionPercentage: "13日留存",
    fourteenRetentionPercentage: "14日留存",
    fifteenRetentionPercentage: "15日留存",
  },
  tableDs = {
    ds: "日期"
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

  data: {
    backData: {
      event: 'back'
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
    os: tableOs,
    pickerShow: false,
    page: 1,
    handelRetentionOne: [],
    chartTitle2: "图表暂无数据",
    test: [{
      ds: '2019-09-04',
      oneRetentionPercentage: '26',
      twoRetentionPercentage: 30
    }]
  },

  onLoad: function(options) {
    this.setData({
      gameid: gameid
    });
    let obj = Object.assign({}, tableDs, retentionTitles);
    this.setData({
      titles: obj
    })
    // this.setData({
    //   retentionList: this.data.test
    // })
    // 数据初始化
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
          tickCount: 10,
          formatter: function formatter(ivalue) {
            let RTrimValue = ivalue;
            return RTrimValue;
          }
        }
      });
      chart.line().position('time*value');
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
        bType: this.data.bType
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
    console.log("日期---------" + detail.key)
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
        this.setData({
          titles: obj
        })
      }
      if (this.data.indexStatu == 1) {
        let obj = Object.assign({}, tableDs, tableOs, tableClient, retentionTitles);
        this.setData({
          titles: obj
        })
      }
      if (this.data.indexStatu == 2) {
        let obj = Object.assign({}, tableDs, tableOs, retentionTitles);
        this.setData({
          titles: obj
        })
      }
      if (this.data.indexStatu == 2 && detail.key == 0) {
        let obj = Object.assign({}, tableDs, retentionTitles);
        this.setData({
          titles: obj
        })
      }

    } else {
      if (this.data.indexStatu == 0) {
        let obj = Object.assign({}, tableDs, tableCreative, retentionTitles);
        this.setData({
          titles: obj
        })
      }
      if (this.data.indexStatu == 1) {
        let obj = Object.assign({}, tableDs, tableClient, retentionTitles);
        this.setData({
          titles: obj
        })
      }
      if (this.data.indexStatu == 2) {
        let obj = Object.assign({}, tableDs, retentionTitles);
        this.setData({
          titles: obj
        })
      }

    }
    this.setData({
      sysType: detail.key,
      isOs: detail.key == 3 ? 1 : 0,
    });
    console.log("设备--------" + detail.key)
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
        let obj = Object.assign({}, tableDs, tableOs, retentionTitles)
        this.setData({
          titles: obj
        })
      } else {
        let obj = Object.assign({}, tableDs, retentionTitles)
        this.setData({
          titles: obj
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
          let obj = Object.assign({}, tableDs, tableCreative, retentionTitles)
          this.setData({
            titles: obj
          })
        } else {
          let obj = Object.assign({}, tableDs, tableOs, tableCreative, retentionTitles)
          this.setData({
            titles: obj
          })
        }
        this.setData({
          array: this.data.arrayCreate,
        })
        console.log("渠道--------" + detail.key)
        this.reset();
        this.init();
      } else {
        if (this.data.sysType == 3) {
          let obj = Object.assign({}, tableDs, tableClient, retentionTitles)
          this.setData({
            titles: obj
          })
        } else {
          let obj = Object.assign({}, tableDs, tableOs, tableClient, retentionTitles)
          this.setData({
            titles: obj
          })
        }
        this.setData({
          array: this.data.arrayClient
        })
        console.log("分服--------" + detail.key)
        this.reset();
        this.init();
      }
    }
  },
  // 具体CC
  bindPickerChange: function(e) {
    console.log("渠道/分服--------" + e.detail.value)
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
    console.log(detail.index + ":" + JSON.stringify(detail.data));
    let handelRetentionOne = this.makeRetentionOne(detail.data);
    this.setData({
      handelRetentionOne: handelRetentionOne,
      chartTitle2: handelRetentionOne.length == 0 ? "图表暂无数据" : "图标数据"
    })
    this.init_f2();
  },

  //滚动条底部事件
  onBottomTap: function() {
    this.data.page += 1;
    this.init();
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
        ccNum: this.data.index,
        page: this.data.page,
      },
      method: "post",
      success: (e) => {
        if (e.data.success === true) {
          console.log(e.data.shareRetentionList)
          if (e.data.shareRetentionList) {
            if (e.data.shareRetentionList.length != 0 && this.data.page != 1) {
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
            if (this.data.retentionList == null) {
              retentionList = e.data.shareRetentionList;
            } else {
              retentionList = this.data.retentionList.concat(e.data.shareRetentionList);
            }
            retentionList = this.saturday(retentionList);
            this.setData({
              retentionList: retentionList,
            });
            let handelRetentionOne = this.makeRetentionOne(retentionList[0]);
            this.setData({
              handelRetentionOne: handelRetentionOne,
              chartTitle2: handelRetentionOne.length == 0 ? "图表暂无数据" : "图标数据"
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
      })
      return data;
    }
  },
  makeRetentionOne: function(data) {
    let handelRetentionOne = [];
    // if (data) {
    //   let handelRetentionOne = [];
    //   data.forEach((item, index) => {
    //     let info = new Object();
    //     info.time = index + 1;
    //     info.value = item.oneRetentionPercentage;
    //     handelRetentionOne.push(info);
    //   });
    //   console.log("---------handelRetentionOne:" + JSON.stringify(handelRetentionOne));
    //   return handelRetentionOne;
    // }
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