var React = require('react');
var connect = require('react-redux').connect;
var Single = require('./Single.jsx');

import { destoryUserSelect } from '../../../../../actions/userselect'
import { ajaxEditTask } from '../../../../../actions/tasks'

const mapStateToProps = (state, ownProps) => {
	const us = ownProps.userselect
	const data = (() => {
		if(us.panel_id) {
			return state.tasks[us.panel_id].find(item => item.taskid === us.taskid)
		} else if(us.subtaskid) {
			return state.subtasks[us.taskid].find(item => item.subtaskid === us.subtaskid)
		} else {
			return {executor: us.selected}
		}
	})()
	return {
		allusers: state.members[us.proj_id],
		data
	}
}
const mapDispatchToProps = (dispatch, ownProps) => {
	const us = ownProps.userselect
	const handler = (() => {
		if(us.panel_id) {
			return ajaxEditTask
		} else if(us.subtaskid) {
			
		} else {
			return () => {}
		}
	})()
	return {
		destoryUserSelect: () => {
			dispatch(destoryUserSelect())
		},
		editSender: (desc) => {
			const panelId = us.panel_id
			const taskId = us.taskid
			const cb = us.cb
			if(cb) {
				cb(desc.executor)
			} else {
				dispatch(handler(panelId,taskId,desc,true,true))
			}
		}
	}
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(Single)
