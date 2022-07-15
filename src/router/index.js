import Main from '@/views/main/main'
import moduleRoute from './module-router'
import userRouter from './user-router'
import store from '@/store'
import loginServe from "@/api/loginServe";
import transitionExtend from "./transition-extend";

import {
  createRouter,
  createWebHashHistory
} from 'vue-router'

/*
  mate:{
    header: ['back', 'logo', 'tool'] , back 返回  logo 图标  tool 右侧工具栏
    title:'头部标题',
    footer: true | false
  }
*/
const router = transitionExtend(createRouter({
  history: createWebHashHistory(), // hash模式：createWebHashHistory，history模式：createWebHistory
  routes: [{
      path: '/login',
      name: 'login',
      component: () => import('@/views/login/login.vue')
    },
    {
      path: '/',
      name: '/',
      redirect: '/home',
      component: Main,
      children: [{
        path: '/home',
        name: 'home',
        meta: {
          header: ['logo'],
          title: '主页',
          footer: true
        },
        component: () => import('@/views/home/home.vue')
      }]
    },
    moduleRoute,
    userRouter,
    {
      path: '/message',
      name: 'message',
      component: Main,
      children: [{
        path: 'messageCenter',
        name: '/messageCenter',
        meta: {
          header: ['title'],
          title: '消息中心',
          footer: true
        },
        component: () => import('@/views/message/messageCenter.vue')
      }, ]
    }
  ]
}))

const LOGIN_PAGE_NAME = 'login';
router.beforeEach((to, from, next) => {
  const token = store.state.user.token;
  const userinfo = store.state.user.userinfo;
  if (!token && to.name !== LOGIN_PAGE_NAME) {
    // 未登录且要跳转的页面不是登录页
    next({
      name: LOGIN_PAGE_NAME // 跳转到登录页
    })
  } else if (!token && to.name === LOGIN_PAGE_NAME) {
    // 未登陆且要跳转的页面是登录页
    next() // 跳转
  } else if (token) {
    // 已登录获取用户信息
    if (Object.keys(userinfo).length === 0) {
      loginServe.getInfo(token).then(user => {
        store.commit('setUserInfo', user);
        if (to.name === LOGIN_PAGE_NAME) {
          next({
            name: 'home'
          })
        } else {
          next();
        }
      }).catch(() => {
        store.commit('setToken', '');
        store.commit('setUserInfo', '');
        next({
          name: LOGIN_PAGE_NAME
        })
      })
    } else {
      if (to.name === LOGIN_PAGE_NAME) {
        next({
          name: 'home'
        })
      } else {
        next();
      }
    }

  }
})

export default router