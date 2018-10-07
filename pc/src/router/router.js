import Main from '@/views/Main.vue';

export const loginRouter = [
  {
    path: '/login',
    icon: 'android-apps',
    name: 'login',
    title: '登录',
    component: () => import('@/views/login/login.vue')
  },
  {
    path: '/register',
    icon: 'android-apps',
    name: 'register',
    title: '注册',
    component: () => import('@/views/login/register.vue')
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
      component: () => import('@/views/qrcode/qrcode-detail.vue')
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
        crumb: [
          {
            path: '',
            title: '文章',
            name: 'article',
          },
          {
            path: '/article/article-list',
            title: '文章列表',
            name: 'article-list',
          }
        ],
        component: () => import('@/views/article/article-list.vue'),
      },
      {
        path: 'create-article',
        title: '写文章',
        name: 'create-article',
        icon: 'android-funnel',
        crumb: [
          {
            path: '',
            title: '文章',
            name: 'article',
          },
          {
            path: '/article/create-article',
            title: '写文章',
            name: 'create-article',
          }
        ],
        component: () => import('@/views/article/create-article.vue'),
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
        crumb: [
          {
            path: '',
            title: '标签',
            name: 'manage',
          },
          {
            path: '/tags/tags-list',
            title: '标签列表',
            name: 'tags-list',
          }
        ],
        component: () => import('@/views/tags/tags-list.vue'),
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
        crumb: [
          {
            path: '',
            title: '作品',
            name: 'works',
          },
          {
            path: '/works/works-list',
            title: '作品列表',
            name: 'works-list',
          }
        ],
        component: () => import('@/views/works/works-list.vue'),
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
        path: 'pic-list',
        title: '图片列表',
        name: 'pic-list',
        icon: 'android-funnel',
        crumb: [
          {
            path: '',
            title: '上传',
            name: 'upload',
          },
          {
            path: '/upload/pic-list',
            title: '图片列表',
            name: 'pic-list',
          }
        ],
        component: () => import('@/views/upload/pic-list.vue'),
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
        path: 'setting',
        title: '全局设置',
        name: 'setting',
        icon: 'android-funnel',
        crumb: [
          {
            path: '',
            title: '设置',
            name: 'setting',
          },
          {
            path: '/setting/setting',
            title: '全局设置',
            name: 'setting',
          }
        ],
        component: () => import('@/views/setting/setting.vue')
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
