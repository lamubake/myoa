
export const INIT_USER_INFO = "INIT_USER_INFO"

export const initUserInfo = (uid, userName) => {
	return {
		type: INIT_USER_INFO,
		data: {
			uid,
			userName
		}
	}
}