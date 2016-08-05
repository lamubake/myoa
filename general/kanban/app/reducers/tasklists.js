import { RECEIVE_TASKLISTS, EDIT_TASKLIST } from '../actions/tasklists'


const initData = {
	init_project: [
		{
		    tasklist_id:"init_tasklist",
			proj_id:"init_project",
			panel_ids:["initpanel0","initpanel1","initpanel2"],
			add_panel:true,
			created_at:"2010-06-28 8:00:00" //任务创建时间
	  	}
	]
}


export default (state, action) => {

	if(state === undefined) {
		state = initData
	}

	const { projId, tasklists } = action
	const nextState = {...state}


	switch(action.type) {

		case RECEIVE_TASKLISTS:
			nextState[projId] = tasklists
			return nextState
			break
		case EDIT_TASKLIST:
			//debugger
			let nextTasklists = [...nextState[projId]]
			nextTasklists[0] = {...nextTasklists[0], ...action.desc}
			nextState[projId] = nextTasklists
			return nextState
			break
		default:
			return state
	}
}