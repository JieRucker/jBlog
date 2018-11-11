import Main from '@/views/index.vue';

// 作为Main组件的子页面展示并且在左侧菜单显示的路由写在appRouter里
export const appRouter = [
  {
    path: '/',
    redirect: '/home',
    component: Main,
    children: [
      {
        path: 'home',
        title: '首页',
        name: 'home',
        component: () => import('@/views/home.vue'),
      },
      {
        path: 'archives',
        title: '归档',
        name: 'archives',
        component: () => import('@/views/archives.vue'),
      },
      {
        path: 'tags',
        title: '标签',
        name: 'tags',
        component: () => import('@/views/tags.vue'),
      },
      {
        path: 'aboutMe',
        title: '关于我',
        name: 'aboutMe',
        component: () => import('@/views/aboutMe.vue'),
      },
      {
        path: 'article/:aid',
        title: '文章',
        name: 'article',
        component: () => import('@/views/article.vue'),
      },
      {
        path: 'articles',
        title: '文章详情',
        name: 'articles',
        component: () => import('@/views/articles.vue'),
      },
    ]
  }
];

export const routers = [
  ...appRouter,
];
