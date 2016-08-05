var React = require('react');
var connect = require('react-redux').connect;
var createSelector = require('reselect').createSelector;
var NewTask = require('./NewTask.jsx');

import { toggleTaskAddModal } from '../../../actions/taskAddModal'
import { ajaxAddTask } from '../../../actions/tasks'

const NewTaskContainer = React.createClass({
	render: function() {
		const { taskAddModal } = this.props
		return taskAddModal.status === "show" ? <NewTask {...this.props} /> : null
	}
})

const taskAddModal = state => state.task_add_modal
const panels = state => state.panels || []
const userInfo = state => state.user_info 

const mapStateToProps = createSelector(
	taskAddModal,
	panels,
	userInfo,
	(taskAddModal, panels, userInfo) => {
		const { projId, tasklistId } = taskAddModal
		const { uid } = userInfo
		return {
			taskAddModal,
			panels: panels[tasklistId],
			executor: uid
		}
	}
)
const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		hideTaskAddModal: () => {
			dispatch(toggleTaskAddModal('hide',null,null))
		},
		addTask: (tasklistId, panelId, desc) => {
			dispatch(ajaxAddTask(tasklistId, panelId, desc))
		}
	}
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(NewTaskContainer)
