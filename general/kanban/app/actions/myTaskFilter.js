
export const SET_MY_TASK_FILTER = "SET_MY_TASK_FILTER"

export const setMyTaskFilter = (filter) => {
	return {
		type: SET_MY_TASK_FILTER,
		filter
	}
}