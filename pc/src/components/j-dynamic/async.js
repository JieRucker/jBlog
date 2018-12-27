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
    document.querySelector($el).appendChild(component.$el);
  } else {
    document.body.appendChild(component.$el);
  }

  const async = Instance.$children[0];

  return {
    show(props) {
      Object.keys(props.props).map(k => async[k] = props.props[k])
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
