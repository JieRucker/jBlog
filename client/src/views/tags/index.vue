<style lang="scss" scoped>
  .main-inner {
    margin-top: 40px;
    margin-left: auto;
    margin-right: auto;
    width: 1110px;
    .posts-tags {
      float: left;
      width: 772px;
      min-height: 700px;
      box-shadow: initial;
      border-radius: initial;
      background: #fff;
      padding: 40px;
      position: relative;
      overflow: hidden;
      .counter {
        text-align: center;
        color: #333;
        font-size: 20px;
        font-weight: 700;
      }
      .cloud-tags {
        margin-top: 20px;
        text-align: center;
        a {
          display: inline-block;
          margin: 10px;
          border-bottom: 1px solid #999;
          word-wrap: break-word;
        }
      }
    }

    .sidebar {
      float: right;
      background: #fff;
      border-radius: 5px;
      width: 315px;
      padding: 20px;
      .author {
        text-align: center;
        .img {
          width: 130px;
          height: 130px;
          border-radius: 50%;
          border: none;
          margin: 0 auto;
        }
        .description {
          font-size: 14px;
          margin: 5px 0 8px;
          font-weight: 700;
          color: #555;
          text-align: center;
        }
      }
      .links {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        margin-bottom: 20px;
        .item {
          font-size: 16px;
          display: inline-block;
          margin: 0 5px;
          text-align: center;
          width: 42px;
          height: 42px;
          line-height: 42px;
          border-radius: 42px;
          color: rgba(0, 0, 0, .5);
          background-color: rgba(0, 0, 0, .1);
          transition: all .3s ease-in-out;
          font-style: normal;
        }
      }
      .state {
        overflow: hidden;
        line-height: 1.4;
        white-space: nowrap;
        text-align: center;
        .item {
          display: inline-block;
          padding: 0 10px;
          color: #555;
          .count {
            display: block;
            text-align: center;
            color: inherit;
            font-weight: 600;
            font-size: 16px;
          }
        }
        .posts {
          .name {
            color: #00a7e0;
          }
        }
        .categories {
          border-left: 1px solid #eee;
          .name {
            color: #ff3f1a;
          }
        }
      }
    }
  }
</style>

<template>
  <div class="main-inner clearfix">
    <section class="posts-tags">
      <div class="counter">目前共计 11 个标签</div>
      <div class="cloud-tags">
        <a href="/tags/angularjs/" style="font-size: 28.5px; color: #212121">AngularJS</a>
        <a href="/tags/angularjs-tips/" style="font-size: 12px; color: #ccc">AngularJS Tips</a>
        <a href="/tags/ant/" style="font-size: 16.5px; color: #9d9d9d">Ant</a>
        <a href="/tags/apache/" style="font-size: 12px; color: #ccc">Apache</a>
        <a href="/tags/async/" style="font-size: 12px; color: #ccc">Async</a>
        <a href="/tags/atom/" style="font-size: 12px; color: #ccc">Atom</a>
        <a href="/tags/bilingualism/" style="font-size: 12px; color: #ccc">Bilingualism</a>
        <a href="/tags/bootstrap/" style="font-size: 12px; color: #ccc">Bootstrap</a>
        <a href="/tags/build-tool/" style="font-size: 12px; color: #ccc">Build tool</a>
        <a href="/tags/css/" style="font-size: 27px; color: #303030">CSS</a>
      </div>

    </section>
    <aside id="sidebar" class="sidebar">
      <div class="author">
        <img class="img" src="https://jrucker.cn/images/avatar.png" alt="JRucker">
        <p class="description">我的博客</p>
      </div>
      <div class="links">
        <a class="item">
          <Icon type="social-github"></Icon>
        </a>
        <a class="item">
          <Icon type="social-twitter"></Icon>
        </a>
        <a class="item">
          <Icon type="social-rss"></Icon>
        </a>
      </div>

      <nav class="state">
        <a href="/" class="item posts">
          <span class="count">25</span>
          <span class="name">日志</span>
        </a>
        <a href="/" class="item categories">
          <span class="count">7</span>
          <span class="name">分类</span>
        </a>
      </nav>

    </aside>
  </div>
</template>

<script>
  export default {
    name: "index"
  }
</script>
