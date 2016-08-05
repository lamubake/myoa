var React = require('react');
import Modal  from 'antd/lib/modal'

var Header = require('./components/Header.jsx');
var Body = require('./components/Body.jsx');
var Footer = require('./components/Footer.jsx');

var NewTask = React.createClass({

	getInitialState: function() {
		//新建的时候，我要在内部维护一个相对复杂的状态对象
		return {
			content: "",
			level: "0",
			panel_id: this.props.panels[0].panel_id,
			end: this.formatTime(),
			executor: this.props.executor,
			member: []
		}
	},
	render: function() {
		const { hideTaskAddModal } = this.props
        return (
        	<div className="newtask">
				<div style={{zIndex:970}} onClick={hideTaskAddModal} className="modal-backdrop in"></div>
				<div style={{zIndex:980}} className="modal" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
					<Header hideTaskAddModal={hideTaskAddModal} />
					<Body 
						{...this.state} 
						projId={this.props.taskAddModal.projId} 
						executor={this.state.executor}
						member={this.state.member} 
						panels={this.props.panels} 
						setContent={this.setContent}
						setLevel={this.setLevel}
						setEnd={this.setEnd}
						setPanel={this.setPanel}
						setExecutor={this.setExecutor}
						setMember={this.setMember} />

					<Footer saveTask={this.saveTask} hideTaskAddModal={hideTaskAddModal} />
				</div>
			</div>
        )
    },
    formatTime: function() {
    	var today = new Date();
        var year = today.getFullYear();
        var month = today.getMonth()+1;
        var date = today.getDate();
        if(month >= 10){month=month;}else{month="0" + month;}
        if(date >= 10){date=date;}else{date="0" + date;}
        today = year + "-" + month + '-' + date;

        return today
    },
    setContent: function(content) {
    	this.setState({content})
    },
    setLevel: function(level) {
    	this.setState({level})
    },
    setEnd: function(end) {
    	this.setState({end})
    },
    setExecutor: function(executor) {
    	this.setState({executor})
    },
    setPanel: function(panel_id) {
    	this.setState({panel_id})
    },
    setMember: function(member) {
    	this.setState({member})
    },
    saveTask: function() {
    	if(this.state.content.trim() === "") {
            Modal.error({
                title: '任务内容不能为空'
            })
    		return false
    	}
    	if(this.state.content.trim().match(/['"<>\/\\]/g) !== null) {
            Modal.error({
                title: '任务内容不能含有\'，"，<，>，/，\\等非法字符'
            })
            return false
        }
    	this.props.addTask(
    		this.props.taskAddModal.tasklistId,
    		this.state.panel_id,
    		{...this.state, content: this.state.content.trim()}
		)
		this.props.hideTaskAddModal()
    }
});

module.exports = NewTask;