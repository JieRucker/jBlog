<template>
  <div id="app" class="app-main">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    data() {
      return {};
    }
  };
</script>

<style lang="scss">
  body, html {
    height: 100%;
  }

  body {
    background: #efefef !important;
    cursor: url(https://jrucker.cn/images/cursor.ico), auto;
  }

  .app-main {
    position: relative;
    min-height: 100%;
  }
</style>
