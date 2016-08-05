import message from 'antd/lib/message'
import Modal from 'antd/lib/modal'
import { editTasklist } from './tasklists'

/* panels */

export const REQUEST_PANELS = "REQUEST_PANELS"
export const RECEIVE_PANELS = "RECEIVE_PANELS"

export const ADD_PANEL = "ADD_PANEL"
export const AJAX_ADD_PANEL = "AJAX_ADD_PANEL"

export const EDIT_PANEL = "EDIT_PANEL"
export const AJAX_EDIT_PANEL = "AJAX_EDIT_PANEL"

export const DELETE_PANEL = "DELETE_PANEL"
export const AJAX_DELETE_PANEL = "AJAX_DELETE_PANEL"

export const REORDER_PANEL = "REORDER_PANEL"


export const requestPanels = () => {
	return {
		type: REQUEST_PANELS,
		needLoadingIcon: false
	}
}
export const receivePanels = (tasklistId, panels) => {
	return {
		type: RECEIVE_PANELS,
		tasklistId,
		panels
	}
}

//mock data
var mockFetch = [
	{
	    panel_id:"panel0",
		panel_name:"面板名称1",
		order_id:"顺序id",
		tasklist_id:"所属任务列表id",
		task_ids:["所拥有的任务id"],
		can_edit:true,
		can_delete:true,
		created_at:"2016-03-05 21:55:00" //任务创建时间
  	},
  	{
	    panel_id:"panel1",
		panel_name:"面板名称2",
		order_id:"顺序id",
		tasklist_id:"所属任务列表id",
		task_ids:["所拥有的任务id"],
		can_edit:true,
		can_delete:true,
		created_at:"2016-03-05 21:55:00" //任务创建时间
  	},
  	{
  		panel_id:"panel2",
		panel_name:"面板名称3",
		order_id:"顺序id",
		tasklist_id:"所属任务列表id",
		task_ids:["所拥有的任务id"],
		can_edit:true,
		can_delete:true,
		created_at:"2016-03-05 21:55:00" //任务创建时间
  	}
]

export const fetchPanels = (tasklistId, projId) => {
	return (dispatch, getState) => {
		// console.log('panels')
		if(getState().panels[tasklistId]) {//读取state tree中的缓存
			return
		}
		//dispatch(requestPanels())
		if(__debug__) {
			$.fetch('/api/get_panels.php', mockFetch, data => {
				dispatch(receivePanels(tasklistId, data))
			})
		} else {
			$.get("/general/kanban/api/get_panels.php",
			    {
			        proj_id: projId,
			        tasklist_id: tasklistId
			    },function(data){
			        //we may need to process the `data` before pass it to the redcuer
					let status = JSON.parse(data).status
					let panels = JSON.parse(data).data

					if(status != "1") {
						alert("can't fetch panels")
						return false
					}

					if(panels.length === undefined) {
						alert("wrong data in fetch panels.")
						return false
					}

					panels.forEach(item => {
						Object.assign(item, {
							task_ids: item.task_ids !== "" ? item.task_ids.split(",") : []
						})
					})

					dispatch(receivePanels(tasklistId, panels))
			    }
			)
		}
		
	}
}


export const addPanel = (tasklistId, panel) => {
	return {
		type: ADD_PANEL,
		tasklistId,
		panel
	}
}

let id = 2016
const mockAdd = {
	status: 1,
	data: {
		panel_id:"",
		panel_name:"这是添加面板",
		order_id:"",
		tasklist_id:"init_tasklist",
		task_ids:[],
		can_edit:true,
		can_delete:true,
		created_at:"2016-03-05 21:55:00" //任务创建时间
	}
}

export const ajaxAddPanel = (
	projId,
	tasklistId,
	desc
) => {
	return (dispatch, getState) => {
		const _data = {...mockAdd.data, ...desc, panel_id:id++}
		const _mockAdd = {...mockAdd, data: _data}

		if(__debug__) {
			$.fetch('/api/add_panel.php', _mockAdd, (data) => {
				dispatch(addPanel(tasklistId, data.data))
                             message.success('添加面板成功')
			})
		} else {
			$.get("/general/kanban/api/add_panel.php",
			    {
			        ...desc,
			        tasklist_id: tasklistId
			    },function(data){
			        //we may need to process the `data` before pass it to the redcuer
					let status = JSON.parse(data).status
					let panel = JSON.parse(data).data

					if(status != "1") {
						message.error('添加面板失败，请重试')
						return false
					}

					if(typeof panel !== "object") {
						message.error('添加面板失败，请重试')
						return false
					}

					panel = {
						...panel,
						task_ids: []
					}

					dispatch(addPanel(tasklistId, panel))
                                    message.success('添加面板成功')
					const prevPanels = [...getState().tasklists[projId][0].panel_ids]
					prevPanels.push(panel.panel_id)
					dispatch(editTasklist(projId, {panel_ids: prevPanels}))

			    }
			)
		}
		

	}
}


export const deletePanel= (tasklistId, panelId) => {
	return {
		type: DELETE_PANEL,
		tasklistId,
		panelId
	}
}
export const ajaxDeletePanel = (projId, tasklistId, panelId) => {
	return (dispatch, getState) => {
		//必须要留下两个面板
		if(getState().panels[tasklistId].length <= 2) {
			
                      Modal.error({
                          title: '操作失败',
                          content: '面板数不能小于2'
                      })
			return false
		}

		if(__debug__) {
			$.fetch('/api/delete_panel.php', panelId, (data) => {
				dispatch(deletePanel(tasklistId, panelId))
                             message.success('成功删除面板')
			})
		} else {
			$.get("/general/kanban/api/delete_panel.php",
			    {
			        tasklist_id: tasklistId,
			        panel_id: panelId
			    },
			    function(data){
			        //we may need to process the `data` before pass it to the redcuer
					let status = JSON.parse(data).status

					if(status != "1") {
						message.error('删除面板失败，请重试')
						return false
					}

					dispatch(deletePanel(tasklistId, panelId))
                                    message.success('成功删除面板')

					const prevPanels = [...getState().tasklists[projId][0].panel_ids]
					prevPanels.splice(prevPanels.indexOf(panelId), 1)
					dispatch(editTasklist(projId, {panel_ids: prevPanels}))

			    }
			)
		}
	}
}


export const editPanel = (tasklistId, panelId, panel) => {
	return {
		type: EDIT_PANEL,
		tasklistId,
		panelId,
		panel
	}
}


export const ajaxEditPanel = (tasklistId, panelId, editData, syncBackend) => {

	return (dispatch, getState) => {
		const prevPanel = getState().panels[tasklistId].find(item => item.panel_id === panelId)
		if(__debug__) {
			dispatch(editPanel(tasklistId, panelId, editData))
			//debugger
			if(syncBackend === false) return false
			$.fetch('/api/edit_panel.php', editData, (data) => {
				//dispatch(editPanel(tasklistId, panelId, prevPanel))
			})
		} else {
			dispatch(editPanel(tasklistId, panelId, editData))
			if(syncBackend === false) return false
			$.get("/general/kanban/api/edit_panel.php",
			    {
			        ...prevPanel,
			        ...editData,
			        task_ids: editData.task_ids ? editData.task_ids.join(",") : prevPanel.task_ids.join(",")
			    },
			    function(data){
			        //we may need to process the `data` before pass it to the redcuer
					let status = JSON.parse(data).status

					if(status != "1") {
						alert("can't edit panel")
						// if edit fails, back to the previous state
						//dispatch(editPanel(tasklistId, panelId, prevPanel))
						return false
					}
			    }
			)
		}
	}
}


export const reorderPanel = (tasklistId, sourcePanelId, targetPanelId) => {
	return {
		type: REORDER_PANEL,
		tasklistId,
		sourcePanelId,
		targetPanelId
	}
}





