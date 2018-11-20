<style lang="scss" scoped>
  .header {
    position: relative;
    margin: 0 auto;
    width: 100%;
    .nav {
      left: 0;
      right: 0;
      top: 0;
      position: fixed;
      z-index: 3;
      transition: all .5s ease-in-out;
      &.active {
        background: rgba(40, 42, 44, .6);
      }
      .menu {
        margin: 0 auto;
        width: 1110px;
        text-align: left;
        .item {
          display: inline-block;
          height: 38px;
          line-height: 38px;
          text-align: left;
          margin: 0 20px 0 0;
          a {
            padding: 0 12px;
            color: #fff;
            font-size: 14px;
          }
          &.search {
            float: right;
          }
          .icon {
            font-size: 20px;
            color: #fff;
            cursor: pointer;
            vertical-align: middle;
          }
        }
      }
    }

    .brand {
      position: relative;
      height: 650px;
      width: 100%;
      background-size: cover;
      background-position: center 50%;
      background-repeat: no-repeat;
      .title {
        text-align: center;
        position: absolute;
        transform: translate(-50%, -50%);
        top: 50%;
        width: 100%;
        left: 50%;
        .animate {
          font-family: 'Sigmar One';
          text-shadow: 1px 1px 0 #ff3f1a, -1px -1px 0 #00a7e0;
          font-size: 100px;
          color: #fff;
          width: 100%;
          display: block;
        }
      }
    }

    #wave {
      position: absolute;
      bottom: 0;
      left: 0;
    }

    /*标题动画类*/
    .site-animate {
      animation: site-animate 1000ms ease 0ms 1;
    }

    @keyframes site-animate {
      0% {
        transform: translateX(100px);
        opacity: 0;
      }
      100% {
        transform: translateX(0);
        opacity: 1;
      }
    }
  }

  .main {
    padding-bottom: 150px;
  }

  #evanyou {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: -1;
  }

  .footer {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    min-height: 50px;
    background: #232323;
    padding: 15px 0 10px;
    text-align: center;
    color: #888;
    font-size: 12px;
    line-height: 1.5;
    .inner {
      width: 100%;
      text-align: center;
      p {
        margin: 5px 0;
      }
      .ypy {
        width: 40px;
        vertical-align: middle;
        display: inline;
        margin: 0 2px 3px 0;
      }
    }
  }

  .back-to-top {
    cursor: pointer;
    position: fixed;
    right: 50px;
    top: -900px;
    z-index: 2;
    width: 70px;
    height: 900px;
    background: url(https://jrucker.cn/images/scroll.png);
    transition: all .5s ease-in-out;
    text-align: center;
  }

  .aplayer-fixed {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    margin: 0;
    z-index: 99;
    overflow: visible;
    max-width: 400px;
    box-shadow: none;
  }
</style>
<template>
  <div class="main-container">
    <header id="header" class="header">
      <nav :class="[{'active':headerMask},'nav']">
        <ul id="menu" class="menu">
          <router-link tag="li" :to="{ path: '/home'}" class="item"><a href="javascript:;">首页</a></router-link>
          <router-link tag="li" :to="{ path: '/archives'}" class="item"><a href="javascript:;">归档</a></router-link>
          <router-link tag="li" :to="{ path: '/tags'}" class="item"><a href="javascript:;">标签</a></router-link>
          <router-link tag="li" :to="{ path: '/about'}" class="item"><a href="javascript:;">关于</a></router-link>
          <li class="item search">
            <Icon type="search" class="icon" @click="handleSearch()"></Icon>
          </li>
        </ul>
      </nav>

      <div class="brand" style="background-image:url(http://blog-image-dev.test.upcdn.net/image/1541689829315.jpg)">
        <div class="title">
          <span class="animate">J.Rucker</span>
        </div>
      </div>

      <canvas id="wave">你的浏览器好像不支持canvas，请换个浏览器试试</canvas>

    </header>

    <main id="main" class="main">
      <router-view></router-view>
    </main>
    <footer id="footer" class="footer">
      <div class="inner">
        <!--<p>已运行<span id="since">NaN天NaN小时NaN分NaN秒</span></p>-->
        <p>托管于
          <a href="https://github.com/" target="_blank">GitHub</a>. <a
            href="https://www.upyun.com/?utm_source=lianmeng&amp;utm_medium=referral" target="_blank" class="external">
            <img class="ypy"
                 src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAAfCAYAAAC7xK7qAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAL8WlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNS40LjAiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczp0aWZmPSJodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyIKICAgICAgICAgICAgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIgogICAgICAgICAgICB4bWxuczpleGlmPSJodHRwOi8vbnMuYWRvYmUuY29tL2V4aWYvMS4wLyIKICAgICAgICAgICAgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIgogICAgICAgICAgICB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIgogICAgICAgICAgICB4bWxuczpzdEV2dD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIj4KICAgICAgICAgPHRpZmY6UmVzb2x1dGlvblVuaXQ+MjwvdGlmZjpSZXNvbHV0aW9uVW5pdD4KICAgICAgICAgPHRpZmY6T3JpZW50YXRpb24+MTwvdGlmZjpPcmllbnRhdGlvbj4KICAgICAgICAgPHBob3Rvc2hvcDpJQ0NQcm9maWxlPnNSR0IgSUVDNjE5NjYtMi4xPC9waG90b3Nob3A6SUNDUHJvZmlsZT4KICAgICAgICAgPHBob3Rvc2hvcDpDb2xvck1vZGU+MzwvcGhvdG9zaG9wOkNvbG9yTW9kZT4KICAgICAgICAgPGV4aWY6UGl4ZWxYRGltZW5zaW9uPjU5NDwvZXhpZjpQaXhlbFhEaW1lbnNpb24+CiAgICAgICAgIDxleGlmOkNvbG9yU3BhY2U+MTwvZXhpZjpDb2xvclNwYWNlPgogICAgICAgICA8ZXhpZjpQaXhlbFlEaW1lbnNpb24+MzAyPC9leGlmOlBpeGVsWURpbWVuc2lvbj4KICAgICAgICAgPGRjOmZvcm1hdD5pbWFnZS9wbmc8L2RjOmZvcm1hdD4KICAgICAgICAgPHhtcDpNZXRhZGF0YURhdGU+MjAxNy0wMy0yMlQxNjo0Njo1MyswODowMDwveG1wOk1ldGFkYXRhRGF0ZT4KICAgICAgICAgPHhtcDpDcmVhdGVEYXRlPjIwMTctMDMtMjFUMTA6MDQ6MDQrMDg6MDA8L3htcDpDcmVhdGVEYXRlPgogICAgICAgICA8eG1wOk1vZGlmeURhdGU+MjAxNy0wMy0yMlQxNjo0Njo1MyswODowMDwveG1wOk1vZGlmeURhdGU+CiAgICAgICAgIDx4bXA6Q3JlYXRvclRvb2w+QWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKE1hY2ludG9zaCk8L3htcDpDcmVhdG9yVG9vbD4KICAgICAgICAgPHhtcE1NOkhpc3Rvcnk+CiAgICAgICAgICAgIDxyZGY6U2VxPgogICAgICAgICAgICAgICA8cmRmOmxpIHJkZjpwYXJzZVR5cGU9IlJlc291cmNlIj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OnNvZnR3YXJlQWdlbnQ+QWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKFdpbmRvd3MpPC9zdEV2dDpzb2Z0d2FyZUFnZW50PgogICAgICAgICAgICAgICAgICA8c3RFdnQ6d2hlbj4yMDE3LTAzLTIxVDEwOjA0OjA0KzA4OjAwPC9zdEV2dDp3aGVuPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6aW5zdGFuY2VJRD54bXAuaWlkOmE0ODFlNjE2LWI3MTgtNzM0YS1hMjQ2LWU0Y2ExZDdjZmQ0Yjwvc3RFdnQ6aW5zdGFuY2VJRD4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OmFjdGlvbj5jcmVhdGVkPC9zdEV2dDphY3Rpb24+CiAgICAgICAgICAgICAgIDwvcmRmOmxpPgogICAgICAgICAgICAgICA8cmRmOmxpIHJkZjpwYXJzZVR5cGU9IlJlc291cmNlIj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OnNvZnR3YXJlQWdlbnQ+QWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKFdpbmRvd3MpPC9zdEV2dDpzb2Z0d2FyZUFnZW50PgogICAgICAgICAgICAgICAgICA8c3RFdnQ6Y2hhbmdlZD4vPC9zdEV2dDpjaGFuZ2VkPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6d2hlbj4yMDE3LTAzLTIxVDEwOjA0OjA0KzA4OjAwPC9zdEV2dDp3aGVuPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6aW5zdGFuY2VJRD54bXAuaWlkOmRkMjBhZGQ4LTllMGUtMzg0OS05MjAxLTk5OTQ3Nzg0ZjQyNDwvc3RFdnQ6aW5zdGFuY2VJRD4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OmFjdGlvbj5zYXZlZDwvc3RFdnQ6YWN0aW9uPgogICAgICAgICAgICAgICA8L3JkZjpsaT4KICAgICAgICAgICAgICAgPHJkZjpsaSByZGY6cGFyc2VUeXBlPSJSZXNvdXJjZSI+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDpzb2Z0d2FyZUFnZW50PkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE3IChNYWNpbnRvc2gpPC9zdEV2dDpzb2Z0d2FyZUFnZW50PgogICAgICAgICAgICAgICAgICA8c3RFdnQ6Y2hhbmdlZD4vPC9zdEV2dDpjaGFuZ2VkPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6d2hlbj4yMDE3LTAzLTIyVDE2OjQ2OjUzKzA4OjAwPC9zdEV2dDp3aGVuPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6aW5zdGFuY2VJRD54bXAuaWlkOjdiMjJkZjVjLWE0ZjAtNDlmZi1iYWM4LWRlYjllMGE0N2ZjYjwvc3RFdnQ6aW5zdGFuY2VJRD4KICAg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">
          </a>提供 CDN 服务
        </p>
        <p>
          © <span itemprop="copyrightYear">2018</span> J.Rucker. 由
          <a href="https://hexo.io/" target="_blank" class="external">Hexo</a> 驱动. Theme By <a
          href="https://github.com/JieRucker" target="_blank" class="external">Sagiri</a> v0.0.2.
        </p>
        <p>Made by <span class="author">JRucker</span></p></div>
    </footer>

    <div class="back-to-top" @click="slideUp">
      <i class="fa fa-arrow-up"></i>
    </div>

    <canvas id="evanyou"></canvas>

    <div id="aplayer-fixed" class="aplayer-fixed"></div>

    <j-search></j-search>
  </div>
</template>
<script>
  import {mapState, mapMutations} from 'vuex';
  import '@/libs/lib-flexible/flexible';
  import evanyou from '@/libs/canvas/evanyou';
  import SmoothScroll from 'smooth-scroll';
  import '@/assets/public/animate.css';
  import '@/libs/aplayer/APlayer.min.css';
  import '@/libs/aplayer/APlayer.min.js';
  import jSearch from '@/components/j-search/j-search';

  export default {
    components: {
      jSearch
    },
    data() {
      return {
        headerMask: false,
        CONFIG: {
          favicon: {
            hidden: "https://jrucker.cn/images/failure.ico",
            hide_text: "JRucker 博客！",
            narmal: "https://jrucker.cn/images/favicon.ico",
            show_text: "JRucker 博客！",
            visibilitychange: true
          }
        }
      };
    },
    created() {
      this.watchVisibilityChange();
    },
    mounted() {
      this.paintWave()();
      let wave = this.throttle(this.paintWave(), 60);
      const resizeEvent = 'orientationchange' in window ? 'orientationchange' : 'resize';
      window.addEventListener(resizeEvent, wave, false); // 监听窗口resize事件，重绘波浪

      document.onclick = () => evanyou.render();
      document.ontouchstart = () => evanyou.render();
      evanyou.render();

      /*判断位置控制 返回顶部的显隐*/
      window.addEventListener('scroll', this.listenScroll, false);

      this.getAudio()
    },
    methods: {
      ...mapMutations(['handleSearch']),
      async getAudio() {
        let res = await this.$api.mainInterface.getAudioList();
        let {status, data} = res;
        const apFixed = new APlayer({
          element: document.getElementById('aplayer-fixed'),
          mutex: true,
          theme: '#97dffd',
          order: 'random',
          lrcType: 3,
          fixed: true,
        });

        apFixed.lrc.hide();

        if (status === 200) {
          apFixed.list.add(data);
        }
      },
      slideUp() {
        let scroll = new SmoothScroll();
        let anchor = document.querySelector('#app');
        scroll.animateScroll(anchor);
      },
      listenScroll() {
        this.headerMask = this.getScrollTop() > 550;
        document.querySelector('.back-to-top').style.top = this.getScrollTop() > 610 ? 0 : -900 + 'px';
      },
      getScrollTop() {
        let scrollTop = 0;
        if (document.documentElement && document.documentElement.scrollTop) {
          scrollTop = document.documentElement.scrollTop;
        } else if (document.body) {
          scrollTop = document.body.scrollTop;
        }
        return scrollTop;
      },
      /*监控title变化*/
      watchVisibilityChange() {
        let OriginTitile = document.title;
        let titleTime;
        document.addEventListener('visibilitychange', () => {
          if (document.hidden) {
            document.querySelector('[rel="icon"]').setAttribute('href', this.CONFIG.favicon.hidden);
            document.title = this.CONFIG.favicon.hide_text;
            clearTimeout(titleTime);
          }
          else {
            document.querySelector('[rel="icon"]').setAttribute('href', this.CONFIG.favicon.narmal);
            document.title = this.CONFIG.favicon.show_text + OriginTitile;
            titleTime = setTimeout(function () {
              document.title = OriginTitile;
            }, 2000);
          }
        });
      },
      // 函数节流
      throttle(fn, delay) {
        let last = 0, timer = null;
        return function () {
          let context = this, args = arguments;
          let now = new Date();
          if (now - last >= delay) {
            last = new Date();
            fn.apply(context, args);
          } else {
            clearTimeout(timer);
            timer = setTimeout(() => {
              last = new Date();
              fn.apply(context, args)
            }, delay)
          }
        }
      },
      /*绘制波浪*/
      paintWave() {
        let count = 0, animateFrame;
        return () => {
          const loop = () => {
            cancelAnimationFrame(animateFrame);
            count = 0;
            const canvas = document.querySelector("#wave"),
              width = canvas.width = document.documentElement.clientWidth,
              height = canvas.height = 150,
              offset = [60, 40],  // 波浪偏移距离
              waves = ["rgba(239,239,239,1)"], // 波浪颜色
              context = canvas.getContext('2d');

            (function paint() {
              context.clearRect(0, 0, width, height);
              count++;
              for (let i = 0; i < waves.length; i++) {
                const startY = height * 4 / 5 + offset[i] * Math.sin(Math.PI * count / 120 + Math.PI * i / 2) / 2,
                  cpx1 = width / 3,
                  cpy1 = height * 4 / 5 + offset[i] * Math.sin(Math.PI * count / 120 + Math.PI * i / 2 - Math.PI / 2),
                  cpx2 = width * 2 / 3,
                  cpy2 = height * 4 / 5 + offset[i] * Math.sin(Math.PI * count / 120 + Math.PI * i / 2 - 3 / 2 * Math.PI),
                  endY = height * 4 / 5 + offset[i] * Math.sin(Math.PI * count / 120 + Math.PI * i / 2) / 2;
                context.save();
                context.beginPath();
                context.moveTo(0, startY);
                context.bezierCurveTo(cpx1, cpy1, cpx2, cpy2, width, endY);
                context.lineTo(width, height);
                context.lineTo(0, height);
                context.lineTo(0, 0);
                context.fillStyle = waves[i];
                context.closePath();
                context.fill();
                context.restore();
              }
              animateFrame = requestAnimationFrame(paint)
            }());
          };

          animateFrame = requestAnimationFrame(loop);
        }
      },
    }
  };
</script>
