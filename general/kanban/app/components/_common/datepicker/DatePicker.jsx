var React = require('react');

/*
    默认props包含：
    datefmt  datetime date time 三种格式
    datevalue 默认值
    cb 选择日期或清空的回调函数,返回参数为当前input值
*/
var DatePicker = React.createClass({
    propTypes: {
        datefmt: React.PropTypes.string.isRequired
        //datevalue: React.PropTypes.string.isRequired
    },
    render: function(){
        return (
                this.props.forbid ? 
                <input disabled type="text" className="input-small input-calendar" defaultValue={this.props.datevalue} readOnly onClick={this.showDatePicker} /> :
                <input type="text" className="input-small input-calendar" defaultValue={this.props.datevalue} readOnly onClick={this.showDatePicker} />
        )
    },
    showDatePicker: function(e){
        var self = this;
        var datefmt = this.props.datefmt;
        var config = 'yyyy-MM-dd';
        if(datefmt == "date"){
            config = 'yyyy-MM-dd';
        }else if(datefmt == "time"){
            config = 'HH:mm:ss';
        }else if(datefmt == "datetime"){
            config = 'yyyy-MM-dd HH:mm:ss';
        }
    	WdatePicker({
    		dateFmt:config,
    		el: e.target,
            onpicked: function(){
                self.props.cb && self.props.cb(this.value);
            },
            oncleared: function(){
                self.props.cb && self.props.cb(this.value);
            }
    	});
    }
});

module.exports = DatePicker;