require('./calendar.css');

var React = require('react');
var connect = require('react-redux').connect;
var createSelector = require('reselect').createSelector;
var Calendar = require('./Calendar.jsx');

import { fetchCalendarTasks, setCalendarFilter } from '../../actions/calendar'
import { toggleTaskEditModal } from '../../actions/taskEditModal'
import { fetchTasklists } from '../../actions/tasklists'
import{ fetchPanels } from '../../actions/panels'
import{ fetchTasks } from '../../actions/tasks'

//注：fullcalendar接收数据格式和其他模块不同，渲染前先处理相同字段的不同名称
                
const projects = state => state.projects
const calendar = state => state.calendar
const mapStateToProps = createSelector(
    projects,
    calendar,
    (projects, calendar) => {
        let tasks = calendar.tasks.slice()
        tasks = tasks.map(item => {
            return {
                ...item, 
                id: item.taskid, 
                title: item.content, 
                start: item.end
            }
        })

        return {
            
            data: tasks,
            projectData: projects
            
        }
    }
)

const mapDispatchToProps = (dispatch) => {
    return {
        fetchCalendarTasks: (desc) => {
            dispatch(fetchCalendarTasks(desc))
        },
        toggleTaskEditModal: (tasklistId, panelId, taskId) => {
            dispatch(toggleTaskEditModal('show', tasklistId, panelId, taskId))
        },
        setCalendarFilter: (projId) => {
            dispatch(setCalendarFilter(projId))
        },
        fetchTasklists: (projId) => {
            dispatch(fetchTasklists(projId))
        },
        fetchPanels: (tasklistId, projId) => {
            dispatch(fetchPanels(tasklistId, projId))
        },
        fetchTasks: (panelId, tasklistId) => {
            dispatch(fetchTasks(panelId, tasklistId))
        }
    }
}


module.exports = connect(mapStateToProps, mapDispatchToProps)(Calendar)


