
import { RECEIVE_MY_TASKS } from '../actions/myTasks'
import { EDIT_TASK, DELETE_TASK, ADD_TASK } from '../actions/tasks'

const initData = []

export default (state, action) => {
	if(state === undefined) {
		state = initData
	}
	let nextState = [...state]

	switch(action.type) {
		case RECEIVE_MY_TASKS:
			return action.myTasks
			break
		case ADD_TASK:
			nextState.push(action.task)
			return nextState
			break
		case EDIT_TASK:
			const { uid, task } = action
			// if task is an empty object
			if(!task.taskid) {
				return nextState
			}
			let gotTheTask = false
			if(nextState.length > 0) {
				nextState.map((item, index) => {
					if(item.taskid === action.taskId) {
						/*Object.assign(item, action.task)*/
						if(uid) {
							if(uid !== task.creator && uid !== task.executor && !task.member.includes(uid)) {
								nextState = nextState.filter(item => item.taskid !== action.taskId)
							} else {
								nextState[index]= {...action.task}
							}
						}
						
						gotTheTask = true
					}
				})

				if(!gotTheTask) {
					if(uid === task.creator || uid === task.executor || task.member.includes(uid)) {
						nextState.push(task)
					}
				}

			} else {
				if(uid) {
					if(uid === task.creator || uid === task.executor || task.member.includes(uid)) {
						nextState.push(task)
					}
				}
			}
			
			return nextState
			break
		case DELETE_TASK:
			return nextState.filter(item => item.taskid !== action.taskId)
			break
		default:
			return state
	}
}