var React = require('react');

var PendTask = require('./components/pendtask/index.jsx');//切换状态
var EditTask = require('./components/edittask/index.jsx');//切换状态

const Editor = (props) => {
    const { pending, tasklistId, panelId, taskId } = props
    return pending ? 
        <PendTask tasklistId={tasklistId} panelId={panelId} taskId={taskId} /> : 
        <EditTask tasklistId={tasklistId} panelId={panelId} taskId={taskId} />
}

var OneTask = React.createClass({
    render: function() {
        const { status } = this.props
    	return status === 'show' ? <Editor {...this.props} /> : null
    }
});

module.exports = OneTask;