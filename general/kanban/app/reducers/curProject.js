
import { SET_CUR_PROJECT } from '../actions/curProject'

const initData = ""

export default (state, action) => {
	if(state === undefined) {
		state = initData
	}

	switch(action.type) {
		case SET_CUR_PROJECT:
			return action.projId
		default:
			return state
	}
}