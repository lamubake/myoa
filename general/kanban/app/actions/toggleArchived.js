
export const TOGGLE_ARCHIVED = "TOGGLE_ARCHIVED"

export const toggleArchived = (status) => {
	return {
		type: TOGGLE_ARCHIVED,
		status
	}
}