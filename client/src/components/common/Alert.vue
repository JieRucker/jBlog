<template>
  <div class="alert articles posts animated fadeIn" v-if='alert.show'>
    {{alert.text}}
  </div>
</template>
<script>
  import {mapState} from 'vuex'

  export default {
    computed: {
      ...mapState({
        alert: state => state.app.alert,
      })
    }
  }
</script>
<style lang="scss" scoped>
  $alert-color: rgba(150, 150, 150, .8);
  $triangle-size: 0.8rem;

  .alert {
    width: 8rem;
    height: 3.5rem;
    background-color: $alert-color;
    position: fixed;
    top: 100px;
    left: 0;
    right: 0;
    margin: auto;
    border-radius: 1rem;
    color: #fff;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1.2rem 0.8rem;
    z-index: 100;
    &::after {
      content: '';
      border-left: $triangle-size solid transparent;
      border-right: $triangle-size solid transparent;
      border-top: $triangle-size solid $alert-color;
      display: inline-block;
      position: absolute;
      bottom: -$triangle-size;
      margin: auto;
      left: 50%;
      transform: translateX(-50%);
    }
  }
</style>
