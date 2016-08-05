var React = require('react');

var TaskItem = require('./TaskItem.jsx');

var TaskList = React.createClass({
    render: function() {
        var taskitems = this.props.tasks.map(function (item, i) {
            return (
                <TaskItem task={item} key={i} />
            );
        });
        return (
            <div className="task-list preventScroll">  
                {taskitems}
            </div>
        )
    }
});


module.exports = TaskList;