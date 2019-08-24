import url from "../../../../utils/util.js";
import F2 from '../../../../f2-canvas/lib/f2';
// 全局提示
const {
  $Message
} = require('../../../../dist/base/index');

const conf = {
  navData: [{
    name: "概况", //文本
    currentMenu: 0, //是否是当前页，0不是  1是
    style: 0, //样式
    ico: 'dynamic_fill', //不同图标
    fn: 'gotoIndex' //对应处理函数
  }, {
    name: "新进",
    currentMenu: 1,
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
}
Page({

  onLoad: function(e) {
    this.setData({
      gameid: e.gameId
    })
    console.log("gameId-----" + this.data.gameid)
  },

  data: {
    navData: conf.navData,
    gameid: '',
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
    indexStatu: 0,
    array: ['全渠道', '应用宝', '小米', '华为'],
    arrayCreate: ['全渠道', '应用宝', '小米', '华为'],
    arrayClient: ['全服', '1服', '2服', '3服'],
    index: 0,
    type: 0,
    pickerShow: true,
  },

  // 用户设备
  handleClick: function (e) {
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
      index: 0,
    });
    if (detail.key == 2) {
      this.setData({
        pickerShow: false
      })
      this.init();
    } else {
      this.setData({
        pickerShow: true
      });
      if (detail.key == 0) {
        this.setData({
          array: this.data.arrayCreate,
        })
        console.log("渠道--------" + detail.key)
        this.init();
      } else {
        this.setData({
          array: this.data.arrayClient
        })
        console.log("分服--------" + detail.key)
        this.init();
      }
    }
  },
  // 具体CC
  bindPickerChange: function (e) {
    console.log("渠道/分服--------" + e.detail.value)
    this.setData({
      index: e.detail.value
    })
    this.init();
  },

  // 底部跳转
  gotoIndex: function() {
    wx.redirectTo({
      url: '../survey/survey?gameId=' + this.data.gameid,
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

})