import Main from '@/views/Main.vue';

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
  },
  {
    path: '/resetPassword',
    icon: 'android-apps',
    name: 'resetPassword',
    title: '重置密码',
    component: () => import('@/views/login/resetPassword.vue')
  },
  /*{
    path: '/manage',
    icon: 'android-apps',
    name: 'manage',
    title: '解决方案管理',
    component: Main,
    children: [
      {
        path: 'qrcode',
        title: '产品管理',
        name: 'qrcode',
        icon: 'android-funnel',
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
          }
        ],
        component: () => import('@/views/qrcode/qrcode.vue'),
      },
      /!*{
        path: 'record-list',
        title: '维护明细',
        name: 'record-list',
        icon: 'arrow-swap',
        crumb: [
          {
            path: '',
            title: '解决方案管理',
            name: 'manage',
          },
          {
            path: '/manage/record-list',
            title: '维护明细',
            name: 'record-list',
          }
        ],
        component: () => import('@/views/record/record-list.vue')
      },*!/
      {
        path: 'statistic-list',
        title: '维护统计',
        name: 'statistic-list',
        icon: 'stats-bars',
        crumb: [
          {
            path: '',
            title: '解决方案管理',
            name: 'manage',
          },
          {
            path: '/manage/statistic-list',
            title: '维护统计',
            name: 'statistic-list',
          }
        ],
        component: () => import('@/views/statistic/statistic-list.vue')
      },
      {
        path: 'auth-list',
        title: '权限设置',
        name: 'auth-list',
        icon: 'settings',
        crumb: [
          {
            path: '',
            title: '解决方案管理',
            name: 'manage',
          },
          {
            path: '/manage/auth-list',
            title: '权限设置',
            name: 'auth-list',
          }
        ],
        component: () => import('@/views/author/index.vue')
      },
      {
        path: 'record-tpl',
        title: '维护模板',
        name: 'record-tpl',
        icon: 'settings',
        crumb: [
          {
            path: '',
            title: '解决方案管理',
            name: 'manage',
          },
          {
            path: '/manage/record-tpl',
            title: '维护模板',
            name: 'record-tpl',
          }
        ],
        component: () => import('@/views/record-tpl/record-tpl.vue')
      },
      {
        path: 'state-list',
        title: '状态模板',
        name: 'state-list',
        icon: 'settings',
        crumb: [
          {
            path: '',
            title: '解决方案管理',
            name: 'manage',
          },
          {
            path: '/manage/state-list',
            title: '状态模板',
            name: 'state-list',
          }
        ],
        component: () => import('@/views/state/state-list.vue')
      }
    ]
  },*/
/*  {
    path: '/setting',
    icon: 'android-apps',
    name: 'setting',
    title: '设置',
    component: Main,
    // hideSubMenu: true,
    children: [
      {
        path: 'card-list',
        title: '名片码',
        name: 'card-list',
        icon: 'android-funnel',
        crumb: [
          {
            path: '',
            title: '设置',
            name: 'setting',
          },
          {
            path: '/setting/card-list',
            title: '名片码',
            name: 'card-list',
          }
        ],
        component: () => import('@/views/card/card-list.vue')
      },
      {
        path: 'material-list',
        title: '素材',
        name: 'material-list',
        icon: 'android-funnel',
        crumb: [
          {
            path: '',
            title: '设置',
            name: 'setting',
          },
          {
            path: '/setting/material-list',
            title: '素材',
            name: 'material-list',
          }
        ],
        component: () => import('@/views/material/material-list.vue')
      }
    ]
  }*/
];

// 所有上面定义的路由都要写在下面的routers里
export const routers = [
  otherRouter,
  ...appRouter,
];
