
import { TOGGLE_TASK_EDIT_MODAL } from '../actions/taskEditModal'

const initData = {
	status: 'hide',
	tasklistId: null,
	panelId: null,
	taskId: null
}

// export default 'hey'

export default (state, action) => {
	if(state === undefined) {
		state = initData
	}
	switch(action.type) {
		case TOGGLE_TASK_EDIT_MODAL:
			return {
				...state,
				status: action.status,
				tasklistId: action.tasklistId,
				panelId: action.panelId,
				taskId: action.taskId
			}
			break
		default:
			return state
	}
}