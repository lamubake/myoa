var React = require('react');

var OpBtns = require('./OpBtns.jsx');

var Project = React.createClass({
	render: function(){
		const { member, proj_name, desc, status, proj_id, mem_count } = this.props.project
		const { can_delete, can_archive, can_edit } = this.props.project
		const ops = {
			can_edit,
			can_archive,
			can_delete,
			status,
			deleteProject: () => this.props.deleteProject(proj_id),
			editProject: (desc) => this.props.editProject({...this.props.project, ...desc}),
			toggleProjEditModal: () => this.props.toggleProjEditModal('show', proj_id)
		}

		return (
			<div className="project" onClick={this.handleClick}>
				<div className="project-hd clearfix">
					<div className="project-hd-info pull-left">	
						<span className="iconfont">&#xe68a;</span>
						<span className="project-count">{mem_count}</span>
					</div>
					<OpBtns ops={ops} />
				</div>
				<div className="project-bd">
					<div className="project-content">{proj_name.length > 10 ? proj_name.slice(0,10)+'...' : proj_name}</div>
					<div className="project-desc">{desc}</div>
				</div>
			</div>
		);
	},
	handleClick: function(e) {
		const { proj_id, status } = this.props.project
		if(status !== '0')
			this.props.setCurProject(proj_id)
	}
});

module.exports = Project;