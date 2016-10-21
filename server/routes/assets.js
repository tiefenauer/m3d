var express = require('express')
  //, debug = require('debug')('mh-assets')
  , app = express()
  , path = require('path')
  , compression = require('compression')

// CMS Assets

// this must come before app.use(express.static(path.join(__dirname, '../build')))
app.use(compression())

/**
 * serve scripts from build folder
 */
app.use('/js', express.static(path.join(__dirname, '../../build/js'), {
    lastModified: false,
    setHeaders: maxAge(365 * 24 * 60 * 60) /* 1 year */
  })
)

/**
 * serve assetes form build folder
 */
app.use('/assets', express.static(path.join(__dirname, '../../build/assets'), {
    lastModified: false,
    setHeaders: maxAge(8*24*60*60) /* 8 days */
  })
)

/**
 * serve styles from build folder
 */
app.use('/css',  express.static(path.join(__dirname, '../../build/css'), {
    lastModified: false,
    setHeaders: maxAge(365*24*60*60) /* 1 year */
  })
)

/*
app.get('/favicon.ico', function(req, res) {
  res.redirect('/assets/favicons/favicon.ico')
})
*/

function maxAge(seconds){
  return function(res){
    res.set('Cache-Control', 'public, max-age=' + seconds)
  }
}

module.exports = app
