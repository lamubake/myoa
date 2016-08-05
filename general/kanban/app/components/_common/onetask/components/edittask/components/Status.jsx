var React = require('react');
var Finish = require('./Finish.jsx');
var UnFinish = require('./UnFinish.jsx');

var Status = React.createClass({
    render: function() {
        return (
            <div className="onetask-status">
                {
                	this.props.data == 0 ? 
                	<UnFinish forbid={this.props.forbid} toggleStatus={this.props.toggleStatus} /> : 
                	<Finish forbid={this.props.forbid} toggleStatus={this.props.toggleStatus} />
                }
            </div>
        )
    }
});

module.exports = Status;