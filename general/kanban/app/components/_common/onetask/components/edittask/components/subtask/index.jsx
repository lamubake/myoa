var React = require('react');
var connect = require('react-redux').connect;
var SubTask = require('./SubTask.jsx');

//新建还是编辑取决于是否有subtaskid，激活还是关闭

const mapStateToProps = (state, ownProps) => {
	return {
		subTasks: state.subtasks[ownProps.taskId] || []
	}
}
const mapDispatchToProps = (dispatch) => {
	return {

	}
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(SubTask)
