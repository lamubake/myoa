var WebSocket = require('ws')
  , path = require('path')
  , push = 'wss://push.thedash.com'

module.exports = function (endpoint) {
  var ws = new WebSocket(push + path.resolve('/', endpoint))

  return ws
}
