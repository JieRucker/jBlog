<template>
  <!--<div id="main" class="app-main">
    <router-view></router-view>
  </div>-->

  <div id="app" class="wrap app">
    <router-view></router-view>
    <transition name="fade">
      <dialog-box></dialog-box>
    </transition>
    <div v-show="isShow" id="up" @click="slideUp()"></div>
    <div class="loading" v-if="isLoading">
      <loading><p calss="text" slot="text">正在加载......</p></loading>
    </div>
    <transition name="fade">
      <alert></alert>
    </transition>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import DialogBox from './components/common/DialogBox.vue'
  import Alert from './components/common/Alert.vue'
  import Loading from './components/common/Loading.vue'
  import SmoothScroll from 'smooth-scroll'

  export default {
    components: {
      DialogBox,
      Loading,
      Alert
    },
    data() {
      return {
        isShow: false
      }
    },
    computed: {
      ...mapState({
        isLoading: state => state.app.isLoading,
      })
    },
    mounted() {
      window.addEventListener('scroll', this.handleShow, false)
    },
    methods: {
      slideUp() {
        let scroll = new SmoothScroll();
        let anchor = document.querySelector('#app');
        scroll.animateScroll(anchor);
      },
      handleShow() {
        let scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
        if (scrollTop > 400) {
          this.isShow = true;
        } else {
          this.isShow = false;
        }
      }
    }
  };
</script>

<style lang="scss" scoped>
  #app {
    text-align: center;
    position: relative;
    width: 100%;
    height: 100%;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s
  }

  .fade-enter, .fade-leave-to {
    opacity: 0
  }

  #up {
    position: fixed;
    bottom: 0.2rem;
    right: 0.2rem;
    width: 0.15rem;
    height: 0.15rem;
    min-height: 30px;
    min-width: 30px;
    border-radius: 50%;
    background-color: #3f86b5;
    z-index: 50;
  }

  #up:hover {
    opacity: 0.8;
  }

  #up::before {
    content: '';
    position: absolute;
    top: 0px;
    bottom: 0px;
    left: 0px;
    right: 0px;
    margin: auto;
    width: 25%;
    height: 25%;
    border-top: 4px solid #fff;
    border-left: 4px solid #fff;
    border-radius: 4px;
    transform: rotate(45deg);
  }

  .loading {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    z-index: 55;
  }

  /*html, body {
    width: 100%;
    height: 100%;
    background: #f0f0f0;
    overflow: hidden;
  }

  .app-main {
    width: 100%;
    height: 100%;
  }*/
</style>
