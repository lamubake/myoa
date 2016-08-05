var React = require('react');

var UnFinish = React.createClass({
    render: function() {
        return (
            <span className="iconfont unfinish" onClick={this.toggleStatus}>&#xe68d;</span>
        )
    },
    toggleStatus: function(){
    	if(this.props.forbid) {
    		return false
    	}
        this.props.toggleStatus("1");
    }
});

module.exports = UnFinish;