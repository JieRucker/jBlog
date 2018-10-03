<template>
  <div class="m-map">
    <div id="pickerBox" class="pickerBox">
      <input id="pickerInput" class="ivu-input" v-model="searchKey" placeholder="输入关键字"/>
    </div>
    <div id="map-container" class="map"></div>
  </div>
</template>

<script>
  import remoteLoad from './utils/remoteLoad.js'
  import {MapKey, MapCityName} from './config/config'

  export default {
    name: 'jMap',
    props: {
      markers: {
        type: Array,
        default: []
      }
    },
    data() {
      return {
        searchKey: '',
        AMapUI: null,
        AMap: null
      }
    },
    methods: {
      /**
       * 实例化地图
       */
      initMap() {
        // 加载PositionPicker，loadUI的路径参数为模块名中 'ui/' 之后的部分
        this.AMapUI = window.AMapUI;
        this.AMap = window.AMap;

        this.AMapUI.loadUI(['misc/PositionPicker'], PositionPicker => {
          let mapConfig = {
            zoom: 16
          };

          if (this.markers.length) {
            mapConfig.center = [this.markers[0].position[0], this.markers[0].position[1]]
          }
          let map = new this.AMap.Map('map-container', mapConfig);

          // 启用工具条
          this.AMap.plugin(['AMap.ToolBar'], () => {
            map.addControl(new this.AMap.ToolBar({
              position: 'RB'
            }))
          });
          // 创建地图拖拽
          let positionPicker = new PositionPicker({
            mode: 'dragMap', // 设定为拖拽地图模式，可选'dragMap'、'dragMarker'，默认为'dragMap'
            map: map // 依赖地图对象
          });

          // 拖拽完成发送自定义 drag 事件
          positionPicker.on('success', positionResult => {
            this.$emit('drag', positionResult)
          });

          // 启动拖放
          positionPicker.start()
        });

        this.poiPicker();
      },
      /**
       * 地图搜索
       */
      poiPicker() {
        this.AMapUI.loadUI(['misc/PoiPicker'], (PoiPicker) => {
          const poiPicker = new PoiPicker({
            input: 'pickerInput' //输入框id
          });
          //监听poi选中信息
          poiPicker.on('poiPicked', (poiResult) => {
            this.searchKey = poiResult.item.name;
            console.log(poiResult);

            if (typeof poiResult.item.location !== 'undefined') {
              this.markers = [
                {
                  position: [poiResult.item.location.lng, poiResult.item.location.lat]
                }
              ];

              this.initMap()
            } else {
              this.$Message.info('未检索到该地址')
            }
          });
        });
      }
    },
    async created() {
      // 已载入高德地图API，则直接初始化地图
      if (window.AMap && window.AMapUI) {
        this.initMap()
      } else {
        await remoteLoad(`http://webapi.amap.com/maps?v=1.3&key=${MapKey}`);
        await remoteLoad('http://webapi.amap.com/ui/1.0/main.js');
        this.$Global.timeout(300).then(() => this.initMap())
      }
    }
  }
</script>

<style lang="scss">
  @include b(m-map) {
    width: 100%;
    min-height: 500px;
    position: relative;
    @include b(map) {
      height: 500px;
    }
    @include b(pickerBox) {
      width: 200px;
      position: absolute;
      top: 14px;
      left: 10px;
      z-index: 1;
      .amap-ui-poi-picker-sugg-container {
        max-height: 420px;
      }
    }
  }
</style>
