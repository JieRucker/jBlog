'use strict';
const path = require('path');
const utils = require('./utils');
const webpack = require('webpack');
const config = require('../config');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const cleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
const DllLinkPlugin = require("dll-link-webpack-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const api = require('../config/api');
const env = require('../config/prod.env');

const actions = () => {
  const functionA = () => env.api = JSON.stringify(api.build);
  const functionB = () => env.api = JSON.stringify(api.build_dev);
  return new Map([
    ['prod', functionA],
    ['prod_dev', functionB]
  ])
};

function env_config(identity) {
  let action = [...actions()].filter(([key, value]) => key === identity);
  action.forEach(([key, value]) => value.call(this))
}

env_config(process.env.env_config);

const static_url = JSON.parse(env.api).static_url;
const dllLinkPlugin = new DllLinkPlugin({
  config: require('./webpack.dll.conf.js')
});

const webpackConfig = merge(baseWebpackConfig, {
  entry: {
    app: path.resolve(__dirname, '../src/modules/app/main.js')
  },
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true,
      usePostCSS: true
    })
  },
  devtool: config.build.productionSourceMap ? config.build.devtool : false,
  output: {
    publicPath: static_url,
    path: config.build.assetsRoot,
    filename: utils.assetsPath('js/[name].js?v=[chunkhash]'),
    chunkFilename: utils.assetsPath('js/[id].js?v=[chunkhash]')
  },
  plugins: [
    new cleanWebpackPlugin(['dist/*'], {
      root: path.resolve(__dirname, '../')
    }),
    new webpack.DefinePlugin({
      'process.env': env
    }),
    dllLinkPlugin,
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
      sourceMap: config.build.productionSourceMap,
      parallel: true,
      cache: true
    }),
    // extract css into its own file
    new ExtractTextPlugin({
      filename: utils.assetsPath('css/[name].css?v=[contenthash]'),
      allChunks: true,
    }),
    new OptimizeCSSPlugin({
      cssProcessorOptions: config.build.productionSourceMap
        ? {safe: true, map: {inline: false}}
        : {safe: true}
    }),
    new HtmlWebpackPlugin({
      title: 'JRucker博客管理',
      iconfont: '//at.alicdn.com/t/font_733969_icvberhy4fj.css?v=' + new Date().getTime(),
      vendor: `${static_url}static/dll/vendor.dll.js?v=${dllLinkPlugin.cacheController.configIndex}`,
      template: '!!ejs-loader!./src/template/manager.ejs',
      filename: config.build.assetsRoot + '/index.html',
      inject: false,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      },
      chunks: ['manifest', 'app'],
      chunksSortMode: 'dependency'
    }),
    new HtmlWebpackPlugin({
      title: '登录',
      iconfont: '//at.alicdn.com/t/font_458067_txd3eb7dw1giudi.css?v=' + new Date().getTime(),
      template: '!!ejs-loader!./src/template/login.ejs',
      filename: config.build.assetsRoot + '/login.html',
      inject: false,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      },
      chunks: ['manifest', 'login'],
      chunksSortMode: 'dependency'
    }),
    // keep module.id stable when vendor modules does not change
    new webpack.HashedModuleIdsPlugin(),
    // enable scope hoisting
    new webpack.optimize.ModuleConcatenationPlugin(),
    // split vendor js into its own file
    /*new webpack.optimize.CommonsChunkPlugin({
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
    }),*/
    // This instance extracts shared chunks from code splitted chunks and bundles them
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      minChunks: Infinity
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'app',
      async: 'vendor-async',
      children: true,
      minChunks: 3
    }),
    // copy custom static assets param array [url1,url2]
    new CopyWebpackPlugin((() => {
        let array = [];
        const copyPath = {
          '../src/assets/images': 'static/images',
          '../src/components/theme-switch/theme': 'static/css',
          '../src/libs/jquery/jquery.min.js': 'static/js',
          '../src/libs/uploader/uploader.min.js': 'static/js',
          // '../src/template/refresh.vm': [config.build.vmRoot + '/frame', config.build.vmLoginRoot + '/frame'],
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
      })()
    )
  ]
});

if (config.build.productionGzip) {
  const CompressionWebpackPlugin = require('compression-webpack-plugin');

  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' +
        config.build.productionGzipExtensions.join('|') +
        ')$'
      ),
      threshold: 10240,
      minRatio: 0.8
    })
  )
}

if (config.build.bundleAnalyzerReport) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig;
