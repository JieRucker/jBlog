<style lang="scss" scoped>
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
</style>

<template>
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
</template>

<script>
  export default {
    name: "j-aside"
  }
</script>
