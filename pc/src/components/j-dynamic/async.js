/**
 * @Author: jrucker
 * @Description
 * @Date: 2018/10/15 9:42
 * @Last Modified by: jrucker
 * @Last Modified time: 2018/10/15 9:42
 */

import Vue from 'vue';

let Async = {};

Async.newInstance = properties => {
  const _props = properties || {};

  const Instance = new Vue({
    data: Object.assign({}, _props, {}),
    render(h) {
      let vnode = null;
      if (this.render) {
        vnode = this.render(h)
      }

      return vnode
    }
  });

  const component = Instance.$mount();

  const $el = _props.$el;
  if ($el && $el !== '') {
    let type = Object.prototype.toString.call($el);

    if (type === '[object HTMLDivElement]') $el.appendChild(component.$el);
    else if (type === '[object String]') document.querySelector($el).appendChild(component.$el);
  } else {
    document.body.appendChild(component.$el);
  }

  const async = Instance.$children[0];

  return {
    show(props) {
      if (props.data) Object.assign(async, props.data)
    },
    remove(cb) {
      const delay = _props.delay;
      setTimeout(() => {
        component.$destroy();
        component.$el.remove();
        cb();
      }, delay || 300);
    },
    component: async
  };
};

export default Async;
