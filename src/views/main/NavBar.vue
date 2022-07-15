<template>
  <div id="NavBar">
    <van-nav-bar :title="title" :left-arrow="header.includes('back')?true:false" @click-left="onClickLeft">
      <template #title v-if="header.includes('logo') || header.includes('title')">
        <img v-if="header.includes('logo')" src="@/assets/logo-shore.png">
        <p v-else class="header-title">{{title}}</p>
      </template>
      <template #right v-if="header.includes('tool')?true:false">
        <van-icon name="apps-o" size="18" />
      </template>
    </van-nav-bar>
  </div>
</template>

<script>
export default {
  setup() {
    const onClickLeft = () => history.back();
    return {
      onClickLeft,
    };
  },
  props: {
    title: {
      type: String,
    },
    header: {
      type: Array,
    },
  },
};
</script>

<style lang="less" scoped>
#NavBar {
  img {
    width: 80px;
    height: 40px;
  }
  /deep/.van-nav-bar__title {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
  }
  .header-title {
    font-size: 14px;
  }
}
</style>

