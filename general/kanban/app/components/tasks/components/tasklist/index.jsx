var React = require("react")
var connect = require('react-redux').connect;
import { createSelector } from 'reselect'

var TaskList = require("./TaskList.jsx")

import { fetchPanels } from '../../../../actions/panels'
import { ajaxAddPanel } from '../../../../actions/panels'
import { ajaxReorderPanels } from '../../../../actions/panels'


const tasklist = (state, ownProps) => state.tasklists[ownProps.projectId] ? state.tasklists[ownProps.projectId][0] : {}
const panels = state => state.panels
const mapStateToProps = createSelector(tasklist, panels, (tasklist, panels) => {
	return {
		tasklist,
		panels: panels[tasklist.tasklist_id] || []
	}
})
const mapDispatchToProps = (dispatch) => {
	return {
		fetchPanels: (tasklistId, projId) => {
			dispatch(fetchPanels(tasklistId, projId))
		},
		addPanel: (projId, tasklistId, desc) => {
			dispatch(ajaxAddPanel(projId, tasklistId, desc))
		},
		reorderPanels: (tasklistId, orderIds) => {
			dispatch(ajaxReorderPanels(tasklistId, orderIds))
		}
	}
}


module.exports = connect(mapStateToProps, mapDispatchToProps)(TaskList)
