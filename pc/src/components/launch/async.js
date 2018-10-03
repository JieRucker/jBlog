const base = {
  // 单个建码
  qSingleMdl: (resolve) => {
    require(['@/views/qrcode/modal/q-single-mdl.vue'], resolve)
  },

  // 批量建码
  qMultipleMdl: (resolve) => {
    require(['@/views/qrcode/modal/q-multiple-mdl.vue'], resolve)
  },

  // 状态设置
  qStateSettingMdl: (resolve) => {
    require(['@/views/qrcode/components/header-module/modal/state-setting-nature'], resolve)
  },

  // 基本信息设置
  qInfoSettingMdl: (resolve) => {
    require(['@/views/qrcode/components/header-module/modal/info-setting-nature'], resolve)
  },
  // 基本信息设置2
  qInfoSettingMdl2: (resolve) => {
    require(['@/views/qrcode/modal/info-setting-nature2'], resolve)
  },
  // 添加维护模板
  qRecordMdl: (resolve) => {
    require(['@/views/qrcode/components/record-module/modal/q-record-mdl'], resolve)
  },

  // 选择素材
  mMaterialMdl: (resolve) => {
    require(['@/views/qrcode/components/material-module/modal/m-material-mdl'], resolve)
  },

  // 选择定位
  qLocationMdl: (resolve) => {
    require(['@/views/qrcode/components/web-nav-module/modal/q-location-mdl'], resolve)
  },

  // 预览二维码
  qVwMdl: (resolve) => {
    require(['@/views/qrcode/modal/q-vw-mdl'], resolve)
  },

  // 二维码查看下载
  qDownloadMdl: (resolve) => {
    require(['@/views/qrcode/modal/q-download-mdl'], resolve)
  },

  // 二维码移动
  qMoveMdl: (resolve) => {
    require(['@/views/qrcode/modal/q-move-mdl'], resolve)
  },

  // 地图
  qMapMdl: (resolve) => {
    require(['@/views/qrcode/modal/q-map-mdl'], resolve)
  }
};

export default Object.assign({}, base)
