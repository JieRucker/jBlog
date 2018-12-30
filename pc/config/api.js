/**
 * @Author: jrucker
 * @Description
 * @Date: 2018/12/27 下午9:05
 * @Last Modified by: jrucker
 * @Last Modified time: 2018/12/27 下午9:05
 */

const build = {
  static_url: 'http://blog.jrucker.cn/', // 静态资源路径
  common_url: 'http://blog.jrucker.cn',
};
const build_dev = {
  static_url: 'http://blog.jrucker.cn:8091/', // 静态资源路径
  common_url: 'http://blog.jrucker.cn:8091',
};
const dev = {
  static_url: 'http://localhost:8091/', // 静态资源路径
  common_url: 'http://localhost:8091',
};

module.exports = {build, build_dev, dev};

