<template>
  <div class="wrap posts animated fadeIn">
    <div class="year-articles" v-for="year in getYears()">
      <span class="year">{{year}}</span>
      <div class="item" v-for="(item, index) in getYearArticles(year)">
        <span class="date">{{item.date.substring(5)}}</span>
        <router-link :to="{ name: 'article', params:{aid: item._id} }" tag="span" class="title">
          {{item.title}}
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapActions, mapState, mapGetters, mapMutations} from 'vuex'

  export default {

    created() {
      this.set_headLine({text: 'Archives', animate: 'show2'})
      this.getArticles({tag: '全部'})
      this.getYears();
    },

    computed: {
      ...mapState({
        articles: state => state.app.articles,
      })
    },
    methods: {
      ...mapMutations(['set_headLine']),
      ...mapActions(['getArticles']),
      getYears() {
        const years = [].map.call(this.articles, (item) => {
          return item.date.substring(0, 4)
        })
        return [...new Set(years)];
      },
      getYearArticles(year) {
        return [].filter.call(this.articles, item => {
          if (item.date.match(eval('/' + year + '.+/'))) return true;
        })
      }
    },

  }
</script>
<style lang="scss" scoped>
  .wrap {
    width: 50%;
    margin: 50px auto;
    position: relative;
    display: flex;
    flex-direction: column;
    .year-articles {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      .item {
        display: flex;
        justify-content: flex-start;
        padding: 6px 0px;
        border-left: 1px solid #999;
        text-align: left;
        position: relative;
        transition: 300ms;
        &:hover {
          transform: translateX(5px);
          border-left: 3px solid #acc0d7;
          color: #acc0d7;
        }
        .date {
          padding: 0px 20px;
          white-space: nowrap;
        }
      }
    }
    .year {
      font-size: 29px;
      margin: 15px 0;
    }
  }

  @media screen and (max-width: 450px) {
    .wrap {
      width: 80%;
      margin: 0px auto;
      .item {
        flex-direction: column;
        align-items: flex-start;
        .date {
          font-size: 12px;
          padding: 1px 15px !important;
        }
        .title {
          padding: 1px 15px !important;
        }
      }
    }
  }

</style>
