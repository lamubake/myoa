var React = require('react');

var FileCheck = require('./FileCheck.jsx');
var FileUnCheck = require('./FileUnCheck.jsx');

var IsCheck = React.createClass({
    render: function() {
        return (
        	this.props.isCheck ? <FileCheck changeChecked={this.props.changeChecked} /> : <FileUnCheck changeChecked={this.props.changeChecked} />
        )
    }
});

module.exports = IsCheck; 