const base = {
  /*添加标签*/
  mTagsMdl: (resolve) => {
    require(['@/views/tags/modal/m-tags-mdl.vue'], resolve)
  },
  /*添加标签*/
  mWorksMdl: (resolve) => {
    require(['@/views/works/modal/m-works-mdl.vue'], resolve)
  },
};

export default Object.assign({}, base)
