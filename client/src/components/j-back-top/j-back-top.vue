<style lang="scss" scoped>
  .back-arrow-top {
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

  .back-chevron-top {
    display: none;
    position: fixed;
    bottom: 20px;
    right: 20px;
    background-color: rgba(0, 0, 0, .6);
    border-radius: 2px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, .2);
    transition: all .2s ease-in-out;
    z-index: 50;
    .chevron-up {
      color: #fff;
      font-size: 20px;
      padding: 8px 12px;
    }
  }

  @media (max-width: 991px) {
    .back-arrow-top {
      display: none;
    }
  }
</style>

<template>
  <div class="j-back-top">
    <div class="back-arrow-top" @click="slideUp" v-if="isPc">
      <i class="fa fa-arrow-up"></i>
    </div>
    <div class="back-chevron-top" @click="slideUp" v-if="!isPc">
      <Icon type="chevron-up" class="chevron-up"></Icon>
    </div>
  </div>
</template>

<script>
  import SmoothScroll from 'smooth-scroll';

  export default {
    name: "j-back-top",
    computed: {
      isPc() {
        return this.$Global.isPc();
      }
    },
    mounted() {
      this.init();
    },
    methods: {
      init() {
        /*判断位置控制 返回顶部的显隐*/
        window.addEventListener('scroll', this.listenScroll, false);
      },
      listenScroll() {
        if (this.isPc) {
          document.querySelector('.back-arrow-top').style.top = this.getScrollTop() > 610 ? 0 : -900 + 'px';
        } else {
          document.querySelector('.back-chevron-top').style.display = this.getScrollTop() > 170 ? 'block' : 'none';
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
      slideUp() {
        let scroll = new SmoothScroll();
        let anchor = document.querySelector('#app');
        scroll.animateScroll(anchor);
      },
    },
    destroyed() {
      window.removeEventListener('scroll', this.listenScroll)
    }
  }
</script>
