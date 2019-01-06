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
  <div class="model">
    <div class="tree">
      <h2 class="tree--title">模型目录</h2>
      <Button type="default" size="small" class="tree--button" @click="_setFolder">
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
        :is-open="false"
        :show-directory-icon="false"
        :show-file-icon="false"
        @drag-end="dragEndHandler">
      </j-tree>
    </div>

    <component
      v-bind:is="currentTabComponent"
      :treeNode="tree.treeNode"
      :treeList="tree.treeList"
    ></component>
  </div>
</template>

<script>
  import jTree from '@/components/j-tree/jTree.vue';
  import modelUpload from './model-upload';
  import util from '@/libs/util';

  export default {
    name: "model",
    components: {
      jTree,
      modelUpload
    },
    data() {
      return {
        tree: {
          treeNode: null, /*当前选中目录数据*/
          foldName: '', /*目录名称*/
          treeList: [], /*目录数据*/
        },
        currentTab: '', /*当前组件*/
        tabList: ['model-upload'],
      }
    },
    computed: {
      currentTabComponent() {
        return this.currentTab.toLowerCase()
      }
    },
    mounted() {
      this._getFoldGroup();
    },
    methods: {
      /*拖拽结束*/
      dragEndHandler(model, to) {
        const request = (() => async (params) => {
          let res = await this.$api.modelInterface.moveModelFold(params);
          let {success, retMsg} = res.data;
          success ? this._getFoldGroup() : this.$Message.info(retMsg)
        })();

        this.loopFinish(this.$refs.tree.sourceList).then(resolve => {
          let {a, b} = resolve;
          let parentModelFoldId = to ? to.model.modelFoldId : -1;
          let modelFoldId = (() => {
            let tmp = [];
            if (a.length && b.length) tmp = a;
            else if (a.length) tmp = a;
            else if (b.length) tmp = b;
            else tmp = [`${model.modelFoldId}`];
            return tmp
          })();

          if (parentModelFoldId !== modelFoldId) {
            request({
              parentModelFoldId: parentModelFoldId,
              modelFoldId: modelFoldId
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
              if (n.checkbox) n.isFolder ? a.push(n.modelFoldId) : b.push(n.modelFoldId);
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
      async _getFoldGroup() {
        this.tree.treeList = [];
        let res = await this.$api.modelInterface.listModelFold();
        let {success, retMsg, data} = res.data;

        if (success) {
          if (!data) return;
          data.forEach(m => {
            this.tree.treeList.push({
              parentModelFoldId: m.parentModelFoldId,
              id: m.modelFoldId,
              modelFoldId: m.modelFoldId,
              name: m.modelFoldName,
              isFolder: true,
              showDropDown: m.hasOwnProperty('childNodes'),
              openFolder: false,
              selected: false,
              isEdit: false,
              showCheckbox: false,
              originNodes: m.childNodes ? m.childNodes : [],
              nodes: []
            })
          });

          if (this.tree.treeList.length) {
            let [tabA] = this.tabList;
            this.currentTab = '';
            let [first] = this.tree.treeList;
            let selectModelFoldId = this.$Global.VueDB().getItem('selectModelFoldId', 'sessionStorage').toString();
            let openedTreeArr = this.$Global.VueDB().getItem('openedTreeArr').toJson();
            openedTreeArr && this.restoreTree(data, openedTreeArr);

            this.$Global.timeout(300).then(() => {
              if (!selectModelFoldId) {
                first.selected = true;
                this.$Global.VueDB().setItem('selectModelFoldId', first.modelFoldId, 'sessionStorage');
              } else {
                util.getCurrentNode(this.tree.treeList, {modelFoldId: selectModelFoldId}, 'nodes', data => {
                  data.node && (data.node.selected = true)
                });
              }

              this.currentTab = tabA;
            });
          } else {
            this.table.body = [];
          }
        } else {
          this.$Message.error(retMsg)
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
              currentNodes = data.node && data.node.childNodes ? data.node.childNodes : [];
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
                      parentModelFoldId: m.parentModelFoldId,
                      id: m.modelFoldId,
                      modelFoldId: m.modelFoldId,
                      name: m.modelFoldName,
                      isFolder: true,
                      showDropDown: m.hasOwnProperty('childNodes'),
                      openFolder: false,
                      selected: false,
                      isEdit: false,
                      showCheckbox: false,
                      nodes: [],
                      originNodes: m.childNodes ? m.childNodes : [],
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
          getNodeData(source_data, {modelFoldId: m._id}, 'childNodes');
          setNodeData(this.tree.treeList, {modelFoldId: m._id}, {
            open: m.open,
          }, 'nodes');
        })
      },
      /**
       * 新建根目录
       */
      _setFolder() {
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
              let res = await this.$api.modelInterface.addModelFold({
                parentModelFoldId: -1,
                modelFoldName: this.tree.foldName,
              });
              let {success, retMsg} = res.data;
              if (success) {
                this.$Message.info(retMsg);
                this.tree.foldName = '';
                this._getFoldGroup();
              }
              return false;
            }

            this.$Message.info('请输入名称');
          },
          onCancel: () => {
            this.tree.foldName = '';
          }
        })
      },
      /**
       * 目录点击
       */
      onClick(model) {
        let [tabA, tabB] = this.tabList;
        this.currentTab = '';
        this.tree.treeNode = model;
        this.$Global.VueDB().setItem('selectModelFoldId', model.modelFoldId, 'sessionStorage');
        this.$Global.timeout(300).then(() => {
          this.currentTab = tabA;
        });
      },
      /**
       * 新建目录
       * @param model
       */
      onPlus(model) {
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
              let res = await this.$api.modelInterface.addModelFold({
                parentModelFoldId: model.modelFoldId,
                modelFoldName: this.tree.foldName,
              });

              let {success, retMsg} = res.data;
              if (success) {
                this.tree.foldName = '';
                this._getFoldGroup();
                return false
              }

              this.$Message.info(retMsg);
            } else {
              this.$Message.info('请输入名称');
            }
          },
          onCancel: () => {
            this.tree.foldName = '';
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
                  _id: m.modelFoldId,
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
              parentModelFoldId: m.parentModelFoldId,
              id: m.modelFoldId,
              modelFoldId: m.modelFoldId,
              name: m.modelFoldName,
              // isFolder: m.hasOwnProperty('childNodes'),
              isFolder: true,
              showDropDown: m.hasOwnProperty('childNodes'),
              openFolder: false,
              selected: false,
              isEdit: false,
              showCheckbox: false,
              nodes: [],
              originNodes: m.childNodes ? m.childNodes : [],
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
          let res = await this.$api.modelInterface.updateModelFold({
            modelFoldId: model.modelFoldId,
            modelFoldName: event.target.value,
          });

          let {success, retMsg} = res.data;
          if (success) {
            this._getFoldGroup();
            return false;
          }
          this.$Message.info(retMsg);
        }
      },
      /**
       * 移除目录
       */
      onRemove(model) {
        let selectModelFoldId = this.$Global.VueDB().getItem('selectModelFoldId', 'sessionStorage').toString();
        let openedTreeArr = this.$Global.VueDB().getItem('openedTreeArr').toJson();
        this.$Modal.confirm({
          title: '提示',
          content: `<p>是否删除？</p>`,
          onOk: async () => {
            let res = await this.$api.modelInterface.removeModelFold({
              modelFoldId: model.modelFoldId
            });

            let {success, retMsg} = res.data;
            if (success) {
              if (model.modelFoldId === selectModelFoldId) {
                this.$Global.VueDB().removeItem('selectModelFoldId', 'sessionStorage')
              }

              this._getFoldGroup();
              return false
            }
            this.$Message.info(retMsg);
          }
        })
      },
    }
  }
</script>
