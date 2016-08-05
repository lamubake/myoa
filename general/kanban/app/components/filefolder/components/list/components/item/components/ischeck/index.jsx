var React = require('react');

var IsCheck = require('./IsCheck.jsx');

var IsCheckContainer = React.createClass({
    render: function() {
        return (
            <IsCheck {...this.props} />
        )
    }
});

module.exports = IsCheckContainer; 