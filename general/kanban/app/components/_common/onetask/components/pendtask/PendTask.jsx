var React = require('react');
import Modal from 'antd/lib/modal'

var Opts = require('./components/Opts.jsx');//激活还是删除
var Level = require('./components/Level.jsx');
var BelongTo = require('./components/BelongTo.jsx');//所属项目所属组
var Status = require('./components/Status.jsx');
var Executor = require('./components/Executor.jsx');//执行者
//var UserList = require('./components/UserList.jsx');//参与者列表
var Member = require('./components/member/index.jsx');//参与者
//var Discuss = require('./components/discuss/index.jsx');

var SubTaskContainer  = require('./components/subtask/index.jsx');//子任务

//编辑正常的任务弹框
var PendTask = React.createClass({
    render: function() {
        var self = this;
        const {
            taskid,
            content,
            level,
            status,
            executor,
            member,
            proj_id,
            tasklist_id,
            panel_id,
            panel_name,
            end,
            can_pend,
            can_delete
        } = this.props.task
        return (
        <div>
            <div className="edittask-dialog pendtask-dialog in"> 
                <div className="edittask-hd clearfix">
                    <div className="pull-right">
                        {
                            !can_pend && !can_delete ?
                                null :
                                <Opts 
                                    can_pend={can_pend}
                                    can_delete={can_delete}
                                    activateTask={this.activateTask} 
                                    deleteTask={this.deleteTask} />
                        }
                        <span className="edittask-close iconfont" onClick={this.close}>&#xe69d;</span>
                    </div>
                    <div className="edittask-title pull-left">
                        任务详情<span className="edittask-title-flag">（已挂起）</span>
                    </div>
                </div> 
                <div className="edittask-bd">
                    <form className="form-horizontal">
                        <div className="control-group onetask-content">
                           {content}
                        </div>
                        <div className="control-group">
                            <div className="inline">
                                <div className="onetask-title">执行者</div>
                                <Executor projId={proj_id} executor={executor} />
                            </div>
                            <div className="inline">
                                <div className="onetask-title">重要等级</div>
                                <Level current={level} />
                            </div>
                            <div className="inline">
                                <div className="onetask-title">截止日期</div>
                                <input style={{color:'#A9A6A6'}} type="text" className="input-small" defaultValue={end} disabled />
                            </div> 
                            <div className="inline">
                                <div className="onetask-title">移动至</div>
                                <BelongTo panelName={panel_name} />
                            </div>
                        </div>
                        <div className="control-group">
                            <div className="inline">
                                <div className="onetask-title">参与者</div>
                                <Member projId={proj_id} member={member} />
                            </div>
                        </div>
                        {/*<div className="control-group">
                                                    <div className="">
                                                        <div className="onetask-title">子任务：</div>
                                                        <SubTaskContainer data={this.props.subtasks} />
                                                    </div>
                                                </div> */}
                        {/*
                        <div className="control-group">
                            <div className="">
                                <div className="onetask-title">附件</div>
                                <AttachmentContainer />
                            </div>
                        </div>  
                        <div className="control-group">
                            <div className="">
                                <div className="onetask-title">任务讨论</div>
                                <Discuss />
                            </div>
                        </div>   
                        */}   
                    </form>
               </div>
            </div>
            <div className="taskedit-mask" onClick={this.maskHandler}></div>
        </div>
        )
    },
    close: function(e) {
        this.props.maskHandler()
        e.stopPropagation()
    },
    activateTask: function(){
        const self = this
        Modal.confirm({
            title: '确定要激活此任务吗？',
            onOk() {
                self.props.editTask({...self.props.task, status: "0"})
            }
        })
    },
    deleteTask: function(){
        const self = this

        Modal.confirm({
            title: '确定要删除此任务吗？',
            onOk() {
                self.props.deleteTask()
                self.props.maskHandler()
            }
        })
    },
    maskHandler: function(e) {
        this.props.maskHandler()
        e.stopPropagation()
    }
});

module.exports = PendTask;