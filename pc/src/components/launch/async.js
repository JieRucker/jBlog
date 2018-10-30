const base = {
  /*添加标签*/
  tTagsMdl: (resolve) => {
    require(['@/views/tags/modal/t-tags-mdl.vue'], resolve)
  },
};

export default Object.assign({}, base)
