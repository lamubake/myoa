
import { SET_MY_TASK_FILTER } from '../actions/myTaskFilter'

const initData = "uncomplete"

export default (state, action) => {
	if(state === undefined) {
		state = initData
	}
	switch (action.type) {
		case SET_MY_TASK_FILTER:
			return action.filter
		default:
			return state
	}
}