var React = require('react');

var DiscussList = React.createClass({
    render: function() {
        var discuss = this.props.data.map(function (item, i) {
            return (
                <li data-taskaid={item.aid} key={i} className="discuss-item">
                    <a href="javascipt:;" className="discuss-avatar">{item.username}</a>
                    <span className="discuss-time">{item.sendtime}</span>
                    <p className="discuss-content">{item.content}</p>
                </li>
            );
        }, this);
        return (
            <ul className="discuss-list">
                {discuss}
            </ul>
        )
    }
});

module.exports = DiscussList;