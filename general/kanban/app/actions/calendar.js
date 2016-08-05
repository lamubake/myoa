
export const REQUEST_CALENDAR_TASKS = "REQUEST_CALENDAR_TASKS"
export const RECEIVE_CALENDAR_TASKS = "RECEIVE_CALENDAR_TASKS"
export const FETCH_CALENDAR_TASKS = "FETCH_CALENDAR_TASKS"


export const requestCalendarTasks = () => {
	return {
		type: REQUEST_CALENDAR_TASKS,
		needLoadingIcon: false
	}
}
export const receiveCalendarTasks = (calendarTasks) => {
	return {
		type: RECEIVE_CALENDAR_TASKS,
		calendarTasks
	}
}

export const fetchCalendarTasks = (desc) => {
	return (dispatch, getState) => {
		// dispatch(requestCalendarTasks())
		console.log(`请求日历${JSON.stringify(desc)}`)
		
		if(__debug__) {
			return false
		} else {
			$.get("/general/kanban/api/get_calendar_tasks.php",
				desc,
				function(data){
			        //we may need to process the `data` before pass it to the redcuer
					let status = JSON.parse(data).status
					let cTasks = JSON.parse(data).data

					if(status != "1") {
						alert("can't fetch all cTasks")
						return false
					}

					if(cTasks.length === undefined) {
						alert("wrong data in fetch all cTasks.")
						return false
					}

					cTasks.forEach(item => {
						Object.assign(item, {
							member: item.member !== "" ? item.member.split(",") : [],
							sub_tasks: item.sub_tasks !== "" ? item.sub_tasks.split(",") : []
						})
					})

					dispatch(receiveCalendarTasks(cTasks))
			    }
			)
		}
		
	}
}




export const SET_CALENDAR_FILTER = "SET_CALENDAR_FILTER"

export const setCalendarFilter = (projectId) => {
	return {
		type: SET_CALENDAR_FILTER,
		projectId
	}
}


