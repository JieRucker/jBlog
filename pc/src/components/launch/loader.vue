<script>
  // render函数创建备注
  import asunc from './async';

  export default {
    name: "loader",
    props: {
      dataSourceList: {
        type: Array,
        default() {
          return []
        }
      },
      confirmfunc: Function
    },
    render: function (createElement) {
      if (this.dataSourceList.length) {
        let compList = [];
        [...this.dataSourceList].forEach(m => {
          compList.push(createElement(asunc[m.compName], {
            props: {
              dataSource: m.dataSource,// 组件数据
              confirmfunc: this.confirmfunc
            }
          }, this.$slots.default)); //组件1
        });

        return createElement('div', {}, compList)
      }
    },
  }
</script>
