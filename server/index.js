var express = require('express')
  , config = require('../config/config').server
  , cluster = require('cluster')
  , debug = require('debug')('m3d-server')
  , path = require('path')
  , favicon = require('serve-favicon')
  , morgan = require('morgan')
  , cookieParser = require('cookie-parser')
  , bodyParser = require('body-parser')
  , assetsRoutes = require('./routes/assets')
  , indexRoutes = require('./routes/index')
  , createRoutes = require('./routes/create');

var app = express();

// view engine setup
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '../client/views'));

app.set('x-powered-by', false)

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
/*
app.use(require('node-sass-middleware')({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true,
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));
*/

app.use(function(req, res, next){
  // set vars for fingerprinted resources
  res.locals.mainjs = require('./webpack-assets.json').main.js
  res.locals.stylescss = require('./rev-manifest.json')['styles.css']
  next()
})

// serve scripts/styles/assets/... from buildfolder and use compression
//app.all(/^\/(js|assets|css||favicon.ico)(\/?.*)?/, assetsRoutes)
app.use('/css', express.static(path.join(__dirname, '../build/css'), {
  lastModified: false,
  //setHeaders: maxAge(365*24*60*60) /* 1 year */
}))
app.use('/js', express.static(path.join(__dirname, '../build/js'), {
  lastModified: false,
  //setHeaders: maxAge(365 * 24 * 60 * 60) /* 1 year */
}))
app.use('/', indexRoutes);
app.use('/create', createRoutes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
if (!module.parent) {
  // only if run directly
  if (cluster.isMaster) {
    // Code to run if we're in the master process
    // Count the machine's CPUs
    var cpuCount = require('os').cpus().length;

    // Create a worker for each CPU
    for (var i = 0; i < cpuCount; i += 1) {
      cluster.fork();
    }

    cluster.on('listening', function(worker, address) {
      //debug('Worker id: %d listening at: %s', worker.id, JSON.stringify(address));
    });

    Object.keys(cluster.workers).forEach(function (id) {
      debug('Worker %d with pid: %d', id, cluster.workers[id].process.pid);
    });

    cluster.on('exit', function(worker, code, signal) {
      debug('Worker %d died: Respawning...', worker.process.pid);
      cluster.fork();
    });
    debug('Application running and listening on port %d', config.port);

  } else {
    // Code to run if we're in a worker process
    app.listen(config.port);
    debug('Worker %d running!', cluster.worker.id);
  }
}
