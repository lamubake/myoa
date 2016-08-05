var rc = require('rc')('resque-stats', {
    poll: 1000 // one second by default
  })
  , stats = require('node-resque-stats')
  , process = require('./lib/process')
  , dignite = require('dignite')
  , url = require('url')

var endpoint = function (u) {
  return url.parse(u).pathname
}

function init (widgets, next) {
  var length = Object.keys(widgets).length
    , sockets = Object.keys(widgets).map(function (type) {
                  var ws = dignite(endpoint(widgets[type]))
                  ws._type = type
                  ws.on('open', done)
                  return ws
                })

  var calls = 0
  function done() {
    if (++calls === length) {
      next(null, sockets)
    }
  }
}

module.exports = function (client, namespace) {
  init(rc.widgets, function (err, widgets) {
    setInterval(function () {
      stats({
        client: client,
        namespace: namespace
      }, function (err, stats) {
        if (err) {
          throw err
        }
        process(widgets, stats)
      })
    }, rc.poll)
  })
}
