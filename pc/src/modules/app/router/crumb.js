class Crumb {
  constructor() {

  }

  static get article_list() {
    return [{
      path: '',
      title: '文章',
      name: 'article',
    }, {
      path: '/article/article-list',
      title: '文章列表',
      name: 'article-list',
    }];
  }

  static get create_artcle() {
    return [{
      path: '',
      title: '文章',
      name: 'article',
    }, {
      path: '/article/create-article',
      title: '写文章',
      name: 'create-article',
    }]
  }

  static get tags_list() {
    return [{
      path: '',
      title: '标签',
      name: 'manage',
    }, {
      path: '/tags/tags-list',
      title: '标签列表',
      name: 'tags-list',
    }]
  }

  static get works_list() {
    return [{
      path: '',
      title: '作品',
      name: 'works',
    }, {
      path: '/works/works-list',
      title: '作品列表',
      name: 'works-list',
    }]
  }

  static get pic_list() {
    return [{
      path: '',
      title: '上传',
      name: 'upload',
    }, {
      path: '/upload/pic-list',
      title: '图片列表',
      name: 'pic-list',
    }]
  }

  static get mine() {
    return [{
      path: '',
      title: '设置',
      name: 'setting',
    }, {
      path: '/setting/mine',
      title: '个人信息',
      name: 'mine',
    }]
  }

  static get upyun() {
    return [{
      path: '',
      title: '设置',
      name: 'setting',
    }, {
      path: '/setting/upyun',
      title: '又拍云',
      name: 'upyun',
    }]
  }

  static get about() {
    return [{
      path: '',
      title: '设置',
      name: 'setting',
    }, {
      path: '/setting/about',
      title: '关于',
      name: 'about',
    }]
  }
}

export default Crumb
