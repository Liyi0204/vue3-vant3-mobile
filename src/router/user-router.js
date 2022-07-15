import Main from '@/views/main/main'
export default {
  path: '/user',
  name: 'user',
  component: Main,
  children: [{
    path: 'personalCenter',
    name: 'personal_center',
    meta: {
      header: ['title'],
      title: '个人中心',
      footer: true
    },
    component: () => import('@/views/user/personalCenter.vue')
  }, ]
}