var React = require('react');
var connect = require('react-redux').connect;
var createSelector = require('reselect').createSelector;

require('./projects.css');

var Projects = require('./Projects.jsx');

import { toggleArchived } from '../../actions/toggleArchived'
import { toggleProjEditModal } from '../../actions/projEditModal'


const projects = state => state.projects
const archivedListStatus = state => state.archived_list_status
const proj_edit_modal = state => state.proj_edit_modal
const mapStateToProps = createSelector(
	projects, 
	archivedListStatus, 
	proj_edit_modal, 
	(projects, archivedListStatus, proj_edit_modal) => {
		const active = projects.filter(item => item.status === "1")
		const archived = projects.filter(item => item.status === "0")
		return {
			active,
			archived,
			archivedListStatus,
			proj_edit_modal
		}
	}
)
const mapDispatchToProps = (dispatch) => {
	return {
		toggleArchived: (status) => {
			dispatch(toggleArchived(status))
		},
		toggleProjEditModal: () => {
			dispatch(toggleProjEditModal('show', null))
		}
	}
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(Projects);