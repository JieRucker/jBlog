<style lang="scss" scoped>
  .works-toolbar {
    margin-bottom: 10px;
  }
</style>

<template>
  <div>
    <div class="works-toolbar">
      <Button type="primary" @click="worksHandler">添加作品</Button>
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
  </div>
</template>

<script>
  import mWorksMdl from '@/views/works/modal/m-works-mdl.vue';

  export default {
    name: "works-list",
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
                        this.$jDynamic.show({
                          component: 'mWorksMdl',
                          props: {
                            modalType: 1,
                            modalTitle: '修改作品',
                            works: {
                              _id: params.row._id,
                              name: params.row.works_name,
                              desc: params.row.works_desc,
                              time: params.row.works_time,
                              website: params.row.works_website,
                              cover: params.row.works_cover,
                            },
                            confirmfunc: (value) => {
                              this.getWorksList()
                            }
                          },
                          render: (h) => {
                            return h(mWorksMdl)
                          }
                        })
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
      window.$$vm = this;
    },
    methods: {
      async getWorksList() {
        let res = await this.$api.worksInterface.getWorksList();
        let {code, msg, data = []} = res.data;
        if (code === 200) {
          this.table.body = data;
        }
      },
      worksHandler() {
        this.$jDynamic.show({
          component: 'mWorksMdl',
          props: {
            modalType: 0,
            modalTitle: '新建作品',
            confirmfunc: (value) => {
              this.getWorksList()
            }
          },
          render: (h) => {
            return h(mWorksMdl)
          }
        })
      }
    }
  }
</script>
