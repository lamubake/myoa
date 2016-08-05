var React = require('react');

var NewsList = require('./components/NewsList.jsx');

var News = React.createClass({
    render: function() {
        return (
        	<div className="news app-main-container">
        		<NewsList />
        	</div>
        )
    }
});

module.exports = News; 