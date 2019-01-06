<style lang="scss">
  @import './j-tree.scss';
</style>
<template>
  <div class="j-tree-wrapper" v-if="sourceList.length > 0">
    <ul class="j-tree-panel">
      <tree-item
        v-for="(m,i) in sourceList"
        :key="i"
        :model="m"
        :num="i"
        :allowDrag="allowDrag"
        :allowDrop="allowDrop"
        :expandfunc="expand"
        :clickfunc="click"
        :plusfunc="plus"
        :checkboxfunc="checkbox"
        :blurfunc="blur"
        :removefunc="remove"
        :cxtmenufunc="contextmenu"
        :nodes="sourceList.length"
        :trees="sourceList"
        :showDirectoryIcon="showDirectoryIcon"
        :showFileIcon="showFileIcon"
        :showAllCheck="showAllCheck"
        :shouldAction="shouldAction">
      </tree-item>
    </ul>
  </div>
</template>

<script>
  import treeItem from './treeItem.vue';

  export default {
    name: "j-tree",
    components: {
      treeItem,
    },
    data() {
      return {
        sourceList: [],
      }
    },
    props: {
      allowDrag: {
        type: Function,
        default: () => true
      },
      allowDrop: {
        type: Function,
        default: () => true
      },
      /*节点数据*/
      list: {
        type: Array,
        twoWay: true
      },
      /*点击回调*/
      click: {
        type: Function,
        default: null
      },
      /*新建图标回调*/
      plus: {
        type: Function,
        default: null
      },
      checkbox: {
        type: Function,
        default: null
      },
      /*编辑回调*/
      blur: {
        type: Function,
        default: null
      },
      /*删除回调*/
      remove: {
        type: Function,
        default: null
      },
      /*展开回调*/
      expand: {
        type: Function,
        default: null
      },
      /*新建图标*/
      showDirectoryIcon: {
        type: Boolean,
        default: true
      },
      /*编辑图标*/
      showFileIcon: {
        type: Boolean,
        default: true
      },
      /*显示复选*/
      showAllCheck: {
        type: Boolean,
        default: true
      },
      /*是否操作/预览*/
      shouldAction: {
        type: Boolean,
        default: true
      },
      /*右键菜单*/
      contextmenu: {
        type: Function,
        default: () => {
        }
      }
    },
    watch: {
      'list': {
        handler() {
          this.initJTree();
        },
        deep: true
      }
    },
    methods: {
      initJTree() {
        let copylist = JSON.parse(JSON.stringify(this.list));

        /*递归操作，增加删除一些属性*/
        const loopDeepFn = d => {
          d.map(m => {
            m.selected = !m.hasOwnProperty("selected") ? false : m.selected;
            m.checkbox = !m.hasOwnProperty("checkbox") ? false : m.checkbox;
            m.openFolder = !m.hasOwnProperty("openFolder") ? false : m.openFolder;
            m.originNodes = !m.hasOwnProperty("originNodes") ? [] : m.originNodes;
            m.nodes = !m.hasOwnProperty("nodes") ? [] : m.nodes;
            m.isEdit = !m.hasOwnProperty("isEdit") ? false : m.isEdit;
            /*显示chk图标*/
            m.showCheckbox = !m.hasOwnProperty("showCheckbox") ? true : m.showCheckbox;
            /*显示添加图标*/
            m.showPlusIcon = !m.hasOwnProperty("showPlusIcon") ? true : m.showPlusIcon;
            /*显示编辑图标*/
            m.showEditIcon = !m.hasOwnProperty("showEditIcon") ? true : m.showEditIcon;
            /*显示删除图标*/
            m.showDeleteIcon = !m.hasOwnProperty("showDeleteIcon") ? true : m.showDeleteIcon;
            loopDeepFn(m.originNodes);
          })
        };

        loopDeepFn(copylist);
        this.sourceList = copylist;
      },
      emitDrag(model, component, e) {
        this.$emit('drag', model, component, e)
      },
      emitDragOver(model, component, e) {
        this.$emit('drag-over', model, component, e)
      },
      emitDragEnter(model, component, e) {
        this.$emit('drag-enter', model, component, e)
      },
      emitDragLeave(model, component, e) {
        this.$emit('drag-leave', model, component, e)
      },
      emitDrop(model, component, e) {
        this.$emit('drop', model, component, e)
      },
      emitDragEnd(model, to, component, e) {
        this.$emit('drag-end', model, to, component, e)
      },
    },
    mounted() {
      this.initJTree();
    }
  }
</script>
