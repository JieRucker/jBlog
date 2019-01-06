<style lang="scss">
  @include b(model-list) {
    height: 100%;
    @include b(main) {
      padding-left: 210px;
      @include e(section) {
        background: #fff;
        @include b(nav) {
          background-color: #f8f8f8;
          color: #666;
          border-bottom: 1px solid rgba(120, 130, 140, 0.13);
          padding: 10px;
          @include e(action) {
            display: flex;
            @include m(style) {
              margin-right: 10px;
            }
          }
        }

        @include b(table) {
          padding: 10px;
        }
      }
    }
  }

  .spin-icon-load {
    animation: ani-demo-spin 1s linear infinite;
  }
</style>

<template>
  <div class="model">
    <tree-menu :renderFinishFunc="renderFinishFunc" :onClickFunc="onClickFunc"></tree-menu>
    <div class="model-list">
      <div class="main">
        <div class="main__section clearfix">
          <div class="nav">
            <div class="nav__action">
              <!--<Button type="default" style="margin-right: 5px" @click="trash({type:1,index:index})">
                批量删除
              </Button>-->
              <Upload
                multiple
                :before-upload="beforeUpload"
                :show-upload-list="false"
                :on-progress="onProgress"
                :on-success="onSuccess"
                :headers="headers"
                :action="action">
                <Button type="primary" @click="handleUpload">上传文件</Button>
              </Upload>
            </div>
          </div>
          <div class="table">
            <Table ref="fileTable" :columns="table.header" :data="table.body"></Table>
            <div style="margin: 10px;overflow: hidden">
              <div style="float: right;">
                <Page :total="table.args.total_count"
                      :current="table.args.current_page"
                      :page-size="table.args.page_size"
                      show-total @on-change="changePage"></Page>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';
  import treeMenu from '@/components/tree-menu/tree-menu.vue';
  import mMoveMdl from '@/components/j-modal/move/m-move-mdl.vue';

  export default {
    name: "file-upload",
    components: {
      treeMenu
    },
    computed: {
      ...mapGetters([
        'getAdminInfo'
      ])
    },
    data() {
      return {
        headers: {},
        action: '',
        table: {
          header: [
            {
              type: 'selection',
              width: 60,
              align: 'center'
            },
            {
              title: '文件名',
              key: 'image_origin_name'
            },
            {
              title: '创建时间',
              key: 'create_date'
            },
            {
              title: '大小',
              key: 'image_size',
              render: (h, params) => {
                return h('span', {}, `${(params.row.image_size / 1024).toFixed(3)}kb`)
              }
            },
            {
              title: '图片',
              width: 100,
              key: 'image_url',
              render: (h, params) => {
                return h('img', {
                  style: {
                    width: '40px',
                    height: '40px',
                    verticalAlign: 'middle'
                  },
                  attrs: {
                    src: params.row.image_url
                  }
                })
              }
            },
            {
              title: '地址',
              key: 'image_url'
            },
            {
              title: '操作',
              width: 180,
              key: 'action',
              render: (h, params) => {
                return h('div', (() => {
                  let a = [];

                  a.push(h('Button', {
                    props: {
                      type: 'primary',
                      size: 'small'
                    },
                    style: {
                      marginRight: '5px'
                    },
                    on: {
                      click: () => {
                        this.$Modal.confirm({
                          title: params.row.image_origin_name,
                          render: (h) => {
                            return h('div', {
                              style: {marginTop: '10px'}
                            }, [
                              h('img', {
                                attrs: {src: params.row.image_url},
                                style: {width: '100%', height: '100%'}
                              })
                            ])
                          }
                        })
                      }
                    }
                  }, '预览'));

                  a.push(h('Button', {
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
                          component: 'mMoveMdl',
                          data: {
                            confirmfunc: async (value) => {
                              let res = await this.$api.uploadInterface.alterUpload({
                                fold_id: value.fold_id,
                                _id: params.row._id,
                              });
                              let {code, msg, data} = res.data;
                              if (code === 200) {
                                this.getUploadList();
                              }
                            }
                          },
                          render: (h) => {
                            return h(mMoveMdl)
                          }
                        });
                      }
                    }
                  }, '修改'));

                  a.push(h('Button', {
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
                            let res = await this.$api.uploadInterface.deleteUploadById({
                              _id: params.row._id,
                            });
                            let {code, msg} = res.data;
                            if (code === 200) {
                              this.getUploadList();
                            }
                            return this.$Message.info(msg)
                          }
                        });
                      }
                    }
                  }, '删除'));

                  return a;
                })());
              }
            }
          ],
          body: [],
          args: {
            current_page: 1,
            page_size: 10,
            total_count: 0
          }
        },
        treeList: [], /*目录*/
        imageList: []
      }
    },
    created() {
      this.headers = {
        Authorization: this.getAdminInfo.token
      }
    },
    methods: {
      beforeUpload(file) {
        this.imageList.push({
          image_name: file.name,
          image_size: file.size,
          file
        })
      },
      onProgress(event, file, fileList) {
        this.$Spin.show();
      },
      onSuccess(response, file, fileList) {
        this.imageList.pop();
        if (response.code === 200 && !this.imageList.length) {
          this.$Spin.hide();
          this.getUploadList();
          this.$Message.info(response.msg)
        }
      },
      renderFinishFunc(value) {
        this.treeList = value.treeList;
        if (value && value.treeList.length) {
          this.getUploadList();

          return false
        }

        this.table.body.splice(0, this.table.body.length);
      },
      onClickFunc() {
        this.getUploadList();
      },
      handleUpload() {
        if (!this.treeList.length) {
          return this.$Message.info('请先创建目录')
        }

        let _id = '';
        let selectId = this.$Global.VueDB().getItem('selectId', 'sessionStorage').toString();
        if (selectId) _id = selectId;
        this.action = `${process.env.api.common_url}/api/upload/pic/${_id}`;
      },
      /**
       * 获取模型列表数据
       */
      async getUploadList() {
        this.table.body = [];
        let selectId = this.$Global.VueDB().getItem('selectId', 'sessionStorage').toString();

        let res = await this.$api.uploadInterface.getUploadList({
          id: selectId,
          current_page: this.table.args.current_page,
          page_size: this.table.args.page_size
        });

        let {code, data} = res.data;
        if (code === 200) {
          this.table.body = data.list;
          this.table.args.total_count = data.total;
        }
      },
      changePage(targetPage) {
        this.table.args.current_page = targetPage;
        this.getUploadList();
      },
      /**
       * 删除模型
       * @param param
       */
      trash(param) {
        // type：0 单个 type：1 批量
        let type = param.type;
        let getSelection = this.$refs.fileTable.getSelection();

        switch (type) {
          case 1:
            if (getSelection.length) {
              let a = [];
              getSelection.forEach(m => a.push(m.modelId));
              this.$Modal.confirm({
                title: '提示',
                content: '<p>确定删除？</p>',
                onOk: async () => {
                  let res = await this.$api.uploadInterface.deleteUploadById({
                    modelIdList: JSON.stringify(a)
                  });

                  let {code, msg} = res.data;
                  if (code === 200) {
                    this.table.args.current_page = 1;
                    this.getUploadList();
                    return false
                  }
                  this.$Message.info(msg);
                }
              });
            } else {
              this.$Message.info('请选择模型')
            }
            break;
        }
      }
    }
  }
</script>
