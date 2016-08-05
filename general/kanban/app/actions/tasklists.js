
/* tasklists */

export const REQUEST_TASKLISTS = "REQUEST_TASKLISTS"
export const RECEIVE_TASKLISTS = "RECEIVE_TASKLISTS"

export const EDIT_TASKLIST = "EDIT_TASKLIST"
export const AJAX_EDIT_TASKLIST = "AJAX_EDIT_TASKLIST"

export const requestTasklists = () => {
	return {
		type: REQUEST_TASKLISTS,
		needLoadingIcon: false
	}
}
export const receiveTasklists = (projId, tasklists) => {
	return {
		type: RECEIVE_TASKLISTS,
		projId,
		tasklists
	}
}

//mock data
var mockFetch = [
	{
	    tasklist_id:"tasklist0",
		proj_id:"project0",
		panel_ids:["panel0","panel1","panel2"],
		add_panel:true,
		created_at:"2016-03-05 21:55:00" //任务创建时间
  	}
]

export const fetchTasklists = (projId) => {
	return (dispatch, getState) => {
		// console.info('tasklists')
		if(getState().tasklists[projId]) {//读取state tree中的缓存
			return
		}
		//dispatch(requestTasklists())
		if(__debug__) {
			$.fetch('/api/get_tasklists.php', mockFetch, data => {
				dispatch(receiveTasklists(projId, data))
			})
		} else {
			$.get("/general/kanban/api/get_tasklists.php",
			    {
			        proj_id: projId
			    },
			    (data) => {
			    	//we may need to process the `data` before pass it to the redcuer
					let status = JSON.parse(data).status
					let tasklists = JSON.parse(data).data

					if(status != "1") {
						alert("can't fetch tasklists")
						return false
					}

					if(tasklists.length === undefined) {
						alert("wrong data in fetch tasklists.")
						return false
					}

					tasklists.forEach(item => {
						Object.assign(item, {
							panel_ids: item.panel_ids.split(",")
						})
					})

					dispatch(receiveTasklists(projId, tasklists))
			    }
			)
		}
		
	}
}

export const editTasklist = (projId, desc) => {
	return {
		type: EDIT_TASKLIST,
		projId,
		desc
	}
}

export const ajaxEditTasklist = (projId, desc, syncBackend) => {
	return (dispatch, getState) => {
		// const tasklistId = getState().tasklists[projId][0].tasklist_id
		// const tasklistName = getState().tasklists[projId][0].tasklist_name
		// const panelIds = getState().tasklists[projId][0].panel_ids.join(",") 

		if(__debug__) {
			dispatch(editTasklist(projId, desc))
			if(!syncBackend) return false
			$.fetch('/api/edit_tasklist.php', desc, data => {
				//dispatch(editTasklist(projId, desc))
			})
		} else {
			dispatch(editTasklist(projId, desc))
			const prevTasklist = getState().tasklists[projId][0]
			if(!syncBackend) return false
			$.get('/general/kanban/api/edit_panel_list.php', 
				{
					...prevTasklist,
					...desc,
					panel_ids: desc.panel_ids ? desc.panel_ids.join(",") : prevTasklist.panel_ids.join(",")
				}, 
				data => {
				let status = JSON.parse(data).status
				let tasklist = JSON.parse(data).data

				if(status !== "1") {
					alert("can't edit tasklist")
					return false
				}

				// tasklist = {
				// 	...tasklist,
				// 	panel_ids: tasklist.panel_ids.split(",")
				// }

				// dispatch(editTasklist(projId, tasklist))

			})
		}

		
	}
}




