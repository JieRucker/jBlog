'use strict';
const utils = require('./utils');
const webpack = require('webpack');
const config = require('../config');
const merge = require('webpack-merge');
const path = require('path');
const baseWebpackConfig = require('./webpack.base.conf');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const portfinder = require('portfinder');
const fs = require('fs-extra');
const api = require('../config/api');
const env = require('../config/dev.env');
const HOST = process.env.HOST;
const PORT = process.env.PORT && Number(process.env.PORT);

env.api = JSON.stringify(api.dev);

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

const target = (() => {
  return () => {
    let a = process.env.target;
    return a ? a.split(',') : '';
  }
})();

const getAllHtmlPlugins = (() => {
  return () => {
    let array = [];
    let getTarget = target();
    getTarget.forEach(file => {
      let cur_path = resolve('./src/modules/' + file);
      let package_config = fs.readJsonSync(path.join(cur_path, './package.json'));
      let name = package_config.name;
      let config = {
        template: path.join(cur_path, './index.html'),
        filename: path.join(name, './index.html'),
        inject: 'body',
        chunks: ['manifest', 'vendor', name]
      };
      array.push(new HtmlWebpackPlugin(config));
    });

    return array
  }
})();

const getEntry = (() => {
  return () => {
    let entry = {};
    let getTarget = target();
    getTarget.forEach(file => {
      let cur_path = resolve('./src/modules/' + file);
      let package_config = fs.readJsonSync(path.join(cur_path, './package.json'));
      entry[file] = [path.resolve(path.join(cur_path, package_config.main))];
    });

    return entry;
  }
})();

const devWebpackConfig = merge(baseWebpackConfig, {
  entry: getEntry(),
  module: {
    rules: utils.styleLoaders({sourceMap: config.dev.cssSourceMap, usePostCSS: true, extract: true})
  },
  // cheap-module-eval-source-map is faster for development
  devtool: config.dev.devtool,
  output: {
    publicPath: config.dev.assetsPublicPath,
    path: config.build.assetsRoot,
    filename: utils.assetsPath('js/[name].js?v=[hash]'),
    chunkFilename: utils.assetsPath('js/[id].js?v=[hash]')
  },
  // these devServer options should be customized in /config/index.js
  devServer: {
    clientLogLevel: 'warning',
    historyApiFallback: {
      rewrites: [
        {from: /.*/, to: path.join(config.dev.assetsPublicPath, 'index.html')},
      ],
    },
    hot: true,
    contentBase: false, // since we use CopyWebpackPlugin.
    compress: true,
    host: HOST || config.dev.host,
    port: PORT || config.dev.port,
    open: config.dev.autoOpenBrowser,
    overlay: config.dev.errorOverlay
      ? {warnings: false, errors: true}
      : false,
    publicPath: config.dev.assetsPublicPath,
    proxy: config.dev.proxyTable,
    quiet: true, // necessary for FriendlyErrorsPlugin
    watchOptions: {
      poll: config.dev.poll,
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': env
    }),
    new ExtractTextPlugin({
      filename: utils.assetsPath('css/[name].css'),
      allChunks: true,
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks(module) {
        // any required modules inside node_modules are extracted to vendor
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(
            path.join(__dirname, '../node_modules')
          ) === 0
        )
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      minChunks: Infinity
    }),
    // This instance extracts shared chunks from code splitted chunks and bundles them
    new webpack.optimize.CommonsChunkPlugin({
      name: 'app',
      async: 'vendor-async',
      children: true,
      minChunks: 3
    }),
    ...getAllHtmlPlugins(),
    // copy custom static assets
    new CopyWebpackPlugin((() => {
        let array = [];
        const copyPath = {
          '../src/assets/images': 'static/images',
          '../src/components/theme-switch/theme': 'static/css',
          '../src/libs/jquery/jquery.min.js': 'static/js',
          '../src/libs/uploader/uploader.min.js': 'static/js',
        };

        const getArray = fn => (...args) => fn.apply(this, args);
        const isArray = getArray(args => Object.prototype.toString.call(args) === '[object Array]');

        Object.keys(copyPath).forEach(key => {
          const fromTo = (() => {
            return (array, from, to) => {
              array.push({
                from: from,
                to: to
              })
            }
          })();

          isArray(copyPath[key]) ? [...copyPath[key]].forEach(value => {
            fromTo(array, path.resolve(__dirname, key), value)
          }) : fromTo(array, path.resolve(__dirname, key), copyPath[key])
        });

        return array;
      })())
  ]
});

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port;
      // add port to devServer config
      devWebpackConfig.devServer.port = port;

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
        },
        onErrors: config.dev.notifyOnErrors
          ? utils.createNotifierCallback()
          : undefined
      }));

      resolve(devWebpackConfig)
    }
  })
});
