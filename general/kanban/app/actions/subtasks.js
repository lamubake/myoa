
/* subtasks */

export const REQUEST_SUBTASKS = "REQUEST_SUBTASKS"
export const RECEIVE_SUBTASKS = "RECEIVE_SUBTASKS"

export const ADD_SUBTASK = "ADD_SUBTASK"
export const AJAX_ADD_SUBTASK = "AJAX_ADD_SUBTASK"

export const EDIT_SUBTASK = "EDIT_SUBTASK"
export const AJAX_EDIT_SUBTASK = "AJAX_EDIT_SUBTASK"

export const DELETE_SUBTASK = "DELETE_SUBTASK"
export const AJAX_DELETE_SUBTASK = "AJAX_DELETE_SUBTASK"


export const requestSubtasks = () => {
	return {
		type: REQUEST_SUBTASKS,
		needLoadingIcon: false
	}
}
export const receiveSubtasks = (taskId, subtasks) => {
	return {
		type: RECEIVE_SUBTASKS,
		taskId,
		subtasks
	}
}

//mock data
var mockFetch = [
	{
	    subtaskid:"subtask0",
		status:"0",//子任务完成状态，0未完成，1已完成
		start:"2016-03-03",//子任务开始时间
		end:"2016-03-24",//子任务结束时间
		content:"这是一条新取过来的子任务",
		creator:"9",
		executor:"11",
		parent:"task0",
		can_delete:true,
		can_edit:true,
		created_at:"2016-03-05 21:55:00" //任务创建时间
  	},
  	{
	    subtaskid:"subtask1",
		status:"1",//子任务完成状态，0未完成，1已完成
		start:"2016-03-08",//子任务开始时间
		end:"2016-04-05",//子任务结束时间
		content:"这是一条已完成的子任务",
		creator:"9",
		executor:"9",
		parent:"task0",
		can_delete:true,
		can_edit:true,
		created_at:"2016-03-05 21:55:00" //任务创建时间
  	}
]
var mockFetch1 = [
	{
	    subtaskid:"subtask5",
		status:"0",//子任务完成状态，0未完成，1已完成
		start:"2016-03-03",//子任务开始时间
		end:"2016-03-24",//子任务结束时间
		content:"这是一条新取过来的子任务",
		creator:"9",
		executor:"11",
		parent:"task1",
		can_delete:true,
		can_edit:true,
		created_at:"2016-03-05 21:55:00" //任务创建时间
  	}
]

export const fetchSubtasks = (taskId) => {

	return (dispatch, getState) => {
		if(getState().subtasks[taskId]) {//读取state tree中的缓存
			return
		}
		// dispatch(requestSubtasks())
		const mock = taskId === 'task0' ? mockFetch : mockFetch1
		$.fetch('/api/get_subtasks.php', mock, data => {
			dispatch(receiveSubtasks(taskId, data))
		})
	}
}


export const addSubtask = (taskId, subtask) => {
	return {
		type: ADD_SUBTASK,
		taskId,
		subtask
	}
}

let id = 1
const mockAdd = {
	subtaskid:"subtask",
	status:"0",//子任务完成状态，0未完成，1已完成
	start:"2016-03-08",//子任务开始时间
	end:"2016-04-05",//子任务结束时间
	content:"这是一条添加的子任务",
	creator:"9",
	executor:"11",
	parent:"task0",
	can_delete:true,
	can_edit:true,
	created_at:"2016-03-05 21:55:00" //任务创建时间
}

export const ajaxAddSubtask = (
	taskId,
	desc
) => {
	return (dispatch, getState) => {
		const _mockAdd = {...mockAdd, ...desc, subtaskid:id++}
		$.fetch('/api/add_subtask.php', _mockAdd, (data) => {
			dispatch(addSubtask(taskId, data))
		})

		/*$.get(
			'/api/add_project.php',
			{ name, desc },
			(data) => {
				//we may need to process the `data` before pass it to the redcuer
				//process(data)
				dispatch(addProject(data))
			}
		)*/
	}
}


export const deleteSubtask = (taskId, subtaskId) => {
	return {
		type: DELETE_SUBTASK,
		taskId,
		subtaskId
	}
}
export const ajaxDeleteSubtask = (taskId, subtaskId) => {
	return (dispatch, getState) => {
		$.fetch('/api/delete_subtask.php', subtaskId, (data) => {
			dispatch(deleteSubtask(taskId, subtaskId))
		})

		/*$.get(
			'/api/delete_project.php',
			projId,
			(data) => {
				//we may need to process the `data` before pass it to the redcuer
				//process(data)
				dispatch(deleteProject(data))
			}
		)*/
	}
}


export const editSubtask = (taskId, subtaskId, subtask) => {
	return {
		type: EDIT_SUBTASK,
		taskId,
		subtaskId,
		subtask
	}
}

const mockEdit = {
	subtaskid:"subtask1",
	status:"0",//子任务完成状态，0未完成，1已完成
	start:"2016-03-08",//子任务开始时间
	end:"2016-04-05",//子任务结束时间
	content:"这是一条修改后的子任务",
	creator:"9",
	executor:"11",
	parent:"task0",
	can_delete:true,
	can_edit:true,
	created_at:"2016-03-05 21:55:00" //任务创建时间
}

export const ajaxEditSubtask = (taskId, subtaskId, editedData) => {
	const _mockEdit = {...mockEdit, ...editedData, subtaskid:subtaskId}
	return (dispatch, getState) => {
		$.fetch('/api/edit_subtask.php', _mockEdit, (data) => {
			dispatch(editSubtask(taskId, subtaskId, data))
		})

		/*$.get(
			'/api/edit_project.php',
			{ ...editData },
			(data) => {
				//we may need to process the `data` before pass it to the redcuer
				//process(data)
				dispatch(editProject(data))
			}
		)*/
	}
}

