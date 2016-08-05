var React = require('react');

var SubTaskExecutor = React.createClass({
    render: function() {
        return (
            <a href="javascript:;" className="subtask-executor" onMouseOver={this.showTip} onMouseLeave={this.hideTip} data-subuid={this.props.data.uid} data-placement="top" data-toggle="tooltip" title="" data-original-title={this.props.data.executor.username}>
                <img src={this.props.data.executor.avatar} />
            </a>
        )
    },
    showTip: function(){
        var uid = this.props.data.uid;
        jQuery('[data-subuid="'+ this.props.data.uid +'"]').tooltip('show');
    },
    hideTip: function(){
        jQuery('[data-subuid="'+ this.props.data.uid +'"]').tooltip('destroy');
    },
    componentWillUnmount: function(){
        jQuery('[data-subuid="'+ this.props.data.uid +'"]').tooltip('destroy');
    }
});

module.exports = SubTaskExecutor;