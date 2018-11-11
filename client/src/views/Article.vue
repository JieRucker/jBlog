<template>
  <div class="wrap articles posts animated fadeIn">
    <div class="article page">
      <time>{{getFormArticle() && getFormArticle().date}}</time>
      <p class="content" v-html="getFormArticle() && getFormArticle().content"></p>
      <ul class="tags">
        <li v-for="item in getFormArticle() && getFormArticle().tags">#{{item}}</li>
      </ul>
      <comment :aid="aid"></comment>
    </div>
    <aside-nav></aside-nav>
  </div>
</template>

<script>
  import {mapActions, mapState, mapGetters, mapMutations} from 'vuex';
  import comment from './Comment.vue';
  import AsideNav from '@/components/common/AsideNav.vue';

  export default {
    data() {
      return {
        aid: this.$route.params.aid,
      }
    },
    computed: {
      ...mapState({
        article: state => state.app.article,
        markedArticle: state => state.app.markedArticle,
      })
    },
    components: {
      comment,
      AsideNav
    },
    watch: {
      aid(to, from) {
        this.getArticle({aid: to})
      }
    },
    created() {
      this.set_loading(true);
      this.getArticle({aid: this.aid})
        .then(() => {
          this.set_headLine({text: this.article.title, animate: 'show2'});
        })
    },
    methods: {
      ...mapMutations(['set_loading', 'set_headLine']),
      ...mapActions(['getArticle']),
      getFormArticle() {
        let formArticle = this.article;
        if (formArticle.content != null) {
          formArticle.content = this.markedArticle;
          return formArticle;
        }
      }

    }
  }
</script>

<style lang="scss" scoped>
  .wrap {
    position: relative;
    width: 65%;
    margin: 0px auto;
    display: flex;
    justify-content: space-between;
  }

  .article {
    position: relative;
    align-self: center;
    width: 100%;
    overflow: hidden;
    margin: 0px auto;
    text-align: left;
    time {
      margin-bottom: 30px;
      color: #ccc;
      float: right;
    }
    h1 {
      text-align: center;
      font-weight: normal;
      margin-bottom: 20px;
      color: #444;
      font-size: 30px;
      &:hover {
        color: #3f86b5;
      }
    }
    .content {
      margin: 10px 0;
    }
    .tags {
      color: #ff4081;
      display: flex;
      justify-content: center;
      margin-bottom: 20px;
      li {
        margin-right: 5px;
      }
    }
  }

  @media screen and (max-width: 440px) {
    .wrap {
      width: 93%;
    }
  }

</style>
