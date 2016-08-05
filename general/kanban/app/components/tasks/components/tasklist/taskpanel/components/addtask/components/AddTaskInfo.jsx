var React = require('react');
import Modal from 'antd/lib/modal'
var DatePicker = require('./../../../../../../../_common/datepicker/Datepicker.jsx');

var AddTaskInfo = React.createClass({
    getInitialState: function() {
        var today = new Date();
        var year = today.getFullYear();
        var month = today.getMonth()+1;
        var date = today.getDate();
        if(month >= 10){month=month;}else{month="0" + month;}
        if(date >= 10){date=date;}else{date="0" + date;}
        today = year + "-" + month + '-' + date;
        return {
            end: today
        };
    },
    render: function() {
        var today = new Date();
        var year = today.getFullYear();
        var month = today.getMonth()+1;
        var date = today.getDate();
        if(month >= 10){month=month;}else{month="0" + month;}
        if(date >= 10){date=date;}else{date="0" + date;}
        today = year + "-" + month + '-' + date;
        return (
            <div className="task-addinfo clearfix">
                <input type="text" ref="content" className="task-add-text" placeholder="任务名称" />
                <div className="clearfix">
                    <div className="task-addsetting task-addend">
                        <span className="task-add-title">截止日期：</span>
                        <DatePicker datefmt="date" datevalue={today} cb={this.setTime} />
                    </div>
                </div>
                <div className="task-add-confirm">
                    <button type="button" className="btn btn-info savetaskbtn" onClick={this.addTask}>创建</button>
                    <button type="button" className="btn" onClick={this.toggleActive}>取消</button>
                </div> 
            </div>
        )
    },
    componentDidMount: function(){
        $(this.refs.content).focus();
    },
    toggleActive: function(){
        this.props.toggleActive();
    },
    setTime: function(date){
        this.setState({end: date});
    },
    addTask: function(){
        if(!this.validate()) {
            this.refs.content.focus()
            return false
        }
        var taskDesc = {
            content: this.refs.content.value.trim(),
            end: this.state.end
        };
        this.props.addTask(taskDesc);
        this.refs.content.value = "";
        this.props.toggleActive();
    },
    validate: function() {
        var content = this.refs.content.value.trim();
        if(content === "") {
            this.refs.content.placeholder = "请填写任务内容..."
            Modal.error({
                title: '任务内容不能为空'
            })
            return false
        }
        if(this.refs.content.value.match(/['"<>\/\\]/g) !== null) {
            Modal.error({
                title: '任务内容不能含有\'，"，<，>，/，\\等非法字符'
            })
            return false
        }
        return true
    }
});

module.exports = AddTaskInfo;