
import { TOGGLE_TASK_ADD_MODAL } from '../actions/taskAddModal'

const initData = {
	status: 'hide',
	projId: null,
	tasklistId: null
}

export default (state, action) => {
	if(state === undefined) {
		state = initData
	}
	switch(action.type) {
		case TOGGLE_TASK_ADD_MODAL:
			return {
				status: action.status,
				projId: action.projId,
				tasklistId: action.tasklistId
			}
			break
		default:
			return state
	}
}