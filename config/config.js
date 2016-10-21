var config = require('./default.json')
  , path = require('path')
  , webpack = require('webpack')
  , AssetsPlugin = require('assets-webpack-plugin')

var skeletonRoot = config.client.basePaths.root;
var srcRoot = config.client.basePaths.src;
var scriptsRoot = config.client.scriptsRoot;
var vendorFile = config.client.vendorRoot;

/*
Webpack config
 */
var webpackConfig = {
  debug: true,
  entry: {
    main: path.resolve(scriptsRoot),
    // Add modules you want to load from vendors to this file
    vendor: path.resolve(vendorFile)
  },
  output: {
    filename: 'main.min.[hash].js'
  },
  loaders: [
    { test: /\.js$/, loader: 'babel?presets[]=es2015', exclude: /node_modules/}
    ,{ test: /\.css$/, loader: "style!css" }
  ],
  resolve: {
    // Makes sure the paths are relative to the root and not this file
    root: skeletonRoot,
    // Makes sure the compiler looks for modules in /src and node_modules
    modulesDirectories: [srcRoot, 'node_modules']
  },
  plugins: [
    // Makes sure the vendors are only imported once in this seperate file
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.min.js')
    // writes output to webpack-assets.json (especially important for fingerprint-URLs)
    , new AssetsPlugin({path: path.resolve('server')})
    , new webpack.optimize.UglifyJsPlugin()
  ]
}

/*
 * SASS config
 */
var sassConfig = {
  includePaths: ['node_modules'],
  outputStyle: 'compressed'
}

config.client.webpack = webpackConfig
config.client.sass = sassConfig
module.exports = config