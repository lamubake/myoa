var React = require('react');

var AddTask = require('./AddTask.jsx');

var AddTaskContainer = React.createClass({
    render: function() {
        return (
            <AddTask {...this.props} />
        )
    }
});

module.exports = AddTaskContainer;