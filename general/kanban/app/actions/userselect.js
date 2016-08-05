
export const SETUP_USER_SELECT = "SETUP_USER_SELECT"
export const DESTORY_USER_SELECT = "DESTORY_USER_SELECT"

export const setupUserSelect = (desc) => {
	return {
		type: SETUP_USER_SELECT,
		status: 'show',
		...desc
	}
}

export const destoryUserSelect = (desc) => {
	return {
		type: DESTORY_USER_SELECT,
		status: 'hide',
		...desc
	}
}