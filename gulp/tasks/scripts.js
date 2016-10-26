var  gulpWebpack = require('webpack-stream')
var webpackConfig = require('../../webpack.config')

module.exports = function(gulp, $, config){
  var srcFiles = config.paths.scripts.src
  var destFiles = config.paths.scripts.dest

  var task = function(){
    return gulp.src(srcFiles)
      .pipe($.eslint({envs: ['browser']}))
      .pipe($.eslint.format())
      .pipe(gulpWebpack(webpackConfig))
      .pipe(gulp.dest(destFiles))
  }
  task.description = 'move all js files to destination folder'
  return task;
}