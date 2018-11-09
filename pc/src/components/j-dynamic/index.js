import Async from './async.js';

function instance(options) {
  const render = ('render' in options) ? options.render : undefined;
  Async[options.component] = Async.newInstance({
    render: render,
    ...options
  });

  Async[options.component].show(options)
}

Async.show = function (props = {}) {
  return instance(props);
};

Async.hide = function (props = {}) {
  if (!Async[props.component]) return false;

  Async[props.component].remove(() => {
    Async[props.component] = null
  });
};

export default Async;
