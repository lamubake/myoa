
import { RECEIVE_CALENDAR_TASKS } from '../actions/calendar'
import { SET_CALENDAR_FILTER } from '../actions/calendar'
import { EDIT_TASK, DELETE_TASK } from '../actions/tasks'

const initData = {
	tasks: [],
	filter: "all"
}

const calendarTasks = (state, action) => {
	const nextState = state.slice()
	switch (action.type) {
		case RECEIVE_CALENDAR_TASKS:
			return action.calendarTasks
			break
		case EDIT_TASK:
			nextState.forEach((item, index) => {
				if(item.taskid === action.taskId) {
					nextState[index] = {...item, ...action.task}
				}
			})
			return nextState
			break
		case DELETE_TASK:
			return nextState.filter(item => item.taskid !== action.taskId)
			break
		default:
			return state
	}
}

const calendarFilter = (state, action) => {
	switch (action.type) {
		case SET_CALENDAR_FILTER:
			return action.projectId
			break
		default:
			return state
	}
}

export default (state, action) => {
	//初始化state
	if(state === undefined) {
		state = initData
	}
	return {
		tasks: calendarTasks(state.tasks, action),
		filter: calendarFilter(state.filter, action)
	}
}