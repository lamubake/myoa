var React = require("react")
var connect = require('react-redux').connect;
import { createSelector } from 'reselect'

var TaskPanel = require("./TaskPanel.jsx")

import { 
	ajaxDeletePanel, 
	reorderPanel, 
	ajaxEditPanel 
} from '../../../../../actions/panels'
import { 
	ajaxAddTask, 
	fetchTasks 
} from '../../../../../actions/tasks'
import { ajaxEditTasklist } from '../../../../../actions/tasklists'
import { startRenamePanel, endRenamePanel } from '../../../../../actions/renamePanel'

/* panel 的数据还是从上层传下来比较好 */
// const panels = (state, ownProps) => state.panels[ownProps.tasklistId]
// const panelId = (state, ownProps) => ownProps.panelId

// const mapStateToProps = createSelector(panels, panelId, (panels, panelId) => {
// 	console.info("inner")
// 	if(panels === undefined) {
// 		panels = []
// 	}
// 	return {
// 		panel: panels.filter( item => item.panel_id === panelId )[0] || {}
// 	}
// })

const mapStateToProps = (state) => {
    return {
        rename_panel_status: state.rename_panel_status
    }
}

const mapDispatchToProps = (dispatch) => {
	return {
		fetchTasks: (panelId, tasklistId) => {
			dispatch(fetchTasks(panelId, tasklistId))
		},
		editPanel: (tasklistId, panelId, desc) => {
			dispatch(ajaxEditPanel(tasklistId, panelId, desc))
		},
		deletePanel: (projId, tasklistId, panelId) => {
			dispatch(ajaxDeletePanel(projId, tasklistId, panelId))
		},
		addTask: (tasklistId, panelId, desc) => {
			dispatch(ajaxAddTask(tasklistId, panelId, desc))
		},
		reorderPanel: (tasklistId, sourcePanelId, targetPanelId) => {
            dispatch(reorderPanel(tasklistId, sourcePanelId, targetPanelId))
        },
        editTasklist: (projId, desc, syncBackend) => {
        	dispatch(ajaxEditTasklist(projId, desc, syncBackend))
        },
        startRenamePanel: () => {
            dispatch(startRenamePanel())
        },
        endRenamePanel: () => {
            dispatch(endRenamePanel())
        }
	}
}


module.exports = connect(mapStateToProps, mapDispatchToProps)(TaskPanel)