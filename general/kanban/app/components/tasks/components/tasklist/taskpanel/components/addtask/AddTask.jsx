/*面板底部新建任务*/
var React = require('react');
var AddTaskBtn = require('./components/AddTaskBtn.jsx');
var AddTaskInfo = require('./components/AddTaskInfo.jsx');

var AddTask = React.createClass({
    render: function() {
        return (
        	<div className="task-add-area">
                {this.props.isAdd ? <AddTaskInfo {...this.props} /> : <AddTaskBtn {...this.props} />}
        	</div>
        )
    }
});

module.exports = AddTask;