<style lang="scss" scoped>
  @include b(header) {
    color: #333;
    text-align: left;
    @include m(title) {
      font-size: 16px;
    }
  }

  @include b(move) {
    padding: 10px 5px;
    font-size: 14px;
  }

  @include b(tree) {
    overflow-y: auto;
    max-height: 250px;
  }
</style>

<template>
  <Modal ref="modal" v-model="show" width="350" class="m-move-mdl"
         @on-visible-change="onVisible">
    <p slot="header" class="header">
      <span class="header--title">修改</span>
    </p>
    <div class="body">
      <p class="move">移动至目录：</p>
      <j-tree
        class="tree"
        ref="tree"
        :list="tree.treeList"
        :click="onClick"
        :expand="expandClick"
        :is-open="false"
        :allow-drag="allowDrag"
        :show-directory-icon="false"
        :show-file-icon="false"
        :show-all-check="false"
        :should-action="false">
      </j-tree>
    </div>
    <div slot="footer">
      <Button type="text" size="large" @click.native="cancel">取消</Button>
      <Button type="primary" size="large" @click.native="save">确定</Button>
    </div>
  </Modal>


</template>

<script>
  import jTree from '@/components/j-tree/jTree.vue';
  import util from '@/libs/util';

  export default {
    name: "m-move-mdl",
    components: {
      jTree,
    },
    computed: {
      allowDrag() {
        return () => {
          return false
        }
      }
    },
    data() {
      return {
        show: true,
        tree: {
          treeNode: null, /*当前选中目录数据*/
          treeList: [], /*目录数据*/
        }
      }
    },
    mounted() {
      this.getFoldGroup();
    },
    methods: {
      /**
       * 获取目录数据
       */
      async getFoldGroup() {
        this.tree.treeList = [];
        let res = await this.$api.uploadInterface.getFold();
        let {code, msg, data} = res.data;

        if (code === 200) {
          if (!data) return;
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
              showCheckbox: false,
              originNodes: m.children ? m.children : [],
              nodes: []
            })
          });

          if (this.tree.treeList.length) {
            let [first] = this.tree.treeList;
            let selectId = this.$Global.VueDB().getItem('selectId', 'sessionStorage').toString();
            let openedTreeArr = this.$Global.VueDB().getItem('openedTreeArr').toJson();
            openedTreeArr && this.restoreTree(data, openedTreeArr);

            this.$Global.timeout(300).then(() => {
              if (!selectId) {
                first.selected = true;
                this.tree.treeNode = {
                  _id: first._id
                };
                this.$Global.VueDB().setItem('selectModelFoldId', first._id, 'sessionStorage');
              } else {
                util.getCurrentNode(this.tree.treeList, {_id: selectId}, 'nodes', data => {
                  data.node && (data.node.selected = true);

                  data.node && (this.tree.treeNode = {
                    _id: data.node._id
                  });

                });
              }
            });
          } else {
            this.table.body = [];
          }
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
                      parentId: m.parentId,
                      id: m._id,
                      _id: m._id,
                      name: m.name,
                      isFolder: true,
                      showDropDown: m.hasOwnProperty('children'),
                      openFolder: false,
                      selected: false,
                      isEdit: false,
                      showCheckbox: false,
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
          getNodeData(source_data, {_id: m._id}, 'childNodes');
          setNodeData(this.tree.treeList, {_id: m._id}, {
            open: m.open,
          }, 'nodes');
        })
      },
      /**
       * 目录点击
       */
      onClick(model) {
        this.tree.treeNode = model;
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
              isFolder: true,
              showDropDown: m.hasOwnProperty('children'),
              openFolder: false,
              selected: false,
              isEdit: false,
              showCheckbox: false,
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
      onVisible(value) {
        value || this.$jDynamic.hide({component: 'mMoveMdl'})
      },
      save() {
        this.confirmfunc && this.confirmfunc.call(this, {
          fold_id: this.tree.treeNode._id,
        });
        this.cancel()
      },
      cancel() {
        this.$refs.modal.cancel()
      }
    }
  }

</script>
