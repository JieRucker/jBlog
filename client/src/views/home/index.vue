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
          padding-top: 12px;
          border-radius: 100px;
          color: #fff;
          text-align: center;
          line-height: 1.1;
          .day {
            font-size: 16px;
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
  }

  @media (max-width: 991px) {
    .main-inner {
      width: 100%;
      .posts-expand {
        width: 100%;
        min-height: auto;
        .post {
          padding: 15px;
          border-radius: initial;
          margin-bottom: 15px;
          .date {
            display: none;
          }
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
    <section class="posts-expand animated fadeIn">
      <article class="post">
        <div class="date">
          <div class="month">09月</div>
          <div class="day">20</div>
        </div>
        <div class="body">
          <a class="title" href="javascript:;" @click="detailRouter">雨伞|140字微小说</a>
          <p class="abstract">
            他出门必带伞，可是每次下雨他到公司还是会淋湿，同事笑他一定是用伞去泡女孩了。 他不解释默默擦干，收起雨伞放回包里。 又来到她墓碑前，他低声说着什...
          </p>
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
        </div>
      </article>
    </section>
    <j-aside :show-tabs="false"></j-aside>
  </div>
</template>

<script>
  import jAside from '@/components/j-aside/j-aside';

  export default {
    name: "index",
    components: {
      jAside
    },
    methods: {
      detailRouter() {
        this.$router.push({path: 'article/detail'})
      }
    }
  }
</script>
