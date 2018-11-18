<style lang="scss" scoped>
  .main-inner {
    margin-top: 40px;
    margin-left: auto;
    margin-right: auto;
    width: 1110px;
    .posts-collapse {
      float: left;
      width: 772px;
      min-height: 700px;
      box-shadow: initial;
      border-radius: initial;
      background: #fff;
      padding: 40px;
      position: relative;
      overflow: hidden;
      &:after{
        content: " ";
        position: absolute;
        top: 47px;
        left: 38px;
        width: 4px;
        height: 100%;
        background: #f5f5f5;
      }
      .counter {
        font-size: 16px;
        margin-left: 20px;
        color: #333;
        font-weight: 700;
        &:before {
          content: " ";
          position: absolute;
          z-index: 1;
          left: 34px;
          margin-top: 5px;
          width: 12px;
          height: 12px;
          background: #bbb;
          border-radius: 50%;
        }
      }
      .collection-title {
        position: relative;
        margin: 40px 0;
        &:before {
          content: " ";
          position: absolute;
          z-index: 1;
          left: 0;
          top: 50%;
          margin-left: -5px;
          margin-top: -4px;
          width: 10px;
          height: 10px;
          background: #bbb;
          border-radius: 50%;
        }
        .year {
          margin-left: 20px;
          font-size: 22px;
        }
      }
      .post {
        .header {
          margin-bottom: 20px;
          position: relative;
          transition-duration: .2s;
          transition-timing-function: ease-in-out;
          transition-delay: 0s;
          transition-property: border;
          border-bottom: 1px dashed #ccc;
          .title {
            font-size: 16px;
            font-weight: 400;
            line-height: inherit;
            margin: 20px 0 15px 60px;
            .link {
              color: #666;
            }
          }
          .meta {
            position: absolute;
            font-size: 12px;
            left: 20px;
            top: 5px;
            .time {
              color: #00a7e0;
            }
          }
          &:before {
            content: " ";
            position: absolute;
            z-index: 1;
            left: 0;
            top: 8px;
            width: 10px;
            height: 10px;
            margin-left: -4px;
            background: #bbb;
            border-radius: 50%;
            border: 1px solid #fff;
            transition-duration: .2s;
            transition-timing-function: ease-in-out;
            transition-delay: 0s;
            transition-property: background;
          }
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
    <section class="posts-collapse">
      <span class="counter">目前共计 25 篇日志。</span>
      <div class="collection-title">
        <h1 class="year">2018</h1>
      </div>
      <article class="post">
        <header class="header">
          <h2 class="title">
            <a class="link" href="/">
              <span>分享个人命名方式</span>
            </a>
          </h2>
          <div class="meta">
            <time class="time">
              09-20
            </time>
          </div>
        </header>
      </article>


      <div class="collection-title">
        <h1 class="year">2019</h1>
      </div>
      <article class="post">
        <header class="header">
          <h2 class="title">
            <a class="link" href="/">
              <span>分享个人命名方式</span>
            </a>
          </h2>
          <div class="meta">
            <time class="time">
              09-20
            </time>
          </div>
        </header>
      </article>

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
