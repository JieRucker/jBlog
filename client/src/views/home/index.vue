<style lang="scss" scoped>
  .main-inner {
    margin-top: 40px;
    margin-left: auto;
    margin-right: auto;
    width: 1110px;
    .posts-expand {
      float: left;
      width: 772px;
      min-height: 700px;
      box-shadow: initial;
      border-radius: initial;
      .post {
        position: relative;
        padding: 25px;
        background: #fff;
        border-radius: 5px;
        margin-bottom: 25px;
        &:last-child {
          margin-bottom: 0;
        }
        .date {
          background-color: #97dffd;
          box-shadow: 0 2px 2px 0 rgba(0, 0, 0, .14), 0 3px 1px -2px rgba(0, 0, 0, .2), 0 1px 5px 0 rgba(0, 0, 0, .12);
          position: absolute;
          top: -18px;
          left: -25px;
          height: 50px;
          width: 50px;
          padding-top: 10px;
          border-radius: 100px;
          color: #fff;
          text-align: center;
          line-height: 1.1;
          .day {
            font-size: 20px;
            font-weight: 700;
          }
        }
        .body {
          .title {
            display: inherit;
            font-size: 18px;
            font-weight: 700;
            color: #333;
            margin-bottom: 5px;
          }
          .abstract {
            font-size: 13px;
            line-height: 24px;
            color: #999;
          }
          .meta {
            color: #999;
            font-size: 12px;
            text-align: left;
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
    <section class="posts-expand">
      <article class="post">
        <div class="date">
          <div class="month">09月</div>
          <div class="day">20</div>
        </div>
        <div class="body">
          <a class="title" target="_blank" href="/">雨伞|140字微小说</a>
          <p class="abstract">
            他出门必带伞，可是每次下雨他到公司还是会淋湿，同事笑他一定是用伞去泡女孩了。 他不解释默默擦干，收起雨伞放回包里。 又来到她墓碑前，他低声说着什...
          </p>
          <div class="meta">
              <span class="time">
                  <Icon type="ios-calendar-outline" class="calendar"></Icon> 发表于 2018-09-20
              </span>
            <span class="category">
                <span class="divider">•</span>
                <span class="icon">
                  <Icon type="ios-folder-outline" class="folder"></Icon>
                </span>
                <span class="text">分类于</span>
                  <span itemprop="name">代码规范</span>
              </span>
            <span class="visitors">
                <span class="divider">•</span>
                <span class="icon">
                  <Icon type="eye" class="eye"></Icon>
                </span>
                <span class="text">阅读次数: 13</span>
              </span>
          </div>
        </div>
      </article>

      <article class="post">
        <div class="date">
          <div class="month">09月</div>
          <div class="day">20</div>
        </div>
        <div class="body">
          <a class="title" target="_blank" href="/">雨伞|140字微小说</a>
          <p class="abstract">
            他出门必带伞，可是每次下雨他到公司还是会淋湿，同事笑他一定是用伞去泡女孩了。 他不解释默默擦干，收起雨伞放回包里。 又来到她墓碑前，他低声说着什...
          </p>
          <div class="meta">
              <span class="time">
                  <Icon type="ios-calendar-outline" class="calendar"></Icon> 发表于 2018-09-20
              </span>
            <span class="category">
                <span class="divider">•</span>
                <span class="icon">
                  <Icon type="ios-folder-outline" class="folder"></Icon>
                </span>
                <span class="text">分类于</span>
                  <span itemprop="name">代码规范</span>
              </span>
            <span class="visitors">
                <span class="divider">•</span>
                <span class="icon">
                  <Icon type="eye" class="eye"></Icon>
                </span>
                <span class="text">阅读次数: 13</span>
              </span>
          </div>
        </div>
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
