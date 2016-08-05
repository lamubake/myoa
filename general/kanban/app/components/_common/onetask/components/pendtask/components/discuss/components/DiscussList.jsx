var React = require('react');

var DiscussList = React.createClass({
    render: function() {
        var discuss = this.props.data.map(function (item, i) {
            return (
                <li key={i} className="discuss-item">
                    <span className="discuss-avatar">{item.username}</span>
                    <span className="discuss-content">{item.content}</span>
                    <span className="discuss-time">{item.sendtime}</span>
                </li>
            );
        }, this);
        return (
            <ul>
                {discuss}
            </ul>
        )
    }
});

module.exports = DiscussList;