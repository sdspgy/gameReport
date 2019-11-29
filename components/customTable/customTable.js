/**
 * 自定义到表格组件
 */
Component({
  //属性定义
  properties: {
    data: { //属性名
      type: Array,
      value: '',
    },
    titles: Object, //简化的定义方式
    caption: String,
    scrollY: {
      type: Boolean,
      value: false,
    },
    tableHeight: {
      type: Number,
    },
    colWidth: {
      type: Number,
      value: 90,
    },
  },
  //私有数据，可用于模版渲染
  data: {
    crtRow: -1, //当前被选中的行
    crtCol: null, //当前被选中的列
    left1: 0,
    left2: 0,
  },

  lifetimes: {
    attached: function () {
      //根据titles 动态设置表格的宽度 
      let keys = Object.keys(this.data.titles);
      this.setData({
        tableWidth: keys.length * this.properties.colWidth
      })
    },
  },
  observers: {
    //数据发生变化触发外部绑定的事件
    "data": function (data) {
      let keys = Object.keys(this.data.titles);
      this.setData({
        tableWidth: keys.length * this.properties.colWidth
      });
      if (this.data.crtRow > -1) {
        this.triggerEvent('rowtap', {
          data: data[this.data.crtRow],
          index: this.data.crtRow
        }, {});
      }
      if (this.data.crtCol != null) {
        let d = [];
        data.forEach((item, index) => {
          d[index] = item[this.data.crtCol];
        })
        this.triggerEvent('coltap', {
          data: d,
          col: this.data.crtCol
        }, {});
      }
    }
  },
  
  methods: {
    //row被tap
    onRowTap: function(event) {
      let v = event.currentTarget;
      this.setData({
        crtRow: v.dataset.index,
        crtCol: null,
      })
      //触发外部绑定事件
      this.trigggerEvent('rowtap', {
        data: this.properties.data[this.data.crtRow],
        index: this.data.crtRow,
      }, {
        bubbles: true
      }) //事件是否冒泡
    },
    //col被top
    onColTao: function(event) {
      let v = event.currentTarget;
      this.setData({
        crtRow: -1,
        crtCol: v.dataset.col,
      })
      let data = [];
      this.properties.data.forEach((item, index) => {
        data[index] = item[this.data.crtCol];
      })
      //触发外部绑定事件
      this.trigggerEvent('coltap', {
        data: data,
        col: this.data.crtCol,
      }, {
        bubbles: true
      })
    },
    //滑动绑定
    bindToHead: function({
      detail
    }) {
      this.setData({
        left1: detail.scrollLeft,
        left2: detail.scrollLeft,
      })
    },
    //底部事件
    bottomEvent: function() {
      this.trigggerEvent('bottomtap', {

      }, {
        bubbles: true
      });
    },
  },
})