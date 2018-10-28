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

util.getCurrentNode = async function (list, keyword, nodes, cb) {
  if (Object.keys(keyword).length > 1) {
    throw new Error('Expression only one object length')
  }
  let parentNode = null;
  let node = null;
  let [name] = Object.keys(keyword);
  let value = keyword[name];
  const func = await (() => {
    return (list, value) => {
      for (let i = 0; i < list.length; i++) {
        if (node) break;
        let obj = list[i];
        if (!obj || !obj[name]) continue;

        if (obj[name] === value) {
          node = obj;
          break;
        } else {
          if (obj[nodes]) {
            parentNode = obj;
            func(obj[nodes], value);
          }
        }
      }
    }
  })();

  func(list, value);

  await (() => {
    node || (parentNode = '无父节点');
    cb && cb.call(null, {
      parentNode: parentNode,
      node: node
    })
  })()
};

util.setCurrentPath = function (vm, name) {
  util.getCurrentNode(vm.$store.state.app.routers, {name: name}, 'children', data => {
    vm.$store.commit('setCurrentPath', (() => {
      let a = null;
      if (typeof data.node.crumb === 'function') {
        a = data.node.crumb(vm)
      } else {
        a = data.node.crumb
      }
      return a;
    })());

    vm.$store.commit('setActiveMenuItem', {
      data: data,
      name: vm.$route.name
    });
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
