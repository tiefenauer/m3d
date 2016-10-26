var config = require('./config/default.json')
  , path = require('path')
  , webpack = require('webpack')
  , AssetsPlugin = require('assets-webpack-plugin')


module.exports = {
  debug: true,
  entry: {
    main: path.resolve(config.client.scriptsRoot),
    // Add modules you want to load from vendors to this file
    vendor: path.resolve(config.client.vendorRoot)
  },
  output: {
    filename: 'main.min.[hash].js'
  },
  /*
  loaders: [
    { test: /\.js$/, loader: 'babel?presets[]=es2015', exclude: /node_modules/}
    ,{ test: /\.css$/, loader: "style!css" }
  ],
  */
  resolve: {
    // Makes sure the paths are relative to the root and not this file
    root: config.client.basePaths.root,
    // Makes sure the compiler looks for modules in /src and node_modules
    modulesDirectories: [config.client.basePaths.src, 'node_modules']
  },
  plugins: [
    // Makes sure the vendors are only imported once in this seperate file
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.min.js')
    // writes output to webpack-assets.json (especially important for fingerprint-URLs)
    , new AssetsPlugin({path: path.resolve('server')})
    , new webpack.optimize.UglifyJsPlugin()
    , new webpack.ProvidePlugin({
      $: 'jquery',
      jquery: 'jquery',
      'window.jquery': 'jquery',
      jQuery: 'jquery'
    })
  ]
}