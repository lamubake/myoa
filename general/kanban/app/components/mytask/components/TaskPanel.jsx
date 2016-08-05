var React = require('react');

var TaskPanelInfo = require('./TaskPanelInfo.jsx');
var TaskList = require('./TaskList.jsx');

var TaskPanel = React.createClass({
    render: function() {
    	var klass = "task-panel task-panel-" + this.props.panelId;
    	var panelName = this.props.panelName;
    	var tasksCount = this.props.tasks.length;
        return (
            <div className={klass}>  
                <TaskPanelInfo panelName={panelName} tasksCount={tasksCount} />
                <TaskList tasks={this.props.tasks} />
            </div>
        )
    }
});

module.exports = TaskPanel;