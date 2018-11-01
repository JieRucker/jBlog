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
        action="//jsonplaceholder.typicode.com/posts/">
        <Button type="primary">上传文件</Button>
        <!--<Button type="ghost" icon="ios-cloud-upload-outline">上传文件</Button>-->
      </Upload>
      <!--<Button type="primary" @click="uploadHandler">上传文件</Button>-->
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
              title: '文件名',
              key: 'file_name'
            },
            {
              title: '编号',
              key: 'file_codename'
            },
            {
              title: '大小',
              key: 'file_size'
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
        token: ''
      }
    },
    async created() {
      let res = await this.$api.settingInterface.getQiniuToken();
      let {code, msg, data} = res.data;
      if (code === 200) {
        this.token = data.token;
      }
    },
    methods: {
      uploadHandler(file) {
        this.file = file;
        this.table.body.push({
          file_name: file.name,
          file_codename: this.random_file_name(),
          file_size: file.size,
          file
        });
        console.log(this.file);
        return false;
      },
      random_file_name() {
        /*随机生成文件名，16进制时间戳+8位随机*/
        let s = new Date().getTime().toString(16);
        s += '_';
        let hexDigits = "0123456789abcdef";
        for (let i = 0; i < 8; i++) {
          s += hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
        }
        return s;
      }
    }
  }
</script>
