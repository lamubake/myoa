
import { TOGGLE_PROJ_EDIT_MODAL } from '../actions/projEditModal'

const initData = {
	status: 'hide',
	projId: null
}

export default (state, action) => {
	if(state === undefined) {
		state = initData
	}
	switch(action.type) {
		case TOGGLE_PROJ_EDIT_MODAL:
			return {
				...state,
				status: action.status,
				projId: action.projId
			}
			break
		default:
			return state
	}
}