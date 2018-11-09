<style lang="scss" scoped>
  .works-toolbar {
    margin-bottom: 10px;
  }
</style>

<template>
  <div>
    <div class="works-toolbar">
      <Upload
        multiple
        :before-upload="uploadHandler"
        :show-upload-list="false"
        :on-progress="onProgress"
        :on-success="onSuccess"
        action="api/upload/pic">
        <Button type="primary">上传文件</Button>
      </Upload>
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
  export default {
    name: "upload-list",
    data() {
      return {
        table: {
          header: [
            {
              title: '图片名',
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
              title: '图片地址',
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
              title: '操作',
              render: (h, params) => {
                return h('div', [
                  h('Button', {
                    props: {type: 'primary', size: 'small'},
                    style: {marginRight: '5px'},
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
                  }, '预览'),
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
        },
        file: null,
        token: '',
        imageList: []
      }
    },
    async created() {
      let res = await this.$api.settingInterface.getQiniuToken();
      let {code, msg, data} = res.data;
      if (code === 200) {
        this.token = data.token;
      }

      this.getUploadList();
    },
    methods: {
      async getUploadList() {
        let res = await this.$api.uploadInterface.getUploadList();
        let {code, data} = res.data;
        if (code === 200) {
          this.table.body = data;
        }
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
      uploadHandler(file) {
        this.imageList.push({
          image_name: file.name,
          image_size: file.size,
          file
        })
      }
    }
  }
</script>
