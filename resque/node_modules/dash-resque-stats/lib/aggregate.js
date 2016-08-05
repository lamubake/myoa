module.exports = function (stats) {
  var data = {}

  data['queue-leaderboard'] = [['Queue', 'Working', 'Pending']].concat(Object.keys(stats.queues).map(function (queue) {
    return [queue, stats.queues[queue].working, stats.queues[queue].pending].join(',')
  })).join('\n')

  data['jobs-processed'] = stats.processed
  data['jobs-failed'] = stats.failed || 0
  data['jobs-processing'] = Object.keys(stats.processing).length
  data['pending'] = Object.keys(stats.queues).reduce(function (p, c) {
    return stats.queues[c].pending + p
  }, 0)
  data['workers'] = stats.workers.length

  data['working'] = {
    value: stats.working,
    start: 0,
    end: stats.workers.length
  }

  var now = new Date
  data['processing'] = [['Queue', 'Worker', 'Running']].concat(Object.keys(stats.processing).map(function (processing) {
    var p = stats.processing[processing]
    return [p.queue, p.worker, now - new Date(p.run_at) + ' (ms)']
  })).join('\n')

  return data
}
