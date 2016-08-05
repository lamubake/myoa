require('./../_common/taskcontainer.css');
require('./mytask.css');

var React = require('react');
var connect = require('react-redux').connect;
var createSelector = require('reselect').createSelector;
var MyTask = require('./MyTask.jsx');


const filter = state => state.my_task_filter
const myTasks = state => state.my_tasks
const uid = state => state.user_info.uid

const mapStateToProps = createSelector(
	filter,
	myTasks,
	uid,
	(filter, myTasks, uid) => {
		let timeout, today, next, done
		switch(filter) {
			case "uncomplete"://包含了我执行和我参与的
				const uncomplete = myTasks.filter(item => item.status === "0" && (item.executor === uid || item.member.includes(uid)))

				timeout = uncomplete.filter(item => item.time_status === "0")
				today = uncomplete.filter(item => item.time_status === "1")
				next = uncomplete.filter(item => item.time_status === "2")
				done = []
				break
			case "complete":
				const complete = myTasks.filter(item => item.status !== "0" && (item.executor === uid || item.member.includes(uid)))

				timeout = []
				today = []
				next = []
				done = complete
				break
			case "creator":
				const creator = myTasks.filter(item => item.creator === uid)

				timeout = creator.filter(item => item.time_status === "0" && item.status === "0")
				today = creator.filter(item => item.time_status === "1" && item.status === "0")
				next = creator.filter(item => item.time_status === "2" && item.status === "0")
				done = creator.filter(item => item.status !== "0")
				break
			case "member"://同样是包含我执行和我参与
				const member = myTasks.filter(item => item.executor === uid || item.member.includes(uid))

				timeout = member.filter(item => item.time_status === "0" && item.status === "0")
				today = member.filter(item => item.time_status === "1" && item.status === "0")
				next = member.filter(item => item.time_status === "2" && item.status === "0")
				done = member.filter(item => item.status !== "0")
				break
			default:

		}

		return {
			filter,
			timeout,
			today,
			next,
			done
		}
	}

)


module.exports = connect(mapStateToProps)(MyTask);