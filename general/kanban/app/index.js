require('./polyfill')
require('./setup')

var React = require('react');
var ReactDOM = require('react-dom');
var $ = jQuery;
var Provider = require('react-redux').Provider;
var connect = require('react-redux').connect;

import { Router, hashHistory } from 'react-router'
import configureStore from './configStore'
import { setupUserSelect } from './actions/userselect'
import { fetchAllProjects } from "./actions/projects"
import { fetchMembers } from "./actions/members"

var App = require('./App.jsx');
var Projects = require('./components/projects');
var MyTask = require('./components/mytask');
var Calendar = require('./components/calendar');
var Tasks = require('./components/tasks');


const store = configureStore()
window._store = store

const routes = {
	path: '/',
	component: App,
	indexRoute: { component: Projects },
	childRoutes: [
		{ path: 'mytask', component: MyTask },
		{ path: 'calendar', component: Calendar },
		{ path: 'projects/:projId/', component: Tasks }
	]
}

/* fake a `$.fetch` method for API test */
$.fetch = (url, mockData, callback) => {
	console.log(`<-------- The api is: "${url}". ------->`)
	setTimeout(
		() => callback(mockData),
		200
	)
}
store.dispatch(fetchAllProjects())
store.dispatch(fetchMembers())


ReactDOM.render(
	<Provider store={store}>
    	<Router routes={routes} history={hashHistory} />
	</Provider>,
    $('#root')[0]
);



//-------------------we can write our test here------------------//
/*import { fetchCalendarTasks } from "./actions/calendar"
import { setCalendarFilter } from "./actions/calendar"

import { fetchAllProjects } from "./actions/projects"
import { ajaxAddProject } from "./actions/projects"
import { ajaxEditProject } from "./actions/projects"
import { ajaxDeleteProject } from "./actions/projects"

import { initUserInfo } from "./actions/user"

import { setCurProject } from "./actions/curProject"

import { fetchTasks } from "./actions/tasks"
import { ajaxAddTask } from "./actions/tasks"
import { ajaxEditTask } from "./actions/tasks"
import { ajaxDeleteTask } from "./actions/tasks"

import { fetchSubtasks } from "./actions/subtasks"
import { ajaxAddSubtask } from "./actions/subtasks"
import { ajaxEditSubtask } from "./actions/subtasks"
import { ajaxDeleteSubtask } from "./actions/subtasks"

import { fetchPanels } from "./actions/panels"
import { ajaxAddPanel } from "./actions/panels"
import { ajaxEditPanel } from "./actions/panels"
import { ajaxDeletePanel } from "./actions/panels"

import { fetchTasklists } from "./actions/tasklists"

import { fetchMembers } from "./actions/members"

import { setMyTaskFilter } from "./actions/myTaskFilter"
import { fetchMyTasks } from "./actions/myTasks"


setTimeout(() => {

	//calendar
	_store.dispatch(fetchCalendarTasks())
	_store.dispatch(setCalendarFilter("64563"))


	//projects
	_store.dispatch(fetchAllProjects())
	_store.dispatch(ajaxAddProject())
	_store.dispatch(ajaxEditProject())
	_store.dispatch(ajaxDeleteProject())

	//user_info
	_store.dispatch(initUserInfo(12, "woota"))
	

	//tasks
	_store.dispatch(fetchTasks("panel0"))
	_store.dispatch(ajaxAddTask("panel0"))
	_store.dispatch(ajaxEditTask("panel0", "taskid2"))
	_store.dispatch(ajaxDeleteTask("panel0", "taskid0"))

	//subtasks
	_store.dispatch(fetchSubtasks("task0"))
	_store.dispatch(ajaxAddSubtask("task0"))
	_store.dispatch(ajaxEditSubtask("task0", "subtaskid1"))
	_store.dispatch(ajaxDeleteSubtask("task0", "subtask0"))

	//panels
	_store.dispatch(fetchPanels("tasklist0"))
	_store.dispatch(ajaxAddPanel("tasklist0"))
	_store.dispatch(ajaxEditPanel("tasklist0", "panel2"))
	_store.dispatch(ajaxDeletePanel("tasklist0", "panel0"))

	//tasklists
	_store.dispatch(fetchTasklists("project0"))

},0)*/





