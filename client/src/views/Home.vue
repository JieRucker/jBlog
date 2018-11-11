<template>
  <div class="container">
    <div class="wrap">

      <section class="articles posts animated fadeIn">
        <div class="article" v-for="article in getShortArticles">
          <div class="art_wrap">
            <router-link
              :to="{ name: 'article', params:{aid: article._id} }"
              tag='h3'>
              {{article.title}}
            </router-link>
            <time>Posted on {{article.date}}</time>
            <p>{{article.content}}</p>
            <div class="art_footer">
              <div class="tags">In
                <span v-for="tag in article.tags">{{tag}}</span>
              </div>
              <router-link
                :to="{ name: 'article', params:{aid: article._id} }"
                class="detail">more...
              </router-link>
            </div>
          </div>
        </div>
        <div class="loadMore">
          <loading v-if="isLoadingMore"></loading>
          <span v-if="!isLoadingMore && more">下拉加载更多...</span>
          <span v-if="!more"> .没有更多文章了哟... (;ﾟДﾟi|!) </span>
        </div>
      </section>

      <section class="aside">
        <div class='box tags'>
          <p>FEATURED TAGS</p>
          <div>
            <router-link
              :to="{name: 'articles', query: {tag: item}}"
              tag='span'
              v-for="item in allTags"
              :key="item"
            >
              {{item}}
            </router-link>
          </div>
        </div>
        <div class="box portrait">
          <p>ABOUT ME</p>
          <img src="../assets/images/icon/qtc_avatar.png"/>
        </div>
        <div class="box others">
          <div>
            <a class="icons" href="https://github.com/Hilda1227">
              <img src="../assets/images/icon/github.png"/>
            </a>
          </div>
        </div>
      </section>
    </div>

  </div>
</template>

<script>

  import {mapState, mapActions, mapGetters, mapMutations} from 'vuex'
  import util from '@/libs/util.js'
  import loading from '@/components/common/Loading.vue'

  export default {
    components: {
      loading
    },
    data() {
      return {
        limit: 5,
        skip: 0,
        isLoadingMore: false,
        more: true
      }
    },

    created() {
      this.set_headLine({text: 'Hilda的blog', animate: 'show1'});
      this.getAllTags();
      this.getArticles({limit: this.limit, skip: 0})
    },

    mounted() {
      this.loadMore = util.debounce(this.loadMore, 300);
      window.addEventListener('scroll', this.loadMore, false);
    },

    beforeRouteLeave(to, from, next) {
      window.removeEventListener('scroll', this.loadMore);
      next();
    },
    computed: {
      ...mapState({
        allTags: state => state.app.allTags,
      }),
      ...mapGetters(['getShortArticles'])
    },

    methods: {
      ...mapActions(['getArticles', 'getAllTags']),
      ...mapMutations(['set_headLine']),
      loadMore() {
        const html = document.querySelector('html'),
          // 获取scrollTop的兼容写法
          scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
        if (html.scrollHeight - scrollTop <= window.innerHeight) {
          if (this.more == true) {
            this.isLoadingMore = true
            this.getArticles({
              tag: this.tag,
              limit: this.limit,
              skip: (++this.skip) * this.limit,
              isAdd: true
            })
              .then((articles) => {
                this.isLoadingMore = false;
                if (articles.length < this.limit) this.more = false;
              });
          }
        }
      }
    }
  }
</script>

<style lang="scss" scoped>

  .container {
    width: 100%;
    height: 100%;
    position: relative;
    top: 0px;
    z-index: 2;
    .wrap {
      width: 78%;
      margin: auto;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }
    .aside {
      width: 18%;
    }

  }

  .articles {
    width: 79%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    min-height: 400px;
    position: relative;
    color: rgba(0, 0, 0, 0.54);
    .article {
      position: relative;
      width: 100%;
      transition: 0.2s;
      margin: auto auto 30px auto;
      border: 1px solid #fff;
      border-radius: 3px;
      box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
      &:hover {
        box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.4), 0 3px 1px -2px rgba(0, 0, 0, 0.4), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
      }
      .art_wrap {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: flex-start;
        width: 95%;
        margin: auto;
        position: relative;

        h3 {
          font-weight: normal;
          margin: 50px auto 30px 10px;
          float: left;
          display: inline-block;
          color: #333;
          cursor: pointer;
          font-size: 21px;
        }
        time {
          font-size: 12px;
          color: rgba(0, 0, 0, 0.4);
          overflow: hidden;
          margin: 0 0 8px 0;
        }
        p {
          margin-bottom: 15px;
          text-align: left;
          color: rgba(0, 0, 0, 0.54);
          font-size: 13px;
          &:hover {
            color: rgba(0, 0, 0, 0.84);

          }
        }
        .art_footer {
          border-top: 1px solid #eee;
          width: 100%;
          height: 25px;
          line-height: 25px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 14px;
          overflow: hidden;
          height: auto;
          .tags {
            color: #000;
            margin-left: 20px;
            span {
              margin-left: 15px;
              display: inline-block;
              transition: 1s;
              color: #ff4081;
              font-size: 12px;
              &:hover {
                transform: translateX(10px);
              }
            }
          }

          .detail {
            color: #3f51b5;
            padding: 3px 10px;
            background-color: #f5f5f5;
            text-decoration: none;
            transition: 1s;
            margin: 5px 0px 5px auto;
            &:hover {
              transform: translateX(-10px);
            }
          }
        }
      }
    }
    .loadMore {
      width: 100%;
      display: felx;
      justify-content: center;;
    }
  }

  .aside {
    .box {
      width: 100%;
      border-top: 1px solid #888;
      p {
        text-align: left;
        margin: 22px 0px 10px 0px;
        font-weight: bold;
      }
    }
    .tags div {
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      flex-sharink: 0;
      padding-bottom: 40px;
      span {
        font-size: 13px;
        padding: 2px 6px;
        float: left;
        border: 1px solid #ccc;
        border-radius: 10px;
        margin-right: 10px;
        margin-bottom: 10px;
        color: #ccc;
        cursor: pointer;
      }
    }
    .portrait img {
      width: 80%;
      margin: 10px 0px;

    }
    .others div {
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
      .icons {
        width: 40px;
        margin: 10px 10px 10px 0px;
        img {
          width: 100%;
          transition: 1s;
          opacity: 0.7;
          &:hover {
            transform: rotateZ(360deg)
          }
        }
      }
    }

  }

  @media screen and (max-width: 950px) {
    .wrap {
      width: 95% !important;
    }
    .articles {
      width: 100%;
    }
    .aside {
      display: none;

    }
  }

  @media screen and (max-width: 950px) {
    .wrap {
      width: 90% !important;
    }
  }

</style>
