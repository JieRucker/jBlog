import Main from '../views/Main.vue';
import crumb from './crumb';

export const loginRouter = [
  {
    path: '/login',
    icon: 'android-apps',
    name: 'login',
    title: '登录',
    component: () => import('../views/login/login.vue')
  },
  {
    path: '/register',
    icon: 'android-apps',
    name: 'register',
    title: '注册',
    component: () => import('../views/login/register.vue')
  }
];

// 作为Main组件的子页面展示但是不在左侧菜单显示的路由写在otherRouter里
export const otherRouter = {
  path: '/',
  name: 'otherRouter',
  redirect: '/login',
  component: Main,
  children: [
    /*{
      path: 'qrcode-detail',
      title: '产品详情',
      name: 'qrcode-detail',
      hideMenuItem: true,
      activeMenuItem: 'qrcode',
      crumb: [
        {
          path: '',
          title: '解决方案管理',
          name: 'manage',
        },
        {
          path: '/manage/qrcode',
          title: '产品管理',
          name: 'qrcode',
        },
        {
          path: '',
          title: '产品详情',
          name: 'qrcode-detail',
        }
      ],
      component: () => import('../views/qrcode/qrcode-detail.vue')
    },*/
  ]
};

// 作为Main组件的子页面展示并且在左侧菜单显示的路由写在appRouter里
export const appRouter = [
  {
    path: '/article',
    icon: 'android-apps',
    name: 'article',
    title: '文章',
    component: Main,
    children: [
      {
        path: 'article-list',
        title: '文章列表',
        name: 'article-list',
        icon: 'android-funnel',
        crumb: crumb.article_list,
        meta: {
          requiresAuth: true
        },
        component: () => import('../views/article/article-list.vue'),
      },
      {
        path: 'create-article',
        title: '写文章',
        name: 'create-article',
        icon: 'android-funnel',
        crumb: crumb.create_artcle,
        meta: {
          requiresAuth: true
        },
        component: () => import('../views/article/create-article.vue'),
      }
    ]
  },
  {
    path: '/tags',
    icon: 'android-apps',
    name: 'tags',
    title: '标签',
    component: Main,
    children: [
      {
        path: 'tags-list',
        title: '标签列表',
        name: 'tags-list',
        icon: 'android-funnel',
        crumb: crumb.tags_list,
        meta: {
          requiresAuth: true
        },
        component: () => import('../views/tags/tags-list.vue'),
      },
    ]
  },
  {
    path: '/works',
    icon: 'android-apps',
    name: 'works',
    title: '作品',
    component: Main,
    children: [
      {
        path: 'works-list',
        title: '作品列表',
        name: 'works-list',
        icon: 'android-funnel',
        crumb: crumb.works_list,
        meta: {
          requiresAuth: true
        },
        component: () => import('../views/works/works-list.vue'),
      },
    ]
  },
  {
    path: '/upload',
    icon: 'android-apps',
    name: 'upload',
    title: '上传',
    component: Main,
    children: [
      {
        path: 'file-upload',
        title: '文件列表',
        name: 'file-upload',
        icon: 'android-funnel',
        crumb: crumb.file_upload,
        meta: {
          requiresAuth: true
        },
        component: () => import('../views/upload/file-upload.vue'),
      },
    ]
  },
  {
    path: '/setting',
    icon: 'android-apps',
    name: 'setting',
    title: '设置',
    component: Main,
    // hideSubMenu: true,
    children: [
      {
        path: 'mine',
        title: '个人信息',
        name: 'mine',
        icon: 'android-funnel',
        crumb: crumb.mine,
        meta: {
          requiresAuth: true
        },
        component: () => import('../views/setting/mine.vue')
      },
      {
        path: 'upyun',
        title: '又拍云',
        name: 'upyun',
        icon: 'android-funnel',
        crumb: crumb.upyun,
        meta: {
          requiresAuth: true
        },
        component: () => import('../views/setting/upyun.vue')
      },
      {
        path: 'about',
        title: '关于',
        name: 'about',
        icon: 'android-funnel',
        crumb: crumb.about,
        meta: {
          requiresAuth: true
        },
        component: () => import('../views/setting/about.vue')
      }
    ]
  }
];

// 所有上面定义的路由都要写在下面的routers里
export const routers = [
  ...loginRouter,
  otherRouter,
  ...appRouter,
];
