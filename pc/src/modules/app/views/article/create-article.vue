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

    <textarea class="markdown-content" id="markdown-content" v-markdown>
    </textarea>

    <Button type="primary" @click="publishHandler">发表</Button>
  </div>
</template>

<script>
  import SimpleMDE from 'simplemde';
  import 'simplemde/dist/simplemde.min.css';

  let simplemde = null;

  export default {
    name: "create-article",
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
          update_time: ''
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
        ],
      }
    },
    directives: {
      markdown: {
        inserted(el) {
          simplemde = new SimpleMDE({
            element: el
          });
        }
      }
    },
    mounted() {
      simplemde.value("```javascript```");
      this.getTagList();
      this.getArticleById();
    },
    methods: {
      /*发表*/
      async publishHandler() {
        let res;
        let params = {};
        this.article.tags = !this.article.tag_clear ? this.tagList.map(m => m.checked ? m._id : null).filter(item => item) : [];
        params = {
          _id: this.$route.query._id ? this.$route.query._id : '',
          article_content: simplemde.value(),
          article_cover: this.article.cover,
          article_create_time: this.article.create_time,
          article_desc: this.article.desc,
          article_state: this.article.state,
          article_tags: this.article.tags,
          article_title: this.article.title,
          article_update_time: this.article.update_time
        };

        res = !this.$route.query._id ? await this.$api.articleInterface.addArticle(params) : await this.$api.articleInterface.alterArticle(params);
        let {code, msg, data = []} = res.data;
        return this.$Message.info(msg)
      },
      async getArticleById() {
        let res = await this.$api.articleInterface.getArticleById({id: this.$route.query._id});
        let {code, data} = res.data;
        if (code === 200 && data.length) {
          let [a] = data;
          this.article.title = a.article_title;
          this.article.state = a.article_state;
          this.article.cover = a.article_cover;
          this.article.desc = a.article_desc;
          this.article.create_time = a.article_create_time;
          this.article.update_time = a.article_update_time;
          if (a.article_tags.length) {
            this.article.tag_clear = false;
            this.tagList.map(item => {
              a.article_tags.map(m => (item._id === m._id) && (item.checked = true))
            })
          }
          simplemde.value(a.article_content);
        }
      },
      async getTagList() {
        let res = await this.$api.articleInterface.getTags();
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
