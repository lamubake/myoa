var React = require('react');

var SubTaskList = require('./components/SubTaskList.jsx');

var SubTask = React.createClass({
	render: function() {
		return (
			<div className="subtask">
				<div className="subtask-list">
					<SubTaskList data={this.props.data} />
				</div>
			</div>
		);
	}
});

module.exports = SubTask;