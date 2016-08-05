var React = require('react');

var ProjectFilter = require('./projectfilter');

var Banner = React.createClass({
    render: function() {
        return (
            <div className="tasks-filter">  
               	<ProjectFilter curProject={this.props.curProject} />
				<button className="btn btn-info pull-right quick-addbtn" onClick={this.addTask}>新建任务</button>
            </div>
        )
    },
    addTask: function(){
    	this.props.toggleTaskAddModal(this.props.curProject,this.props.tasklistId)
    }
});

module.exports = Banner;