
export const TOGGLE_TASK_EDIT_MODAL = "TOGGLE_TASK_EDIT_MODAL"


export const toggleTaskEditModal = (status, tasklistId, panelId, taskId) => {
	return {
		type: TOGGLE_TASK_EDIT_MODAL,
		status,
		tasklistId,
		panelId,
		taskId
	}
}