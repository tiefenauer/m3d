var test = require('tape')
  , fork = require('child_process').fork
  , request = require('superagent')

var server
var host = 'http://localhost:3002'

test('setup server', function(t){
  server = fork(__dirname + '/run-server', {stdio: 'pipe'})
  setTimeout(function(){
    t.end()
  }, 1000)
})

test('GET /', function(t){
  request.get(host + '/')
    .end(function(err, resp){
      t.error(err)
      t.ok(resp)
      t.equal(resp.status, 200)
      t.end()
    })
})

test('GET /create', function(t){
  request.get(host + '/create')
    .end(function(err, resp){
      t.error(err)
      t.ok(resp)
      t.equal(resp.status, 200)
      t.end()
    })
})

test('GET /does/not/exist', function(t){
  request
    .get(host + '/does/not/exist')
    .end(function(err, resp){
      t.ok(err)
      t.equal(resp.status, 404)
      t.end()
    })
})

test('kill test server', function(t){
  server.kill()
  t.end()
})
