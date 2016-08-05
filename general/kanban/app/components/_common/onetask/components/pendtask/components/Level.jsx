var React = require('react');
var $ = jQuery;
/*
    默认props包含:
    current 当前级别
*/
var Level = React.createClass({
    render: function(){
        var text = '';
        if(this.props.current === "0"){
            text = '普通';
        }else if(this.props.current === "1"){
            text = '紧急';
        }else if(this.props.current === "2"){
            text = '非常紧急';
        }
        var iconClass = this.props.current != null ? "iconfont level level-" + this.props.current : '';
        return (
            <div className="btn-group levelContainer">
                <button type="button" disabled className="btn dropdown-toggle" data-toggle="dropdown">
                    <i className={iconClass}>&#xe68b;</i>
                    <span>{text}</span>
                    <b className="caret"></b>
                </button>
            </div>
        )
    }
});

module.exports = Level;