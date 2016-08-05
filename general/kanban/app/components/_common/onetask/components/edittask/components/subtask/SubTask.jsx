var React = require('react');

var Item = require('./components/item/');

var SubTask = React.createClass({
	
	render: function() {
		const { subTasks } = this.props
		const subtasks = subTasks.map(item => {
			return <Item key={item.subtaskid} subtask={item} />
		})
		return (
			<div className="subtask">
				<div className="subtask-list">
					{subtasks}
				</div>
			</div>
		);
	}
});

module.exports = SubTask;