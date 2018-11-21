<style lang="scss" scoped>
  .main-inner {
    margin-top: 40px;
    margin-left: auto;
    margin-right: auto;
    width: 1110px;
    .posts-archives {
      float: left;
      width: 772px;
      min-height: 700px;
      box-shadow: initial;
      border-radius: initial;
      background: #fff;
      padding: 40px;
      position: relative;
      overflow: hidden;

      &:after {
        content: " ";
        position: absolute;
        top: 47px;
        margin-left: -2px;
        width: 4px;
        height: 100%;
        background: #f5f5f5;
      }

      .counter {
        font-size: 16px;
        color: #333;
        font-weight: 700;
        .total {
          margin-left: 20px;
        }
        &:before {
          content: " ";
          position: absolute;
          z-index: 1;
          margin-left: -6px;
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
            margin-left: -5px;
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
  }

  @media (max-width: 991px) {
    .main-inner {
      width: 100%;
      .posts-archives {
        width: 100%;
        min-height: auto;
        padding: 25px;
        &:after {
          top: 33px
        }
      }
    }
    .sidebar {
      display: none;
    }
  }
</style>

<template>
  <div class="main-inner clearfix">
    <section class="posts-archives">
      <div class="counter"><span class="total">目前共计 25 篇日志。</span></div>
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
