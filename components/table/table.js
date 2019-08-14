/**
 * author:wanghaoxin
 * 组件自定义属性：
 *      data:     表格数据，需要与titles的key相对应
 *      titles:   表格头  {date:'日期', name:'名字',.......}
 *      caption:  表格标题
 *      col-width:单元格宽度(px)
 *      rowtap:   表格行被点击绑定的事件   detail:{data:被点击这一行的数据, index:被点击这一行的索引} 
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
    data: {
      crtRow:-1
    },
    methods: {
      //row被tap 
      onRowTap:function(event) {
        let v = event.currentTarget;
        this.setData({
          crtRow: v.dataset.index
        })
        this.triggerEvent('rowtap', {data: this.properties.data[this.data.crtRow], index: this.data.crtRow}, {});
      }
    }
})