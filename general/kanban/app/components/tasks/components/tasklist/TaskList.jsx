/*面板组容器*/
var React = require('react');

var TaskPanel = require('./taskpanel');
var AddPanel = require('./AddPanel.jsx');


var TaskList = React.createClass({

    render: function() {
        const self = this

        const { tasklist_id, panel_ids, add_panel, proj_id } = this.props.tasklist
    	const taskpanels = this.props.panels.map(function (item, index) {
            return (
                <TaskPanel 
                    key={item.panel_id} 
                    panel={item} 
                    can_edit={item.can_edit} 
                    tasklistId={tasklist_id} 
                    panelIds={panel_ids}
                    firstOne={index === 0}
                    lastOne={index === self.props.panels.length-1}
                    projId={proj_id} />
            )
        })
        return (
            <div className="task-panels">
                <div className="sortable-panels">
                    {taskpanels}
                </div>
                { add_panel ? <AddPanel addPanel={ desc => this.props.addPanel(proj_id, tasklist_id, desc) } /> : null}
            </div>
        )
    },
    componentWillReceiveProps: function(nextProps) {
        if(nextProps.tasklist.tasklist_id) {
            this.props.fetchPanels(nextProps.tasklist.tasklist_id, nextProps.tasklist.proj_id)
        }
    }
});

module.exports = TaskList
