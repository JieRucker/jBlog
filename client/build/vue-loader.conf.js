'use strict';
const utils = require('./utils');
const path = require('path');
const config = require('../config');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const isProduction = process.env.NODE_ENV === 'production';
const sourceMapEnabled = isProduction
  ? config.build.productionSourceMap
  : config.dev.cssSourceMap;

const cssLoader = {
  loader: 'css-loader',
  options: {
    sourceMap: true
  }
};

function generateLoaders(loader, loaderOptions) {
  const loaders = [cssLoader];

  if (loader) {
    loaders.push({
      loader: loader + '-loader',
      options: Object.assign({}, loaderOptions, {
        sourceMap: true
      })
    })
  }

  // Extract CSS when that option is specified
  // (which is the case during production build)
  return ExtractTextPlugin.extract({
    use: loaders,
    fallback: 'vue-style-loader'
  })

}

const switchLoaders = () => {
  if (isProduction) {
    return utils.cssLoaders({
      sourceMap: sourceMapEnabled,
      extract: true
    })
  } else {
    return {
      css: 'vue-style-loader!css-loader',
      less: 'vue-style-loader!css-loader!less-loader',
      sass: 'vue-style-loader!css-loader!sass-loader',
      scss: generateLoaders('sass').concat(
        {
          loader: 'sass-resources-loader',
          options: {
            resources: path.resolve(__dirname, '../src/assets/public/common.scss')
          }
        }
      )
    }
    /*return {
      css: 'vue-style-loader!css-loader',
      less: 'vue-style-loader!css-loader!less-loader',
      sass: 'vue-style-loader!css-loader!sass-loader',
    }*/
  }
};

module.exports = {
  loaders: switchLoaders(),
  cssSourceMap: sourceMapEnabled,
  cacheBusting: config.dev.cacheBusting,
  transformToRequire: {
    video: ['src', 'poster'],
    source: 'src',
    img: 'src',
    image: 'xlink:href'
  }
};
