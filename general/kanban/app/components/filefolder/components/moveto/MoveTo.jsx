var React = require('react');

var FolderTreeContainer = require('./components/foldertree/index.jsx');

var MoveTo = React.createClass({
	render: function() {
		return (
			<div id="filefolder-modal" className="modal filefolder-modal hide" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
				<div className="modal-header">
					<button type="button" className="close" data-dismiss="modal" aria-hidden="true">×</button>
					<h3 id="myModalLabel">移动***谁***至</h3>
				</div>
				<div className="modal-body">
					<FolderTreeContainer {...this.props} />
				</div>
				<div className="modal-footer">
					<button className="btn" data-dismiss="modal" aria-hidden="true">关闭</button>
					<button className="btn btn-primary">确定</button>
				</div>
			</div>
		);
	}
});

module.exports = MoveTo;