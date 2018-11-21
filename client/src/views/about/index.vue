<style lang="scss" scoped>
  .main-inner {
    margin-top: 40px;
    margin-left: auto;
    margin-right: auto;
    width: 1110px;
    .posts-about {
      float: left;
      width: 772px;
      min-height: 700px;
      box-shadow: initial;
      border-radius: initial;
      background: #fff;
      padding: 40px;
      position: relative;
      overflow: hidden;
      .header {
        text-align: center;
        color: #333;
        font-size: 20px;
        font-weight: 700;
      }
      .body {
        margin-top: 20px;
        .info {
          text-align: center;
          margin-bottom: 10px;
          img {
            max-width: 100%;
          }
        }
        .item {
          font-size: 14px;
          margin-bottom: 10px;
        }
      }
    }
  }

  @media (max-width: 991px) {
    .main-inner {
      width: 100%;
      .posts-about {
        width: 100%;
        min-height: auto;
        padding: 15px;
      }
    }
    .sidebar {
      display: none;
    }
  }
</style>

<template>
  <div class="main-inner clearfix">
    <section class="posts-about animated fadeIn">
      <div class="header">关于</div>
      <div class="body">
        <div class="info">
          <img src="https://jrucker.cn/images/about-fold/about.jpg">
        </div>
        <p class="item">前端 | bilibili | 掘金 | github</p>
        <p class="item">建于2017年11月25日</p>
      </div>

    </section>
    <j-aside></j-aside>
  </div>
</template>

<script>
  import jAside from '@/components/j-aside/j-aside';

  export default {
    name: "index",
    components: {
      jAside
    }
  }
</script>

