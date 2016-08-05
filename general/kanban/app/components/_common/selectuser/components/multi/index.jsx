var React = require('react');
var connect = require('react-redux').connect;
var Multi = require('./Multi.jsx');

import { destoryUserSelect } from '../../../../../actions/userselect'
import { ajaxEditTask } from '../../../../../actions/tasks'


const mapStateToProps = (state, ownProps) => {
	const us = ownProps.userselect//(注：数据和组件的命名出现了偏差，数据是userselect,组件是selectuser)
	const { proj_id, panel_id, taskid } = us
	let selected = us.selected
	let task = {}
	if(panel_id) {
		task = state.tasks[panel_id].find(item => item.taskid === taskid)
	}
	if(!selected) {
		selected = task.member
	}
	return {
		allusers: state.members[proj_id],
		task,
		selected
	}
}
const mapDispatchToProps = (dispatch, ownProps) => {
	const us = ownProps.userselect
	const { panel_id, taskid, cb } = us
	return {
		editTask: (desc) => {
			if(!cb) {
				dispatch(ajaxEditTask(panel_id, taskid, desc))
			} else {
				cb(desc.member)
			}
		},
		destoryUserSelect: () => {
			dispatch(destoryUserSelect())
		}
	}
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(Multi)
