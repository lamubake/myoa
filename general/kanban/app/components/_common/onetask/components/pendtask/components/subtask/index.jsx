var React = require('react');
var SubTask = require('./SubTask.jsx');

var SubTaskContainer = React.createClass({
	render: function() {
		return (
			<SubTask data={this.props.data} />
		);
	}
});

module.exports = SubTaskContainer;