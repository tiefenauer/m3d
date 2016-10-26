var config = require('./default.json')

/*
 * SASS config
 */
var sassConfig = {
  includePaths: ['node_modules'],
  outputStyle: 'compressed'
}

config.client.sass = sassConfig
module.exports = config