var React = require('react');

var ItemEditText = React.createClass({
	render: function() {
		return (
			<textarea ref="content" placeholder="输入子任务内容" className="subtask-content"></textarea>
		);
	}
});

module.exports = ItemEditText;