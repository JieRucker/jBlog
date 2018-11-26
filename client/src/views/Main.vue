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

  .back-top {
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

  @media (max-width: 991px) {
    .main-inner .sidebar {
      display: none !important;
    }

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
    .back-to-top {
      display: none;
    }
  }
</style>

<style lang="scss">
  @import "../assets/public/markdown.css";
  .spin-icon-loading {
    animation: ani-demo-spin 1s linear infinite;
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
      <div v-html="compiledMarkdown" class="article-content" style="    width: 700px;
    background-color: #fff;
    padding: 15px;
    margin: 0 auto;"></div>
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

    <div class="back-top" @click="slideUp">
      <Icon type="chevron-up" class="chevron-up"></Icon>
    </div>

    <canvas id="evanyou"></canvas>

    <div id="aplayer-fixed" class="aplayer-fixed"></div>

    <j-search></j-search>
  </div>
</template>
<script>
  import {mapState, mapMutations} from 'vuex';
  // import '@/libs/lib-flexible/flexible';
  import evanyou from '@/libs/canvas/evanyou';
  import SmoothScroll from 'smooth-scroll';
  import '@/assets/public/animate.css';
  import '@/libs/aplayer/APlayer.min.css';
  import '@/libs/aplayer/APlayer.min.js';
  import jSearch from '@/components/j-search/j-search';

  import Vue from 'vue';
  // import hljs from 'highlight.js/lib/highlight';
  // import 'highlight.js/styles/atom-one-dark.css';
  // import 'highlight.js/styles/github.css';
  // import 'highlight.js/styles/googlecode.css';

  let marked = require('marked');
  marked.setOptions({
    renderer: new marked.Renderer(),
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    sanitize: false,
    smartLists: true,
    smartypants: false
  });



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
        },
        markdown: '<hr /> <h2><a id="link_null title_Vuewap description_vuewap_vuevuevuex__API_ keywords_VuejsJavaScriptVuex author_null date_20170423T074856539Z publisher_ stats_paragraph105_sentences192_words1199_1"></a>link: null<br /> title: Vue全家桶实现还原豆瓣电影wap版<br /> description: 用vue全家桶仿写豆瓣电影wap版。 最近在公司项目中尝试使用vue，但奈何自己初学水平有限，上了vue没有上vuex，开发过程特别难受。 于是玩一玩本项目，算是对相关技术更加熟悉了。 原计划仿写完所有页面，碍于豆瓣的接口API有限，实现页面也有限。 由于公<br /> keywords: Vue.js,JavaScript,前端,Vuex<br /> author: null<br /> date: 2017-04-23T07:48:56.539Z<br /> publisher: 掘金<br /> stats: paragraph=105 sentences=192, words=1199</h2> <p>用vue全家桶仿写豆瓣电影wap版。</p> <p>最近在公司项目中尝试使用vue，但奈何自己初学水平有限，上了vue没有上vuex，开发过程特别难受。</p> <p>于是玩一玩本项目，算是对相关技术更加熟悉了。</p> <p>原计划仿写完所有页面，碍于豆瓣的接口API有限，实现页面也有限。</p> <p>由于公开的<a href="https://link.juejin.im?target=https%3A%2F%2Fdevelopers.douban.com%2Fwiki%2F%3Ftitle%3Dmovie_v2%23subject" target="_blank">豆瓣接口</a>具有访问次数限制，克隆到本地体验效果更加！</p> <p>web端访问已设置宽度适配。</p> <p>进入GitHub查看<a href="https://link.juejin.im?target=https%3A%2F%2Fgithub.com%2Fxingbofeng%2Fdouban-movie" target="_blank">本项目源码</a></p> <p>欢迎 <code>issue</code>， <code>pr</code>， <code>star</code> or <code>follow</code>！我将继续开源更多有趣的项目！</p> <p>推荐一些之前写的新手入门项目</p> <ul> <li><a href="https://link.juejin.im?target=https%3A%2F%2Fgithub.com%2Fxingbofeng%2Fwx-audio" target="_blank">wx-audio(微信小程序：音乐播放器)</a></li> <li><a href="https://link.juejin.im?target=https%3A%2F%2Fgithub.com%2Fxingbofeng%2FpaintCanvas" target="_blank">paintCanvas(vue实现的你画我猜)</a></li> <li><a href="https://link.juejin.im?target=https%3A%2F%2Fgithub.com%2Fxingbofeng%2Fcss-grid-flex" target="_blank">css-grid-flex(关于css的grid布局和flex布局的入门心得)</a></li> </ul> <h2><a id="_32"></a>在线版</h2> <p><a href="https://link.juejin.im?target=http%3A%2F%2Fwww.angryzhangzhe.cn%3A3000%2F" target="_blank">点击进入</a></p> <h2><a id="_36"></a>部分效果截图</h2> <h2><a id="_38"></a>工具&amp;技能</h2> <ul> <li><code>vue</code> + <code>vuex</code>+ <code>vue-router</code>全家桶</li> <li><code>webpack</code> + <code>webpack-dev-server</code> + <code>http-proxy-middleware</code>进行本地开发环境http请求转发，实现跨域请求</li> <li>线上使用 <code>express</code>的 <code>http-proxy-middleware</code>实现请求转发</li> <li><code>iView</code>一款vue的组件库</li> <li><code>vue-lazyload</code>实现图片懒加载</li> <li><code>rem</code> + <code>flex</code> + <code>grid</code>实现移动端适配</li> <li><code>http-proxy-middleware</code> 一个http代理的中间件，进行http请求转发，实现跨域请求</li> <li><code>postman</code> 接口测试工具</li> </ul> <h2><a id="_49"></a>使用</h2> <pre><code class="lang-">git clone https: cd douban-movie npm install npm run dev&lt;span class=&quot;copy-code-btn&quot;&gt;&amp;#x590D;&amp;#x5236;&amp;#x4EE3;&amp;#x7801;&lt;/span&gt; </code></pre> <h2><a id="_61"></a>实现功能</h2> <h3><a id="_63"></a>首页</h3> <ul> <li>影院热映、即将上映、top250、北美票房榜</li> <li>电影条目可横向滚动</li> <li>预览电影评分</li> </ul> <h3><a id="_69"></a>搜索页</h3> <p>输入搜索关键词， <code>&amp;#x56DE;&amp;#x8F66;&amp;#x952E;</code>搜索，或者点击搜索按钮。</p> <ul> <li>搜索功能</li> <li>热门搜索词条的记录</li> </ul> <h3><a id="_76"></a>查看更多</h3> <ul> <li>预览电影评分</li> <li>滚动动态加载</li> <li>数据缓存入vuex</li> </ul> <h3><a id="_82"></a>电影详情</h3> <ul> <li>电影评分</li> <li>电影条目</li> <li>演员列表</li> <li>剧情简介</li> <li>数据缓存入vuex</li> </ul> <h3><a id="_90"></a>搜索结果页</h3> <ul> <li>翻页功能</li> <li>图片懒加载</li> <li>预览电影条目</li> <li>本地缓存浏览信息</li> </ul> <h2><a id="_97"></a>目录结构</h2> <pre><code class="lang-">| |&amp;#x2014;&amp;#x2014; build |&amp;#x2014;&amp;#x2014; config |&amp;#x2014;&amp;#x2014; server &amp;#x670D;&amp;#x52A1;&amp;#x7AEF; | |&amp;#x2014;&amp;#x2014; app.js &amp;#x670D;&amp;#x52A1;&amp;#x7AEF;&amp;#x542F;&amp;#x52A8;&amp;#x5165;&amp;#x53E3;&amp;#x6587;&amp;#x4EF6; | |&amp;#x2014;&amp;#x2014; &lt;span class=&quot;hljs-keyword&quot;&gt;static&lt;/span&gt; &amp;#x6253;&amp;#x5305;&amp;#x540E;&amp;#x7684;&amp;#x8D44;&amp;#x6E90;&amp;#x6587;&amp;#x4EF6; | |__ index.html &amp;#x7F51;&amp;#x9875;&amp;#x5165;&amp;#x53E3; | |&amp;#x2014;&amp;#x2014;src &amp;#x8D44;&amp;#x6E90;&amp;#x6587;&amp;#x4EF6; | |&amp;#x2014;&amp;#x2014; assets &amp;#x7EC4;&amp;#x4EF6;&amp;#x9759;&amp;#x6001;&amp;#x8D44;&amp;#x6E90;&amp;#x5E93; | |&amp;#x2014;&amp;#x2014; components &amp;#x7EC4;&amp;#x4EF6;&amp;#x5E93; | |&amp;#x2014;&amp;#x2014; router &amp;#x8DEF;&amp;#x7531;&amp;#x914D;&amp;#x7F6E; | |&amp;#x2014;&amp;#x2014; store vuex&amp;#x72B6;&amp;#x6001;&amp;#x7BA1;&amp;#x7406; | |&amp;#x2014;&amp;#x2014; App.vue douban-movieSPA | |__ main.js douban-movieSPA&amp;#x5165;&amp;#x53E3; | |__ &lt;span class=&quot;hljs-keyword&quot;&gt;static&lt;/span&gt; &amp;#x9759;&amp;#x6001;&amp;#x8D44;&amp;#x6E90;&amp;#x76EE;&amp;#x5F55;&lt;span class=&quot;copy-code-btn&quot;&gt;&amp;#x590D;&amp;#x5236;&amp;#x4EE3;&amp;#x7801;&lt;/span&gt; </code></pre> <h2><a id="_119"></a>开发心得</h2> <h3><a id="_121"></a>如何缓存数据</h3> <p>这个问题在我之前的的项目总结已经总结过。</p> <p>加入我们有电影条目A、B、C三个电影条目详情。进入A加载A，进入B加载B。此时也要把A缓存入vuex中。</p> <p>可以类似于下面的写法。</p> <pre><code class="lang-">{ [`${A.id}`]: A, ...store.state }&lt;span class=&quot;copy-code-btn&quot;&gt;&amp;#x590D;&amp;#x5236;&amp;#x4EE3;&amp;#x7801;&lt;/span&gt; </code></pre> <p>具体代码可见 <code>/src/router/routes</code>下列相关文件</p> <pre><code class="lang-">beforeEnter: &lt;span class=&quot;hljs-function&quot;&gt;(&lt;span class=&quot;hljs-params&quot;&gt;to, before, next&lt;/span&gt;) =&gt;&lt;/span&gt; { &lt;span class=&quot;hljs-keyword&quot;&gt;const&lt;/span&gt; currentMovieId = to.params.currentMovieId; &lt;span class=&quot;hljs-keyword&quot;&gt;if&lt;/span&gt; (store.state.moviedetail.currentMovie[&lt;span class=&quot;hljs-string&quot;&gt;`&lt;span class=&quot;hljs-subst&quot;&gt;${currentMovieId}&lt;/span&gt;`&lt;/span&gt;]) { store.commit(types.LOADING_FLAG, &lt;span class=&quot;hljs-literal&quot;&gt;false&lt;/span&gt;); next(); &lt;span class=&quot;hljs-keyword&quot;&gt;return&lt;/span&gt;; } store.commit(types.LOADING_FLAG, &lt;span class=&quot;hljs-literal&quot;&gt;true&lt;/span&gt;); currentMovie(currentMovieId).then(&lt;span class=&quot;hljs-function&quot;&gt;(&lt;span class=&quot;hljs-params&quot;&gt;currentMovieDetail&lt;/span&gt;) =&gt;&lt;/span&gt; { &lt;span class=&quot;hljs-keyword&quot;&gt;const&lt;/span&gt; id = currentMovieDetail.id; store.commit(types.CURRENT_MOVIE, { [&lt;span class=&quot;hljs-string&quot;&gt;`&lt;span class=&quot;hljs-subst&quot;&gt;${id}&lt;/span&gt;`&lt;/span&gt;]: currentMovieDetail, ...store.state.moviedetail.currentMovie, }); store.commit(types.LOADING_FLAG, &lt;span class=&quot;hljs-literal&quot;&gt;false&lt;/span&gt;); store.commit(types.NET_STATUS, &lt;span class=&quot;hljs-string&quot;&gt;\'\'&lt;/span&gt;); &lt;span class=&quot;hljs-built_in&quot;&gt;document&lt;/span&gt;.title = &lt;span class=&quot;hljs-string&quot;&gt;`&lt;span class=&quot;hljs-subst&quot;&gt;${currentMovieDetail.title}&lt;/span&gt; - &amp;#x7535;&amp;#x5F71; - &amp;#x8C46;&amp;#x74E3;`&lt;/span&gt;; }).catch(&lt;span class=&quot;hljs-function&quot;&gt;(&lt;span class=&quot;hljs-params&quot;&gt;error&lt;/span&gt;) =&gt;&lt;/span&gt; { &lt;span class=&quot;hljs-built_in&quot;&gt;document&lt;/span&gt;.title = &lt;span class=&quot;hljs-string&quot;&gt;\'&amp;#x51FA;&amp;#x9519;&amp;#x5566; Oops&amp;#x2026; - &amp;#x8C46;&amp;#x74E3;\'&lt;/span&gt;; store.commit(types.NET_STATUS, error); store.commit(types.LOADING_FLAG, &lt;span class=&quot;hljs-literal&quot;&gt;false&lt;/span&gt;); }); next(); }&lt;span class=&quot;copy-code-btn&quot;&gt;&amp;#x590D;&amp;#x5236;&amp;#x4EE3;&amp;#x7801;&lt;/span&gt; </code></pre> <h3><a id="_166"></a>翻页加载</h3> <p>其实这个在之前的React项目中也有做过，设置一个 <code>currentPage</code>的状态，然后根据这个状态来渲染页面。</p> <p>具体代码可见 <code>/src/containers/Tag.vue</code>。</p> <pre><code class="lang-">computed: { ...mapState({ tagData(state) { &lt;span class=&quot;hljs-keyword&quot;&gt;return&lt;/span&gt; state.tag.tagData[&lt;span class=&quot;hljs-string&quot;&gt;`&lt;span class=&quot;hljs-subst&quot;&gt;${&lt;span class=&quot;hljs-keyword&quot;&gt;this&lt;/span&gt;.$route.params.currentTagId}&lt;/span&gt;`&lt;/span&gt;]; }, }), subjects() { &lt;span class=&quot;hljs-keyword&quot;&gt;return&lt;/span&gt; &lt;span class=&quot;hljs-keyword&quot;&gt;this&lt;/span&gt;.tagData.subjects.slice( (&lt;span class=&quot;hljs-keyword&quot;&gt;this&lt;/span&gt;.currentPage - &lt;span class=&quot;hljs-number&quot;&gt;1&lt;/span&gt;) * &lt;span class=&quot;hljs-number&quot;&gt;10&lt;/span&gt;, &lt;span class=&quot;hljs-keyword&quot;&gt;this&lt;/span&gt;.currentPage * &lt;span class=&quot;hljs-number&quot;&gt;10&lt;/span&gt;, ); }, }, &lt;span class=&quot;hljs-attr&quot;&gt;methods&lt;/span&gt;: { ...mapActions([&lt;span class=&quot;hljs-string&quot;&gt;\'getMoreTagData\'&lt;/span&gt;]), changePage(flag) { &lt;span class=&quot;hljs-keyword&quot;&gt;const&lt;/span&gt; currentTagId = &lt;span class=&quot;hljs-keyword&quot;&gt;this&lt;/span&gt;.$route.params.currentTagId; &lt;span class=&quot;hljs-keyword&quot;&gt;const&lt;/span&gt; { start, count } = &lt;span class=&quot;hljs-keyword&quot;&gt;this&lt;/span&gt;.tagData; &lt;span class=&quot;hljs-keyword&quot;&gt;if&lt;/span&gt; ((&lt;span class=&quot;hljs-keyword&quot;&gt;this&lt;/span&gt;.currentPage === &lt;span class=&quot;hljs-number&quot;&gt;1&lt;/span&gt; &amp;&amp; flag === &lt;span class=&quot;hljs-string&quot;&gt;\'reduce\'&lt;/span&gt;) || (&lt;span class=&quot;hljs-keyword&quot;&gt;this&lt;/span&gt;.currentPage === &lt;span class=&quot;hljs-built_in&quot;&gt;Math&lt;/span&gt;.ceil(&lt;span class=&quot;hljs-keyword&quot;&gt;this&lt;/span&gt;.tagData.total / &lt;span class=&quot;hljs-number&quot;&gt;10&lt;/span&gt;) &amp;&amp; flag === &lt;span class=&quot;hljs-string&quot;&gt;\'add\'&lt;/span&gt;) ) { &lt;span class=&quot;hljs-keyword&quot;&gt;return&lt;/span&gt;; } &lt;span class=&quot;hljs-keyword&quot;&gt;if&lt;/span&gt; (flag === &lt;span class=&quot;hljs-string&quot;&gt;\'add\'&lt;/span&gt;) { &lt;span class=&quot;hljs-keyword&quot;&gt;this&lt;/span&gt;.currentPage = &lt;span class=&quot;hljs-keyword&quot;&gt;this&lt;/span&gt;.currentPage + &lt;span class=&quot;hljs-number&quot;&gt;1&lt;/span&gt;; &lt;span class=&quot;hljs-keyword&quot;&gt;this&lt;/span&gt;.getMoreTagData({ &lt;span class=&quot;hljs-attr&quot;&gt;tag&lt;/span&gt;: currentTagId, &lt;span class=&quot;hljs-attr&quot;&gt;count&lt;/span&gt;: &lt;span class=&quot;hljs-number&quot;&gt;10&lt;/span&gt;, &lt;span class=&quot;hljs-attr&quot;&gt;start&lt;/span&gt;: count + start, }); &lt;span class=&quot;hljs-keyword&quot;&gt;const&lt;/span&gt; doubanMovieCurrentPage = &lt;span class=&quot;hljs-built_in&quot;&gt;JSON&lt;/span&gt;.parse(&lt;span class=&quot;hljs-built_in&quot;&gt;window&lt;/span&gt;.localStorage.doubanMovieCurrentPage); &lt;span class=&quot;hljs-built_in&quot;&gt;window&lt;/span&gt;.localStorage.doubanMovieCurrentPage = &lt;span class=&quot;hljs-built_in&quot;&gt;JSON&lt;/span&gt;.stringify({ ...doubanMovieCurrentPage, [&lt;span class=&quot;hljs-string&quot;&gt;`&lt;span class=&quot;hljs-subst&quot;&gt;${currentTagId}&lt;/span&gt;`&lt;/span&gt;]: &lt;span class=&quot;hljs-keyword&quot;&gt;this&lt;/span&gt;.currentPage, }); } &lt;span class=&quot;hljs-keyword&quot;&gt;else&lt;/span&gt; { &lt;span class=&quot;hljs-keyword&quot;&gt;this&lt;/span&gt;.currentPage = &lt;span class=&quot;hljs-keyword&quot;&gt;this&lt;/span&gt;.currentPage - &lt;span class=&quot;hljs-number&quot;&gt;1&lt;/span&gt;; } &lt;span class=&quot;hljs-built_in&quot;&gt;window&lt;/span&gt;.scrollTo(&lt;span class=&quot;hljs-number&quot;&gt;0&lt;/span&gt;, &lt;span class=&quot;hljs-number&quot;&gt;0&lt;/span&gt;); },&lt;span class=&quot;copy-code-btn&quot;&gt;&amp;#x590D;&amp;#x5236;&amp;#x4EE3;&amp;#x7801;&lt;/span&gt; </code></pre> <h3><a id="_220"></a>滚动加载</h3> <p>类似于瀑布流布局的实现方式，当用户滚动到距离页面底部一定范围的时候去请求后端接口。</p> <p>具体代码可见 <code>src/containers/More.vue</code>。</p> <pre><code class="lang-">handleScroll() { &lt;span class=&quot;hljs-keyword&quot;&gt;const&lt;/span&gt; { start, count, total } = &lt;span class=&quot;hljs-keyword&quot;&gt;this&lt;/span&gt;.currentSeeMore; &lt;span class=&quot;hljs-keyword&quot;&gt;if&lt;/span&gt; (!&lt;span class=&quot;hljs-keyword&quot;&gt;this&lt;/span&gt;.requestFlag) { &lt;span class=&quot;hljs-keyword&quot;&gt;return&lt;/span&gt;; } &lt;span class=&quot;hljs-keyword&quot;&gt;let&lt;/span&gt; top = &lt;span class=&quot;hljs-built_in&quot;&gt;window&lt;/span&gt;.document.documentElement.scrollTop; &lt;span class=&quot;hljs-keyword&quot;&gt;if&lt;/span&gt; (top === &lt;span class=&quot;hljs-number&quot;&gt;0&lt;/span&gt;) { top = &lt;span class=&quot;hljs-built_in&quot;&gt;document&lt;/span&gt;.body.scrollTop; } &lt;span class=&quot;hljs-keyword&quot;&gt;const&lt;/span&gt; clientHeight = &lt;span class=&quot;hljs-built_in&quot;&gt;document&lt;/span&gt;.getElementById(&lt;span class=&quot;hljs-string&quot;&gt;\'app\'&lt;/span&gt;).clientHeight; &lt;span class=&quot;hljs-keyword&quot;&gt;const&lt;/span&gt; innerHeight = &lt;span class=&quot;hljs-built_in&quot;&gt;window&lt;/span&gt;.innerHeight; &lt;span class=&quot;hljs-keyword&quot;&gt;const&lt;/span&gt; proportion = top / (clientHeight - innerHeight); &lt;span class=&quot;hljs-keyword&quot;&gt;if&lt;/span&gt; (proportion &gt; &lt;span class=&quot;hljs-number&quot;&gt;0.6&lt;/span&gt; &amp;&amp; (start + count) &lt; total) { &lt;span class=&quot;hljs-keyword&quot;&gt;this&lt;/span&gt;.getMoreData({ count, &lt;span class=&quot;hljs-attr&quot;&gt;start&lt;/span&gt;: start + count, &lt;span class=&quot;hljs-attr&quot;&gt;title&lt;/span&gt;: &lt;span class=&quot;hljs-keyword&quot;&gt;this&lt;/span&gt;.$route.params.title, }); &lt;span class=&quot;hljs-keyword&quot;&gt;this&lt;/span&gt;.requestFlag = &lt;span class=&quot;hljs-literal&quot;&gt;false&lt;/span&gt;; } }&lt;span class=&quot;copy-code-btn&quot;&gt;&amp;#x590D;&amp;#x5236;&amp;#x4EE3;&amp;#x7801;&lt;/span&gt; </code></pre> <h3><a id="_253"></a>滚动节流</h3> <p>滚动节流主要作用是控制滚动事件的频率，设置一个 <code>flag</code>。未超过频率则直接在函数中返回。</p> <p>具体代码可见 <code>src/containers/More.vue</code></p> <pre><code class="lang-">scrolling() { &lt;span class=&quot;hljs-keyword&quot;&gt;if&lt;/span&gt; (&lt;span class=&quot;hljs-keyword&quot;&gt;this&lt;/span&gt;.scrollFlag) { &lt;span class=&quot;hljs-keyword&quot;&gt;return&lt;/span&gt;; } &lt;span class=&quot;hljs-keyword&quot;&gt;this&lt;/span&gt;.scrollFlag = &lt;span class=&quot;hljs-literal&quot;&gt;true&lt;/span&gt;; setTimeout(&lt;span class=&quot;hljs-function&quot;&gt;&lt;span class=&quot;hljs-params&quot;&gt;()&lt;/span&gt; =&gt;&lt;/span&gt; { &lt;span class=&quot;hljs-keyword&quot;&gt;this&lt;/span&gt;.handleScroll(); &lt;span class=&quot;hljs-keyword&quot;&gt;this&lt;/span&gt;.scrollFlag = &lt;span class=&quot;hljs-literal&quot;&gt;false&lt;/span&gt;; }, &lt;span class=&quot;hljs-number&quot;&gt;20&lt;/span&gt;); }&lt;span class=&quot;copy-code-btn&quot;&gt;&amp;#x590D;&amp;#x5236;&amp;#x4EE3;&amp;#x7801;&lt;/span&gt; </code></pre> <h3><a id="404_273"></a>404与加载页面的实现</h3> <p>这里主要是在 <code>vuex</code>中设定两个状态。根据这两个状态返回不同的页面。</p> <p>具体代码可见 <code>src/App.vue</code></p> <pre><code class="lang-">&lt;span class=&quot;hljs-tag&quot;&gt;&lt;&lt;span class=&quot;hljs-name&quot;&gt;template&lt;/span&gt;&gt;&lt;/span&gt; &lt;span class=&quot;hljs-tag&quot;&gt;&lt;&lt;span class=&quot;hljs-name&quot;&gt;div&lt;/span&gt; &lt;span class=&quot;hljs-attr&quot;&gt;id&lt;/span&gt;=&lt;span class=&quot;hljs-string&quot;&gt;&quot;app&quot;&lt;/span&gt;&gt;&lt;/span&gt; &lt;span class=&quot;hljs-tag&quot;&gt;&lt;&lt;span class=&quot;hljs-name&quot;&gt;net-error&lt;/span&gt; &lt;span class=&quot;hljs-attr&quot;&gt;v-if&lt;/span&gt;=&lt;span class=&quot;hljs-string&quot;&gt;&quot;netStatus&quot;&lt;/span&gt; &lt;span class=&quot;hljs-attr&quot;&gt;:netStatus&lt;/span&gt;=&lt;span class=&quot;hljs-string&quot;&gt;&quot;netStatus&quot;&lt;/span&gt; /&gt;&lt;/span&gt; &lt;span class=&quot;hljs-tag&quot;&gt;&lt;&lt;span class=&quot;hljs-name&quot;&gt;loading&lt;/span&gt; &lt;span class=&quot;hljs-attr&quot;&gt;v-else-if&lt;/span&gt;=&lt;span class=&quot;hljs-string&quot;&gt;&quot;!netStatus &amp;&amp; loadingFlag&quot;&lt;/span&gt; /&gt;&lt;/span&gt; &lt;span class=&quot;hljs-tag&quot;&gt;&lt;&lt;span class=&quot;hljs-name&quot;&gt;router-view&lt;/span&gt; &lt;span class=&quot;hljs-attr&quot;&gt;v-else&lt;/span&gt;&gt;&lt;/span&gt;&lt;span class=&quot;hljs-tag&quot;&gt;router-view&lt;/span&gt;&gt; &lt;span class=&quot;hljs-tag&quot;&gt;div&lt;/span&gt;&gt; &lt;span class=&quot;hljs-tag&quot;&gt;template&lt;/span&gt;&gt;&lt;span class=&quot;copy-code-btn&quot;&gt;&amp;#x590D;&amp;#x5236;&amp;#x4EE3;&amp;#x7801;&lt;/span&gt; </code></pre> <h3><a id="_294"></a>在路由钩子函数中改变状态</h3> <p>之前在公司做React项目的时候运用了<a href="https://link.juejin.im?target=https%3A%2F%2Fgithub.com%2Fkriasoft%2Funiversal-router" target="_blank">universal-router</a>，当时我们可以在进入路由的时候dispatch一个action改变状态，并且使用async/await函数实现异步。</p> <p>贴一段之前的React代码：</p> <pre><code class="lang-">&lt;span class=&quot;hljs-keyword&quot;&gt;async&lt;/span&gt; action({ store, params }) { &lt;span class=&quot;hljs-built_in&quot;&gt;console&lt;/span&gt;.log(&lt;span class=&quot;hljs-string&quot;&gt;&quot;chapter&quot;&lt;/span&gt;) &lt;span class=&quot;hljs-keyword&quot;&gt;const&lt;/span&gt; chapterInfos = store.getState().home.chapterInfos; &lt;span class=&quot;hljs-keyword&quot;&gt;if&lt;/span&gt; (&lt;span class=&quot;hljs-built_in&quot;&gt;Object&lt;/span&gt;.keys(chapterInfos).length === &lt;span class=&quot;hljs-number&quot;&gt;0&lt;/span&gt; || chapterInfos.subject.id !== &lt;span class=&quot;hljs-built_in&quot;&gt;parseInt&lt;/span&gt;(params.chapter, &lt;span class=&quot;hljs-number&quot;&gt;10&lt;/span&gt;)) { &lt;span class=&quot;hljs-keyword&quot;&gt;await&lt;/span&gt; store.dispatch(chapter(params.chapter)); } }&lt;span class=&quot;copy-code-btn&quot;&gt;&amp;#x590D;&amp;#x5236;&amp;#x4EE3;&amp;#x7801;&lt;/span&gt; </code></pre> <p>类似的，在vue中我们也可以这么做！</p> <p>具体代码可见 <code>/src/router/routes</code>下的相关代码</p> <pre><code class="lang-">beforeEnter: &lt;span class=&quot;hljs-function&quot;&gt;(&lt;span class=&quot;hljs-params&quot;&gt;to, before, next&lt;/span&gt;) =&gt;&lt;/span&gt; { &lt;span class=&quot;hljs-built_in&quot;&gt;document&lt;/span&gt;.title = &lt;span class=&quot;hljs-string&quot;&gt;\'&amp;#x7535;&amp;#x5F71; - &amp;#x8C46;&amp;#x74E3;\'&lt;/span&gt;; &lt;span class=&quot;hljs-keyword&quot;&gt;if&lt;/span&gt; (&lt;span class=&quot;hljs-built_in&quot;&gt;Object&lt;/span&gt;.keys(store.state.home.homeData).length !== &lt;span class=&quot;hljs-number&quot;&gt;0&lt;/span&gt;) { store.commit(types.LOADING_FLAG, &lt;span class=&quot;hljs-literal&quot;&gt;false&lt;/span&gt;); next(); &lt;span class=&quot;hljs-keyword&quot;&gt;return&lt;/span&gt;; } store.commit(types.LOADING_FLAG, &lt;span class=&quot;hljs-literal&quot;&gt;true&lt;/span&gt;); &lt;span class=&quot;hljs-built_in&quot;&gt;Promise&lt;/span&gt;.all([ hotMovie(&lt;span class=&quot;hljs-number&quot;&gt;8&lt;/span&gt;, &lt;span class=&quot;hljs-number&quot;&gt;0&lt;/span&gt;), commingSoon(&lt;span class=&quot;hljs-number&quot;&gt;8&lt;/span&gt;, &lt;span class=&quot;hljs-number&quot;&gt;0&lt;/span&gt;), top250(&lt;span class=&quot;hljs-number&quot;&gt;8&lt;/span&gt;, &lt;span class=&quot;hljs-number&quot;&gt;0&lt;/span&gt;), usBox(&lt;span class=&quot;hljs-number&quot;&gt;8&lt;/span&gt;, &lt;span class=&quot;hljs-number&quot;&gt;0&lt;/span&gt;), ]).then(&lt;span class=&quot;hljs-function&quot;&gt;(&lt;span class=&quot;hljs-params&quot;&gt;homeData&lt;/span&gt;) =&gt;&lt;/span&gt; { store.commit(types.HOME_DATA, homeData); store.commit(types.LOADING_FLAG, &lt;span class=&quot;hljs-literal&quot;&gt;false&lt;/span&gt;); store.commit(types.NET_STATUS, &lt;span class=&quot;hljs-string&quot;&gt;\'\'&lt;/span&gt;); }).catch(&lt;span class=&quot;hljs-function&quot;&gt;(&lt;span class=&quot;hljs-params&quot;&gt;error&lt;/span&gt;) =&gt;&lt;/span&gt; { &lt;span class=&quot;hljs-built_in&quot;&gt;document&lt;/span&gt;.title = &lt;span class=&quot;hljs-string&quot;&gt;\'&amp;#x51FA;&amp;#x9519;&amp;#x5566; Oops&amp;#x2026; - &amp;#x8C46;&amp;#x74E3;\'&lt;/span&gt;; store.commit(types.NET_STATUS, error); store.commit(types.LOADING_FLAG, &lt;span class=&quot;hljs-literal&quot;&gt;false&lt;/span&gt;); }); next(); }&lt;span class=&quot;copy-code-btn&quot;&gt;&amp;#x590D;&amp;#x5236;&amp;#x4EE3;&amp;#x7801;&lt;/span&gt; </code></pre> <h3><a id="Ajax_344"></a>Ajax的封装</h3> <p>其实我就是不想用Ajax操作的相关库罢了…</p> <pre><code class="lang-">&lt;span class=&quot;hljs-keyword&quot;&gt;import&lt;/span&gt; serverConfig &lt;span class=&quot;hljs-keyword&quot;&gt;from&lt;/span&gt; &lt;span class=&quot;hljs-string&quot;&gt;\'./serverConfig\'&lt;/span&gt;; &lt;span class=&quot;hljs-keyword&quot;&gt;const&lt;/span&gt; Ajax = &lt;span class=&quot;hljs-function&quot;&gt;&lt;span class=&quot;hljs-params&quot;&gt;url&lt;/span&gt; =&gt;&lt;/span&gt; &lt;span class=&quot;hljs-keyword&quot;&gt;new&lt;/span&gt; &lt;span class=&quot;hljs-built_in&quot;&gt;Promise&lt;/span&gt;(&lt;span class=&quot;hljs-function&quot;&gt;(&lt;span class=&quot;hljs-params&quot;&gt;resolve, reject&lt;/span&gt;) =&gt;&lt;/span&gt; { &lt;span class=&quot;hljs-keyword&quot;&gt;const&lt;/span&gt; xhr = &lt;span class=&quot;hljs-keyword&quot;&gt;new&lt;/span&gt; XMLHttpRequest(); xhr.open(&lt;span class=&quot;hljs-string&quot;&gt;\'GET\'&lt;/span&gt;, url); xhr.send(&lt;span class=&quot;hljs-literal&quot;&gt;null&lt;/span&gt;); xhr.onreadystatechange = &lt;span class=&quot;hljs-function&quot;&gt;&lt;span class=&quot;hljs-params&quot;&gt;()&lt;/span&gt; =&gt;&lt;/span&gt; { &lt;span class=&quot;hljs-keyword&quot;&gt;if&lt;/span&gt; (xhr.readyState === &lt;span class=&quot;hljs-number&quot;&gt;4&lt;/span&gt;) { &lt;span class=&quot;hljs-keyword&quot;&gt;if&lt;/span&gt; (xhr.status === &lt;span class=&quot;hljs-number&quot;&gt;200&lt;/span&gt;) { resolve(&lt;span class=&quot;hljs-built_in&quot;&gt;JSON&lt;/span&gt;.parse(xhr.responseText)); } &lt;span class=&quot;hljs-keyword&quot;&gt;else&lt;/span&gt; { reject(&lt;span class=&quot;hljs-string&quot;&gt;`&amp;#x9519;&amp;#x8BEF;: &lt;span class=&quot;hljs-subst&quot;&gt;${xhr.status}&lt;/span&gt;`&lt;/span&gt;); } } }; }); &lt;span class=&quot;hljs-keyword&quot;&gt;export&lt;/span&gt; &lt;span class=&quot;hljs-keyword&quot;&gt;const&lt;/span&gt; hotMovie = &lt;span class=&quot;hljs-function&quot;&gt;(&lt;span class=&quot;hljs-params&quot;&gt;count, start&lt;/span&gt;) =&gt;&lt;/span&gt; Ajax(&lt;span class=&quot;hljs-string&quot;&gt;`&lt;span class=&quot;hljs-subst&quot;&gt;${serverConfig}&lt;/span&gt;/v2/movie/in_theaters?count=&lt;span class=&quot;hljs-subst&quot;&gt;${count}&lt;/span&gt;&amp;start=&lt;span class=&quot;hljs-subst&quot;&gt;${start}&lt;/span&gt;`&lt;/span&gt;); &lt;span class=&quot;hljs-keyword&quot;&gt;export&lt;/span&gt; &lt;span class=&quot;hljs-keyword&quot;&gt;const&lt;/span&gt; commingSoon = &lt;span class=&quot;hljs-function&quot;&gt;(&lt;span class=&quot;hljs-params&quot;&gt;count, start&lt;/span&gt;) =&gt;&lt;/span&gt; Ajax(&lt;span class=&quot;hljs-string&quot;&gt;`&lt;span class=&quot;hljs-subst&quot;&gt;${serverConfig}&lt;/span&gt;/v2/movie/coming_soon?count=&lt;span class=&quot;hljs-subst&quot;&gt;${count}&lt;/span&gt;&amp;start=&lt;span class=&quot;hljs-subst&quot;&gt;${start}&lt;/span&gt;`&lt;/span&gt;); &lt;span class=&quot;hljs-keyword&quot;&gt;export&lt;/span&gt; &lt;span class=&quot;hljs-keyword&quot;&gt;const&lt;/span&gt; top250 = &lt;span class=&quot;hljs-function&quot;&gt;(&lt;span class=&quot;hljs-params&quot;&gt;count, start&lt;/span&gt;) =&gt;&lt;/span&gt; Ajax(&lt;span class=&quot;hljs-string&quot;&gt;`&lt;span class=&quot;hljs-subst&quot;&gt;${serverConfig}&lt;/span&gt;/v2/movie/top250?count=&lt;span class=&quot;hljs-subst&quot;&gt;${count}&lt;/span&gt;&amp;start=&lt;span class=&quot;hljs-subst&quot;&gt;${start}&lt;/span&gt;`&lt;/span&gt;); &lt;span class=&quot;hljs-keyword&quot;&gt;export&lt;/span&gt; &lt;span class=&quot;hljs-keyword&quot;&gt;const&lt;/span&gt; usBox = &lt;span class=&quot;hljs-function&quot;&gt;(&lt;span class=&quot;hljs-params&quot;&gt;count, start&lt;/span&gt;) =&gt;&lt;/span&gt; Ajax(&lt;span class=&quot;hljs-string&quot;&gt;`&lt;span class=&quot;hljs-subst&quot;&gt;${serverConfig}&lt;/span&gt;/v2/movie/us_box?count=&lt;span class=&quot;hljs-subst&quot;&gt;${count}&lt;/span&gt;&amp;start=&lt;span class=&quot;hljs-subst&quot;&gt;${start}&lt;/span&gt;`&lt;/span&gt;); &lt;span class=&quot;hljs-keyword&quot;&gt;export&lt;/span&gt; &lt;span class=&quot;hljs-keyword&quot;&gt;const&lt;/span&gt; currentMovie = &lt;span class=&quot;hljs-function&quot;&gt;&lt;span class=&quot;hljs-params&quot;&gt;currentMovieId&lt;/span&gt; =&gt;&lt;/span&gt; Ajax(&lt;span class=&quot;hljs-string&quot;&gt;`&lt;span class=&quot;hljs-subst&quot;&gt;${serverConfig}&lt;/span&gt;/v2/movie/subject/&lt;span class=&quot;hljs-subst&quot;&gt;${currentMovieId}&lt;/span&gt;`&lt;/span&gt;); &lt;span class=&quot;hljs-keyword&quot;&gt;export&lt;/span&gt; &lt;span class=&quot;hljs-keyword&quot;&gt;const&lt;/span&gt; getTagData = &lt;span class=&quot;hljs-function&quot;&gt;(&lt;span class=&quot;hljs-params&quot;&gt;tag, count, start&lt;/span&gt;) =&gt;&lt;/span&gt; Ajax(&lt;span class=&quot;hljs-string&quot;&gt;`&lt;span class=&quot;hljs-subst&quot;&gt;${serverConfig}&lt;/span&gt;/v2/movie/search?tag=&lt;span class=&quot;hljs-subst&quot;&gt;${tag}&lt;/span&gt;&amp;count=&lt;span class=&quot;hljs-subst&quot;&gt;${count}&lt;/span&gt;&amp;start=&lt;span class=&quot;hljs-subst&quot;&gt;${start}&lt;/span&gt;`&lt;/span&gt;);&lt;span class=&quot;copy-code-btn&quot;&gt;&amp;#x590D;&amp;#x5236;&amp;#x4EE3;&amp;#x7801;&lt;/span&gt; </code></pre> <h3><a id="_385"></a>代理的配置</h3> <p>为了解决浏览器跨域问题，需要在本地服务端配合实现请求转发。</p> <pre><code class="lang-">proxyTable: { &lt;span class=&quot;hljs-string&quot;&gt;\'/v2\'&lt;/span&gt;: { &lt;span class=&quot;hljs-attr&quot;&gt;target&lt;/span&gt;: &lt;span class=&quot;hljs-string&quot;&gt;\'http://api.douban.com\'&lt;/span&gt;, &lt;span class=&quot;hljs-attr&quot;&gt;changeOrigin&lt;/span&gt;: &lt;span class=&quot;hljs-literal&quot;&gt;true&lt;/span&gt;, &lt;span class=&quot;hljs-attr&quot;&gt;pathRewrite&lt;/span&gt;: { &lt;span class=&quot;hljs-string&quot;&gt;\'^/v2\'&lt;/span&gt;: &lt;span class=&quot;hljs-string&quot;&gt;\'/v2\'&lt;/span&gt; } } },&lt;span class=&quot;copy-code-btn&quot;&gt;&amp;#x590D;&amp;#x5236;&amp;#x4EE3;&amp;#x7801;&lt;/span&gt; </code></pre> <p>实际环境中，服务器端配置</p> <pre><code class="lang-">&lt;span class=&quot;hljs-keyword&quot;&gt;var&lt;/span&gt; express = &lt;span class=&quot;hljs-built_in&quot;&gt;require&lt;/span&gt;(&lt;span class=&quot;hljs-string&quot;&gt;\'express\'&lt;/span&gt;); &lt;span class=&quot;hljs-keyword&quot;&gt;var&lt;/span&gt; proxy = &lt;span class=&quot;hljs-built_in&quot;&gt;require&lt;/span&gt;(&lt;span class=&quot;hljs-string&quot;&gt;\'http-proxy-middleware\'&lt;/span&gt;); &lt;span class=&quot;hljs-keyword&quot;&gt;var&lt;/span&gt; app = express(); app.use(&lt;span class=&quot;hljs-string&quot;&gt;\'/static\'&lt;/span&gt;, express.static(&lt;span class=&quot;hljs-string&quot;&gt;\'static\'&lt;/span&gt;)); app.use(&lt;span class=&quot;hljs-string&quot;&gt;\'/v2\'&lt;/span&gt;, proxy({ &lt;span class=&quot;hljs-attr&quot;&gt;target&lt;/span&gt;: &lt;span class=&quot;hljs-string&quot;&gt;\'http://api.douban.com\'&lt;/span&gt;, &lt;span class=&quot;hljs-attr&quot;&gt;changeOrigin&lt;/span&gt;: &lt;span class=&quot;hljs-literal&quot;&gt;true&lt;/span&gt;, &lt;span class=&quot;hljs-attr&quot;&gt;headers&lt;/span&gt;: { &lt;span class=&quot;hljs-attr&quot;&gt;Referer&lt;/span&gt;: &lt;span class=&quot;hljs-string&quot;&gt;\'http://api.douban.com\'&lt;/span&gt; } } )); app.get(&lt;span class=&quot;hljs-string&quot;&gt;\'/\'&lt;/span&gt;, &lt;span class=&quot;hljs-function&quot;&gt;&lt;span class=&quot;hljs-keyword&quot;&gt;function&lt;/span&gt; (&lt;span class=&quot;hljs-params&quot;&gt;req, res&lt;/span&gt;) &lt;/span&gt;{ res.sendFile(__dirname + &lt;span class=&quot;hljs-string&quot;&gt;\'/index.html\'&lt;/span&gt;); }); app.listen(&lt;span class=&quot;hljs-number&quot;&gt;3000&lt;/span&gt;);&lt;span class=&quot;copy-code-btn&quot;&gt;&amp;#x590D;&amp;#x5236;&amp;#x4EE3;&amp;#x7801;&lt;/span&gt; </code></pre> <h3><a id="_424"></a>移动端的适配</h3> <p>我们使用 <code>rem</code>作单位，本项目中标准为1rem = 100px，适配750px设备。</p> <p>浏览器执行下列代码，改变根元素的 <code>font-size</code>，做到移动端的适配。</p> <pre><code class="lang-">&lt;span class=&quot;hljs-tag&quot;&gt;&lt;&lt;span class=&quot;hljs-name&quot;&gt;meta&lt;/span&gt; &lt;span class=&quot;hljs-attr&quot;&gt;name&lt;/span&gt;=&lt;span class=&quot;hljs-string&quot;&gt;&quot;viewport&quot;&lt;/span&gt; &lt;span class=&quot;hljs-attr&quot;&gt;content&lt;/span&gt;=&lt;span class=&quot;hljs-string&quot;&gt;&quot;width=device-width,initial-scale=1.0,maximum-scale=1.0,minimum-scale=1.0,user-scalable=no&quot;&lt;/span&gt;&gt;&lt;/span&gt;&lt;span class=&quot;copy-code-btn&quot;&gt;&amp;#x590D;&amp;#x5236;&amp;#x4EE3;&amp;#x7801;&lt;/span&gt; </code></pre> <pre><code class="lang-">(&lt;span class=&quot;hljs-function&quot;&gt;&lt;span class=&quot;hljs-keyword&quot;&gt;function&lt;/span&gt; (&lt;span class=&quot;hljs-params&quot;&gt;doc, win&lt;/span&gt;) &lt;/span&gt;{ &lt;span class=&quot;hljs-keyword&quot;&gt;var&lt;/span&gt; docEl = doc.documentElement, resizeEvt = &lt;span class=&quot;hljs-string&quot;&gt;\'orientationchange\'&lt;/span&gt; &lt;span class=&quot;hljs-keyword&quot;&gt;in&lt;/span&gt; &lt;span class=&quot;hljs-built_in&quot;&gt;window&lt;/span&gt; ? &lt;span class=&quot;hljs-string&quot;&gt;\'orientationchange\'&lt;/span&gt; : &lt;span class=&quot;hljs-string&quot;&gt;\'resize\'&lt;/span&gt;, recalc = &lt;span class=&quot;hljs-function&quot;&gt;&lt;span class=&quot;hljs-keyword&quot;&gt;function&lt;/span&gt; () &lt;/span&gt;{ &lt;span class=&quot;hljs-keyword&quot;&gt;var&lt;/span&gt; clientWidth = docEl.clientWidth &gt; &lt;span class=&quot;hljs-number&quot;&gt;750&lt;/span&gt; ? &lt;span class=&quot;hljs-number&quot;&gt;360&lt;/span&gt; : docEl.clientWidth ; &lt;span class=&quot;hljs-keyword&quot;&gt;if&lt;/span&gt; (!clientWidth) &lt;span class=&quot;hljs-keyword&quot;&gt;return&lt;/span&gt;; docEl.style.fontSize = clientWidth / &lt;span class=&quot;hljs-number&quot;&gt;750&lt;/span&gt; * &lt;span class=&quot;hljs-number&quot;&gt;100&lt;/span&gt; + &lt;span class=&quot;hljs-string&quot;&gt;\'px\'&lt;/span&gt;; }; &lt;span class=&quot;hljs-keyword&quot;&gt;if&lt;/span&gt; (!doc.addEventListener) &lt;span class=&quot;hljs-keyword&quot;&gt;return&lt;/span&gt;; doc.addEventListener(&lt;span class=&quot;hljs-string&quot;&gt;\'DOMContentLoaded\'&lt;/span&gt;, recalc, &lt;span class=&quot;hljs-literal&quot;&gt;false&lt;/span&gt;); &lt;span class=&quot;hljs-keyword&quot;&gt;if&lt;/span&gt; (docEl.clientWidth &gt; &lt;span class=&quot;hljs-number&quot;&gt;750&lt;/span&gt;) &lt;span class=&quot;hljs-keyword&quot;&gt;return&lt;/span&gt;; win.addEventListener(resizeEvt, recalc, &lt;span class=&quot;hljs-literal&quot;&gt;false&lt;/span&gt;); })(&lt;span class=&quot;hljs-built_in&quot;&gt;document&lt;/span&gt;, &lt;span class=&quot;hljs-built_in&quot;&gt;window&lt;/span&gt;);&lt;span class=&quot;copy-code-btn&quot;&gt;&amp;#x590D;&amp;#x5236;&amp;#x4EE3;&amp;#x7801;&lt;/span&gt; </code></pre> <p>文档借鉴自我的同学<a href="https://link.juejin.im?target=https%3A%2F%2Fgithub.com%2FShanaMaid" target="_blank">ShanaMaid</a>。</p> <h2><a id="_452"></a>支持</h2> <p>BUG提交请发送邮箱: me@xingbofeng.com</p> <p>欢迎 <code>issue</code>， <code>pr</code>， <code>star</code> or <code>follow</code>！我将继续开源更多有趣的项目!</p> <p>你的支持将有助于项目维护以及提高用户体验，感谢各位的支持！</p>\n' +
        'GitHub',

        markdown1:'<h1><a id="asdfadsas_0"></a>asdfadsas</h1><p><a href="dfsdfsdfsd" target="_blank">sadfas</a></p><blockquote><p>sdfsdf</p></blockquote><ul><li>a</li></ul><table><thead><tr><th>f</th><th>f</th><th>f</th></tr></thead><tbody><tr><td>f</td><td>f</td><td>f</td></tr></tbody></table>'
      };
    },
    computed: {
      ...mapState({
        isLoading: state => state.app.isLoading
      }),
      compiledMarkdown() {

        return marked(this.markdown1);
        // return marked(this.markdown, {sanitize: true})
      },

      /*markedToHtml () {
        return marked(this.markdown);
      },*/
    },
    watch: {
      isLoading(newVal, oldVal) {
        newVal ? this.$Spin.show({
          render: (h) => {
            return h('div', [
              h('Icon', {
                'class': 'spin-icon-loading',
                props: {
                  type: 'load-c',
                  size: 18
                },
                style: {
                  fontSize: '30px'
                }
              }),
              h('div', '正在加载...')
            ])
          }
        }) : this.$Spin.hide()
      }
    },
    created() {
      // this.setLoading(true);
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
      ...mapMutations(['handleSearch', 'setLoading']),
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
        let isPc = this.$Global.isPc();
        if (isPc) {
          this.headerMask = this.getScrollTop() > 550;
          document.querySelector('.back-to-top').style.top = this.getScrollTop() > 610 ? 0 : -900 + 'px';
        } else {
          this.headerMask = this.getScrollTop() > 100;
          document.querySelector('.back-top').style.display = this.getScrollTop() > 170 ? 'block' : 'none';
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
