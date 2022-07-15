<template>
  <div class="login">
    <img class="logo" src="@/assets/logo-min.png" alt="">
    <van-form class="from" @submit="onSubmit">
      <van-field v-model="loginState.username" name="username" label="用户名" placeholder="用户名" :rules="[{ required: true, message: '请填写用户名' }]" />
      <van-field v-model="loginState.password" type="password" name="password" label="密码" placeholder="密码" :rules="[{ required: true, message: '请填写密码' }]" />
      <div class="loginBtn">
        <van-button round block color="#1baeae" native-type="submit">登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { reactive, toRefs } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { Notify } from "vant";
import loginServe from "@/api/loginServe";
import md5 from "js-md5";
export default {
  setup() {
    const store = useStore();
    const router = useRouter();
    const login = reactive({
      loginState: {
        username: "",
        password: "",
      },
      onSubmit(values) {
        let parasm = {
          userName: values.username,
          psw: md5(values.password),
        };
        loginServe.login(parasm).then((res) => {
          store.commit("setToken", res.token);
          Notify({
            type: "success",
            message:'登录成功',
          });
          router.push("/");
        });
      },
    });

    return {
      ...toRefs(login),
    };
  },
};
</script>

<style lang="less">
.login {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin-top: 100px;
  .logo {
    width: 120px;
    height: 120px;
    margin-bottom: 50px;
  }
  .from {
    .van-field {
      margin: 20px 0;
    }
  }
  .loginBtn {
    margin: 0 16px;
    margin-top: 50px;
  }
}
</style>
