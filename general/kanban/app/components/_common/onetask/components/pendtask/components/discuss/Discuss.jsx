var React = require('react');

var DiscussList = require('./components/DiscussList.jsx');

var Discuss = React.createClass({
    render: function() {
    	return (
            <div>
                <DiscussList data={this.props.data} />
            </div>
    	)
    }
});

module.exports = Discuss;