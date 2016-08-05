var React = require('react');

var TaskPanel = require('./TaskPanel.jsx');

var TaskPanels = React.createClass({
    render: function() {
        const { 
            filter,
            timeout,
            today,
            next,
            done
        } = this.props

        return (
            <div className="task-panels">
                {
                    filter !== "complete" ?
                    <TaskPanel 
                    panelId="timeout" 
                    panelName = "已超时" 
                    tasks={timeout} /> : null
                }
                {
                    filter !== "complete" ?
                    <TaskPanel 
                    panelId="today" 
                    panelName = "今天" 
                    tasks={today} /> : null
                }
                {
                    filter !== "complete" ?
                    <TaskPanel 
                    panelId="next" 
                    panelName = "接下来" 
                    tasks={next} /> : null
                }
                {
                    filter !== "uncomplete" ?
                    <TaskPanel 
                    panelId="done" 
                    panelName = "已完成"
                    tasks={done} /> : null
                }
            </div>
        )
    }
});

module.exports = TaskPanels;