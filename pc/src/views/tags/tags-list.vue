<style lang="scss" scoped>
  .tags-toolbar {
    margin-bottom: 10px;
  }
</style>

<template>
  <div>
    <div class="tags-toolbar">
      <Button type="primary" @click="tagsHandler">添加标签</Button>
    </div>

    <Table :columns="table.header" :data="table.body"></Table>
    <!--<div style="margin: 10px;overflow: hidden">
      <div style="float: right;">
        <Page :total="table.args.total_count"
              :current="table.args.current_page"
              :page-size="table.args.page_size"
              show-total @on-change="changePage"></Page>
      </div>
    </div>-->

    <loader :dataSourceList="getDataSourceFirstList" :confirmfunc="confirmfunc"></loader>
  </div>
</template>

<script>
  import loader from '@/components/launch/loader.vue';

  export default {
    name: "tags-list",
    components: {
      loader
    },
    computed: {
      getDataSourceFirstList() {
        return this.$store.getters.getDataSourceList()
      },
    },
    data() {
      return {
        table: {
          header: [
            {
              title: '名称',
              key: 'tags_name'
            },
            {
              title: '描述',
              key: 'tags_desc'
            },
            {
              title: '文章数',
              key: 'tags_article_num'
            },
            {
              title: '操作',
              render: (h, params) => {
                return h('div', [
                  h('Button', {
                    props: {
                      type: 'primary',
                      size: 'small'
                    },
                    style: {
                      marginRight: '5px'
                    },
                    on: {
                      click: () => {
                        this.$store.dispatch('setDataSourceList', {
                          compName: 'tTagsMdl',
                          compType: 'first',
                          dataSource: {
                            showModal: true,
                            modalType: 1,
                            modalTitle: '修改标签',
                            _id: params.row._id,
                            tagsName: params.row.tags_name,
                            tagsDesc: params.row.tags_desc,
                          }
                        });
                      }
                    }
                  }, '修改'),
                  h('Button', {
                    props: {
                      type: 'error',
                      size: 'small'
                    },
                    on: {
                      click: () => {
                        this.$Modal.confirm({
                          title: '提示',
                          content: '<p>确定删除？</p>',
                          onOk: async () => {
                            let res = await this.$api.tagsInterface.deleteTagsById({_id: params.row._id});
                            let {msg} = res.data;
                            this.getTagsList();
                            return this.$Message.info(msg)
                          }
                        });
                      }
                    }
                  }, '删除')
                ]);
              }
            },
          ],
          body: [],
          args: {
            current_page: 1,
            page_size: 10,
            total_count: 0
          },
        }
      }
    },
    created() {
      this.getTagsList();
      window.$this = this;
    },
    methods: {
      async getTagsList() {
        let res = await this.$api.tagsInterface.getTagsList();
        let {article_num_list = [], tags_list = []} = res.data.data;
        tags_list.forEach(item => {
          let temp = article_num_list.find(i => i._id === item._id);
          item.tags_article_num = temp == null ? 0 : temp.count;
        });

        this.table.body = tags_list.sort((a, b) => {
          return a.tags_article_num < b.tags_article_num;
        });

        this.table.body = tags_list;
        console.log(this.table.body)
      },
      /*changePage(targetPage) {
        this.table.args.current_page = targetPage;
        this.getTagsList();
      },*/
      /**
       * 弹窗回调函数callback
       * @param value
       */
      confirmfunc(value) {
        console.log(value);
        if (value) {
          this.getTagsList()
        }
      },
      tagsHandler() {
        this.$store.dispatch('setDataSourceList', {
          compName: 'tTagsMdl',
          compType: 'first',
          dataSource: {
            showModal: true,
            modalType: 0,
            modalTitle: '新建标签',
          }
        });
      }
    }
  }
</script>
