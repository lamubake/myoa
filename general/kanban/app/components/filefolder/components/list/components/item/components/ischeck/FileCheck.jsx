var React = require('react');

var FileCheck = React.createClass({
    render: function() {
        return (
            <span className="iconfont file-checkicon" onClick={this.props.changeChecked}>&#xe68c;</span>   
        )
    }
});

module.exports = FileCheck; 