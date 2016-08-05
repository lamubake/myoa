var React = require('react');

var ProjectAdd = React.createClass({
	render: function(){
		return (
			<div onClick={this.props.toggleProjEditModal} className="project project-add">
				<div className="project-hd clearfix">
				</div>
				<div className="project-bd">
					<span className="project-icon iconfont">&#xe68e;</span>
					<div className="project-content">创建新项目</div>
				</div>
			</div>
		);
	}
});

module.exports = ProjectAdd;