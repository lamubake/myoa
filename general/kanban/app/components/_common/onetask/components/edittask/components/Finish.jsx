var React = require('react');

var Finish = React.createClass({
    render: function() {
        return (
            <span className="iconfont finish" onClick={this.toggleStatus}>&#xe68c;</span>    
        )
    },
    toggleStatus: function(){
    	if(this.props.forbid) {
    		return false
    	}
        this.props.toggleStatus("0");
    }
});

module.exports = Finish;