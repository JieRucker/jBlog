<style lang="scss" scoped>
  @media (max-width: 991px) {
    .main-inner .sidebar {
      display: none !important;
    }
  }
</style>

<template>
  <div class="main-container">
    <j-header></j-header>
    <j-main></j-main>
    <j-footer></j-footer>
    <j-back-top></j-back-top>
    <j-search></j-search>
    <j-other></j-other>
    <j-loading></j-loading>
  </div>
</template>
<script>
  // import '@/libs/lib-flexible/flexible';
  import '@/assets/public/animate.css';
  import '@/libs/aplayer/APlayer.min.css';
  import '@/libs/aplayer/APlayer.min.js';
  import jHeader from '@/components/j-header/j-header';
  import jMain from '@/components/j-main/j-main';
  import jFooter from '@/components/j-footer/j-footer';
  import jSearch from '@/components/j-search/j-search';
  import jOther from '@/components/j-other/j-other';
  import jLoading from '@/components/j-loading/j-loading';
  import jBackTop from '@/components/j-back-top/j-back-top';

  // import Vue from 'vue';
  // import hljs from 'highlight.js/lib/highlight';
  // import 'highlight.js/styles/atom-one-dark.css';
  // import 'highlight.js/styles/github.css';
  // import 'highlight.js/styles/googlecode.css';

  /*Vue.directive('highlight', (el) => {
    let blocks = el.querySelectorAll('pre code');
    blocks.forEach((block) => {
      hljs.highlightBlock(block)
    })
  });*/

  /*marked.setOptions({
    highlight: function (code, lang, callback) {
      return hljs.highlightAuto(code).value;
    }
  });*/

  export default {
    components: {
      jHeader,
      jMain,
      jFooter,
      jSearch,
      jOther,
      jLoading,
      jBackTop
    },
    data() {
      return {
        CONFIG: {
          favicon: {
            hidden: "https://jrucker.cn/images/failure.ico",
            hide_text: "JRucker 博客！",
            narmal: "https://jrucker.cn/images/favicon.ico",
            show_text: "JRucker 博客！"
          }
        },
      };
    },

    created() {
      this.watchVisibleChange();
    },
    methods: {
      /*监控title变化*/
      watchVisibleChange() {
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
      }
    }
  };
</script>
