<template>
  <div class="header">
    <div class="shadow"></div>
    <div class="catolog" :class="{nav: isShow}">
      <ul>
        <router-link to='/home' tag="li" @click.native="set_search(false)">Home</router-link>
        <router-link to='/archives' tag="li" @click.native="set_search(false)">Archives</router-link>
        <router-link to='/tags' tag="li" @click.native="set_search(false)">Tags</router-link>
        <router-link to='/aboutMe' tag="li" @click.native="set_search(false)">About</router-link>
        <li><img @click='set_search()' id="search" src="../assets/images/icon/search.png"></li>
      </ul>
    </div>
    <span class="title" :class="headLine.animate">{{headLine.text}}</span>
    <canvas id="wave">你的浏览器好像不支持canvas(⊙o⊙)哦，换个浏览器试试吧~</canvas>
  </div>
</template>

<script>
  import {mapState, mapMutations} from 'vuex'
  import util from '@/libs/util.js'

  export default {
    data() {
      return {
        key: '',
        isShow: false
      }
    },

    computed: {
      ...mapState({
        headLine: state => state.app.headLine,
      })
    },

    mounted() {
      this.paintWave()();
      let wave = util.throttle(this.paintWave(), 60);
      window.addEventListener('scroll', this.handleShow, false); // 监听滚动处理导航栏是否出现
      const resizeEvent = 'orientationchange' in window ? 'orientationchange' : 'resize';
      window.addEventListener(resizeEvent, wave, false); // 监听窗口resize事件，重绘波浪
    },

    beforeRouteLeave(to, from, next) {
      window.removeEventListener('scroll', this.paintWave);
      next()
    },

    methods: {
      ...mapMutations(['set_search']),
      search(params) {
        this.$router.push({path: '/articles', query: params});
      },
      handleShow() {
        if (document.querySelector("html").scrollTop > 300) {
          this.isShow = true;
        } else {
          this.isShow = false;
        }
      },
      paintWave() {    // 绘制波浪
        let count = 0, animateFrame;
        return function () {
          function loop() {
            cancelAnimationFrame(animateFrame);
            count = 0;
            const canvas = document.querySelector("#wave"),
              width = canvas.width = window.innerWidth,
              height = canvas.height = document.querySelector('.header').offsetHeight,

              offset = [60, 40],  // 波浪偏移距离
              waves = ["rgba(255,255,255,1)"], // 波浪颜色
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
                context.save()
                context.beginPath();
                context.moveTo(0, startY);
                context.bezierCurveTo(cpx1, cpy1, cpx2, cpy2, width, endY);
                context.lineTo(width, height);
                context.lineTo(0, height);
                context.lineTo(0, 0)
                context.fillStyle = waves[i];
                context.closePath();
                context.fill();
                context.restore();
              }
              animateFrame = requestAnimationFrame(paint)
            }())
          }

          animateFrame = requestAnimationFrame(loop);
        }
      },
    }

  }


</script>

<style lang="scss" scoped>
  .header {
    background-image: url('../assets/images/icon/bg.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-color: #000;
    height: 450px;
    display: block;
    width: 100%;
    background-position: center 0px;
    position: relative;
    overflow: hidden;
    margin-bottom: 20px;

  }

  .shadow {
    position: absolute;
    height: 100%;
    width: 100%;
    background-color: rgba(0, 0, 0, .3);
    z-index: 1;
    top: 0px;
    left: 0px;
  }

  #wave {
    z-index: 3;
    border: none;
    position: absolute;
    bottom: 0px;
    left: 0px;
  }

  .catolog {
    width: 100%;
    position: fixed;
    top: 0px;
    z-index: 40;
    height: 55px;
    line-height: 55px;
    display: flex;
    justify-content: flex-end;
    align-content: center;
    color: #fff;
    ul {
      list-style: none;
      display: flex;
      justify-content: space-around;
      margin-right: 0.4rem;
      padding-bottom: 0px;

      li {
        cursor: pointer;
        opacity: 0.8;
        margin-left: 25px;
        flex-grow: 0;
        padding-left: 10px;
        padding-right: 10px;
        font-weight: bold;
      }

      li:hover {
        color: #686868;
      }
    }
    #search {
      width: 18px;
      margin-top: 20px;
      &:hover {
        opacity: 0.6;
      }
    }
  }

  .nav {
    background-color: rgba(255, 255, 255, 0.8);
    box-shadow: 2px 2px 2px #999;
    color: #000;
    .router-link-active {
      color: #ccc !important;
    }
  }

  .router-link-active {
    color: #666 !important;
  }

  .title {
    position: relative;
    margin: auto;
    top: 40%;
    z-index: 3;
    display: inline-block;
    font-size: 0.11rem;
    padding: 10px 0px;
    color: rgba(250, 250, 250, .9);
  }

  @media screen and (max-width: 1000px) {
    .title {
      font-size: 0.2rem;
    }
  }

  @media screen and (max-width: 550px) {
    .header {
      background-size: auto 100%;
      height: 4rem;
    }

    .catolog {
      flex-direction: column !important;
      justify-content: center;
      align-items: center;
      ul {
        margin: 0px !important;
        width: 90%;
        justify-content: space-around;
        li {
          margin: 0px;
          padding: 0px;
        }
      }
      .search_box {
        margin-top: 30px;
        margin-right: 0px !important;
        #search:focus {
          width: 2.5rem !important;
        }
      }
    }
    .title {
      font-size: 0.3rem;
    }
  }

  //标题动画类
  .show1 {
    animation: show1 1000ms ease 0ms 1;
  }

  .show2 {
    animation: show2 500ms ease 0ms 1;
  }

  .show3 {
    animation: show3 800ms ease 0ms 1;
  }

  .show4 {
    animation: show4 800ms ease 0ms 1;
  }

  @keyframes show1 {
    0% {
      transform: translateX(100px);
      opacity: 0;
    }
    100% {
      transform: translateX(0);
      opacity: 1;
    }

  }

  @keyframes show2 {
    0% {
      transform: rotateZ(30deg)
    }
    40% {
      transform: rotateZ(-30deg)
    }
    80% {
      transform: rotateZ(10deg)
    }
    100% {
      transform: rotateZ(-10deg)
    }
  }

  @keyframes show3 {
    0% {
      transform: rotateX(0deg);
      font-size: 0;
    }
    70% {
      transform: rotateX(270deg);
      font-size: 0.15rem;
    }
    100% {
      transform: rotateX(360deg);
      font-size: 0.11rem;
    }
  }

  @keyframes show4 {
    0% {
      transform: rotateZ(0deg)
    }
    100% {
      transform: rotateZ(360deg)
    }
  }

</style>
