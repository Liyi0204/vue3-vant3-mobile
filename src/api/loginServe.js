import axiosHttp from './axiosHttp'

export default {
  login(params) {
    return axiosHttp.GET(`api/user/login`, params, false)
  },
  getInfo(token) {
    return axiosHttp.GET(`api/user/getInfo?token=${token}`, false)
  },
}