var aggregrate = require('./aggregate')

module.exports = function (widgets, stats) {
  var data = aggregrate(stats)
  widgets.forEach(function (widget) {
    widget.send(JSON.stringify(data[widget._type]))
  })
}
