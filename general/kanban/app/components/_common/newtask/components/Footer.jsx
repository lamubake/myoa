var React = require('react');

var Footer = React.createClass({
	render: function() {
        return (
        	<div className="modal-footer">
				<button className="btn btn-primary" onClick={this.props.saveTask}>保存</button>
				<button className="btn" data-dismiss="modal" aria-hidden="true" onClick={this.props.hideTaskAddModal}>关闭</button>
			</div>
        )
    }
});

module.exports = Footer;