var React = require('react');

var Header = React.createClass({
	render: function() {
        return (
        	<div className="modal-header">
				<button onClick={this.props.hideTaskAddModal} type="button" className="close" data-dismiss="modal" aria-hidden="true">×</button>
				<h3>新建任务</h3>
			</div>
        )
    }
});

module.exports = Header;