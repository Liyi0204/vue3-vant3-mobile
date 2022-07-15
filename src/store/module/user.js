import Cookies from 'js-cookie'
export default {
  state: {
    userinfo: Cookies.get('userinfo') ? Cookies.get('userinfo') : {},
    token: Cookies.get('token') ? Cookies.get('token') : ''
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
      Cookies.set('token', token, {
        expires: 1
      })
    },
    setUserInfo(state, userinfo) {
      state.userinfo = userinfo;
      Cookies.set('userinfo', userinfo, {
        expires: 1
      })
    },
  },
  getters: {},
  actions: {}
}