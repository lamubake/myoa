var React = require('react');

var ItemExecutor = React.createClass({
    render: function() {
        return (
            <a href="javascript:;" className="subtask-executor" data-executorid={this.props.data.uid} onMouseOver={this.showTip} onMouseLeave={this.hideTip} data-placement="top" data-toggle="tooltip" title="" data-original-title={this.props.data.username}>
                <img src={this.props.data.avatar} />
            </a>
        )
    },
    showTip: function(){
        var uid = this.props.data.uid;
        jQuery('[data-executorid="'+ this.props.data.uid +'"]').tooltip('show');
    },
    hideTip: function(){
        jQuery('[data-executorid="'+ this.props.data.uid +'"]').tooltip('destroy');
    },
    componentWillUnmount: function(){
        jQuery('[data-executorid="'+ this.props.data.uid +'"]').tooltip('destroy');
    }
});

module.exports = ItemExecutor;