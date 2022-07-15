import Main from '@/views/main/main'
export default {
  path: '/module',
  name: 'module',
  component: Main,
  children: [{
    path: 'moduleList',
    name: 'module_list',
    meta: {
      header: ['title'],
      title: '模块',
      footer: true
    },
    component: () => import('@/views/module/moduleList.vue')
  }, ]
}