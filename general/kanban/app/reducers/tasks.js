import { RECEIVE_TASKS } from '../actions/tasks'
import { ADD_TASK } from '../actions/tasks'
import { EDIT_TASK } from '../actions/tasks'
import { DELETE_TASK } from '../actions/tasks'
import { RESORT_ADD_TASK } from '../actions/tasks'
import { RESORT_DELETE_TASK } from '../actions/tasks'
import { RESORT_TASK } from '../actions/tasks'

// import update from 'react-addons-update'

const initTasks = {
	initpanel0: [
		{
			taskid:"task0",
		    status:"0",//0未完成，1已完成， 2已挂起
		    time_status:"0",
		    content:"尽量做到state tree中的数据都是正确的，因为我们不知道自己会依赖哪一部分数据。",
		    start:"2016-06-22",//开始时间
		    end:"2016-04-22",//结束时间
		    finish:"",
		    level:"2",//重要级别，0普通，1紧急，2非常紧急
		    creator:"12",
		    executor:"11",
		    member:["12","8","11","9"],
		    proj_id:"init_project",
		    proj_name:"初始化项目",
		    tasklist_id:"init_tasklist",
		    tasklist_name:"",
		    panel_id:"initpanel0",
		    panel_name:"初始化面板1",
		    order_id:"",//任务排序号
		    sub_tasks:[],
		    root:true,//是否有根权限，有根权限便可对任务进行任何操作
		    can_delete:true,
		    can_pend:false,//能否挂起
		    can_edit:true,
		    create_at:"2016-03-05 21:55:00" //任务创建时间
		},
		{
			taskid:"task2",
		    status:"0",//0未完成，1已完成， 2已挂起
		    time_status:"2",
		    content:"这是第三条任务",
		    start:"2016-06-22",//开始时间
		    end:"2016-04-12",//结束时间
		    finish:"",
		    level:"0",//重要级别，0普通，1紧急，2非常紧急
		    creator:"11",
		    executor:"12",
		    member:["12","9"],
		    proj_id:"init_project",
		    proj_name:"初始化项目",
		    tasklist_id:"init_tasklist",
		    tasklist_name:"",
		    panel_id:"initpanel0",
		    panel_name:"初始化面板1",
		    order_id:"",//任务排序号
		    sub_tasks:[],
		    root:true,//是否有根权限，有根权限便可对任务进行任何操作
		    can_delete:false,
		    can_pend:true,//能否挂起
		    can_edit:true,
		    create_at:"2016-03-05 21:55:00" //任务创建时间
		},
		{
			taskid:"task3",
		    status:"1",//0未完成，1已完成， 2已挂起
		    time_status:"0",
		    content:"这是第四条任务",
		    start:"2016-02-22",//开始时间
		    end:"2016-04-27",//结束时间
		    finish:"2016-03-05 21:55:00",
		    level:"0",//重要级别，0普通，1紧急，2非常紧急
		    creator:"11",
		    executor:"12",
		    member:["12","9"],
		    proj_id:"init_project",
		    proj_name:"初始化项目",
		    tasklist_id:"init_tasklist",
		    tasklist_name:"",
		    panel_id:"initpanel0",
		    panel_name:"初始化面板1",
		    order_id:"",//任务排序号
		    sub_tasks:[],
		    root:true,//是否有根权限，有根权限便可对任务进行任何操作
		    can_delete:true,
		    can_pend:true,//能否挂起
		    can_edit:true,
		    create_at:"2016-03-05 21:55:00" //任务创建时间
		}
	],
	initpanel1: [
		{
			taskid:"task1",
		    status:"0",//0未完成，1已完成， 2已挂起
		    time_status:"1",
		    content:"永远不要直接更改state tree中的数据，所有更改必须显示的通过触发action来进行，通过selector选出来传给组件的数据同样是只可读，不可写。",
		    start:"2016-06-22",//开始时间
		    end:"2016-03-30",//结束时间
		    finish:"",
		    level:"1",//重要级别，0普通，1紧急，2非常紧急
		    creator:"11",
		    executor:"11",
		    member:["12","9"],
		    proj_id:"init_project",
		    proj_name:"初始化项目",
		    tasklist_id:"init_tasklist",
		    tasklist_name:"",
		    panel_id:"initpanel1",
		    panel_name:"初始化面板2",
		    order_id:"",//任务排序号
		    sub_tasks:[],
		    root:true,//是否有根权限，有根权限便可对任务进行任何操作
		    can_delete:false,
		    can_pend:false,//能否挂起
		    can_edit:false,
		    create_at:"2016-03-05 21:55:00" //任务创建时间
		}
	],
	initpanel2: []
};

export default (state, action) => {

	//初始化state
	if(state === undefined) {
		state = initTasks
	}

	/*const nextState = Object.assign({}, state)*/
	const nextState = {...state}
	const curTasks = state[action.panelId] || []
	let nextTasks = []

	switch (action.type) {
		case RECEIVE_TASKS:
			nextState[action.panelId] = action.tasks
			return nextState
			break
		case ADD_TASK:
			nextTasks = [...curTasks, action.task]
			nextState[action.panelId] = nextTasks
			return nextState
			break
		case RESORT_ADD_TASK:
			nextTasks = [...curTasks, action.task]
			nextState[action.panelId] = nextTasks
			return nextState
			break
		case DELETE_TASK:
			nextTasks = curTasks.length > 0 ? curTasks.filter(item => item.taskid !== action.taskId) : []
			nextState[action.panelId] = nextTasks
			return nextState
			break
		case RESORT_DELETE_TASK:
			nextTasks = curTasks.length > 0 ? curTasks.filter(item => item.taskid !== action.taskId) : []
			nextState[action.panelId] = nextTasks
			return nextState
			break
		case EDIT_TASK:
			nextTasks = [...curTasks]

			nextTasks = nextTasks.map((item) => {
				if(item.taskid === action.taskId) {
					return {...item, ...action.task}
				}
				return item
			})
			nextState[action.panelId] = nextTasks
			return nextState
			break
		case RESORT_TASK:
			//debugger
			let nextSourceTasks = [...state[action.sourcePanelId]]
			let nextTargetTasks = action.sourcePanelId !== action.targetPanelId ? 
				[...state[action.targetPanelId]] : nextSourceTasks

			let sourceIndex
			let targetIndex
			nextSourceTasks.forEach((item, index) => {
				if(item.taskid === action.sourceTaskId) {
					sourceIndex = index
				}
			})
			nextTargetTasks.forEach((item, index) => {
				if(item.taskid === action.targetTaskId) {
					targetIndex = index
				}
			})
			const theTask = nextSourceTasks.splice(sourceIndex,1)
			nextTargetTasks = [...nextTargetTasks.slice(0,targetIndex), ...theTask, ...nextTargetTasks.slice(targetIndex)]

			nextState[action.sourcePanelId] = nextSourceTasks
			nextState[action.targetPanelId] = nextTargetTasks	
			
			return nextState
			break
		default:
			return state
	}
}