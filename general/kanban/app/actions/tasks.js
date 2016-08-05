import { editPanel } from './panels'
import message from 'antd/lib/message'

/* tasks */

export const REQUEST_TASKS = "REQUEST_TASKS"
export const RECEIVE_TASKS = "RECEIVE_TASKS"

export const ADD_TASK = "ADD_TASK"
export const AJAX_ADD_TASK = "AJAX_ADD_TASK"

export const EDIT_TASK = "EDIT_TASK"
export const AJAX_EDIT_TASK = "AJAX_EDIT_TASK"

export const DELETE_TASK = "DELETE_TASK"
export const AJAX_DELETE_TASK = "AJAX_DELETE_TASK"

export const RESORT_ADD_TASK = "RESORT_ADD_TASK"
export const RESORT_DELETE_TASK = "RESORT_DELETE_TASK"

export const RESORT_TASK = "RESORT_TASK"


export const requestTasks = () => {
	return {
		type: REQUEST_TASKS,
		needLoadingIcon: false
	}
}
export const receiveTasks = (panelId, tasks) => {
	return {
		type: RECEIVE_TASKS,
		panelId,
		tasks
	}
}

//mock data
var mockFetch = []

export const fetchTasks = (panelId, tasklistId) => {

	return (dispatch, getState) => {
		if(getState().tasks[panelId]) {//读取state tree中的缓存
			return
		}
		//dispatch(requestTasks())

		if(__debug__) {
			$.fetch('/api/get_tasks.php', mockFetch, data => {
				dispatch(receiveTasks(panelId, data))
			})
		} else {
			$.get("/general/kanban/api/get_tasks.php",
			    {
			        panel_id: panelId,
			        tasklist_id: tasklistId
			    },
			    function(data){
			        //we may need to process the `data` before pass it to the redcuer
					let status = JSON.parse(data).status
					let tasks = JSON.parse(data).data

					if(status != "1") {
						alert("can't fetch all tasks")
						return false
					}

					if(tasks.length === undefined) {
						alert("wrong data in fetch tasks.")
						return false
					}
					
					tasks.forEach(item => {
						Object.assign(item, {
							member: item.member !== "" ? item.member.split(",") : [],
							sub_tasks: item.sub_tasks !== "" ? item.sub_tasks.split(",") : []
						})
					})

					dispatch(receiveTasks(panelId, tasks))
			    }
			)
		}
		
	}
}


export const addTask = (panelId, task) => {
	return {
		type: ADD_TASK,
		panelId,
		task
	}
}

export const resortAddTask = (panelId, task) => {
	return {
		type: RESORT_ADD_TASK,
		panelId,
		task
	}
}

let id = 1991
const mockAdd = {
	taskid:"",
    status:"0",//0未完成，1已完成， 2已挂起
    time_status: "1",
    content:"这是一条添加任务",
    start:"2016-05-22",//开始时间
    end:"2016-05-22",//结束时间
    finish:"",
    level:"0",//重要级别，0普通，1紧急，2非常紧急
    creator:"12",
    executor:"11",
    member:["11"],
    proj_id:"init_project",
    proj_name:"初始化项目",
    tasklist_id:"init_tasklist",
    panel_id:"initpanel0",
    panel_name:"面板名称",
    sub_tasks:[],
    root:true,//是否有根权限，有根权限便可对任务进行任何操作
    can_delete:true,
    can_pend:false,//能否挂起
    can_edit:true,
    created_at:"2016-03-05 21:55:00" //任务创建时间
}

export const ajaxAddTask = (
	tasklistId,
	panelId,
	desc
) => {
	return (dispatch, getState) => {
		const _mockAdd = {...mockAdd, ...desc, taskid:id++}
		//为更新panel准备
		//还是那一点，绝对不要直接更改store中的数据，否则无法实现time-travel追踪
		const prevPanel = getState().panels[tasklistId].find(item => item.panel_id === panelId)
		const modifiedPanel = {...prevPanel}
		const modifiedTaskIds = modifiedPanel.task_ids.slice()

		if(__debug__) {
			$.fetch('/api/add_task.php', _mockAdd, (data) => {
				dispatch(addTask(panelId, data))
				//添加任务后，需要更新面板数据。
				modifiedTaskIds.push(data.taskid)
				modifiedPanel.task_ids = modifiedTaskIds
				dispatch(editPanel(tasklistId, panelId, modifiedPanel))
                             message.success('成功创建任务')
			})
		} else {
			$.get("/general/kanban/api/add_task.php",
			    {
			    	...desc,
			        panel_id: panelId,
			        member: desc.member ? desc.member.join(",") : ""
			    },
			    function(data){
			        //we may need to process the `data` before pass it to the redcuer
					let status = JSON.parse(data).status
					let task = JSON.parse(data).data

					if(status != "1") {
						message.error('创建任务失败')
						return false
					}

					if(typeof task !== "object") {
						message.error('创建任务失败')
						return false
					}

					task = {
						...task,
						member: task.member !== "" ? task.member.split(",") : [],
						sub_tasks: task.sub_tasks !== "" ? task.sub_tasks.split(",") : []
					}

					dispatch(addTask(panelId, task))
					//添加任务后，需要更新面板数据。
					modifiedTaskIds.push(task.taskid)
					modifiedPanel.task_ids = modifiedTaskIds
					dispatch(editPanel(tasklistId, panelId, modifiedPanel))
                                    message.success('成功创建任务')

			    }
			)
		}

	}
}


export const deleteTask = (panelId, taskId) => {
	return {
		type: DELETE_TASK,
		panelId,
		taskId
	}
}

export const resortDeleteTask = (panelId, taskId) => {
	return {
		type: RESORT_DELETE_TASK,
		panelId,
		taskId
	}
}

export const ajaxDeleteTask = (tasklistId, panelId, taskId) => {
	return (dispatch, getState) => {
		//为更新panel准备
		const prevPanel = getState().panels[tasklistId].find(item => item.panel_id === panelId)
		const modifiedPanel = {...prevPanel}
		modifiedPanel.task_ids = modifiedPanel.task_ids.filter(item => item !== taskId)

		if(__debug__) {
			$.fetch('/api/delete_task.php', taskId, (data) => {
				dispatch(deleteTask(panelId, taskId))
				//删除任务后，需要更新面板数据。
				dispatch(editPanel(tasklistId, panelId, modifiedPanel))
                             message.success('成功删除任务')
			})
		} else {
			$.get("/general/kanban/api/delete_task.php",
			    {
			        panel_id: panelId,
			        taskid: taskId
			    },
			    function(data){
			        //we may need to process the `data` before pass it to the redcuer
					let status = JSON.parse(data).status

					if(status != "1") {
						message.error('删除任务失败')
						return false
					}

					dispatch(deleteTask(panelId, taskId))
					//删除任务后，需要更新面板数据。
					dispatch(editPanel(tasklistId, panelId, modifiedPanel))
                                    message.success('成功删除任务')
			    }
			)
		}
	}
}


export const editTask = (panelId, taskId, task, uid) => {
	return {
		type: EDIT_TASK,
		panelId,
		taskId,
		task,
		uid//uid用来过滤更改执行者，或参与者后。次任务不再属于我的任务，既（非我创建，非我执行，非我参与）
	}
}


export const ajaxEditTask = (panelId, taskId, editedData, syncBackend, syncFrontend) => {

	return (dispatch, getState) => {
		const myUid = getState().user_info.uid

		if(__debug__) {
			dispatch(editTask(panelId, taskId, editedData, myUid))
			if(syncBackend === false) return false
			$.fetch('/api/edit_task.php', editedData, (data) => {
				//dispatch(editTask(panelId, taskId, data, myUid))
			})
		} else {
			dispatch(editTask(panelId, taskId, editedData, myUid))
			const prevTask = getState().tasks[panelId].find(item => item.taskid === taskId)
			if(syncBackend === false) return false
			$.get("/general/kanban/api/edit_task.php",
			    {
			    	...prevTask,
			        panel_id: panelId,
			        taskid: taskId,
			        member: prevTask.member.join(","),
			        sub_tasks: prevTask.sub_tasks.join(",")
			    },
			    function(data){
			        //we may need to process the `data` before pass it to the redcuer
					let status = JSON.parse(data).status
					let task = JSON.parse(data).data

					if(status != "1") {
						alert("can't edit task")
						return false
					}

					if(typeof task !== "object") {
						alert("wrong data in edit task")
						return false
					}

					if(syncFrontend !== true) return false

					task = {
						...task,
						member: task.member !== "" ? task.member.split(",") : [],
						sub_tasks: task.sub_tasks !== "" ? task.sub_tasks.split(",") : []
					}

					dispatch(editTask(panelId, taskId, task, myUid))
			    }
			)
		}
		
	}
}

export const resortTask = (sourcePanelId, targetPanelId, sourceTaskId, targetTaskId, tasklistId) => {
	return {
		type: RESORT_TASK,
		sourcePanelId,
		targetPanelId,
		sourceTaskId,
		targetTaskId,
		tasklistId
	}
}

