<style lang="scss" scoped>
  .main-inner {
    margin-top: 40px;
    margin-left: auto;
    margin-right: auto;
    width: 1110px;
    .posts-article-detail {
      float: left;
      width: 772px;
      min-height: 700px;
      box-shadow: initial;
      border-radius: initial;
      background: #fff;
      padding: 40px;
      position: relative;
      .date {
        background-color: #97dffd;
        box-shadow: 0 2px 2px 0 rgba(0, 0, 0, .14), 0 3px 1px -2px rgba(0, 0, 0, .2), 0 1px 5px 0 rgba(0, 0, 0, .12);
        position: absolute;
        top: -18px;
        left: -25px;
        height: 70px;
        width: 70px;
        padding-top: 15px;
        border-radius: 100px;
        color: #fff;
        text-align: center;
        line-height: 1.1;
        .month {
          font-size: 14px;
        }
        .day {
          font-size: 30px;
          font-weight: 700;
        }
      }
      .header {
        .title {
          color: #333;
          font-size: 25px;
          font-weight: 700;
          text-align: center;
          word-break: break-word;
        }
        .meta {
          color: #999;
          font-size: 12px;
          text-align: center;
          margin-top: 10px;
          .time {
            color: #00a7e0;
          }
          .icon {
            margin-right: 3px;
          }
          .divider {
            margin: 0 5px;
          }
          .category {
            color: #333;
            a {
              color: #333;
            }
            .text {
              text-overflow: ellipsis;
              overflow: hidden;
              max-width: 100px;
              white-space: nowrap;
              display: table-cell;
            }
          }
          .visitors {
            color: #ff3f1a;
            .icon {
              .eye {
                font-size: 16px;
                vertical-align: text-bottom;
              }
            }
          }
        }
      }
    }
  }

  @media (max-width: 991px) {
    .main-inner {
      width: 100%;
      .posts-article-detail {
        width: 100%;
        min-height: auto;
        padding: 15px;
        .date {
          display: none;
        }
      }
    }
    .sidebar {
      display: none;
    }
  }
</style>

<style lang="scss">
  @import "../../assets/public/markdown.css";
</style>

<template>
  <div class="main-inner clearfix">
    <section class="posts-article-detail animated fadeIn">
      <div class="date">
        <div class="month">09月</div>
        <div class="day">20</div>
      </div>
      <header class="header">
        <h1 class="title">分享个人命名方式</h1>

        <div class="meta">
              <span class="time">
                  <Icon type="ios-calendar-outline" class="calendar"></Icon> 发表 2018-09-20
              </span>
          <span class="category">
                <span class="divider">•</span>
                <span class="icon">
                  <Icon type="ios-folder-outline" class="folder"></Icon>
                </span>
                <span class="text">分类 代码规范</span>
              </span>
          <span class="visitors">
                <span class="divider">•</span>
                <span class="icon">
                  <Icon type="eye" class="eye"></Icon>
                </span>
                <span class="text">阅读 13</span>
              </span>
        </div>
      </header>

      <div v-html="compiledMarkdown" class="article-content"></div>

    </section>
    <j-aside current-page="postToc"></j-aside>
  </div>


</template>

<script>
  import jAside from '@/components/j-aside/j-aside';

  let marked = require('marked');
  marked.setOptions({
    renderer: new marked.Renderer(),
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    sanitize: false,
    smartLists: true,
    smartypants: false
  });

  export default {
    name: "detail",
    components: {
      jAside
    },
    data() {
      return {
        markdown: '<h1><a id="asdfadsas_0"></a>asdfadsas</h1><p><a href="dfsdfsdfsd" target="_blank">sadfas</a></p><blockquote><p>sdfsdf</p></blockquote><ul><li>a</li></ul><table><thead><tr><th>f</th><th>f</th><th>f</th></tr></thead><tbody><tr><td>f</td><td>f</td><td>f</td></tr></tbody></table>'
      }
    },
    computed: {
      compiledMarkdown() {
        return marked(this.markdown);
        // return marked(this.markdown, {sanitize: true})
      }
    }
  }
</script>
