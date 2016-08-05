var React = require('react');
var connect = require('react-redux').connect;

var PendTask = require('./PendTask.jsx');

import { toggleTaskEditModal } from '../../../../../actions/taskEditModal'
import { ajaxDeleteTask, ajaxEditTask } from '../../../../../actions/tasks'

const mapStateToProps = (state, ownProps) => {
	const { panelId, taskId } = ownProps
	return {
		task: state.tasks[panelId].find(item => item.taskid === taskId)
	}
}
const mapDispatchToProps = (dispatch, ownProps) => {
	const {  tasklistId, panelId, taskId } = ownProps
	return {
		maskHandler: () => {
			dispatch(toggleTaskEditModal('hide',null,null,null))
		},
		deleteTask: () => {
			dispatch(ajaxDeleteTask(tasklistId, panelId, taskId))
		},
		editTask: (desc) => {
			dispatch(ajaxEditTask(panelId, taskId, desc))
		}
	}
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(PendTask)
