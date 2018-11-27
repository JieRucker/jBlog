<style lang="scss" scoped>
  .sidebar {
    float: right;
    background: #fff;
    border-radius: 5px;
    width: 315px;
    padding: 20px;
  }
</style>

<style lang="scss">
  .sidebar {
    .tabs {
      .ivu-tabs-bar {
        margin: 0 40px 16px 40px;
        border-bottom: 0;
      }
      .ivu-tabs-nav {
        :last-child {
          margin-right: 0;
        }
      }
    }
  }
</style>

<template>
  <aside id="sidebar" class="sidebar animated fadeIn">
    <Tabs class="tabs" v-model="current_tab" @on-click="onClick" :animated="true" v-if="showTabs">
      <TabPane :label="item.value" v-for="(item,index) in tab_list" :key="index">
        <component :is="current_page"></component>
      </TabPane>
    </Tabs>
    <component :is="current_page" v-if="!showTabs"></component>
  </aside>
</template>

<script>
  import postToc from './post-toc';
  import siteOverview from './site-overview';

  export default {
    name: "j-aside",
    components: {
      postToc,
      siteOverview
    },
    props: {
      currentPage: {
        type: String,
        default: 'siteOverview'
      },
      currentTab: {
        type: Number,
        default: 0
      },
      showTabs: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        current_tab: this.currentTab,
        current_page: this.currentPage,
        tab_list: [
          {
            value: '文章目录'
          },
          {
            value: '站点概览'
          }
        ]
      }
    },
    methods: {
      onClick(name) {
        let actions = () => {
          const functionA = () => {
            this.current_page = 'postToc'
          };
          const functionB = () => {
            this.current_page = 'siteOverview'
          };
          return new Map([
            [0, functionA],
            [1, functionB]
          ])
        };

        let action = [...actions()].filter(([key]) => key === name);
        action.map(([key, value]) => value.call(this))
      }
    }
  }
</script>
