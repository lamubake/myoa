
import { SETUP_USER_SELECT, DESTORY_USER_SELECT } from '../actions/userselect'

const initData = {
	status: 'hide',
	mode: 'single',
	proj_id: null,
	panel_id: null,
	taskid: null,
	subtaskid: null,
	cb: null,
	selected: null,
	event: null
}

export default (state, action) => {
	if(state === undefined) {
		state = initData
	}
	switch (action.type) {
		case SETUP_USER_SELECT:
			return {
				status: action.status,
				mode: action.mode,
				proj_id: action.proj_id || null,
				panel_id: action.panel_id || null,
				taskid: action.taskid || null,
				subtaskid: action.subtaskid || null,
				cb: action.cb || null,
				selected: action.selected || null,
				event: action.event || null
			}
			break
		case DESTORY_USER_SELECT:
			return {
				status: action.status,
				mode: action.mode,
				proj_id: action.proj_id || null,
				panel_id: action.panel_id || null,
				taskid: action.taskid || null,
				subtaskid: action.subtaskid || null,
				cb: action.cb || null,
				selected: action.selected || null,
				event: action.event || null
			}
			break
		default:
			return state
	}
}