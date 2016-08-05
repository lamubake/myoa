var React = require('react');

var MemberItem = React.createClass({
    render: function(){
        return (
            <li className="onetask-memberitem pull-left" data-uid={this.props.data.uid} onMouseOver={this.showTip} onMouseLeave={this.hideTip} data-placement="top" data-toggle="tooltip" title="" data-original-title={this.props.data.username}>
                <img src={this.props.data.avatar} /> 
                <span className="member-delete iconfont" onClick={() => this.props.deleteMember(this.props.data.uid)}>&#xe620;</span>
            </li>
        )
    },
    showTip: function(){
        var uid = this.props.data.uid;
        jQuery('[data-uid="'+ this.props.data.uid +'"]').tooltip('show');
    },
    hideTip: function(){
        jQuery('[data-uid="'+ this.props.data.uid +'"]').tooltip('destroy');
    },
    componentWillUnmount: function(){
        jQuery('[data-uid="'+ this.props.data.uid +'"]').tooltip('destroy');
    }
});

module.exports = MemberItem;