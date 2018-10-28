<style lang="scss">
  @import '../styles/menu.scss';
</style>

<template>
  <Menu ref="sideMenu" :active-name="activeMenuItem" :open-names="openNames" :theme="menuTheme" width="auto"
        @on-select="onSelect" @on-open-change="onOpenChange" :accordion="accordion">
    <template v-for="item in menuList">
      <MenuItem v-if="item.hideSubMenu" :name="item.children[0].name" :key="'menuitem' + item.name">
        <Icon :type="item.children[0].icon" :size="iconSize" :key="'menuicon' + item.name"></Icon>
        <span class="layout-text" :key="'title' + item.name">{{ itemTitle(item.children[0]) }}</span>
      </MenuItem>
      <Submenu v-if="!item.hideSubMenu" :name="item.name" :key="item.name">
        <template slot="title">
          <Icon :type="item.icon" :size="iconSize"></Icon>
          <span class="layout-text">{{ itemTitle(item) }}</span>
        </template>
        <template v-for="child in item.children" v-if="!child.hideMenuItem">
          <MenuItem :name="child.name" :key="'menuitem' + child.name">
            <Icon :type="child.icon" :size="iconSize" :key="'icon' + child.name"></Icon>
            <span class="layout-text" :key="'title' + child.name">{{ itemTitle(child) }}</span>
          </MenuItem>
        </template>
      </Submenu>
    </template>
  </Menu>
</template>

<script>
  export default {
    name: 'sidebarMenu',
    props: {
      menuList: Array,
      iconSize: Number,
      menuTheme: {
        type: String,
        default: 'dark'
      },
      openNames: {
        type: Array
      },
      accordion: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      activeMenuItem() {
        return this.$store.state.app.activeMenuItem
      }
    },
    methods: {
      onSelect(active) {
        this.$emit('on-change', active);
      },
      onOpenChange(name) {
        this.$Global.VueDB().setItem('openedSubmenuArr', name)
      },
      itemTitle(item) {
        if (typeof item.title === 'object') {
          return this.$t(item.title.i18n);
        } else {
          return item.title;
        }
      }
    },
    updated() {
      this.$nextTick(() => {
        this.$refs.sideMenu && this.$refs.sideMenu.updateOpened();
      });
    }
  };
</script>
