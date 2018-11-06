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
              key: 'file_name'
            },
            {
              title: '创建时间',
              key: 'file_time'
            },
            {
              title: '大小',
              key: 'file_size'
            },
            {
              title: '图片地址',
              key: 'file_url',
              render: (h, params) => {
                return h('img', {
                  style: {
                    width: '40px',
                    height: '40px',
                    verticalAlign: 'middle'
                  },
                  attrs: {
                    src: params.row.file_url
                  }
                })
              }
            },
            /*{
              title: '操作',
              render: (h, params) => {
                return h('div', [
                  h('Button', {
                    props: {
                      type: 'primary',
                      size: 'small'
                    },
                    on: {
                      click: () => {
                        let config = {
                          useCdnDomain: true
                        };

                        let putExtra = {
                          fname: "",
                          params: {},
                          mimeType: [] || null
                        };

                        let observable = qiniu.upload(params.row.file, params.row.file_name, this.token, putExtra, config);
                        observable.subscribe({
                          next: (res) => {
                            let percent = res.total.percent || 0;
                            console.log(percent)
                          },
                          error: (err) => {
                            console.error(err)
                          },
                          complete: (res) => {
                            console.log(res);
                            this.$Message.info("上传完成！");
                            this.table.body.splice(this.table.body.findIndex(item => item.file_codename === params.row.file_codename), 1)
                          }
                        }); // 上传开始
                      }
                    }
                  }, '上传')
                ]);
              }
            },*/
            {
              title: '操作',
              render: (h, params) => {
                return h('div', [
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
                              file_key: params.row.file_key
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
        fileList: []
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
        this.fileList.pop();
        if (response.code === 200 && !this.fileList.length) {
          this.$Spin.hide();
          this.getUploadList();
          this.$Message.info(response.msg)
        }
      },
      uploadHandler(file) {
        this.fileList.push({
          file_name: file.name,
          file_size: file.size,
          file
        })
      }
    }
  }
</script>
