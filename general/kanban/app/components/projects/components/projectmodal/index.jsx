var React = require('react');
var connect = require('react-redux').connect;
var createSelector = require('reselect').createSelector;
var ProjectModal = require('./ProjectModal.jsx');

import { toggleProjEditModal } from '../../../../actions/projEditModal'
import { ajaxAddProject, ajaxEditProject } from '../../../../actions/projects'

const projId = state => state.proj_edit_modal.projId
const projects = state => state.projects
const members = state => state.members
const userInfo = state => state.user_info

const mapStateToProps = createSelector(
	projId,
	projects,
	members,
	userInfo,
	(projId, projects, members, userInfo) => {
		return {
			projId,
			project: projects.find(item => item.proj_id === projId) || {},
			members: members[projId] || [],
			userInfo
		}
	}
)
const mapDispatchToProps = (dispatch) => {
	return {
		toggleProjEditModal: () => {
			dispatch(toggleProjEditModal('hide', null))
		},
		addProject: (desc) => {
			dispatch(ajaxAddProject(desc))
		},
		editProject: (desc) => {
			dispatch(ajaxEditProject(desc))
		}
	}
}



module.exports = connect(mapStateToProps, mapDispatchToProps)(ProjectModal);