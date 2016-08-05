var React = require('react');
var ProjectsList = require('./components/ProjectsList.jsx');
var ProjectModal = require('./components/projectmodal');
import Tooltip from 'antd/lib/tooltip'

var Projects = React.createClass({
	render: function(){
		const { 
			active, 
			archived, 
			archivedListStatus, 
			toggleArchived, 
			proj_edit_modal,
			toggleProjEditModal
		} = this.props

		return (
			<div className="projects app-main-container">
				<div className="projects-item">
					<div className="projects-title"><span>项目列表</span><hr /></div>
					<ProjectsList projects={active} toggleProjEditModal={toggleProjEditModal} />
				</div>
				<div className="projects-item">
					<div className="projects-title">
						<span>归档项目</span>
						<span> - </span>
						{
							archivedListStatus === "hide" ? 
							<Tooltip placement="right" title="点击展开">
                                                        <span className="projects-showarchive" onClick={() => toggleArchived("show")}>显示</span>
                                                   </Tooltip> : 
                                                   <Tooltip placement="right" title="点击收起">
							    <span className="projects-showarchive" onClick={() => toggleArchived("hide")}>隐藏</span>
                                                   </Tooltip>
						}
						<hr />
					</div>
					{
						archivedListStatus === "hide" ? 
						null : 
						<ProjectsList archived projects={archived} />
					}
				</div>
				{proj_edit_modal.status === 'hide' ? null : <ProjectModal />}
			</div>
		);
	}
});

module.exports = Projects;