
import { TOGGLE_ARCHIVED } from '../actions/toggleArchived'

const initData = 'hide'

export default (state, action) => {
	if(state === undefined) {
		state = initData
	}
	switch (action.type) {
		case TOGGLE_ARCHIVED:
			return action.status
		default:
			return state
	}
}