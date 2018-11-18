import Main from '@/views/Main.vue';

export const homeRouter = [{
  path: 'home',
  name: 'home',
  title: '首页',
  component: () => import('@/views/home/index.vue'),
}];

export const archivesRouter = [{
  path: 'archives',
  name: 'archives',
  title: '归档',
  component: () => import('@/views/archives/index.vue'),
}];

export const tagsRouter = [{
  path: 'tags',
  name: 'tags',
  title: '标签',
  component: () => import('@/views/tags/index.vue'),
}];

export const aboutRouter = [{
  path: 'about',
  name: 'about',
  title: '关于',
  component: () => import('@/views/about/index.vue'),
}];

// 作为Main组件的子页面展示并且在左侧菜单显示的路由写在appRouter里
export const appRouter = {
  path: '/',
  redirect: '/home',
  component: Main,
  children: [
    ...homeRouter,
    ...archivesRouter,
    ...tagsRouter,
    ...aboutRouter
  ]
};

export const routers = [
  appRouter
];
