import Axios from 'axios'
// import Vue from 'vue'
// import store from '@/store'
import {
  Notify
} from 'vant';
console.log(process.env.NODE_ENV);
// const BASEURL = process.env.NODE_ENV === 'development' ? 'http://192.168.160.198:8001/' : process.env.VUE_APP_API_URL
const BASEURL = 'http://192.168.160.198';
// 默认请求地址
Axios.defaults.baseURL = BASEURL
// 超时时间
Axios.defaults.timeout = 10000

// 请求拦截器
Axios.interceptors.request.use((config) => {
  // config.headers['token'] = store.state.user.token;
  return config
}, (error) => {
  return Promise.reject(error);
});

// 响应拦截器
Axios.interceptors.response.use((response) => {
  // console.log(response)
  if (response.data.message) {
    Notify({
      type: 'danger',
      message:response.data.message
    });
    return
  }
  return response;
}, (error) => {
  //console.log(error)
  let errMsg
  if (error.response.data && error.response.data.msg) {
    if (error.response.data.code === 403 && error.response.data.msg === '未登录') {
      return window.location.href = "/login"
    }
    errMsg = error.response.data.msg
  } else if (error.response.status === 500) {
    errMsg = '无法响应的服务'
  }
  Notify({
    type: 'danger',
    errMsg
  });
  return Promise.reject(error);
});


export default {
  baseURL: BASEURL,
  GET(url, params) {
    return new Promise((resolve, reject) => {
      Axios.get(url, {
        params
      }).then((res) => {
        resolve(res.data)
      }).catch((err) => {
        reject(err)
      })
    })
  },
  DOWN(url, params, responseType) {
    return new Promise((resolve, reject) => {
      Axios.get(url, {
        params,
        responseType: responseType,
      }).then((res) => {
        resolve(res.data)
      }).catch((err) => {
        reject(err)
      })
    })
  },
  //POST(url, params, showMessage = true) {
  POST(url, params, showMessage) {
    //console.log(showMessage)
    return new Promise((resolve, reject) => {
      Axios.post(url, params).then((res) => {
        if (res.status === 200 && showMessage) {
          Notify({
            ype: 'success',
            message: '操作成功'
          });
        }
        resolve(res.data)
      }).catch((err) => {
        reject(err)
      })
    })
  },
  PUT(url, params) {
    return new Promise((resolve, reject) => {
      Axios.put(url, params).then((res) => {
        Notify({
          ype: 'success',
          message: '修改成功'
        });
        resolve(res.data)
      }).catch((err) => {
        reject(err)
      })
    })
  },
  DELETE(url, params) {
    return new Promise((resolve, reject) => {
      Axios.delete(url, {
        data: params
      }).then((res) => {
        if (res.status === 200) {
          Notify({
            ype: 'success',
            message: '删除成功'
          });
        }
        resolve(res.data)
      }).catch((err) => {
        reject(err)
      })
    })
  }
}