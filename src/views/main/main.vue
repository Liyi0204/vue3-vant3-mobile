<template>
  <div id="main">
    <nav-bar v-if="$route.meta.header" :header='$route.meta.header' :title='$route.meta.title'></nav-bar>
    <router-view v-slot="{ Component }">
      <transition :name="$router.customRouterData.transitionName">
        <component :is="Component" />
      </transition>
    </router-view>
    <van-tabbar active-color='#eea47f' placeholder v-if="$route.meta.footer" route>
      <van-tabbar-item to='/home' icon="home-o">主页</van-tabbar-item>
      <van-tabbar-item to='/module/moduleList' icon="coupon-o">模块</van-tabbar-item>
      <van-tabbar-item to='/message/messageCenter' icon="comment-o">消息</van-tabbar-item>
      <van-tabbar-item to='/user/personalCenter' icon="manager-o">个人中心</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import NavBar from "./NavBar";
export default {
  components: {
    NavBar,
  },
};
</script>


<style lang="less" scoped>
#main {
  position: relative;
  width: 100%;
  height: 100%;
}
.slide_left-enter-active,
.slide_left-leave-active,
.slide_right-enter-active,
.slide_right-leave-active {
  transition: all 0.3s;
  position: absolute !important;
  background-color: white;
  z-index: 1;
}

.slide_left-enter-from,
.slide_right-leave-to {
  opacity: 1;
  transform: translateX(100%);
}

.slide_right-enter-from,
.slide_left-leave-to {
  opacity: 1;
  transform: translateX(-100%);
}

.slide_left-leave-to,
.slide_right-leave-to {
  opacity: 0.3;
}
</style>