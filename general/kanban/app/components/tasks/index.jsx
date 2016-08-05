var React = require('react');
var connect = require('react-redux').connect;

require('./../_common/taskcontainer.css');
require('./tasks.css');

var Tasks = require('./Tasks.jsx');

import { fetchTasklists } from '../../actions/tasklists'
import { toggleTaskAddModal } from '../../actions/taskAddModal'



const mapStateToProps = (state, ownProps) => {
	return {
		curProject: ownProps.params.projId,
		tasklistId: state.tasklists[ownProps.params.projId] ? state.tasklists[ownProps.params.projId][0].tasklist_id : ""
	}
}
const mapDispatchToProps = (dispatch) => {
	return {
		fetchTasklists: (projectId) => {
			dispatch(fetchTasklists(projectId))
		},
		toggleTaskAddModal: (projId, tasklistId) => {
			dispatch(toggleTaskAddModal('show', projId, tasklistId))
		}
	}
}

module.exports = connect(mapStateToProps,mapDispatchToProps)(Tasks);


