require('./onetask.css');

//编辑单条任务弹框
var React = require('react');
var connect = require('react-redux').connect;
var createSelector = require('reselect').createSelector;

var OneTask = require('./OneTask.jsx');



const taskEditModal = state => state.task_edit_modal
const tasks = state => state.tasks

const mapStateToProps = createSelector(
    taskEditModal,
    tasks,
    (taskEditModal, tasks) => {
        const { status, tasklistId, panelId, taskId } = taskEditModal
        let pending = false
        if(panelId) {
            const theTasks = tasks[panelId]
            pending = theTasks.find(item => item.taskid === taskId).status === "2"
        }
        return {
            pending,
            status,
            tasklistId,
            panelId,
            taskId
        }
    }
)

module.exports = connect(mapStateToProps)(OneTask)
