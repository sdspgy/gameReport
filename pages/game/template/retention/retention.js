import url from "../../../../utils/util.js";
import F2 from '../../../../f2-canvas/lib/f2';
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
    ds: "日期",
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
    sysType: 3,
    isOs: 0,
    indexStatu: 2,
    array: ['全渠道', '应用宝', '小米', '华为'],
    arrayCreate: ['全渠道', '应用宝', '小米', '华为'],
    arrayClient: ['全服', '1服', '2服', '3服'],
    index: 0,
    type: 0,
    conf: conf,
    titles: retentionTitles,
    os: tableOs,
    pickerShow: false,
  },

  onLoad: function(options) {
    this.setData({
      gameid: options.gameId
    });
    console.log("--------游戏Id:" + options.gameId);
    //数据初始化
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
      chart.source(this.data.datas, {
        value: {
          tickCount: 10,
          formatter: function formatter(ivalue) {
            return ivalue;
          }
        }
      });
      chart.line().position('time*value');
      chart.render();
      return chart;
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
    this.init();
  },
  // OS
  handleChangeSystem({
    detail
  }) {
    if (detail.key != 3) {
      if (this.data.indexStatu == 0) {
        let obj = Object.assign({}, tableOs, tableCreative, retentionTitles);
        this.setData({
          titles: obj
        })
      }
      if (this.data.indexStatu == 1) {
        let obj = Object.assign({}, tableOs, tableClient, retentionTitles);
        this.setData({
          titles: obj
        })
      }
      if (this.data.indexStatu == 2) {
        let obj = Object.assign({}, tableOs, retentionTitles);
        this.setData({
          titles: obj
        })
      }

    } else {
      if (this.data.indexStatu == 0) {
        let obj = Object.assign({}, tableCreative, retentionTitles);
        this.setData({
          titles: obj
        })
      }
      if (this.data.indexStatu == 1) {
        let obj = Object.assign({}, tableClient, retentionTitles);
        this.setData({
          titles: obj
        })
      }
      if (this.data.indexStatu == 2) {
        let obj = Object.assign({}, retentionTitles);
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
    this.init();
  },
  //渠道/分服
  handleChangeStatus({
    detail
  }) {
    this.setData({
      indexStatu: detail.key,
    });
    if (detail.key == 2) {
      this.setData({
        pickerShow: false,
      })
      if (this.data.sysType != 3) {
        let obj = Object.assign({}, tableOs, retentionTitles)
        this.setData({
          titles: obj
        })
      } else {
        this.setData({
          titles: retentionTitles
        })
      }
      this.init();
    } else {
      this.setData({
        pickerShow: true
      });
      if (detail.key == 0) {
        if (this.data.sysType == 3) {
          let obj = Object.assign({}, tableCreative, retentionTitles)
          this.setData({
            titles: obj
          })
        } else {
          let obj = Object.assign({}, tableOs, tableCreative, retentionTitles)
          this.setData({
            titles: obj
          })
        }
        this.setData({
          array: this.data.arrayCreate,
        })
        console.log("渠道--------" + detail.key)
        this.init();
      } else {
        if (this.data.sysType == 3) {
          let obj = Object.assign({}, tableClient, retentionTitles)
          this.setData({
            titles: obj
          })
        } else {
          let obj = Object.assign({}, tableOs, tableClient, retentionTitles)
          this.setData({
            titles: obj
          })
        }
        this.setData({
          array: this.data.arrayClient
        })
        console.log("分服--------" + detail.key)
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
      },
      method: "post",
      success: (e) => {
        if (e.data.success === true) {
          if (e.data.shareRetentionList) {
            this.setData({
              retentionList: e.data.shareRetentionList,
            })
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
})