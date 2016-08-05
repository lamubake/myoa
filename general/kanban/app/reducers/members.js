
import { RECEIVE_MEMBERS } from '../actions/members'
import { MODIFY_MEMBERS } from '../actions/members'

const initData = {}

export default (state, action) => {
	if(state === undefined) {
		state = initData
	}
	const nextState = {...state}
	switch(action.type) {
		case RECEIVE_MEMBERS:
			return action.members
		case MODIFY_MEMBERS:
			nextState[action.projId] = action.members
			return nextState
		default:
			return state
	}
}