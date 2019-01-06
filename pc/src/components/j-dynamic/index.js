/**
 * @Author: jrucker
 * @Description
 * @Date: 2018/10/15 9:56
 * @Last Modified by: jrucker
 * @Last Modified time: 2018/10/15 9:56
 */

import Async from './async.js';

function instance(options) {
  const render = ('render' in options) ? options.render : undefined;
  if (Async[options.component]) return false;
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
