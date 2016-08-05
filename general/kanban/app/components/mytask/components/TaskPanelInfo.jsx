var React = require('react');

var TaskPanelInfo = React.createClass({
    render: function() {
        return (
            <div className="task-panelinfo clearfix">  
                <div className="task-panelname">{this.props.panelName}</div>
                <div className="task-handle">
                    <span className="task-count">{this.props.tasksCount}</span>             
                </div>
            </div>
        )
    }
});

module.exports = TaskPanelInfo;