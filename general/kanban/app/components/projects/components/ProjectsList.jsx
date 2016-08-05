var React = require('react');

var Project = require('./project/index.jsx');
var ProjectAdd = require('./ProjectAdd.jsx');

var ProjectsList = React.createClass({

	render: function(){
		const { projects, archived, toggleProjEditModal } = this.props
		return (
			<div className="projects-list clearfix">
				{projects.map(item => <Project project={item} key={item.proj_id} />)}
				{!archived ? <ProjectAdd toggleProjEditModal={toggleProjEditModal} /> : null}
			</div>
		);
	}
});

module.exports = ProjectsList;