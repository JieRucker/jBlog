<style lang="scss" scoped>
  .octicon {
    vertical-align: text-bottom;
    fill: currentColor;
    &.octicon-file-directory {
      color: rgba(3, 47, 98, 0.5);
    }
  }

</style>

<template>
  <li :class="liStyle" :style="styleObj"
      :draggable="isDraggable"
      @drag.stop="drag"
      @dragstart.stop="dragStart"
      @dragover.stop="dragOver"
      @dragenter.stop="dragEnter"
      @dragleave.stop="dragLeave"
      @drop.stop="drop"
      @dragend.stop="dragEnd">
    <a :class="aClassVal" @click="click(model)" @contextmenu.prevent="cxtmenufunc($event,model)">
      <span :class="spanClass" @click.stop="expand(model)"></span>
      <div class="checkbox" v-if="showAllCheck && model.showCheckbox" @click.stop="checkbox(model)">
        <Checkbox v-model="model.checkbox" style="vertical-align: bottom;"></Checkbox>
      </div>
      <svg v-if="showDirectoryIcon && model.isFolder" class="octicon octicon-file-directory" viewBox="0 0 14 16"
           version="1.1" width="14"
           height="16"
           aria-hidden="true">
        <path fill-rule="evenodd"
              d="M13 4H7V3c0-.66-.31-1-1-1H1c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1V5c0-.55-.45-1-1-1zM6 4H1V3h5v1z"></path>
      </svg>
      <svg v-if="showFileIcon && !model.isFolder" class="octicon octicon-file" viewBox="0 0 12 16" version="1.1"
           width="12" height="16"
           aria-hidden="true">
        <path fill-rule="evenodd"
              d="M6 5H2V4h4v1zM2 8h7V7H2v1zm0 2h7V9H2v1zm0 2h7v-1H2v1zm10-7.5V14c0 .55-.45 1-1 1H1c-.55 0-1-.45-1-1V2c0-.55.45-1 1-1h7.5L12 4.5zM11 5L8 2H1v12h10V5z"></path>
      </svg>
      <span v-if="!model.isEdit" class="node-name">{{model.name}}</span>
      <input v-if="model.isEdit" type="text" :id="model.id" class="input-rename" :value="model.name"
             v-on:blur="blur($event,model)">
      <span v-if="shouldAction && model.showPlusIcon" class="button add" @click.stop="plus(model)"></span>
      <span v-if="shouldAction && model.showEditIcon" class="button edit" @click.stop="edit(model)"></span>
      <span v-if="shouldAction && model.showDeleteIcon" class="button remove" @click.stop="remove(model)"></span>
    </a>

    <ul :class="ulClassVal" v-show="model.openFolder">
      <tree-item
        v-for="(item,i) in model.nodes"
        :key="i"
        :model="item"
        :num="i"
        :allowDrag="allowDrag"
        :allowDrop="allowDrop"
        :clickfunc="clickfunc"
        :checkboxfunc="checkboxfunc"
        :plusfunc="plusfunc"
        :blurfunc="blurfunc"
        :removefunc="removefunc"
        :expandfunc="expandfunc"
        :cxtmenufunc="cxtmenufunc"
        :nodes="model.nodes.length"
        :trees="trees"
        :showDirectoryIcon="showDirectoryIcon"
        :showAllCheck="showAllCheck"
        :showFileIcon="showFileIcon"
        :shouldAction="shouldAction">
      </tree-item>
    </ul>
  </li>
</template>

<script>
  let fromData = null;
  let toData = null;
  let rootTree = null;

  export default {
    name: "tree-item",
    props: {
      allowDrag: {
        type: Function,
        default: () => true
      },
      allowDrop: {
        type: Function,
        default: () => true
      },
      showDirectoryIcon: {
        type: Boolean,
        default: true
      },
      showAllCheck: {
        type: Boolean,
        default: true
      },
      showFileIcon: {
        type: Boolean,
        default: true
      },
      shouldAction: {
        type: Boolean,
        default: true
      },
      model: {
        type: Object,
        twoWay: true
      },
      num: {
        type: Number,
        twoWay: true
      },
      nodes: {
        type: Number,
        twoWay: true,
        default: 0
      },
      trees: {
        type: Array,
        twoWay: true,
        default: []
      },
      clickfunc: Function,
      plusfunc: Function,
      checkboxfunc: Function,
      blurfunc: Function,
      removefunc: Function,
      expandfunc: Function,
      cxtmenufunc: Function,
    },
    computed: {
      isDraggable() {
        return this.allowDrag(this.model, this)
      },
      /*是否有子节点*/
      isChildren() {
        return this.num + 1 !== this.nodes;
      },
      liStyle() {
        return "level" + this.num;
      },
      spanClass() {
        if (this.model.showDropDown) {
          return this.model.openFolder ? "button level" + this.num + " switch noline_open" : "button level" + this.num + " switch noline_close";
        } else {
          return "button level" + this.num + " switch bottom_docu";
        }
      },
      aClassVal() {
        return this.model.selected ? "level" + this.num + ' curSelectedNode' : "level" + this.num;
      },
      ulClassVal() {
        return this.isChildren && this.model.nodes.length > 0 ? "level" + this.num + ' line' : "level" + this.num;
      }
    },
    data() {
      return {
        styleObj: {
          opacity: 1
        }
      }
    },
    created() {
      rootTree = this.findRoot(this);
    },
    methods: {
      /*返回顶层组件*/
      findRoot(which) {
        let ok = false;
        let that = which;
        while (!ok) {
          // 根据组件name来判断
          if (that.$options._componentTag === 'j-tree') {
            ok = true;
            // 交换两者的数据
            break
          }
          that = that.$parent
        }
        return that
      },
      /*拖拽*/
      drag(e) {
        fromData = this;
        rootTree.emitDrag(this.model, this, e)
      },
      /*开始拖拽*/
      dragStart(e) {
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/plain', 'asdad');
        return true
      },
      /*移动拖拽*/
      dragOver(e) {
        e.preventDefault();
        rootTree.emitDragOver(this.model, this, e);
        return true
      },
      /*开始进入拖拽*/
      dragEnter(e) {
        if (!fromData) return;
        (this._uid === fromData._uid) || (this.styleObj.opacity = 0.5);
        rootTree.emitDragEnter(this.model, this, e)
      },
      /*离开拖拽*/
      dragLeave(e) {
        this.styleObj.opacity = 1;
        rootTree.emitDragLeave(this.model, this, e)
      },
      /*拖拽释放*/
      drop(e) {
        e.preventDefault();
        this.styleObj.opacity = 1;
        // 判断当前节点是否允许被drop
        if (!this.allowDrop(this.model, this)) return;
        toData = this;
        rootTree.emitDrop(this.model, this, e)
      },
      /*拖拽结束*/
      dragEnd(e) {
        if (!this.isDraggable) return;
        rootTree.emitDragEnd(this.model, toData, this, e);
        toData = null
      },
      /*查找点击的子节点*/
      click(model) {
        const deepLoop = list => {
          [...list].forEach(m => {
            m.selected = false;
            if (m.id === model.id) {
              (typeof this.clickfunc === "function") && this.clickfunc.call(null, model);
              m.selected = true;
            }

            m.nodes.length && deepLoop(m.nodes);
          })
        };

        deepLoop(this.trees);
      },
      checkbox(m) {
        const deepLoop = list => {
          list.map(n => {
            setTimeout(() => n.checkbox = m.checkbox, 100);
            n.nodes.length && deepLoop(n.nodes)
          })
        };

        deepLoop(m.nodes);
        (typeof this.checkboxfunc === "function") && this.checkboxfunc.call(null, m);
      },
      /*展开*/
      expand(m) {
        m.openFolder = !m.openFolder;
        (typeof this.expandfunc === "function") && this.expandfunc.call(null, m);

        if (!this.showCheckbox) return;
        if (m.openFolder) {
          setTimeout(() => {
            if (m.checkbox) {
              const deepLoop = list => {
                list.map(n => {
                  setTimeout(() => n.checkbox = m.checkbox, 0);
                  n.nodes.length && deepLoop(n.nodes)
                })
              };

              deepLoop(m.nodes);
            }
          }, 0)
        }
      },
      /*目录*/
      plus(m) {
        (typeof this.plusfunc === "function") && this.plusfunc.call(null, m);
      },
      /*编辑*/
      edit(m) {
        m.isEdit = true;
        setTimeout(() => (document.getElementById(`${m.id}`)) && document.getElementById(`${m.id}`).focus(), 50);
      },
      /*焦点*/
      blur(event, m) {
        m.isEdit = false;
        (typeof this.blurfunc === "function") && this.blurfunc.call(null, event, m);
      },
      /*移除*/
      remove(m) {
        (typeof this.removefunc === "function") && this.removefunc.call(null, m);
      }
    }
  }
</script>
