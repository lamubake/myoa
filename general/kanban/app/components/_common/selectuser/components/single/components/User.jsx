var React = require('react');

var User = React.createClass({
    render: function() {
        var klassName = "seluser-item ";
        var selected = this.props.data.selected == true ? ' selected ' : '';
        var visible  = this.props.data.visible == true ? '' : ' hide';
        klassName = klassName+selected+visible;
        return (
            <li className={klassName} onClick={this.handleClick}>
            	<a href="javascript:;" data-uid={this.props.data.uid} data-userid={this.props.data.userid}>{this.props.data.username}
                    <span className="iconfont">&#xe687;</span>
                </a>
            </li>
        )
    },
    handleClick: function(e){
    	this.props.clickCallback(this.props.data.uid);
        e.stopPropagation()
    }
});

module.exports = User;