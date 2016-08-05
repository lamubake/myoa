
import { RECEIVE_ALL_PROJECTS } from '../actions/projects'
import { ADD_PROJECT } from '../actions/projects'
import { EDIT_PROJECT } from '../actions/projects'
import { DELETE_PROJECT } from '../actions/projects'

const initData = 0 ? [
	{
	    proj_id:"init_project",
	    proj_name:"初始化项目",
	    desc:"",
	    status:"1",//项目状态，1激活，0归档
	    creator:"8",
	    manager:["12"],
	    member:["11","12","5","6","7","8","9","10"],
	    mem_count:20,
	    task_lists:["init_tasklist"],
	    can_delete:true,
	    can_archive:true,
	    add_manager:true,
	    add_member:true,
	    can_quit:true,
	    can_edit:true,
	    created_at:"2010-06-28 8:00:00" //任务创建时间
  	}
] : []


export default (state, action) => {
	//初始化state
	if(state === undefined) {
		state = initData
	}
	switch (action.type) {
		case RECEIVE_ALL_PROJECTS:
			return [...state, ...action.allProjects]
			break
		case ADD_PROJECT:
			return [...state, action.data]
			break
		case EDIT_PROJECT:
			const nextState = []
			const { project } = action
			state.map((item) => {
				if(item.proj_id !== project.proj_id) {
					nextState.push(item)
				} else {
					nextState.push(project)
				}
			})
			return nextState
			break
		case DELETE_PROJECT:
			return state.filter((item) => item.proj_id !== action.projId)
			break
		default:
			return state
	}
}