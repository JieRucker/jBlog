<style lang="scss" scoped>
  #evanyou {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: -1;
  }

  .aplayer-fixed {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    margin: 0;
    z-index: 99;
    overflow: visible;
    max-width: 400px;
    box-shadow: none;
  }
</style>

<template>
  <div class="j-other">
    <canvas id="evanyou"></canvas>
    <div id="aplayer-fixed" class="aplayer-fixed"></div>
  </div>
</template>

<script>
  import evanyou from '@/libs/canvas/evanyou';

  export default {
    name: "j-other",
    mounted() {
      this.init()
    },
    methods: {
      init() {
        document.onclick = () => evanyou.render();
        document.ontouchstart = () => evanyou.render();
        evanyou.render();
        this.getAudio()
      },
      async getAudio() {
        let res = await this.$api.mainInterface.getAudioList();
        let {status, data} = res;
        const apFixed = new APlayer({
          element: document.getElementById('aplayer-fixed'),
          mutex: true,
          theme: '#97dffd',
          order: 'random',
          lrcType: 3,
          fixed: true,
        });

        apFixed.lrc.hide();

        if (status === 200) {
          apFixed.list.add(data);
        }
      },
    }
  }
</script>
