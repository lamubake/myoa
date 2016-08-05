var React = require('react');

var Filter = React.createClass({
    render: function() {
    	return (
    		<input type="text" ref="keyword" className="sel-keyword" placeholder="查找成员" onKeyUp={this.filter} />
    	);
    },
    filter: function(){
    	this.props.filter($.trim(this.refs.keyword.value));
    }
});

module.exports = Filter;