let util = {};
util.title = function (title) {
  title = title || '博客';
  window.document.title = title;
};

util.inOf = function (arr, targetArr) {
  let res = true;
  arr.forEach(item => {
    if (targetArr.indexOf(item) < 0) {
      res = false;
    }
  });
  return res;
};

util.oneOf = function (ele, targetArr) {
  if (targetArr.indexOf(ele) >= 0) {
    return true;
  } else {
    return false;
  }
};

util.getRouterObjByName = function (routers, name) {
  if (!name || !routers || !routers.length) {
    return null;
  }
  // debugger;
  let routerObj = null;
  for (let item of routers) {
    if (item.name === name) {
      return item;
    }
    routerObj = util.getRouterObjByName(item.children, name);
    if (routerObj) {
      return routerObj;
    }
  }
  return null;
};

util.handleTitle = function (vm, item) {
  if (typeof item.title === 'object') {
    return vm.$t(item.title.i18n);
  } else {
    return item.title;
  }
};


util.parentNode = null;
util.node = null;
util.getCurrentNode = function (menuList, name, cb) {
  for (let i = 0; i < menuList.length; i++) {
    if (util.node) break;
    let obj = menuList[i];
    if (!obj || !obj.name) continue;

    if (obj.name === name) {
      util.node = obj;
      break;
    } else {
      if (obj.children) {
        util.parentNode = obj;
        util.getCurrentNode(obj.children, name);
      }
    }
  }

  setTimeout(() => {
    util.node || (util.parentNode = '无父节点');

    if (typeof cb !== 'undefined') {
      cb.call(null, {
        parentNode: util.parentNode,
        node: util.node
      })
    }
  }, 50)
};

util.setCurrentPath = function (vm, name) {
  util.parentNode = null;
  util.node = null;
  util.getCurrentNode(vm.$store.state.app.routers, name, function (data) {
    vm.$store.commit('setCurrentPath', (() => {
      let a = null;
      if (typeof data.node.crumb === 'function') {
        a = data.node.crumb(vm)
      } else {
        a = data.node.crumb
      }
      return a;
    })());
  });
};

util.toDefaultPage = function (routers, name, route, next) {
  let len = routers.length;
  let i = 0;
  let notHandle = true;
  while (i < len) {
    if (routers[i].name === name && routers[i].children && routers[i].redirect === undefined) {
      route.replace({
        name: routers[i].children[0].name
      });
      notHandle = false;
      next();
      break;
    }
    i++;
  }
  if (notHandle) {
    next();
  }
};

export default util;
