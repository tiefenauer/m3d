var del = require('del')

module.exports = function(gulp, $, config){
  var destFolder  = config.basePaths.dest + '*';
  var task = function(){
    return del([destFolder])
  }
  task.description = 'cleans the build folder'
  return task
}