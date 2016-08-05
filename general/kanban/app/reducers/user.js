
import { INIT_USER_INFO } from '../actions/user'

const initData = {
	uid: window.LOGIN_UID || (window.__debug__ === undefined ? "12" : "1"),
	username: window.LOGIN_USER_NAME || (window.__debug__ === undefined ? "雾塔" : "系统管理员")
}
// console.log(window.__debug__)
// console.log(initData)
export default (state, action) => {

	if(state === undefined) {
		state = initData
	}

	switch (action.type) {
		case INIT_USER_INFO:
			return action.data
		default:
			return state
	}
}