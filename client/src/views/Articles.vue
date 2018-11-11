<template>
  <div class="wrap posts animated fadeIn">
    <p class="title">Total 共计<span>{{ articles.length }}</span>篇相关文章</p>
    <div class='wrapper '>
      <div v-if="!articles.length" class="none">
        <span style="font-size: 25px">o(；>△<)o </span> 没有与 “{{key}}” 相关的文章噢, 瞅瞅别的吧~
      </div>
      <div class="article posts animated fadeIn" v-for="article in articles" :key='article._id'>
        <router-link :to="{ name: 'article', params: {aid: article._id} }" tag="h3">
          {{ article.title }}
        </router-link>
        <span class="line"></span>
        <time>{{ article.date }}</time>
        <ul class="tag">
          <li v-for="tag in article.tags" :key='tag'>{{ tag }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapActions, mapState, mapGetters, mapMutations} from 'vuex';

  export default {
    created() {
      this.set_headLine({text: '关于“' + this.keyword + '”', animate: 'show2'});
      this.init();
    },

    computed: {
      ...mapState({
        articles: state => state.app.articles
      }),
      ...mapGetters(['getShortArticles']),
      keyword() {
        let key = this.$route.query.tag || this.$route.query.key;
        this.set_headLine({text: '关于“' + key + '”', animate: 'show2'});
        return key;
      }
    },

    methods: {
      ...mapMutations(['set_headLine']),
      ...mapActions(['getArticles', 'searchArticles']),
      init() {
        const query = this.$route.query;
        if (typeof query.key != 'undefined') {
          this.key = query.key;
          this.searchArticles(query)
        } else {
          this.key = query.tag;
          this.getArticles(query)
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
  .wrap {
    width: 55%;
    position: relative;
    justify-content: center;
    flex-direction: column;
    margin: 40px auto 30px auto;
    display: flex;
    overflow: hidden;
    .title {
      font-size: 18px;
      letter-spacing: 2px;
      span {
        font-size: 25px;
        color: #acc0d7;
        margin: auto 8px;
      }
    }
    .none {
      margin-top: 80px;
      img {
        width: 100px;
      }
    }
    .article {
      width: 100%;
      height: 90px;
      margin-top: 40px;
      position: relative;
      display: flex;
      justify-content: space-between;
      align-items: center;
      h3 {
        color: #2D3E4A;
        white-space: nowrap;
        font-weight: normal;
      }
      h3:hover {
        color: #aaa;
      }
      .line {
        flex-grow: 1;
        height: 0px;
        border-top: 1px solid #ddd;
        width: 100%;
        margin: auto 10px;
      }
      time {
        color: #777;
        white-space: nowrap;
        font-size: 14px;
      }
      .tag {
        position: absolute;
        left: 0px;
        bottom: 0px;
        align-self: flex-end;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        li {
          margin-right: 10px;
          border-radius: 17px;
          color: #bbb;
          transition: 1s;
        }
        li:hover {
          color: #8bc34a;
          transform: translateX(10px);
        }
      }

    }
  }

  @media screen and (max-width: 500px) {
    .wrap {
      width: 80% !important;
      /*   margin: auto; */
      .article {
        margin-top: 30px;
        h3 {
          font-size: 18px;
        }
      }
      .tags {
        width: 90%;
        margin: 0px;
        span {
          font-size: 16px;
          padding: 3px 10px;
        }
      }
    }
  }
</style>
