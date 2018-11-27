<style lang="scss" scoped>
  .search {
    z-index: 100;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    .input {
      width: 50%;
      background-color: transparent;
      color: #fff;
      text-align: center;
      font-size: 16px;
      padding: 10px;
      border-bottom: 1px solid #fff;
      border-top: 0;
      border-right: 0;
      border-left: 0;
      &:focus {
        outline: none;
      }
    }
  }

  @media screen and (max-width: 750px) {
    .input {
      width: 80% !important;
      font-size: 16px !important;
    }
  }
</style>

<template>
  <div class="search animated fadeIn" v-if="showSearch" @click="closeMask">
    <input v-focus class="input" placeholder="请输入关键字" v-model="search_key"
           @keyup.enter="search({search_key:search_key})"
           @click.stop="handleSearch(true)">
  </div>
</template>
<script>
  import {mapState, mapMutations, mapActions} from 'vuex'

  export default {
    data() {
      return {
        search_key: ''
      }
    },
    computed: {
      ...mapState({
        showSearch: state => state.app.showSearch
      })
    },

    directives: {
      focus: {
        inserted: function (el) {
          el.focus()
        }
      }
    },
    methods: {
      // ...mapActions(["searchArticles"]),
      ...mapMutations(['handleSearch']),
      search(params) {
        console.log(params);
        // this.$router.push({ path: '/articles', query: params});
        // this.searchArticles(params)
        this.handleSearch(false);
        Object.assign(this.$data, this.$options.data())
      },
      closeMask() {
        this.handleSearch(false);
        Object.assign(this.$data, this.$options.data())
      }
    }
  }
</script>
