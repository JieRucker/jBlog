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

  @media (max-width: 991px) {
    .header {
      .nav {
        .menu {
          display: flex;
          width: 100%;
          .item {
            flex: 1;
            -webkit-box-flex: 1;
            margin: 0;
            text-align: center;
          }
        }
      }
      .brand {
        height: 260px;
        .title {
          .animate {
            font-size: 7.8vw;
          }
        }
      }
    }
  }
</style>

<template>
  <header id="header" class="header" v-if="showHeader">
    <nav :class="[{'active':headerMask},'nav']">
      <ul id="menu" class="menu">
        <router-link tag="li" :to="{ path: '/home'}" class="item"><a href="javascript:;">首页</a></router-link>
        <router-link tag="li" :to="{ path: '/archives'}" class="item"><a href="javascript:;">归档</a></router-link>
        <router-link tag="li" :to="{ path: '/tags'}" class="item"><a href="javascript:;">标签</a></router-link>
        <router-link tag="li" :to="{ path: '/about'}" class="item"><a href="javascript:;">关于</a></router-link>
        <li class="item search">
          <Icon type="search" class="icon" @click="handleSearch(true)"></Icon>
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
</template>

<script>
  import {mapState, mapMutations} from 'vuex';

  export default {
    name: "j-header",
    data() {
      return {
        headerMask: false
      }
    },
    computed: {
      ...mapState({
        showHeader: state => state.app.showHeader
      })
    },
    mounted() {
      if (this.showHeader) this.init()
    },
    methods: {
      ...mapMutations(['handleSearch']),
      init() {
        this.paintWave()();
        let wave = this.throttle(this.paintWave(), 60);
        const resizeEvent = 'orientationchange' in window ? 'orientationchange' : 'resize';
        window.addEventListener(resizeEvent, wave, false); // 监听窗口resize事件，重绘波浪

        /*判断位置控制 返回顶部的显隐*/
        window.addEventListener('scroll', this.listenScroll, false);
      },
      listenScroll() {
        let isPc = this.$Global.isPc();
        if (isPc) {
          this.headerMask = this.getScrollTop() > 550;
        } else {
          this.headerMask = this.getScrollTop() > 100;
        }
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
      /*函数节流*/
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
      }
    },
    destroyed() {
      window.removeEventListener('scroll', this.listenScroll)
    }
  }
</script>
