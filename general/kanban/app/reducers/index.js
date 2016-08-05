import tasks from './tasks'
import calendar from './calendar'
import projects from './projects'
import user_info from './user'
import cur_project from './curProject'
import panels from './panels'
import tasklists from './tasklists'
import archived_list_status from './toggleArchived'
import proj_edit_modal from './projEditModal'
import members from './members'
import my_task_filter from './myTaskFilter'
import my_tasks from './myTasks'
import task_edit_modal from './taskEditModal'
import userselect from './userselect'
import subtasks from './subtasks'
import task_add_modal from './taskAddModal'
import rename_panel_status from './renamePanel'


const reducers = {
	cur_project,
	archived_list_status,
	my_task_filter,
       rename_panel_status,
	tasks,
	calendar,
	projects,
	user_info,
	panels,
	tasklists,
	proj_edit_modal,
	members,
	my_tasks,
	task_edit_modal,
	task_add_modal,
	userselect,
	subtasks
}

export default reducers