/**
 * router扩展，页面切换动画
 */
// 负责SessionStorage存储路由历史。
const SessionStorage_key_Router_Extend_History = 'SessionStorage_key_Router_Extend_History'
 
function transitionExtend(orgin) {
  // 通过原路由对象创建一个新的对象
  let router = Object.create(orgin)
 
  // 扩展对象，保存当前栈数组和过渡动画名称
  router.customRouterData = {
    transitionName: '',
    history: []
  }
 
  // 路由位置字符串在数组中的位置
  router.indexOf = function (path) {
    let arrLen = router.customRouterData.history.length
    for (let i = arrLen - 1; i >= 0; i--) {
      if (router.customRouterData.history[i] == path) {
        return i;
      }
    }
    return -1;
  }
 
  // 添加历史路由去路由数组
  router.addRouterPath = function(path) {
    router.customRouterData.history.push(path)
 
    sessionStorage.setItem(SessionStorage_key_Router_Extend_History, JSON.stringify(router.customRouterData.history));
  }
 
  // 历史路由数组移除某个路由，n为参数可以移除多个
  router.removeLastRouterPath = function (n = 1) {
    if (n > 0) {
      for (let i = 0; i < n; i++) {
        router.customRouterData.history.pop()
      }
 
      sessionStorage.setItem(SessionStorage_key_Router_Extend_History, JSON.stringify(router.customRouterData.history));
    }
  }
 
  // 初始化，为了页面刷新能恢复路由记录等
  router.initRouterPaths = function (toPath) {
    // 当存储了 router paths 时候，读取并赋值
    let arrStr
    arrStr = sessionStorage.getItem(SessionStorage_key_Router_Extend_History);
 
    if (arrStr && arrStr != undefined) {
      let arr = JSON.parse(arrStr)
      if (Array.isArray(arr) && arr.length > 0) {
        // 进入页面
        router.customRouterData.history = arr;
      } else {
        // 新进入页面
        router.customRouterData.history = []
        router.customRouterData.history.push(toPath)
      }
    } else {
      // 新进入页面
      router.customRouterData.history = []
      router.customRouterData.history.push(toPath)
    }
 
    // 存储为了恢复
    sessionStorage.setItem(SessionStorage_key_Router_Extend_History, JSON.stringify(router.customRouterData.history));
  }
 
  // push 修改路由历史，并设置动画
  router.push = function () {
 
    let location = arguments[0]
    if (typeof location == 'string') {
      router.addRouterPath(location)
    } else {
      router.addRouterPath(location.path)
    }
 
    router.customRouterData.transitionName = 'slide_left'
 
    router.__proto__.push.call(this, ...arguments)
  };
 
  // replace 修改路由历史，并设置动画
  router.replace = function () {
 
    router.removeLastRouterPath()
    let location = arguments[0]
    if (typeof location == 'string') {
      router.addRouterPath(location)
    } else {
      router.addRouterPath(location.path)
    }
 
    router.customRouterData.transitionName = 'slide_left'
 
    router.__proto__.replace.call(this, ...arguments)
  };
 
  // go 修改路由历史，并设置动画
  router.go = function (n) {
    if (n > 0) {
      // 禁止使用，这种情况比较复杂，使用较少，先忽略
      console.error('router.go 暂不支持 前进 ！');
      return;
    }
    router.removeLastRouterPath(-n)
 
    router.customRouterData.transitionName = 'slide_right'
 
    router.__proto__.go.call(this, n)
  };
 
  // back 修改路由历史，并设置动画
  router.back = function () {
 
    router.removeLastRouterPath()
 
    router.customRouterData.transitionName = 'slide_right'
 
    router.__proto__.go.call(this, -1)
  };
 
  router.forward = function () {
    // 禁止使用，这种情况比较复杂，使用较少，先忽略
    console.error('router.forward 暂不支持 ！');
    return ;
  };
 
  /**
   * 按钮前进后退处理处理
   * 返回：测滑返回，微信返回按钮，web返回按钮，以及android物理返回，android测滑返回
   * 前进：微信上的前进按钮，web前进
   * // 前进这里有个坑，待解决，先忽略
   **/
  router.otherEventTransitionName = function (toPath) {
    if (router.customRouterData.transitionName != '') {
      // 没有数据意味着从，其他操作方式得到的路由变化
      return;
    }
 
    let toIndex = router.indexOf(toPath)
    if (toIndex == -1 || router.customRouterData.history.length - toIndex != 2) {
      // 不存在，并且历史
      router.addRouterPath(toPath)
      router.customRouterData.transitionName = 'slide_left'
    } else {
      router.removeLastRouterPath()
      router.customRouterData.transitionName = 'slide_right'
    }
  }
 
  // 是否已经初始化
  let isInit = false;
 
  // 跳转之前
  router.beforeEach((to, from, next) => {
    if (isInit) {
      router.otherEventTransitionName(to.path, from.path)
    } else {
      isInit = true;
      router.initRouterPaths(to.path)
    }
    next();
  })
 
  // 跳转之后
  router.afterEach(() => {
    setTimeout(() => {
      // 使用动画之后立即移除
      router.customRouterData.transitionName = ''
    }, 300)
  })
 
  return router
}
 
export default transitionExtend