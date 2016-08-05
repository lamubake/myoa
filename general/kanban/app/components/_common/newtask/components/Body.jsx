var React = require('react');
import Modal  from 'antd/lib/modal'

var Executor = require('./Executor.jsx');//执行者
var Level = require('./Level.jsx');//紧急程度
var DatePicker = require('./../../datepicker/Datepicker.jsx');//截止日期
var BelongTo = require('./BelongTo.jsx');//紧急程度
var Member = require('./member/index.jsx');//参与者

var Body = React.createClass({

	render: function() {
		const {
			projId,
			content,
			level,
			end,
			panel_id,
			executor,
			member,
			panels,
			setContent,
			setLevel,
			setEnd,
			setExecutor,
			setMember,
			setPanel
		} = this.props

        return (
        	<div className="modal-body">
        		<form className="form-horizontal">
        			<div className="control-group">
						<label className="control-label">任务内容：</label>
						<div className="controls">
							<textarea 
								className="newtask-content" 
								placeholder="请填写任务内容..."
								ref="content" 
								value={content} 
								onBlur={this.validate} 
								onChange={() => setContent(this.refs.content.value)}></textarea>
						</div>
					</div>
                    <div className="control-group">
                    	<label className="control-label">执行者：</label>
						<div className="controls">
							<Executor projId={projId} executor={executor} setExecutor={setExecutor} />
						</div>
					</div>
					<div className="control-group">
						<label className="control-label">重要等级：</label>
						<div className="controls">
							<Level current={level} cb={setLevel} />
						</div>
					</div>
					<div className="control-group">
						<label className="control-label">截止日期：</label>
						<div className="controls">
							<DatePicker datefmt="date" datevalue={end} cb={setEnd} />
						</div>
					</div>
					<div className="control-group">
   						<label className="control-label">所属面板：</label>
   						<div className="controls">
   							<BelongTo items={panels} currentPanel={panel_id} cb={setPanel} />
   						</div>
   					</div>
   					<div className="control-group">
  						<label className="control-label">参与者：</label>
  						<div className="controls">
  							<Member projId={projId} member={member} setMember={setMember} />
  						</div>
  					</div>          
				</form>
        	</div>
        )
    },

    componentDidMount: function() {
    	//this.refs.content.focus()
    },
    validate: function() {
    	if(this.refs.content.value.trim() === "") {
    		this.refs.content.placeholder = "请填写任务内容..."
    		//this.refs.content.focus()
              
    	}
    	if(this.refs.content.value.match(/['"<>\/\\]/g) !== null) {
            Modal.error({
                title: '任务内容不能含有\'，"，<，>，/，\\等非法字符'
            })
            //this.refs.content.focus()
        }
    }
});

module.exports = Body;