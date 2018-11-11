let util = {
  // 跳到某个节点处
  slideTo(el) {
    let actualTop = el.offsetTop,
      current = el.offsetParent;
    while (current != null) {
      actualTop += current.offsetTop;
      current = current.offsetParent;
    }
    document.body.scrollTop = actualTop - 100;
  },
  // 日期格式化
  formatDate(time, str) {
    if (time != null) {
      const date = new Date(time)
      return date.getFullYear() + str + (date.getMonth() + 1) + str + date.getDate()
    }
  },
  // 函数节流
  throttle(fn, delay) {
    let last = 0, timer = null;
    return function () {
      let context = this, args = arguments;
      let now = new Date();
      if (now - last >= delay) {
        last = new Date();
        fn.apply(context, args);
      } else {
        clearTimeout(timer);
        timer = setTimeout(() => {
          last = new Date();
          fn.apply(context, args)
        }, delay)
      }
    }
  },
  // 函数去抖
  debounce(fn, delay) {
    let timer = null;
    return function () {
      const context = this, args = arguments;
      clearTimeout(timer);
      timer = setTimeout(() => {
        fn.apply(this, args)
      }, delay)
    }
  },
  // 生成min到max之间的随机整数
  random(min, max) {
    if (min > max) {
      let temp = min;
      min = max;
      max = temp;
    }
    return Math.floor(min + Math.random() * (max - min));
  },
  toDefaultPage(routers, name, route, next) {
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
  }
};

export default util;
