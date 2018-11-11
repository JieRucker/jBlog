<template>
  <div class="dialog_box" v-if="dialog_box.show">
    <div class="shadow"></div>
    <div class="dialog">
      <p>{{dialog_box.tip}}</p>
      <div class="btn_group">
        <button @click="comfirm()" class="resolve">确定</button>
        <button v-if='dialog_box.hasTwobtn' @click="cancel()">取消</button>
      </div>
    </div>
  </div>
</template>
<script>
  import {mapState, mapMutations} from 'vuex'

  export default {
    computed: {
      ...mapState({
        dialog_box: state => state.app.dialog_box,
      })
    },
    methods: {
      comfirm: function () {
        this.dialog_box.resolved()
      },
      cancel: function () {
        this.dialog_box.reject()
      }
    }


  }
</script>
<style lang="scss" scoped>
  $button_color: #e74851;
  .dialog_box {
    width: 100%;
    height: 100%;
    position: fixed;
    display: block;
    top: 0px;
    display: block;
    z-index: 100;
    .shadow {
      width: 100%;
      height: 100%;
      display: block;
      position: absolute;
      background-color: rgba(0, 0, 0, 0.15);
      top: 0px;
      z-index: 3;
    }
    .dialog {
      width: 1.3rem;
      height: 0.9rem;
      min-width: 260px;
      min-height: 180px;
      display: block;
      background-color: #fff;
      position: absolute;
      z-index: 11;
      top: 0px;
      bottom: 0px;
      left: 0px;
      right: 0px;
      margin: auto;
      border-radius: 4px;
      .btn_group {
        display: flex;
        justify-content: space-around;
        width: 100%;
        position: absolute;
        bottom: 10%;
        white-space: nowrap;
        button {
          padding: 7px 6%;
          background-color: #f6f4f5;
          text-align: center;
          margin: 5px auto;
          color: #444;
          border-radius: 3px;
        }
        .resolve {
          background-color: $button_color;
          color: #fff;
        }

      }
    }
  }

  @media screen and (max-width: 440px) {
    .dialog {
      width: 3.3rem !important;
      height: 2.7rem !important;
      margin: auto 1rem;
    }
  }

  .dialog p {
    text-align: center;
    margin: 15% auto;
    color: #555;
  }

  .dialog .btn_group {

    justify-content: space-around;
  }

  .dialog button {
    position: relative;
    transition: 0.5s;
  }

  .dialog button:hover {
    color: #8bc34a;
  }
</style>
