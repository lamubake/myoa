var React = require('react');

var Status = React.createClass({
    render: function(){
        var text = this.props.status == 0 ? '未完成' : '已完成';
        return (
	        <span>{text}</span>
        )
    }
});

module.exports = Status;