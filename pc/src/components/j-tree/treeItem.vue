<template>
  <li :class="liStyle">
    <a :class="aClassVal" @click="click(model)" @contextmenu.prevent="cxtmenufunc(model)">
      <span :class="spanClass" @click.stop="open(model)"></span>
      <span :class="{loadSyncNode:model.loadNode==1}" v-if="model.loadNode==1"></span>
      <!--<span :class="model.iconClass" v-show="model.iconClass" v-else></span>-->
      <span v-if="!model.isEdit" class="node_name">{{model.name}}</span>
      <input v-if="model.isEdit" type="text" :id="model.id" class="input-modify" :value="model.name"
             v-on:blur="blur($event,model)">
      <span v-if="showPlusIcon" class="button add" @click.stop="plus(model)"></span>
      <span v-if="showEditIcon" class="button edit" @click.stop="edit(model)"></span>
      <span v-if="showDeleteIcon" class="button remove" @click.stop="remove(model)"></span>
    </a>
    <ul :class="ulClassVal" v-show="model.isFolder">
      <tree-item
        v-for="(item,i) in model.childNodes"
        :key="i"
        :model="item"
        :num="i"
        :clickfunc="clickfunc"
        :plusfunc="plusfunc"
        :blurfunc="blurfunc"
        :removefunc="removefunc"
        :expandfunc="expandfunc"
        :cxtmenufunc="cxtmenufunc"
        :nodes="model.childNodes.length"
        :trees="trees"
        :showPlusIcon="showPlusIcon"
        :showEditIcon="showEditIcon"
        :showDeleteIcon="showDeleteIcon"
      >
      </tree-item>
    </ul>
  </li>
</template>

<script>
  export default {
    name: "tree-item",
    props: {
      showPlusIcon: {
        type: Boolean,
        default: true
      },
      showEditIcon: {
        type: Boolean,
        default: true
      },
      showDeleteIcon: {
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
      clickfunc: {
        type: Function
      },
      plusfunc: {
        type: Function
      },
      blurfunc: {
        type: Function
      },
      removefunc: {
        type: Function
      },
      expandfunc: {
        type: Function
      },
      cxtmenufunc: {
        type: Function
      }
    },
    computed: {
      // 是否有子节点
      isChildren() {
        return this.num + 1 != this.nodes;
      },
      liStyle() {
        return "level" + this.num;
      },
      spanClass() {
        if (this.model.childNum > 0) {
          if (this.model.isFolder) {
            return "button level" + this.num + " switch noline_open";
          } else {
            return "button level" + this.num + " switch noline_close";
          }
        } else {
          return "button level" + this.num + " switch bottom_docu";
        }
      },
      aClassVal() {
        return this.model.clickNode ? "level" + this.num + ' curSelectedNode' : "level" + this.num;
      },
      ulClassVal() {
        return this.isChildren && this.model.childNodes.length > 0 ? "level" + this.num + ' line' : "level" + this.num;
      }
    },
    methods: {
      // 查找点击的子节点
      click(model) {
        const loop = (list) => {
          [...list].forEach(m => {
            m.clickNode = false;
            if (m.id === model.id) {
              (typeof this.clickfunc === "function") && this.clickfunc.call(null, model);
              m.clickNode = true;
            }

            (m.childNodes.length) && loop(m.childNodes);
          })
        };

        loop(this.trees);
      },
      open(m) {
        m.isExpand = !m.isExpand;
        if (typeof this.expandfunc === "function" && m.isExpand) {
          m.loadNode !== 2 ? this.expandfunc.call(null, m) : (m.isFolder = !m.isFolder)
        } else {
          m.isFolder = !m.isFolder;
        }
      },
      plus(model) {
        (typeof this.plusfunc === "function") && (this.plusfunc.call(null, model));
      },
      edit(model) {
        model.isEdit = true;
        setTimeout(() => (document.getElementById(`${model.id}`)) && document.getElementById(`${model.id}`).focus(), 50);
      },
      blur(event, model) {
        model.isEdit = false;
        (typeof this.blurfunc === "function") && this.blurfunc.call(null, event, model);
      },
      remove(model) {
        (typeof this.removefunc === "function") && this.removefunc.call(null, model);
      }
    }
  }
</script>
