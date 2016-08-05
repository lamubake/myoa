var React = require('react');

var Header = React.createClass({
	render: function(){
		var title = this.props.projId !== null ? '编辑' : '新建';
		return (
			<div className="modal-header">
				<button onClick={this.props.toggleProjEditModal} type="button" className="close" data-dismiss="modal" aria-hidden="true">×</button>
				<h3>{title}项目</h3>
			</div>
		);
	}
});

module.exports = Header;