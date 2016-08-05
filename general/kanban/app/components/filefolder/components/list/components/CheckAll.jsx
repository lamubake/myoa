var React = require('react');

var CheckAll = React.createClass({
    render: function() {
        return (
            <span className="iconfont file-checkicon" onClick={this.props.changeAllCheck}>&#xe68c;</span>   
        )
    }
});

module.exports = CheckAll; 