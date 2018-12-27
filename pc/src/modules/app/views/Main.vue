<style lang="scss">
  @import "./main.scss";
</style>
<template>
  <div class="main-container" :class="{'main-hide-text': shrink}">
    <div class="main-container__sidebar" :style="{width: shrink?'60px':'200px', overflow: shrink ? 'visible' : 'auto'}">
      <shrinkable-menu
        :shrink="shrink"
        :theme="menuTheme"
        :open-names="openedSubmenuArr"
        :menu-list="menuList">
        <div slot="top" class="main-container__logo">
                    <span class="main-container__logo--shrink" v-show="!shrink">
                        <!--<img src="../assets/images/logo/logo-min.png" key="max-logo"/>-->
                        <h3>J.Rucker的博客</h3>
                    </span>
          <span class="main-container__logo--shrink-min" v-show="shrink">
                        <!--<img v-show="shrink" src="../assets/images/logo/logo-min.png" key="min-logo"/>-->
                    </span>
        </div>
      </shrinkable-menu>
    </div>
    <div class="main-container__shrink" :style="{paddingLeft: shrink?'60px':'200px'}">
      <div class="main-container__header">
        <div class="navicon-con">
          <Button :style="{transform: 'rotateZ(' + (this.shrink ? '-90' : '0') + 'deg)'}" type="text"
                  @click="shrink = !shrink;">
            <Icon type="navicon" size="32"></Icon>
          </Button>
        </div>
        <div class="header-middle-con">
          <div class="main-container__breadcrumb">
            <breadcrumb-nav :currentPath="currentPath"></breadcrumb-nav>
          </div>
        </div>
        <div class="header-avator-con">
          <full-screen v-model="isFullScreen"></full-screen>
          <theme-switch></theme-switch>

          <div class="user-dropdown-menu-con">
            <Row type="flex" justify="end" align="middle" class="user-dropdown-innercon">
              <Dropdown transfer trigger="click">
                <a href="javascript:;">
                  <span class="main-user-name">{{getLoginName}}</span>
                  <Icon type="arrow-down-b"></Icon>
                </a>
                <DropdownMenu slot="list">
                  <DropdownItem name="loginout" @click.native="loginOut">退出登录</DropdownItem>
                </DropdownMenu>
              </Dropdown>
              <Avatar :src="getAvator" icon="person" style="background: #619fe7;margin-left: 10px;"></Avatar>
            </Row>
          </div>
        </div>
      </div>
    </div>
    <div class="main-container__single" :style="{left: shrink?'60px':'200px'}">
      <div class="main-container__single-page">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script>
  import Vue from 'vue';
  import shrinkableMenu from '@/components/shrinkable-menu/shrinkable-menu.vue';
  import breadcrumbNav from '@/components/breadcrumb/breadcrumb-nav.vue';
  import fullScreen from '@/components/fullscreen/fullscreen.vue';
  import themeSwitch from '@/components/theme-switch/theme-switch.vue';
  import util from '@/libs/util.js';

  import VueI18n from 'vue-i18n';

  Vue.use(VueI18n);

  export default {
    components: {
      shrinkableMenu,
      breadcrumbNav,
      fullScreen,
      themeSwitch
    },
    data() {
      return {
        shrink: false,
        isFullScreen: false,
        openedSubmenuArr: this.$store.state.app.openedSubmenuArr
      };
    },
    computed: {
      getLoginName() {
        return this.$store.state.user.adminInfo.admin_name;
      },
      getAvator() {
        return '/static/images/logo/avatar.jpg';
      },
      menuList() {
        return this.$store.state.app.menuList;
      },
      currentPath() {
        return this.$store.state.app.currentPath; // 当前面包屑数组
      },
      menuTheme() {
        return this.$store.state.app.menuTheme;
      }
    },
    mounted() {
      this.init();
    },
    methods: {
      init() {
        util.setCurrentPath(this, this.$route.name);
        let openedSubmenuArr = this.$Global.VueDB().getItem('openedSubmenuArr').toJson();
        if (openedSubmenuArr) {
          this.$store.commit('addOpenSubmenu', openedSubmenuArr);
        }
      },
      loginOut() {
        this.$store.commit("logout");
        this.$router.push({
          name: 'login'
        });
      }
    },
    watch: {
      '$route'(to) {
        util.setCurrentPath(this, to.name)
      }
    }
  };
</script>
