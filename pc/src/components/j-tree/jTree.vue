<style lang="scss">
  @import './j-tree.scss';
</style>
<template>
  <div class="j-tree-wrap" v-if="sourceList.length > 0">
    <ul class="j-tree-panel">
      <tree-item
        v-for="(m,i) in sourceList"
        :key="i"
        :model="m"
        :num="i"
        :expandfunc="expand"
        :clickfunc="click"
        :plusfunc="plus"
        :blurfunc="blur"
        :removefunc="remove"
        :cxtmenufunc="contextmenu"
        :nodes="sourceList.length"
        :trees="sourceList"
        :showPlusIcon="showPlusIcon"
        :showEditIcon="showEditIcon"
        :showDeleteIcon="showDeleteIcon"
      >
      </tree-item>
    </ul>
  </div>
</template>

<script>
  import treeItem from './treeItem.vue';

  export default {
    name: "j-tree",
    components: {
      treeItem
    },
    data() {
      return {
        sourceList: []
      }
    },
    props: {
      // 树数据
      list: {
        type: Array,
        twoWay: true
      },
      // 点击回调
      click: {
        type: Function,
        default: null
      },
      // 加号回调
      plus: {
        type: Function,
        default: null
      },
      // 编辑回调
      blur: {
        type: Function,
        default: null
      },
      // 删除回调
      remove: {
        type: Function,
        default: null
      },
      // 点击展开回调
      expand: {
        type: Function,
        default: null
      },
      // 右击事件
      contextmenu: {
        type: Function,
        default: () => {
          console.log("右击事件");
        }
      },
      // 是否展开
      isOpen: {
        type: Boolean,
        twoWay: true,
        default: false
      },
      // 是否显示增加图标
      showPlusIcon: {
        type: Boolean,
        default: true
      },
      // 是否显示编辑图标
      showEditIcon: {
        type: Boolean,
        default: true
      },
      // 是否显示删除图标
      showDeleteIcon: {
        type: Boolean,
        default: true
      }
    },
    watch: {
      'list': {
        handler() {
          this.initTreeData();
        },
        deep: true
      }
    },
    methods: {
      initTreeData() {
        let copylist = JSON.parse(JSON.stringify(this.list));

        // 递归操作，增加删除一些属性
        const loop = (data) => {
          data.forEach(m => {
            (!m.hasOwnProperty("clickNode")) || (m.clickNode = m.hasOwnProperty("clickNode") ? m.clickNode : false);
            (!m.hasOwnProperty("isFolder")) || (m.isFolder = m.hasOwnProperty("open") ? m.open : this.isOpen);
            (!m.hasOwnProperty("isExpand")) || (m.isExpand = m.hasOwnProperty("open") ? m.open : this.isOpen);
            m.childNodes = m.childNodes || [];
            m.isEdit = false;
            m.loadNode = 0;
            loop(m.childNodes);
          })
        };

        loop(copylist);
        this.sourceList = copylist;
      }
    },
    mounted() {
      this.initTreeData();
    }
  }
</script>
