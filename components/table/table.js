/**
 * author:wanghaoxin
 * 组件自定义属性：
 *      data:     表格数据，需要与titles的key相对应
 *      titles:   表格头  {date:'日期', name:'名字',.......}
 *      caption:  表格标题
 *      col-width:单元格宽度(px)
 *      rowtap:   表格行被点击绑定的事件   detail:{data:被点击这一行的数据, index:被点击这一行的索引} 
 *      coltap:   表格行被点击绑定的事件   detail:{data:被点击这一列的数据, col:被点击这一列的title名}
 */


Component({
    properties: {
        data: {
            type: Array
        },
        titles: {
            type: Object
        },
        caption: {
            type: String
        },
        scrollY: {
          type: Boolean,
          value: false
        },
        tableHeight: {
          type: Number
        },
        colWidth: {
            type: Number,
            value: 75
        }
    },

    lifetimes: {
        attached: function() {
            //根据titles 动态设置表格的宽度 
            let keys = Object.keys(this.data.titles);
            this.setData({
                tableWidth: keys.length * this.properties.colWidth
            })
        },
    },
    observers: {
      //数据发生变化触发外部绑定的事件
      "data": function(data) {
        if (this.data.crtRow > -1) {
          this.triggerEvent('rowtap', { data: data[this.data.crtRow], index: this.data.crtRow }, {});
        }
        if (this.data.crtCol != null) {
          let d = [];
          data.forEach((item, index) => {
            d[index] = item[this.data.crtCol];
          })
          this.triggerEvent('coltap', { data: d, col: this.data.crtCol }, {});
        }
      }
    },

    data: {
      crtRow:-1,    //当前被选中的行
      crtCol: null,  //当前被选中的列
      left1: 0,
      left2: 0,
    },
    methods: {
      //row被tap 
      onRowTap:function(event) {
        let v = event.currentTarget;
        this.setData({
          crtRow: v.dataset.index,
          crtCol: null
        })
        //触发外部绑定的事件
        this.triggerEvent('rowtap', {data: this.properties.data[this.data.crtRow], index: this.data.crtRow}, {});
      },
      
      onColTap:function(event) {
        let v = event.currentTarget;
        this.setData({
          crtRow: -1,
          crtCol: v.dataset.col
        })
        let data = [];
        this.properties.data.forEach((item, index) => {
          data[index] = item[this.data.crtCol];
        })
        //触发外部绑定的事件
        this.triggerEvent('coltap', { data: data, col: this.data.crtCol }, {});
      },
      //滑动绑定
        bindToHead:function({detail}){
        this.setData({
          left1: detail.scrollLeft
        })
      }
    }
})