/*面板任务清单*/
var React = require('react');
var compose = require('redux').compose
var connect = require('react-redux').connect;
var DropTarget = require('react-dnd').DropTarget;
var TaskItem = require('./TaskItem.jsx');

import { resortAddTask, resortDeleteTask, ajaxEditTask } from '../../../../../../../actions/tasks'
import { ajaxEditPanel } from '../../../../../../../actions/panels'

const taskItemTarget = {
    hover(targetProps, monitor) {
        const { resortAddTask, resortDeleteTask, editPanel, editTask, panels } = targetProps

        // drop-target相关属性
        const targetPanelId = targetProps.panelId
        const targetPanelName = targetProps.panelName
        // drag-source相关属性
        const sourceProps = monitor.getItem()
        const sourceTaskId = sourceProps.taskId
        const sourcePanelId = sourceProps.panelId
        const tasklistId = sourceProps.tasklistId
        const sourceTask = sourceProps.task

        
        if(targetPanelId === sourcePanelId) {
            return false
        }

        // 面板中task_ids的排序函数
        const panelAfterResortTasks = (prePanel, sourceTaskId, targetTaskId) => {
            const nextPanel = {...prePanel}
            let nextTaskIds = nextPanel.task_ids.slice()

            let sourceIndex
            let targetIndex
            nextTaskIds.forEach((item, index) => {
                if(item === sourceTaskId) {
                 sourceIndex = index
                }
                if(item === targetTaskId) {
                 targetIndex = index
                }
            })
            if(targetTaskId) {
                nextTaskIds.push(sourceTaskId)
            } else {
                nextTaskIds.splice(sourceIndex,1)
            }
            nextPanel.task_ids = nextTaskIds

            return nextPanel

        }

        const preSourcePanel = panels.find(item => item.panel_id === sourcePanelId)
        const preTargetPanel = panels.find(item => item.panel_id === targetPanelId)
        const nextSourcePanel = panelAfterResortTasks(preSourcePanel, sourceTaskId)
        const nextTargetPanel = panelAfterResortTasks(preTargetPanel, sourceTaskId, 'isPanel')
        
        resortAddTask(targetPanelId, sourceTask)
        resortDeleteTask(sourcePanelId, sourceTaskId)
        editPanel(tasklistId, sourcePanelId, nextSourcePanel, true)
        editPanel(tasklistId, targetPanelId, nextTargetPanel, true)

        const nextTask = {...sourceTask, panel_id: targetPanelId, panel_name: targetPanelName}
        editTask(targetPanelId, sourceTaskId, nextTask, true)
        sourceProps.panelId = targetPanelId

    }
}


var TaskList = React.createClass({

    render: function() {
    	var self = this
        const { panelId, connectDropTarget } = this.props
        const dropTarget = isIE ? a => a : connectDropTarget

    	var taskitems = this.props.tasks.map(function (item, i) {
            return (
                <TaskItem 
                    task={item} 
                    key={item.taskid} 
                    editTask={(desc, syncBackend) => {
                        self.props.editTask(panelId, item.taskid, desc, syncBackend)
                    }} />
            )
        });
        return dropTarget(
            <div className="task-list connectedSortable preventScroll">
        	   {taskitems}
            </div>
        )
    }
});


const mapStateToProps = (state, ownProps) => {
    return {
        panels: state.panels[ownProps.tasklistId]
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        editPanel: (tasklistId, panelId, editData, syncBackend) => {
            dispatch(ajaxEditPanel(tasklistId, panelId, editData, syncBackend))
        },
        editTask: (panelId, taskId, editedData, syncBackend) => {
            dispatch(ajaxEditTask(panelId, taskId, editedData, syncBackend))
        },
        resortAddTask: (panelId, task) => {
            dispatch(resortAddTask(panelId, task))
        },
        resortDeleteTask: (panelId, taskId) => {
            dispatch(resortDeleteTask(panelId, taskId))
        }
    }
}

// module.exports = compose(
//     connect(mapStateToProps, mapDispatchToProps),
//     DropTarget(
//         'taskItem', 
//         taskItemTarget, 
//         (connect, monitor) => ({ connectDropTarget: connect.dropTarget() })
//     )
// )(TaskList)

// module.exports = connect(mapStateToProps, mapDispatchToProps)(TaskList)

module.exports = (() => {
    if(window.isIE) {
        return connect(mapStateToProps, mapDispatchToProps)(TaskList)
    } else {
        return compose(
            connect(mapStateToProps, mapDispatchToProps),
            DropTarget(
                'taskItem', 
                taskItemTarget, 
                (connect, monitor) => ({ connectDropTarget: connect.dropTarget() })
            )
        )(TaskList)
    }
})()


