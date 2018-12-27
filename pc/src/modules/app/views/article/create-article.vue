<style lang="scss" scoped>
  .file {
    opacity: 0;
    position: absolute;
    top: -999px;
  }

  .upload-md {
    margin-left: 10px;
    cursor: pointer;
    vertical-align: middle
  }

  .article-content {
    margin-bottom: 20px;
  }
</style>

<style lang="scss">
  .article-content {
    li {
      list-style: initial;
    }
  }
</style>

<template>
  <div>
    <Form :label-width="60">
      <FormItem label="标题：">
        <Input v-model="article.title" placeholder="请输入名称" style="width: 50%"></Input>
      </FormItem>
      <FormItem label="标签：">
        <Tag type="dot" :color="article.tag_clear ? 'blue' : ''" @click.native="onChangeTagsClear">无</Tag>
        <Tag type="dot" :color="item.checked ? 'blue' : ''" v-for="(item,index) in tagList" :key="index"
             @click.native="onChangeTags(index)">{{item.tags_name}}
        </Tag>
      </FormItem>
      <FormItem label="状态：">
        <Select v-model="article.state" style="width: 50%">
          <Option :value="item.value" :key="item.value" v-for="item in stateOptions">{{item.name}}</Option>
        </Select>
      </FormItem>
      <FormItem label="封面：">
        <Input v-model="article.cover" placeholder="请输入图片地址" style="width:50%"></Input>
      </FormItem>
      <FormItem label="描述：">
        <Input v-model="article.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入描述内容"
               style="width: 50%"></Input>
      </FormItem>
    </Form>
    <div class="article-content">
      <mavon-editor ref="mavonEditor" v-model="article.content" :ishljs="true"></mavon-editor>
    </div>

    <input type="file" id="uploadMD" @change="getFile" class="file">
    <Button type="primary" @click="publishHandler">发表</Button>
    <label for="uploadMD" class="upload-md">上传MD</label>
  </div>
</template>

<script>
  import {mavonEditor} from 'mavon-editor';
  import 'mavon-editor/dist/css/index.css';

  export default {
    name: "create-article",
    components: {
      mavonEditor
    },
    data() {
      return {
        article: {
          title: '', /*标题*/
          tags: [], /*标签*/
          state: 1, /*状态*/
          cover: '', /*封面地址*/
          desc: '', /*文章描述*/
          tag_clear: true,
          create_time: '',
          update_time: '',
          content: ''
        },
        tagList: [],
        stateOptions: [
          {
            name: '发布',
            value: 1
          },
          {
            name: '草稿',
            value: 0
          }
        ]
      }
    },
    /*directives: {
      markdown: {
        inserted(el) {
          simplemde = new SimpleMDE({
            element: el
          });
        }
      }
    },*/
    mounted() {
      this.getTagList();
      if (this.$route.query._id) this.getArticleById();
    },
    methods: {
      getNavigation() {
        let navigationContent;
        let navigation_list = [];
        let mavonEditor = this.$refs.mavonEditor;
        navigationContent = mavonEditor.$refs.navigationContent;
        navigationContent.innerHTML = mavonEditor.d_render;

        let nodes = navigationContent.children;
        if (nodes.length) {
          for (let i = 0; i < nodes.length; i++) {
            judageH(nodes[i], i, nodes)
          }
        }

        function judageH(node, i, nodes) {
          let reg = /^H[1-6]{1}$/;
          if (reg.exec(node.tagName)) {
            navigation_list.push({
              name: node.innerText,
              id: node.childNodes[0].getAttribute('id')
            })
          }
        }

        return navigation_list
      },
      getFile(e) {
        let self = this;
        let obj = e.target || null;
        let fileName = obj.files[0].name;
        let fileReader = new FileReader();
        if (fileName.slice(fileName.lastIndexOf(".") + 1).toLowerCase() !== 'md') {
          return this.$Message.info('请上传markdown的文件');
        }
        fileReader.readAsText(obj.files[0]);
        fileReader.onload = function () {
          let result = this.result;
          try {
            self.article.content = result;
          } catch (e) {
            console.error("Storage failed: " + e);
          }
        }
      },
      /*发表*/
      async publishHandler() {
        let res;
        let params = {};
        this.article.tags = !this.article.tag_clear ? this.tagList.map(m => m.checked ? m._id : null).filter(item => item) : [];
        params = {
          _id: this.$route.query._id ? this.$route.query._id : '',
          article_content: this.article.content,
          // article_render_content: this.$refs.mavonEditor.d_render.replace(/[\r\n]/g, ""),
          article_render_content: this.$refs.mavonEditor.d_render,
          article_cover: this.article.cover,
          // article_create_time: this.article.create_time,
          article_desc: this.article.desc,
          article_state: this.article.state,
          article_tags: this.article.tags,
          article_title: this.article.title,
          article_navigation: JSON.stringify(this.getNavigation())
          // article_update_time: this.article.update_time
        };

        res = !this.$route.query._id ? await this.$api.articleInterface.addArticle(params) : await this.$api.articleInterface.alterArticle(params);
        let {code, msg, data = []} = res.data;
        return this.$Message.info(msg)
      },
      async getArticleById() {
        let res = await this.$api.articleInterface.getArticleById({_id: this.$route.query._id});
        let {code, data} = res.data;
        if (code === 200 && data.length) {
          let [a] = data;
          this.article.title = a.article_title;
          this.article.state = a.article_state;
          this.article.cover = a.article_cover;
          this.article.desc = a.article_desc;
          this.article.create_time = a.article_create_time;
          this.article.update_time = a.article_update_time;
          this.article.content = a.article_content;
          if (a.article_tags.length) {
            this.article.tag_clear = false;
            this.tagList.map(item => {
              a.article_tags.map(m => (item._id === m._id) && (item.checked = true))
            })
          }
        }
      },
      async getTagList() {
        let res = await this.$api.tagsInterface.getTagsList();
        let {article_num_list = [], tags_list = []} = res.data.data;
        tags_list.forEach(item => {
          item.checked = false;
          let temp = article_num_list.find(i => {
            return i._id === item._id;
          });
          item.tags_article_num = temp == null ? 0 : temp.count;
        });

        this.tagList = tags_list.sort((a, b) => {
          return a.tags_article_num < b.tags_article_num;
        });

        this.tagList = tags_list;
      },
      onChangeTagsClear() {
        this.article.tag_clear = !this.article.tag_clear;
        this.tagList.map(m => m.checked = false)
      },
      onChangeTags(index) {
        this.article.tag_clear = false;
        this.tagList[index].checked = !this.tagList[index].checked;
      }
    }
  }
</script>
