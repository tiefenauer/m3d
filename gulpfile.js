var gulp = require('gulp')
  , config = require('./config/config').client
  , t = require('./gulp/util/taskHelpers')(gulp, config)

// clean output dir
gulp.task('clean', t.getTask('clean'))

// concat/minify scripts
gulp.task('build:scripts', t.getTask('scripts'))

// concat/minify styles
gulp.task('build:styles', t.getTask('styles'))

gulp.task('build',
  gulp.series(
    'clean',
    gulp.parallel(
      'build:scripts',
      'build:styles'
    )
  )
)