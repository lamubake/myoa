var React = require('react');

var Footer = React.createClass({
	render: function(){
		return (
			<div className="modal-footer">
				<button className="btn btn-primary" onClick={this.props.saveProject}>保存</button>
				<button className="btn" data-dismiss="modal" aria-hidden="true" onClick={this.props.hideModal}>关闭</button>
			</div>
		);
	}
});

module.exports = Footer;