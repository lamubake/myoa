var React = require('react');

var ItemText = React.createClass({
	render: function() {
		return (
			<p onClick={this.changeToEdit} className="subtask-content">{this.props.data}</p>
		);
	},
	changeToEdit: function(){
		this.props.cb && this.props.cb();
	}
});

module.exports = ItemText;