/*面板每个任务条*/
var React = require('react');
var compose = require('redux').compose
var connect = require('react-redux').connect;
var createSelector = require('reselect').createSelector;

var DragSource = require('react-dnd').DragSource;
var DropTarget = require('react-dnd').DropTarget;

import { fetchSubtasks } from '../../../../../../../actions/subtasks'
import { toggleTaskEditModal } from '../../../../../../../actions/taskEditModal'
import { resortTask, ajaxEditTask } from '../../../../../../../actions/tasks'
import { ajaxEditPanel } from '../../../../../../../actions/panels'

let initDragPanel = '' // keep to know where the task came from initiallly.
const taskItemSource = {
    beginDrag(props) {
        initDragPanel = props.task.panel_id
        return {
            tasklistId: props.task.tasklist_id,
            panelId: props.task.panel_id,
            taskId: props.task.taskid,
            task: props.task
        }
    },
    isDragging(props, monitor) {
        return props.task.taskid === monitor.getItem().taskId;
    },
    canDrag(props) {
        if(props.task.can_edit === false) {
            return false
        }
        return true
    }
}

let lastOffset = 0 // 纪录上一次的y轴的偏移位置
let towards = 0 // 纪录拖拽的朝向，负数朝上，正数朝下
let lastTarget = 'none' // 上一次dropTarget的id
let lastTowards = 0 // 上一次拖拽的朝向

const taskItemTarget = {
    hover(targetProps, monitor) {

        // 当前偏移量 － 上一次的偏移量 ＝> 当前拖拽的朝向
        towards = monitor.getDifferenceFromInitialOffset().y - lastOffset
        if(towards === 0) {// 如果朝向为0，说明垂直方向没有发生偏移，停止执行并返回
            return false
        }

        if(lastTarget !== targetProps.task.taskid) {
            lastTarget = 'none'
        }

        // 判断两个数是否同号
        const hasSameSign = (a, b) => {
            return a*b < 0 ? false : true
        }
        
        // drop-target相关属性
        const targetTaskId = targetProps.task.taskid
        const targetPanelId = targetProps.task.panel_id
        const targetPanelName = targetProps.task.panel_name
        // drag-source相关属性
        const sourceProps = monitor.getItem()
        const sourceTaskId = sourceProps.taskId
        const sourcePanelId = sourceProps.panelId
        const tasklistId = sourceProps.tasklistId
        const sourceTask = sourceProps.task
        // 任务对象本身的属性
        const { resortTask, panels, editPanel, editTask } = targetProps
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
                const theTask = sourceIndex !== undefined ? nextTaskIds.splice(sourceIndex,1) : [sourceTaskId]
                nextTaskIds = [...nextTaskIds.slice(0,targetIndex), ...theTask, ...nextTaskIds.slice(targetIndex)]
            } else {
                nextTaskIds.splice(sourceIndex,1)
            }
            nextPanel.task_ids = nextTaskIds

            return nextPanel

        }

        if(sourceTaskId !== targetTaskId) {

            if(targetProps.task.taskid !== lastTarget || !hasSameSign(towards, lastTowards)) {
                resortTask(sourcePanelId, targetPanelId, sourceTaskId, targetTaskId, tasklistId)

                if(sourcePanelId === targetPanelId) {// 面板内重排序
                    const prePanel = panels.find(item => item.panel_id === targetPanelId)
                    const nextPanel = panelAfterResortTasks(prePanel, sourceTaskId, targetTaskId)
                    editPanel(tasklistId, targetPanelId, nextPanel, false)
                } else {// 跨面板排序
                    const preSourcePanel = panels.find(item => item.panel_id === sourcePanelId)
                    const preTargetPanel = panels.find(item => item.panel_id === targetPanelId)
                    const nextSourcePanel = panelAfterResortTasks(preSourcePanel, sourceTaskId)
                    const nextTargetPanel = panelAfterResortTasks(preTargetPanel, sourceTaskId, targetTaskId)
                    editPanel(tasklistId, sourcePanelId, nextSourcePanel, false)
                    editPanel(tasklistId, targetPanelId, nextTargetPanel, false)

                    const nextTask = {...sourceTask, panel_id: targetPanelId, panel_name: targetPanelName}
                    editTask(nextTask, false)
                    sourceProps.panelId = targetPanelId
                }
                
                lastTarget = targetProps.task.taskid
            }
            
        }

        lastOffset = monitor.getDifferenceFromInitialOffset().y
        lastTowards = towards
    },
    drop(targetProps, monitor) {
        lastOffset = 0
        lastTarget = 'none'

        // 任务对象本身的属性
        const { editPanel, editTask } = targetProps
        const targetPanelId = targetProps.task.panel_id

        // drag-source相关属性
        const sourceProps = monitor.getItem()
        const tasklistId = sourceProps.tasklistId

        // sync to backend
        if(initDragPanel === targetPanelId) {
            editPanel(tasklistId, targetPanelId, {})
        } else {
            editPanel(tasklistId, initDragPanel, {})
            editPanel(tasklistId, targetPanelId, {})
            editTask({})
        }
        
    }
}

var TaskItem = React.createClass({

    componentDidMount: function() {
        const { taskid } = this.props.task
        // this.props.fetchSubtasks(taskid)
    },
    componentWillReceiveProps: function(nextProps) {
        //这里的更新很奇怪，很凶悍，不要开启
        // this.props.fetchSubtasks(nextProps.task.taskid)
    },
    render: function() {

        const { status, time_status, level, end, content, finish } = this.props.task
        const { connectDragSource, connectDropTarget, isDragging, isOver } = this.props
        
    	var klass = status !== "0" ? 'task-item task-item-done ' : 'task-item ';
        var id = "taskid_" + this.props.task.taskid;
        klass = klass + ' task-item-level task-item-level'+ (status !== "1" ? level : "-done");
        //完成的任务，不需要显示醒目的超时提醒
        var time_status_klass = "task-badges clearfix time_status-" + (status === "1" ? "2" : time_status);

        //because react-dnd does not support ie8, make it won't throw errors
        const dragSource = isIE ? a => a : connectDragSource
        const dropTarget = isIE ? a => a : connectDropTarget
        return dragSource(dropTarget(
            <div style={{ opacity: isDragging ? 0.2 : 1 }} className={klass} onClick={this.openEditTaskModal} id={id}>
            	<div className="task-info">
                    {
                        status === "2" ?
                        <span title="已挂起" className="iconfont task-pend">&#xe69e;</span> : null
                    }
                    {
                        status === "0" ?
                        <span title="完成状态" className="iconfont task-check" onClick={this.toggleFinish}>&#xe68d;</span> : null
                    }
            		{
                        status === "1" ?
                        <span title="完成状态" className="iconfont task-check" onClick={this.toggleFinish}>&#xe68c;</span> : null
                    }
            		<a href="javascript:;" className="task-item-avatar"><img src={this.props.executor.avatar} /></a>
                    <span className="task-title">{content}</span>
            	</div>
            	<div className={time_status_klass}>
            		{

                        end !== "" ?
                        <div className="task-badges-info task-endtime pull-left">
                            <span className="iconfont">&#xe665;</span>
                            {
                                //完成的任务显示完成时间，否则显示截至时间
                                finish !== "" ? 
                                finish.split(" ")[0] : 
                                end
                            }
                        </div> : null
                    }
                    {
                        this.props.subtaskInfo !== "none" && status !== "1" ?
                        <div className="task-badges-info task-subtasks pull-left">
                            <span className="iconfont">&#xe66d;</span>{this.props.subtaskInfo}
                        </div> : null
                    }
            		
                    {/*<div className="task-badges-info task-discuss pull-left"><span className="iconfont">&#xe67c;</span></div>*/}            	
                </div>
            </div>
        ))
    },
	toggleFinish: function(e){
        const taskId = this.props.task.taskid
        const status = this.props.task.status
        const can_edit = this.props.task.can_edit

        if(!can_edit) {
            e.stopPropagation()
            return false
        }

        let finish = ""
        if(status === "0") {
            //生成当前年月日时分秒格式
            finish = (() => {
                const date = new Date()
                const year = date.getFullYear()
                const month = date.getMonth() < 10 ? `0${date.getMonth()+1}` : (date.getMonth()+1)
                const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()
                const rest = date.toTimeString().split(" ")[0]
                return `${year}-${month}-${day} ${rest}`
            })()
        } else {
            finish = ""
        }
        this.props.editTask({
            ...this.props.task,
            status: status === "0" ? "1" : "0",
            finish
        })

		e.stopPropagation()
	},
	openEditTaskModal: function(e){
        const { tasklist_id, panel_id, taskid } = this.props.task
        this.props.showEditModal(tasklist_id, panel_id, taskid)
		e.stopPropagation();
	}
});
const emptyArr = []
const members = (state, ownProps) => state.members[ownProps.task.proj_id] || emptyArr
const executor = (state, ownProps) => ownProps.task.executor
const subtasks = (state, ownProps) => state.subtasks[ownProps.task.taskid] || emptyArr
const panels = (state, ownProps) => {
    return state.panels[ownProps.task.tasklist_id]
}

const mapStateToProps = createSelector(
    members,
    executor,
    subtasks,
    panels,
    (members, executor, subtasks, panels) => {

        let subtaskInfo = ""
        if(subtasks.length > 0) {
            const finish = subtasks.filter(item => item.status === "1")
            subtaskInfo = finish.length + "/" + subtasks.length
        } else {
            subtaskInfo =  "none"
        }
        return {
            executor: members.find(item => item.uid === executor) || {username:'待认领', avatar:'/static/images/avatar/0.gif'},
            subtaskInfo,
            panels
        }
    }
)
const mapDispatchToProps = (dispatch) => {
    return {
        fetchSubtasks: (taskId) => {
            dispatch(fetchSubtasks(taskId))
        },
        showEditModal: (tasklistId, panelId, taskId) => {
            dispatch(toggleTaskEditModal('show', tasklistId, panelId, taskId))
        },
        resortTask: (sourcePanelId, targetPanelId, sourceTaskId, targetTaskId, tasklistId) => {
            dispatch(resortTask(sourcePanelId, targetPanelId, sourceTaskId, targetTaskId, tasklistId))
        },
        editPanel: (tasklistId, panelId, editData, syncBackend) => {
            dispatch(ajaxEditPanel(tasklistId, panelId, editData, syncBackend))
        }
    }
}

/*module.exports = connect(mapStateToProps, mapDispatchToProps)(DragSource(
    'taskItem',
    taskItemSource,
    (connect, monitor) => ({ connectDragSource: connect.dragSource(), isDragging: monitor.isDragging() })
)(DropTarget(
    'taskItem', 
    taskItemTarget, 
    (connect, monitor) => ({ connectDropTarget: connect.dropTarget(), isOver: monitor.isOver()  })
)(TaskItem)))*/

// module.exports = compose(
//     connect(mapStateToProps, mapDispatchToProps),
//     DragSource(
//         'taskItem',
//         taskItemSource,
//         (connect, monitor) => ({ connectDragSource: connect.dragSource(), isDragging: monitor.isDragging() })
//     ),
//     DropTarget(
//         'taskItem', 
//         taskItemTarget, 
//         (connect, monitor) => ({ connectDropTarget: connect.dropTarget() })
//     )
// )(TaskItem)

// module.exports = connect(mapStateToProps, mapDispatchToProps)(TaskItem)

module.exports = (() => {
    if(window.isIE) {
        return connect(mapStateToProps, mapDispatchToProps)(TaskItem)
    } else {
        return compose(
            connect(mapStateToProps, mapDispatchToProps),
            DragSource(
                'taskItem',
                taskItemSource,
                (connect, monitor) => ({ connectDragSource: connect.dragSource(), isDragging: monitor.isDragging() })
            ),
            DropTarget(
                'taskItem', 
                taskItemTarget, 
                (connect, monitor) => ({ connectDropTarget: connect.dropTarget() })
            )
        )(TaskItem)
    }
})()


