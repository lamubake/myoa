
var React = require("react")
var connect = require('react-redux').connect

var TaskList = require("./TaskList.jsx")

import { ajaxEditTask } from '../../../../../../../actions/tasks'


const mapStateToProps = (state, ownProps) => {
	const { panelId } = ownProps
	return {
		tasks: state.tasks[panelId] || []
	}
}
const mapDispatchToProps = (dispatch) => {
	return {
		editTask: (panelId, taskId, desc, syncBackend) => {
			dispatch(ajaxEditTask(panelId, taskId, desc, syncBackend))
		}
	}
}


module.exports = connect(mapStateToProps, mapDispatchToProps)(TaskList)