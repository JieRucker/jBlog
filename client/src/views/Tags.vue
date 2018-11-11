<template>
  <div class="wrap posts animated fadeIn">
    <p class="total">目前共计<span>{{ allTags.length }}</span>个标签</p>
    <div class="tags">
      <router-link v-for="item in allTags" class="tag" tag='span'
                   :class="randomSize()"
                   :to="{name: 'articles', query: {tag: item}}"
                   :key='item'
      >
        {{item}}
      </router-link>
    </div>
  </div>
</template>

<script>
  import {mapState, mapActions, mapGetters, mapMutations} from 'vuex';

  export default {
    created() {
      this.set_headLine({text: 'Tags', animate: 'show3'})
      this.getAllTags();
    },
    computed: {
      ...mapState({
        allTags: state => state.app.allTags
      })
    },

    methods: {
      ...mapActions(['getAllTags']),
      ...mapMutations(['set_headLine']),
      randomSize() {
        return "tag-" + Math.floor(1 + 6 * Math.random());
      }
    }
  }
</script>

<style lang="scss" scoped>
  .wrap {
    position: relative;
  }

  .total {
    margin-top: 40px;
    span {
      font-size: 25px;
      color: #acc0d7;
      margin: auto 8px;
    }
  }

  .tags {
    width: 50%;
    position: relative;
    margin: 40px auto;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    .tag {
      padding: 6px 0;
      margin: 20px;
      border-bottom: 1px solid #999;
      flex-shrink: 0;
      &:hover {
        color: #acc0d7 !important;
      }
    }
    .tag:nth-child(1) {
      font-size: 28px;
      color: #212121;
    }
    .tag-2 {
      font-size: 12px;
      color: #ccc;
    }
    .tag-3 {
      font-size: 12px;
      color: #ccc;
    }
    .tag-4 {
      font-size: 12px;
      color: #ccc;
    }
    .tag-5 {
      font-size: 12px;
      color: #ccc;
    }
    .tag-6 {
      font-size: 21px;
      color: #6f6f6f;
    }
    .tag-1 {
      font-size: 21px;
      color: #212121;
    }

    .tag-7 {
      font-size: 18px;
      color: #8e8e8e;
    }
  }
</style>
