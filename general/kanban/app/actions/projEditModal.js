
export const TOGGLE_PROJ_EDIT_MODAL = "TOGGLE_PROJ_EDIT_MODAL"

export const toggleProjEditModal = (status, projId) => {
	return {
		type: TOGGLE_PROJ_EDIT_MODAL,
		status,
		projId
	}
}