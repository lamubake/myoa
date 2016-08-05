var React = require('react');
var connect = require('react-redux').connect;
var Project = require('./Project.jsx');

import { hashHistory } from 'react-router'
import { setCurProject } from '../../../../actions/curProject'
import { ajaxDeleteProject, ajaxEditProject } from '../../../../actions/projects'
import { toggleProjEditModal } from '../../../../actions/projEditModal'


// const mapStateToProps = (state, ownProps) => {
// 	return {

// 	}
// }
const mapDispatchToProps = (dispatch) => {
	return {
		setCurProject: (projId) => {
			// dispatch(setCurProject(projId))
			hashHistory.push('/projects/' + projId + '/')
		},
		deleteProject: (projId) => {
			dispatch(ajaxDeleteProject(projId))
		},
		editProject: (projId, desc) => {
			dispatch(ajaxEditProject(projId, desc))
		},
		toggleProjEditModal: (status, projId) => {
			dispatch(toggleProjEditModal(status, projId))
		}
	}
}

module.exports = connect(null, mapDispatchToProps)(Project);