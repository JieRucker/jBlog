import * as types from '../mutation-types'

const state = {
  navigateUploadId: null // 网址导航图片上传uploadId
};

const getters = {
  getNavigateUploadId: state => state.navigateUploadId
};

const actions = {
  setNavigateUploadId({commit}, info) {
    commit(types.SET_NAVIGATE_UPLOAD_ID, info)
  }
};

const mutations = {
  [types.SET_NAVIGATE_UPLOAD_ID](state, data) {
    state.navigateUploadId = data;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
}
