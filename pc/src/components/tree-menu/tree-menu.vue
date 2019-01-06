<style lang="scss" scoped>
  @include b(tree) {
    width: 200px;
    height: 100%;
    position: fixed;
    box-shadow: 0 2px 1px 1px rgba(100, 100, 100, 0.1);
    background-color: #f8f8f8;
    @include m(title) {
      height: 55px;
      padding-left: 16px;
      background-color: #f8f8f8;
      font-size: 16px;
      line-height: 55px;
    }
    @include m(button) {
      position: absolute;
      right: 15px;
      top: 17px;
    }
  }
</style>

<template>
  <div class="tree">
    <h2 class="tree--title">文件目录</h2>
    <Button type="default" size="small" class="tree--button" @click="setFolder" v-if="showFolder">
      新建目录
    </Button>
    <j-tree
      ref="tree"
      :list="tree.treeList"
      :click="onClick"
      :plus="onPlus"
      :blur="onBlur"
      :remove="onRemove"
      :expand="expandClick"
      :allow-drag="allowDrag"
      :show-directory-icon="false"
      :show-file-icon="false"
      :show-all-check="false"
      :should-action="shouldAction"
      @drag-end="dragEndHandler">
    </j-tree>
  </div>
</template>

<script>
  import jTree from '@/components/j-tree/jTree.vue';
  import util from '@/libs/util';

  export default {
    name: "tree-menu",
    components: {
      jTree
    },
    props: {
      showFolder: {
        type: Boolean,
        default: true
      },
      shouldAction: {
        type: Boolean,
        default: true
      },
      renderFinishFunc: {
        type: Function,
        default: null
      },
      onClickFunc: {
        type: Function,
        default: null
      },
      isDraggable: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        tree: {
          treeNode: null, /*当前选中目录数据*/
          foldName: '', /*目录名称*/
          treeList: [], /*目录数据*/
        }
      }
    },
    mounted() {
      this.getFoldGroup();
    },
    methods: {
      allowDrag() {
        return this.isDraggable
      },
      /*拖拽结束*/
      dragEndHandler(model, to) {
        const request = (() => async (params) => {
          let res = await this.$api.uploadInterface.moveFold(params);
          let {code, msg} = res.data;
          code === 200 ? this.getFoldGroup() : this.$Message.info(msg)
        })();

        this.loopFinish(this.$refs.tree.sourceList).then(resolve => {
          let {a, b} = resolve;
          let parentId = to ? to.model._id : -1;
          let [_id] = (() => {
            let tmp = [];
            if (a.length && b.length) tmp = a;
            else if (a.length) tmp = a;
            else if (b.length) tmp = b;
            else tmp = [`${model._id}`];
            return tmp
          })();

          if (parentId !== _id) {
            request({
              parentId: parentId,
              _id: _id
            })
          }
        });
      },
      loopFinish(ls) {
        /*a:文件夹 b:视点*/
        return new Promise(resolve => {
          let a, b, s;
          a = [];
          b = [];
          s = ls;
          const deepLoop = l => {
            l.map(n => {
              if (n.checkbox) n.isFolder ? a.push(n._id) : b.push(n._id);
              n.nodes.length && deepLoop(n.nodes)
            })
          };

          deepLoop(s);
          resolve({a, b})
        });
      },
      /**
       * 获取目录数据
       */
      async getFoldGroup() {
        this.tree.treeList = [];
        let res = await this.$api.uploadInterface.getFold();
        let {code, msg, data} = res.data;

        if (code === 200) {
          if (!data) {
            (typeof this.renderFinishFunc === "function") && this.renderFinishFunc.call(null, {
              treeList: []
            });
            return false;
          }

          data.forEach(m => {
            this.tree.treeList.push({
              parentId: m.parentId,
              id: m._id,
              _id: m._id,
              name: m.name,
              isFolder: true,
              showDropDown: m.hasOwnProperty('children'),
              openFolder: false,
              selected: false,
              isEdit: false,
              originNodes: m.children ? m.children : [],
              nodes: []
            })
          });

          if (this.tree.treeList.length) {
            let [first] = this.tree.treeList;
            let selectId = this.$Global.VueDB().getItem('selectId', 'sessionStorage').toString();
            let openedTreeArr = this.$Global.VueDB().getItem('openedTreeArr').toJson();
            openedTreeArr && this.restoreTree(data, openedTreeArr);

            if (!selectId) {
              first.selected = true;
              this.$Global.VueDB().setItem('selectId', first._id, 'sessionStorage');
            } else {
              util.getCurrentNode(this.tree.treeList, {_id: selectId}, 'nodes', data => {
                data.node && (data.node.selected = true)
              });
            }
          }

          (typeof this.renderFinishFunc === "function") && this.renderFinishFunc.call(null, {
            treeList: this.tree.treeList
          });
        } else {
          this.$Message.error(msg)
        }
      },
      /**
       * restore tree viewer
       * @param source_data 源数据
       * @param store_data 暂存资源
       */
      restoreTree(source_data, store_data) {
        let currentNodes = [];
        const getNodeData = (() => {
          return (list, keyword, nodes) => {
            util.getCurrentNode(list, keyword, nodes, data => {
              currentNodes = data.node && data.node.children ? data.node.children : [];
            });
          }
        })();

        const setNodeData = (() => {
          return (list, keyword, DEFAULT, nodes) => {
            util.getCurrentNode(list, keyword, nodes, data => {
              if (data.node) {
                data.node.openFolder = DEFAULT.open;

                if (currentNodes.length) {
                  currentNodes.map(m => {
                    data.node.nodes.push({
                      parentId: m.parentId,
                      id: m._id,
                      _id: m._id,
                      name: m.name,
                      isFolder: true,
                      showDropDown: m.hasOwnProperty('children'),
                      openFolder: false,
                      selected: false,
                      isEdit: false,
                      nodes: [],
                      originNodes: m.children ? m.children : [],
                      showPlusIcon: true,
                      showEditIcon: true,
                      showDeleteIcon: true,
                    })
                  })
                }
              }
            });
          }
        })();

        store_data.map(m => {
          getNodeData(source_data, {_id: m._id}, 'children');
          setNodeData(this.tree.treeList, {_id: m._id}, {
            open: m.open,
          }, 'nodes');
        })
      },
      /**
       * 新建根目录
       */
      setFolder() {
        this.tree.foldName = '';
        this.$Modal.confirm({
          title: '新建目录',
          render: (h) => {
            return h('Input', {
              style: {
                marginTop: '10px'
              },
              props: {
                value: this.tree.foldName,
                autofocus: true,
                placeholder: '请输入目录名'
              },
              on: {
                input: val => {
                  this.tree.foldName = val;
                }
              }
            })
          },
          onOk: async () => {
            if (!this.$Global.isBlank(this.tree.foldName)) {
              let res = await this.$api.uploadInterface.addFold({
                parentId: -1,
                name: this.tree.foldName,
              });
              let {code, msg} = res.data;
              if (code === 200) {
                this.$Message.info(msg);
                this.getFoldGroup();
              }
              return false;
            }

            this.$Message.info('请输入名称');
          }
        })
      },
      /**
       * 目录点击
       */
      onClick(model) {
        this.tree.treeNode = model;
        this.$Global.VueDB().setItem('selectId', model._id, 'sessionStorage');
        (typeof this.onClickFunc === "function") && this.onClickFunc.call(null, true);
      },
      /**
       * 新建目录
       * @param model
       */
      onPlus(model) {
        console.log(model)
        this.tree.foldName = '';
        this.$Modal.confirm({
          title: '新建目录',
          render: (h) => {
            return h('Input', {
              style: {
                marginTop: '10px'
              },
              props: {
                value: this.tree.foldName,
                autofocus: true,
                placeholder: '请输入目录名'
              },
              on: {
                input: val => {
                  this.tree.foldName = val;
                }
              }
            })
          },
          onOk: async () => {
            if (!this.$Global.isBlank(this.tree.foldName)) {
              let res = await this.$api.uploadInterface.addFold({
                parentId: model._id,
                name: this.tree.foldName,
              });

              let {code, msg} = res.data;
              if (code === 200) {
                this.getFoldGroup();
                return false
              }

              this.$Message.info(msg);
            } else {
              this.$Message.info('请输入名称');
            }
          }
        })
      },
      /**
       * 目录展开
       */
      expandClick(model) {
        let a = [];
        this.$Global.VueDB().setItem('openedTreeArr', []);
        const filter = (() => {
          return (list) => {
            list.map(m => {
              if (m.openFolder) {
                a.push({
                  _id: m._id,
                  open: m.openFolder,
                })
              }
              m.nodes && filter(m.nodes)
            });
          }
        })();

        if (model.openFolder) {
          model.nodes = [];
          model.originNodes.forEach(m => {
            model.nodes.push({
              parentId: m.parentId,
              id: m._id,
              _id: m._id,
              name: m.name,
              // isFolder: m.hasOwnProperty('childNodes'),
              isFolder: true,
              showDropDown: m.hasOwnProperty('children'),
              openFolder: false,
              selected: false,
              isEdit: false,
              nodes: [],
              originNodes: m.children ? m.children : [],
              showPlusIcon: true,
              showEditIcon: true,
              showDeleteIcon: true,
            })
          })
        } else {
          model.nodes = [];
        }

        this.$Global.timeout(300).then(() => {
          filter(this.$refs.tree.sourceList);
          this.$Global.VueDB().setItem('openedTreeArr', JSON.stringify(a));
        });
      },
      /**
       * 更新目录
       */
      async onBlur(event, model) {
        if (event.target.value !== model.name) {
          let res = await this.$api.uploadInterface.alterFold({
            _id: model._id,
            name: event.target.value,
          });

          let {code, msg} = res.data;
          if (code === 200) {
            this.getFoldGroup();
            return false;
          }
          this.$Message.info(msg);
        }
      },
      /**
       * 移除目录
       */
      onRemove(model) {
        let selectId = this.$Global.VueDB().getItem('selectId', 'sessionStorage').toString();
        let openedTreeArr = this.$Global.VueDB().getItem('openedTreeArr').toJson();
        this.$Modal.confirm({
          title: '提示',
          content: `<p>是否删除？</p>`,
          onOk: async () => {
            let res = await this.$api.uploadInterface.deleteFold({
              _id: model._id
            });

            let {code, msg} = res.data;
            if (code === 200) {
              if (model._id === selectId) {
                this.$Global.VueDB().removeItem('selectId', 'sessionStorage')
              }

              this.getFoldGroup();
              return false
            }
            this.$Message.info(msg);
          }
        })
      },
    }
  }
</script>
