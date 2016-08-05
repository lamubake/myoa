var React = require('react');
var connect = require('react-redux').connect;

var MyTaskFilter = require('./components/mytaskfilter/index.jsx');
var TaskPanels = require('./components/TaskPanels.jsx');

import { fetchMyTasks } from '../../actions/myTasks'

var MyTask = React.createClass({
	componentDidMount: function() {
		const { dispatch } = this.props
        dispatch(fetchMyTasks())
	},
    render: function() {
        return (
            <div className="task-container mytask app-main-container">  
            	<MyTaskFilter filter={this.props.filter} />
                <TaskPanels {...this.props} />
            </div>
        )
    }
});



module.exports = connect()(MyTask)