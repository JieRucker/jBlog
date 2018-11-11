<template>
  <div class="footer">
    <canvas id="foot-bg"></canvas>
    <ul>
      <li>蜀ICP备18002837号-2</li>
      <li>Copyright © 2017 wangfang, Powered by Vue
        <router-link to="/login" tag="span">站长登录</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
  import util from '@/libs/util.js'

  export default {
    mounted() {
      let footWave = util.throttle(this.paintFooter, 60);
      footWave();
      const resizeEvent = 'orientationchange' in window ? 'orientationchange' : 'resize';
      window.addEventListener(resizeEvent, footWave(), false)
    },
    methods: {
      paintFooter() {
        const canvas = document.querySelector("#foot-bg"),
          ctx = canvas.getContext('2d'),
          height = canvas.height = 250,
          offset = 40,
          width = canvas.width = window.innerWidth;
        ctx.beginPath();
        ctx.moveTo(0, 100);
        ctx.bezierCurveTo(width / 3, 4 * offset, width * 2 / 3, offset, width, 2 * offset);
        ctx.lineTo(width, height);
        ctx.lineTo(0, height);
        ctx.lineTo(0, 0)
        ctx.closePath();
        ctx.fillStyle = "#fcfcfc";
        ctx.fill();
      }
    }
  }
</script>

<style lang="scss" scoped>
  .footer {
    width: 100%;
    overflow: hidden;
    display: block;
    position: relative;
    margin-top: 30px;
    height: 200px;
    z-index: 6;
    #foot-bg {
      position: absolute;
      left: 0px;
      bottom: 0px;
    }
    ul {
      position: relative;
      top: 50%;
      transform: translateY(0, -50%);
      color: #999;
      li {
        margin-top: 10px;
        span {
          border-left: 1px solid #999;
          margin-left: 20px;
          padding-left: 5px;
          color: #acc0d7;
          cursor: pointer;
          font-weight: bold;

        }
        span:hover {

        }
      }
    }
  }

  @media screen and (max-width: 450px) {
    .footer {
      font-size: 12px;
    }
  }
</style>
