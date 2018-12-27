/**
 * @Author: jrucker
 * @Description
 * @Date: 2018/12/2 下午3:44
 * @Last Modified by: jrucker
 * @Last Modified time: 2018/12/2 下午3:44
 */

const path = require('path');
const webpack = require('webpack');
const rootpath = path.resolve(__dirname, '../');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  entry: {
    vendor: ["fastclick", "iview", "jsencrypt", "mavon-editor", "vue", "vue-router"]
  },
  output: {
    /* 打包后生成文件的路径 */
    path: path.join(rootpath, "dist/static/dll"),
    filename: '[name].dll.js',
    library: '[name]'
  },
  plugins: [
    /* 打包entry里配置的包 */
    new webpack.DllPlugin({
      path: path.join(rootpath, 'dist/[name]-manifest.json'),
      name: '[name]'
    }),
    new UglifyJsPlugin({
      uglifyOptions: {
        compress: {
          warnings: false,
          drop_console: true,
          collapse_vars: true,
          reduce_vars: true
        },
        output: {
          beautify: false,
          comments: false
        }
      },
      sourceMap: false,
      parallel: true
    }),
  ]
};
