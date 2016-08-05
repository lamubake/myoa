var React = require('react');
require('./news.css');

var News = require('./News.jsx');

var NewsContainer = React.createClass({
    render: function() {
        return (
        	<News />
        )
    }
});

module.exports = NewsContainer; 