var React = require('react');

var NewsItem = React.createClass({
    render: function() {
        return (
			<div className="news-item">
				<a href="javascript:;" className="news-avatar">
					<img src="http://127.0.0.1/inc/attach_old.php?ATTACHMENT_ID=avatar&ATTACHMENT_NAME=1.gif&DIRECT_VIEW=1&r=29661" />
				</a>
				<div className="news-info">
					<div className="news-title">
						谁做了什么谁做了什么谁做了什么谁做了什么谁做了什么谁做了什么谁做了什么谁做了什么谁做了什么谁做了什么
					</div>
					<div className="news-time">
						2016-03-07
					</div>
				</div>
			</div>
        )
    }
});

module.exports = NewsItem; 