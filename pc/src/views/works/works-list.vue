<style lang="scss" scoped>
  .works-toolbar {
    margin-bottom: 10px;
  }
</style>

<template>
  <div>
    <div class="works-toolbar">
      <Button type="primary" @click="tagsHandler">添加作品</Button>
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
    name: "works-list",
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
              key: 'works_name'
            },
            {
              title: '描述',
              key: 'works_desc'
            },
            {
              title: '时间',
              key: 'works_time'
            },
            {
              title: '网址',
              key: 'works_website'
            },
            {
              title: '封面',
              key: 'works_cover'
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
                          compName: 'mWorksMdl',
                          compType: 'first',
                          dataSource: {
                            showModal: true,
                            modalType: 1,
                            modalTitle: '修改作品',
                            _id: params.row._id,
                            worksName: params.row.works_name,
                            worksDesc: params.row.works_desc,
                            worksTime: params.row.works_time,
                            worksWebsite: params.row.works_website,
                            worksCover: params.row.works_cover,
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
                            let res = await this.$api.worksInterface.deleteWorksById({_id: params.row._id});
                            let {msg} = res.data;
                            this.getWorksList();
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
      this.getWorksList();
    },
    methods: {
      async getWorksList() {
        let res = await this.$api.worksInterface.getWorksList();
        let {code, msg, data = []} = res.data;
        if (code === 200) {
          this.table.body = data;
        }

        console.log(this.table.body)
      },
      /**
       * 弹窗回调函数callback
       * @param value
       */
      confirmfunc(value) {
        console.log(value);
        if (value) {
          this.getWorksList()
        }
      },
      tagsHandler() {
        this.$store.dispatch('setDataSourceList', {
          compName: 'mWorksMdl',
          compType: 'first',
          dataSource: {
            showModal: true,
            modalType: 0,
            modalTitle: '新建作品',
          }
        });
      }
    }
  }
</script>
