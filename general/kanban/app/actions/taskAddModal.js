
export const TOGGLE_TASK_ADD_MODAL = "TOGGLE_TASK_ADD_MODAL"

export const toggleTaskAddModal = (status, projId, tasklistId) => {
	return {
		type: TOGGLE_TASK_ADD_MODAL,
		status,
		projId,
		tasklistId
	}
}