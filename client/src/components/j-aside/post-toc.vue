<style lang="scss" scoped>
  .post-toc {
    padding-left: 10px;
    text-align: left;
    font-size: 14px;
    .item {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      line-height: 1.8;
      a {
        color: #666;
        &:hover {
          color: #333;
        }
      }
    }
  }
</style>

<template>
  <div class="post-toc">
    <ol class="nav">
      <li class="item" v-for="(item,index) in toc_list">
        <a class="link" :href="item.href">
          <span class="number">{{index + 1}}.</span>
          <span class="text">{{item.value}}</span>
        </a>
      </li>
    </ol>
  </div>
</template>

<script>
  export default {
    name: "post-toc",
    data() {
      return {
        toc_list: [
          {
            value: '前言',
            href: '#1'
          },
          {
            value: '盘点那些难以读懂的命名',
            href: '#2'
          }
        ]
      }
    }
  }
</script>
