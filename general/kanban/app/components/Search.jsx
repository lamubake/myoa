var React = require('react');

var Search = React.createClass({
    render: function() {
        return (
            <div className="input-append">
                <input className="span2" type="text" placeholder="快速查找任务" />
                <button className="btn btn-info" type="button"><span className="iconfont">&#xe603;</span></button>
            </div>
        )
    }
});

module.exports = Search;