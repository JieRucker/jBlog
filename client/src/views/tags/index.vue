<style lang="scss" scoped>
  .main-inner {
    margin-top: 40px;
    margin-left: auto;
    margin-right: auto;
    width: 1110px;
    .posts-tags {
      float: left;
      width: 772px;
      min-height: 700px;
      box-shadow: initial;
      border-radius: initial;
      background: #fff;
      padding: 40px;
      position: relative;
      overflow: hidden;
      .counter {
        text-align: center;
        color: #333;
        font-size: 20px;
        font-weight: 700;
      }
      .cloud-tags {
        margin-top: 20px;
        text-align: center;
        a {
          display: inline-block;
          margin: 10px;
          border-bottom: 1px solid #999;
          word-wrap: break-word;
        }
      }
    }
  }

  @media (max-width: 991px) {
    .main-inner {
      width: 100%;
      .posts-tags {
        width: 100%;
        min-height: auto;
        padding: 15px;
        .cloud-tags {
          text-align: left;
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
    <section class="posts-tags">
      <div class="counter">目前共计 11 个标签</div>
      <div class="cloud-tags">
        <a href="/tags/angularjs/" style="font-size: 28.5px; color: #212121">AngularJS</a>
        <a href="/tags/angularjs-tips/" style="font-size: 12px; color: #ccc">AngularJS Tips</a>
        <a href="/tags/ant/" style="font-size: 16.5px; color: #9d9d9d">Ant</a>
        <a href="/tags/apache/" style="font-size: 12px; color: #ccc">Apache</a>
        <a href="/tags/async/" style="font-size: 12px; color: #ccc">Async</a>
        <a href="/tags/atom/" style="font-size: 12px; color: #ccc">Atom</a>
        <a href="/tags/bilingualism/" style="font-size: 12px; color: #ccc">Bilingualism</a>
        <a href="/tags/bootstrap/" style="font-size: 12px; color: #ccc">Bootstrap</a>
        <a href="/tags/build-tool/" style="font-size: 12px; color: #ccc">Build tool</a>
        <a href="/tags/css/" style="font-size: 27px; color: #303030">CSS</a>
      </div>

    </section>
    <j-aside></j-aside>
  </div>
</template>

<script>
  import jAside from '@/components/j-aside/j-aside';

  export default {
    name: "index",
    components: {
      jAside
    }
  }
</script>
