/*单个面板*/
var React = require('react');
var compose = require('redux').compose;
var DragSource = require('react-dnd').DragSource;
var DropTarget = require('react-dnd').DropTarget;

var OpBtns = require('./components/OpBtns.jsx');
var TaskList = require('./components/tasklist');
var AddTask = require('./components/addtask');


const panelSource = {
    beginDrag(props) {
        return {
            panelId: props.panel.panel_id
        }
    },
    canDrag(props) {
        if(props.rename_panel_status === 'editing') {
            return false
        }
        if(props.can_edit === false) {
            return false
        }
        return true
    }
}

const panelTarget = {
    hover(targetProps, monitor) {
        const { tasklistId, reorderPanel, editTasklist, projId, panelIds } = targetProps
        const targetPanelId = targetProps.panel.panel_id

        const sourceProps = monitor.getItem()
        const sourcePanelId = sourceProps.panelId

        const panelIdsAfterReorder = (panelIds, sourcePanelId, targetPanelId) => {
            let sourcePanelIndex
            let targetPanelIndex
            let nextPanelIds = [...panelIds]

            panelIds.forEach((item, index) => {
                if(item === sourcePanelId) {
                    sourcePanelIndex = index
                }
                if(item === targetPanelId) {
                    targetPanelIndex = index
                }
            })

            const thePanelId = nextPanelIds.splice(sourcePanelIndex, 1)
            nextPanelIds = [...nextPanelIds.slice(0, targetPanelIndex), ...thePanelId, ...nextPanelIds.slice(targetPanelIndex)]

            return nextPanelIds
        }

        if(sourcePanelId !== targetPanelId) {
            reorderPanel(tasklistId, sourcePanelId, targetPanelId)
            const nextPanelIds = panelIdsAfterReorder(panelIds, sourcePanelId, targetPanelId)
            editTasklist(projId, {panel_ids: nextPanelIds})
        }
    },
    drop(targetProps, monitor) {
        // sync to the backend just for once
        const { editTasklist, projId } = targetProps
        editTasklist(projId, {}, true)
    }
}


var TaskPanel = React.createClass({
    
    getInitialState: function() {
       return {
           isAdd: false
       };
    },
    render: function() {

        const { can_edit, panel_name, panel_id } = this.props.panel;
        var id = "panelid_"+ panel_id;
        const taskCount = this.props.panel.task_ids ? this.props.panel.task_ids.length : 0;
        const { projId, tasklistId, editPanel, deletePanel, addTask, connectDragSource, connectDropTarget, isDragging, panelIds } = this.props;

        var klass = this.state.isAdd ? 'task-panel isActive' : 'task-panel';

        //because react-dnd does not support ie8, make it won't throw errors
        const dragSource = isIE ? a => a : connectDragSource
        const dropTarget = isIE ? a => a : connectDropTarget
        return dragSource(dropTarget(
            <div style={{ opacity : isDragging ? 0.3 : 1}} className={klass}  id={id} >  
            	<OpBtns 
                    id={panel_id}
                    tasklistId={tasklistId}
                    panelIds={panelIds}
                    name={panel_name}
                    count={taskCount}
                    canEdit={can_edit} 
                    firstOne={this.props.firstOne}
                    lastOne={this.props.lastOne}
                    reorderPanel={this.props.reorderPanel} 
                    startRenamePanel={this.props.startRenamePanel} 
                    endRenamePanel={this.props.endRenamePanel} 
                    editTasklist={(desc) => this.props.editTasklist(projId, desc, true)}
                    editPanel={(desc) => editPanel(tasklistId, panel_id, {...this.props.panel, ...desc})} 
                    deletePanel = {() => deletePanel(projId, tasklistId, panel_id)} />

            	<TaskList panelId={panel_id} panelName={panel_name} tasklistId={tasklistId} />
                <AddTask isAdd={this.state.isAdd} toggleActive={this.toggleActiveCallback} addTask={(desc) => addTask(tasklistId, panel_id, desc)} />
            </div>
        ))
    },
    componentDidMount: function() {
        const { panel_id, tasklist_id } = this.props.panel
        this.props.fetchTasks(panel_id, tasklist_id)
    },
    componentWillReceiveProps: function(nextProps) {
        //审查代码时取消，这一条语句貌似没有必要
        // this.props.fetchTasks(nextProps.panel.panel_id)
    },
    toggleActiveCallback: function(){
        this.setState({isAdd:!this.state.isAdd});
    }
});

// module.exports = compose(
//     DragSource(
//         'panel',
//         panelSource,
//         (connect, monitor) => ({ connectDragSource: connect.dragSource(), isDragging: monitor.isDragging() })
//     ),
//     DropTarget(
//         'panel',
//         panelTarget,
//         (connect, monitor) => ({ connectDropTarget: connect.dropTarget() })
//     )
// )(TaskPanel)


// module.exports = TaskPanel

module.exports = (() => {
    if(window.isIE) {
        return TaskPanel
    } else {
        return compose(
            DragSource(
                'panel',
                panelSource,
                (connect, monitor) => ({ connectDragSource: connect.dragSource(), isDragging: monitor.isDragging() })
            ),
            DropTarget(
                'panel',
                panelTarget,
                (connect, monitor) => ({ connectDropTarget: connect.dropTarget() })
            )
        )(TaskPanel)
    }
})()

