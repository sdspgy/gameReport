// pages/game/template/portrait/device/device.js
import F2 from '../../../../../f2-canvas/lib/f2';
var appData = require('../../../../../app.js');
var common = require("../../../../../utils/util.js");

const conf = {
  type: {
    install: 0,
    dau: 1
  }
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    conf: conf,
    gameid: 1,
    currencyRate: 1000,
    type_bottom: false,
    active_type: 0,

    chartDevice: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      gameid: appData.overallData[0],
      currencyRate: appData.overallData[1].currencyRate,
    })
    //改标题
    wx.setNavigationBarTitle({
      title: appData.overallData[1].name + '-设备分布'
    })
    common.log("游戏ID:" + this.data.gameid + "---------" + "汇率：" + this.data.currencyRate)
    this.init();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  typeChange: function(event) {
    let type_active = event.detail;
    this.setData({
      active_type: type_active,
    })
    this.init();
  },

  /**
   * ------------Request--------
   */
  init: function() {
    //整理参数-----------
    const that = this;
    let info = {
      gameid: parseInt(that.data.gameid),
      type: parseInt(that.data.active_type)
    }
    //请求--------------
    common.showLoading();
    wx.request({
      url: common.requestUrl + '/api/deviceDis',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'post',
      data: info,
      success: function(e) {
        wx.hideLoading();
        if (e.data.success === true) {
          let devices = e.data.deviceDis;
          let dailyInstallNum = e.data.shareDailyResultTypes[0].installNum,
            dailyDauNum = e.data.shareDailyResultTypes[0].dauNum;
          let chartDevice = [];
          let i = devices.length > 20 ? 20 : devices.length;
          if (that.data.active_type == conf.type.install) {
            for (; i > 0; i--) {
              let deviceObj = new Object();
              deviceObj.name = devices[i].device;
              deviceObj.value = devices[i].deviceInstallNumbers;
              deviceObj.precentage = (dailyInstallNum == 0 ? 0 : (devices[i].deviceInstallNumbers / dailyInstallNum).toFixed(2));
              chartDevice.push(deviceObj);
            }
          } else {
            for (; i > 0; i--) {
              let deviceObj = new Object();
              deviceObj.name = devices[i].device;
              deviceObj.value = devices[i].deviceDauNumbers;
              deviceObj.precentage = (dailyDauNum == 0 ? 0 : (devices[i].deviceDauNumbers / dailyDauNum).toFixed(2));
              chartDevice.push(deviceObj);
            }
          }

          that.setData({
            chartDevice: chartDevice
          })
          that.init_f2();
        } else {
          common.showSuccess("请联系管理员！");
        }
      },
      error: function(e) {
        wx.hideLoading();
        common.showSuccess("请求失败！");
      }
    })
  },

  /**
   * 柱状图
   */
  init_f2: function() {
    this.retentionComponent = this.selectComponent('#device_one_F2');
    this.retentionComponent.init((canvas, width, height) => {
      const chart = new F2.Chart({
        el: canvas,
        width,
        height,
        animate: true
      });

      chart.source(this.data.chartDevice, {
        // value: {
        // tickCount: 5,
        // min: 0,
        // formatter: function formatter(ivalue) {
        //   let RTrimValue = ivalue;
        //   return RTrimValue;
        // },
        // },
      });
      //设置图列居中显示
      chart.legend({
        position: 'top', //图列位置
        align: 'center', //图例的对齐方式
        itemWidth: null
      });
      chart.coord({
        transposed: true
      });
      chart.tooltip({
        // showCrosshairs: true, //纵坐标线
        showItemMarker: false, //去小原点
        onShow: function onShow(ev) {
          const items = ev.items;
          items[0].name = null;
          items[0].name = items[0].title;
          items[0].value = '' + items[0].value + ';' + items[0].origin.precentage + '%';
        },
        offsetX: -30
      });
      // 坐标轴文本旋转
      chart.axis('name', {
        label: {
          rotate: -Math.PI / 0.5,
          textAlign: 'end',
          textBaseline: 'middle'
        }
      });
      chart.interval()
        .position('name*value');

      // 柱状图添加文本
      this.data.chartDevice.forEach(function(obj) {
        chart.guide().text({
          position: [obj.name, obj.value],
          content: obj.value,
          style: {
            textAlign: 'center',
            textBaseline: 'bottom'
          },
          offsetY: 5,
          offsetX: 7,
        });
      });

      chart.render();
      return chart;
    });
  },
})