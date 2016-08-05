
export const SET_CUR_PROJECT = "SET_CUR_PROJECT"

export const setCurProject = (projId) => {
	return {
		type: SET_CUR_PROJECT,
		projId
	}
}