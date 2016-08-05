var React = require('react');

var NewsItem = require('./NewsItem.jsx');

var NewsList = React.createClass({
    render: function() {
        return (
    		<div className="news-list">
    			<NewsItem />
    			<NewsItem />
    			<NewsItem />
    			<NewsItem />
    		</div>
        )
    }
});

module.exports = NewsList; 