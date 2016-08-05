import { RECEIVE_SUBTASKS } from '../actions/subtasks'
import { ADD_SUBTASK } from '../actions/subtasks'
import { EDIT_SUBTASK } from '../actions/subtasks'
import { DELETE_SUBTASK } from '../actions/subtasks'



const initData = {}

export default (state, action) => {
	if(state === undefined) {
		state = initData
	}
	/*const nextState = Object.assign({}, state)*/
	const nextState = {...state}
	const curSubtasks = state[action.taskId] || []
	let nextSubtasks = []

	switch (action.type) {
		case RECEIVE_SUBTASKS:
			nextState[action.taskId] = action.subtasks
			return nextState
			break
		case ADD_SUBTASK:
			nextSubtasks = [...curSubtasks, action.subtask]
			nextState[action.taskId] = nextSubtasks
			return nextState
			break
		case DELETE_SUBTASK:
			nextSubtasks = curSubtasks.length > 0 ? curSubtasks.filter(item => item.subtaskid !== action.subtaskId) : []
			nextState[action.taskId] = nextSubtasks
			return nextState
			break
		case EDIT_SUBTASK:
			nextSubtasks = [...curSubtasks]

			nextSubtasks = nextSubtasks.map((item) => {
				if(item.subtaskid === action.subtaskId) {
					return action.subtask
				}
				return item
			})
			nextState[action.taskId] = nextSubtasks
			return nextState
			break
		default:
			return state
	}
}