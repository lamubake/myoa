var React = require('react');

var UnCheckAll = React.createClass({
    render: function() {
        return (
            <span className="iconfont file-checkicon" onClick={this.props.changeAllCheck}>&#xe68d;</span>   
        )
    }
});

module.exports = UnCheckAll; 