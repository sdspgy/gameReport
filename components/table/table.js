Component({
  properties: {
    /** 
     * 表格数据，需要与titles的key相对应 
     */
    data: {
      type: Array
    },
    /** 
     * 表格头 
     * {date:'日期', name:'名字',.......} 
     * */
    titles: {
      type: Object
    },
    /** 
     * 表格标题 
     */
    caption: {
      type: String
    },
    /** 
     * 单元格宽度 px 
    */
    colWidth: {
      type: Number,
      value: 75
    }
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
  data: {

  },
  methods: {

  }
}) 