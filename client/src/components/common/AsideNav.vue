<template>
  <div class="aside-nav">
    <ul v-show="show_list" class="list">
      <li>文章目录</li>
      <li v-for="item in  getArticleNav()"
          @click="scrollTo(item.id)"
          :style="{marginLeft: item.level * 8 + 'px'}">{{item.content}}
      </li>
    </ul>
    <ul @click="show_list=!show_list" class="nav-btn">
      <li></li>
      <li></li>
      <li></li>
    </ul>
  </div>
</template>

<script>
  import {mapActions, mapState, mapGetters, mapMutations} from 'vuex'
  import SmoothScroll from 'smooth-scroll'

  let moment = require("moment");
  let marked = require('marked');
  marked.setOptions({
    renderer: new marked.Renderer(),
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    sanitize: true,
    smartLists: true,
    smartypants: false
  });

  export default {
    data() {
      return {
        show_list: false
      }
    },
    computed: {
      ...mapState({
        article: state => state.app.article,
      })
    },
    methods: {
      ...mapGetters(['getArticleNav']),
      scrollTo(id) {
        let scroll = new SmoothScroll(),
          anchor = document.querySelector('#' + id);
        scroll.animateScroll(anchor);
      }
    }
  }
</script>

<style lang="scss" scoped>
  .aside-nav {
    z-index: 50;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    position: fixed;
    right: 0.2rem;
    bottom: 0.4rem;
    color: #3f86b5;
    .list {
      width: 0.8rem;
      min-width: 200px;
      max-height: 500px;
      margin-right: 10px;
      border-radius: 3px;
      box-shadow: 0 0 20px #ccc;
      overflow: auto;
      background-color: #fff;
      li {
        width: 80%;
        text-align: left;
        margin: 8px 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        position: relative;
        &::before {
          content: '';
          margin-right: 6px;
          display: inline-block;
          flex-shrink: 0;
          width: 4px;
          height: 4px;
          border-radius: 50%;
          border: 1px solid #444;
        }
        &:first-child {
          font-size: 110%;
          width: 100%;
          text-align: center;
          color: #666;
          padding-bottom: 4px;
          border-bottom: 1px solid #eee;
          &::before {
            display: none;
          }
        }
      }
    }
    .nav-btn {
      width: 0.15rem;
      height: 0.15rem;
      min-height: 30px;
      min-width: 30px;
      border-radius: 50%;
      background-color: #3f86b5;
      z-index: 50;
      flex-shrink: 0;
      float: right;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      &:hover {
        opacity: 0.8;
      }
      li {
        width: 45%;
        height: 3px;
        background-color: #fff;
        border-radius: 1.5px;
        margin: 1.5px;
      }
    }
  }

  @media screen and (max-width: 900px) {
    .aside-nav {
      bottom: 0.6rem;
      .nav-btn li {
        height: 2px !important;
      }
    }
  }

  @media screen and (max-width: 440px) {
    .aside-nav {
      bottom: 0.8rem;
    }
  }
</style>
