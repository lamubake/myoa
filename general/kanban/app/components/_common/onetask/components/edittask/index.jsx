var React = require('react');
var connect = require('react-redux').connect;

var EditTask = require('./EditTask.jsx');

import { toggleTaskEditModal } from '../../../../../actions/taskEditModal'
import { ajaxDeleteTask, ajaxEditTask, addTask, deleteTask, resortAddTask, resortDeleteTask } from '../../../../../actions/tasks'
import { ajaxEditPanel } from '../../../../../actions/panels'

const mapStateToProps = (state, ownProps) => {
	const { tasklistId, panelId, taskId } = ownProps
	return {
		task: state.tasks[panelId].find(item => item.taskid === taskId),
		panels: state.panels[tasklistId]//当前任务列表的所有面板
	}
}
const mapDispatchToProps = (dispatch, ownProps) => {
	const { tasklistId, panelId, taskId } = ownProps
	return {
		maskHandler: () => {
			dispatch(toggleTaskEditModal('hide',null,null,null))
		},
		addTask: (panelId, task) => {
			dispatch(addTask(panelId, task))
		},
		resortAddTask: (panelId, task) => {
			dispatch(resortAddTask(panelId, task))
		},
		deleteTask: (tasklistId, panelId, taskId) => {
			dispatch(ajaxDeleteTask(tasklistId, panelId, taskId))
		},
		editTask: (panelId, taskId, desc, syncBackend, syncFrontend) => {
			dispatch(ajaxEditTask(panelId, taskId, desc, syncBackend, syncFrontend))
		},
		toggleTaskEditModal: (status,panelId,taskId) => {
			dispatch(toggleTaskEditModal(status,tasklistId,panelId,taskId))
		},
		resortDeleteTask: (panelId, taskId) => {
			dispatch(resortDeleteTask(panelId, taskId))
		},
		editPanel: (panelId, desc) => {
			dispatch(ajaxEditPanel(tasklistId, panelId, desc))
		}
	}
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(EditTask)


