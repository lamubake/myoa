import { RECEIVE_PANELS } from '../actions/panels'
import { ADD_PANEL } from '../actions/panels'
import { EDIT_PANEL } from '../actions/panels'
import { DELETE_PANEL } from '../actions/panels'
import { REORDER_PANEL } from '../actions/panels'

const initPanels = {
	init_tasklist: [
		{
		    panel_id:"initpanel0",
			panel_name:"初始化面板1",
			order_id:"",
			tasklist_id:"init_tasklist",
			task_ids:["task0","task2","task3"],
			can_edit:true,
			can_delete:true,
			created_at:"2010-06-28 8:00:00" //任务创建时间
	  	},
	  	{
		    panel_id:"initpanel1",
			panel_name:"初始化面板2",
			order_id:"",
			tasklist_id:"init_tasklist",
			task_ids:["task1"],
			can_edit:false,
			can_delete:false,
			created_at:"2010-06-28 8:00:00" //任务创建时间
	  	},
	  	{
	  		panel_id:"initpanel2",
			panel_name:"初始化面板3",
			order_id:"顺序id",
			tasklist_id:"init_tasklist",
			task_ids:[],
			can_edit:true,
			can_delete:true,
			created_at:"2010-06-28 8:00:00" //任务创建时间
	  	}
	]
};

export default (state, action) => {

	//初始化state
	if(state === undefined) {
		state = initPanels
	}
	//ie全线不支持Object.assign，用stage-2的object spread代替
	/*const nextState = Object.assign({}, state)*/
	const nextState = {...state}
	const curPanels = state[action.tasklistId] || []
	let nextPanels = []

	switch (action.type) {
		case RECEIVE_PANELS:
			nextState[action.tasklistId] = action.panels
			return nextState
			break
		case ADD_PANEL:
			nextPanels = [...curPanels, action.panel]
			nextState[action.tasklistId] = nextPanels
			return nextState
			break
		case DELETE_PANEL:
			nextPanels = curPanels.length > 0 ? curPanels.filter(item => item.panel_id !== action.panelId) : []
			nextState[action.tasklistId] = nextPanels
			return nextState
			break
		case EDIT_PANEL:
			nextPanels = [...curPanels]

			nextPanels = nextPanels.map((item) => {
				if(item.panel_id === action.panelId) {
					return {...item,...action.panel}
				}
				return item
			})
			nextState[action.tasklistId] = nextPanels
			return nextState
			break
		case REORDER_PANEL:
			nextPanels = [...curPanels]

			let sourcePanelIndex
			let targetPanelIndex
			nextPanels.forEach((item, index) => {
				if(item.panel_id === action.sourcePanelId) {
					sourcePanelIndex = index
				}
				if(item.panel_id === action.targetPanelId) {
					targetPanelIndex = index
				}
			})

			const thePanel = nextPanels.splice(sourcePanelIndex, 1)
			nextPanels = [...nextPanels.slice(0, targetPanelIndex), ...thePanel, ...nextPanels.slice(targetPanelIndex)]

			nextState[action.tasklistId] = nextPanels
			return nextState
			break
		default:
			return state
	}
}