var React = require('react');

var FileUnCheck = React.createClass({
    render: function() {
        return (
            <span className="iconfont file-checkicon" onClick={this.props.changeChecked}>&#xe68d;</span>   
        )
    }
});

module.exports = FileUnCheck; 