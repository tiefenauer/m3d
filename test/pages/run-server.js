//var proxyquire = require('proxyquire')
//var server = proxyquire('../../server', { './api': require('./../mock-api')});

var server = require('../../server/app')
module.exports = server

server.listen(3002)
console.log('listening')
