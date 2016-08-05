import { fetchMembers } from './members'
import message from 'antd/lib/message'

export const REQUEST_ALL_PROJECTS = "REQUEST_ALL_PROJECTS"
export const RECEIVE_ALL_PROJECTS = "RECEIVE_ALL_PROJECTS"
export const FETCH_ALL_PROJECTS = "FETCH_ALL_PROJECTS"

export const ADD_PROJECT = "ADD_PROJECT"
export const AJAX_ADD_PROJECT = "AJAX_ADD_PROJECT"

export const EDIT_PROJECT = "EDIT_PROJECT"
export const AJAX_EDIT_PROJECT = "AJAX_EDIT_PROJECT"

export const DELETE_PROJECT = "DELETE_PROJECT"
export const AJAX_DELETE_PROJECT = "AJAX_DELETE_PROJECT"

export const AJAX_LOAD_PROJECT = "AJAX_LOAD_PROJECT"
export const RECEIVE_PROJECT = "RECEIVE_PROJECT"


export const requestAllProjects = () => {
	return {
		type: REQUEST_ALL_PROJECTS,
		needLoadingIcon: false
	}
}
export const receiveAllProjects = (allProjects) => {
	return {
		type: RECEIVE_ALL_PROJECTS,
		allProjects
	}
}

const mockFetch = []

export const fetchAllProjects = (uid) => {//need uid to fetch all the relevant projects data
	return (dispatch, getState) => {
		// dispatch(requestAllProjects())

		//in development environment , we use mock data
		if(__debug__) {
			$.fetch('/api/get_all_projects.php', mockFetch, (data) => {
				dispatch(receiveAllProjects(data))
			})
		} else {// in production
			$.get(
				'/general/kanban/api/get_all_projects.php',
				(data) => {
					//we may need to process the `data` before pass it to the redcuer
					let status = JSON.parse(data).status
					let projects = JSON.parse(data).data

					if(status != "1") {
						alert("can't fetch all projects")
						return false
					}

					//uglifyjs does not replace the variable `projects`
					//so the runtime throw an error that `projects` is not defined
					//eg: Object.prototype.toString.call(projects) !== "[object Array]"
					//so i just simply check the length property of the `projects`
					if(projects.length === undefined) {
						alert("wrong data in fetch all projects.")
						return false
					}
					
					//这里还有问题，projects并不会更新
					projects.forEach(item => {
						Object.assign(item, {
							manager: item.manager !== "" ? item.manager.split(",") : [],
							member: item.member !== "" ? item.member.split(",") : [],
							task_lists: item.task_lists.split(",")
						})
					})

					dispatch(receiveAllProjects(projects))
				}
			)
		}

		

		
	}
}

export const addProject = (data) => {
	return {
		type: ADD_PROJECT,
		data
	}
}

const mockAdd = {
    proj_id:"fef",
    proj_name:"测试添加",
    desc:"项目描述",
    status:"1",//项目状态，1激活，0归档
    creator:"项目创建人uid",
    manager:"8",
    member:"12",
    mem_count:12,
    task_lists:["任务列表id"],
    can_delete:false,
    can_archive:false,
    add_manager:false,
    add_member:false,
    can_quit:true,
    can_edit:true,
    created_at:"2016-03-05 21:55:00" //任务创建时间
}

export const ajaxAddProject = (
	desc
) => {
	return (dispatch, getState) => {

		if(__debug__) {
			$.fetch('/api/add_project.php', {...mockAdd, ...desc}, (data) => {
				dispatch(addProject(data))
                             message.success('成功添加项目')
			})
		} else {
			$.get(
				'/general/kanban/api/add_project.php', desc,
				(data) => {
					//we may need to process the `data` before pass it to the redcuer
					let status = JSON.parse(data).status
					let project = JSON.parse(data).data

					if(status != "1") {
						message.error('添加项目失败，请重试')
						return false
					}

					if(typeof project !== "object") {
						message.error('添加项目失败，请重试')
						return false
					}

					project = {
						...project,
						manager: project.manager !== "" ? project.manager.split(",") : [],
						member: project.member !== "" ? project.member.split(",") : [],
						task_lists: project.task_lists.split(",")
					}

					dispatch(addProject(project))
                                    message.success('成功添加项目')
					dispatch(fetchMembers(project.proj_id))
				}
			)
		}
	}
}

export const editProject = (project) => {
	return {
		type: EDIT_PROJECT,
		project
	}
}

export const ajaxEditProject = (editData) => {

	return (dispatch, getState) => {

		if(__debug__) {
			$.fetch('/api/edit_project.php', editData, (data) => {
				dispatch(editProject(data))
			})
		} else {
			$.get(
				'/general/kanban/api/edit_project.php',
				{
					...editData, 
					manager: editData.manager.push ? editData.manager.join(",") : editData.manager,
					member: editData.member.push ? editData.member.join(",") : editData.member,
					task_lists: editData.task_lists.join(",")
				},
				(data) => {
					//we may need to process the `data` before pass it to the redcuer
					let status = JSON.parse(data).status
					let project = JSON.parse(data).data

					if(status != "1") {
						alert("can't edit project")
						return false
					}

					if(typeof project !== "object") {
						alert("wrong data in edit project")
						return false
					}

					project = {
						...project,
						manager: project.manager !== "" ? project.manager.split(",") : [],
						member: project.member !== "" ? project.member.split(",") : [],
						task_lists: project.task_lists.split(",")
					}

					dispatch(editProject(project))
					dispatch(fetchMembers(project.proj_id))
				}
			)
		}
	}
}

export const deleteProject = (projId) => {
	return {
		type: DELETE_PROJECT,
		projId
	}
}
export const ajaxDeleteProject = (projId) => {

	return (dispatch, getState) => {
		if(__debug__) {
			$.fetch('/api/delete_project.php', projId, (data) => {
				dispatch(deleteProject(projId))
                             message.success('成功删除该项目')
			})
		} else {
			$.get(
				'/general/kanban/api/delete_project.php', {proj_id: projId},
				(data) => {
					//we may need to process the `data` before pass it to the redcuer
					let status = JSON.parse(data).status

					if(status != "1") {
						message.error('删除项目失败，请重试')
						return false
					}

					dispatch(deleteProject(projId))
                                    message.success('成功删除该项目')
				}
			)
		}
	}
}






