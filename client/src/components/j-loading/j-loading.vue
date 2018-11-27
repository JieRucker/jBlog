<style lang="scss">
  .spin-icon-loading {
    animation: ani-demo-spin 1s linear infinite;
  }
</style>

<template>

</template>

<script>
  import {mapState} from 'vuex';

  export default {
    name: "j-loading",
    computed: {
      ...mapState({
        isLoading: state => state.app.isLoading
      })
    },
    watch: {
      isLoading(newVal, oldVal) {
        newVal ? this.$Spin.show({
          render: (h) => {
            return h('div', [
              h('Icon', {
                'class': 'spin-icon-loading',
                props: {
                  type: 'load-c',
                  size: 18
                },
                style: {
                  fontSize: '30px'
                }
              }),
              h('div', '正在加载...')
            ])
          }
        }) : this.$Spin.hide()
      }
    }
  }
</script>
