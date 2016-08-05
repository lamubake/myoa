var React = require('react');
import Modal from 'antd/lib/modal'

var Opts = require('./components/Opts.jsx');//挂起还是删除
var Content = require('./components/Content.jsx');//内容
var ContentEdit = require('./components/ContentEdit.jsx');//编辑内容
var Status = require('./components/Status.jsx');//状态
var DatePicker = require('./../../../datepicker/Datepicker.jsx');//截止日期
var Level = require('./components/Level.jsx');//紧急程度
var BelongTo = require('./components/BelongTo.jsx');//所属项目所属组级联菜单
var Executor = require('./components/Executor.jsx');//执行者
var Member = require('./components/member');//参与者
var SubTask  = require('./components/subtask/index.jsx');//添加子任务
//var Discuss = require('./components/discuss/index.jsx');//任务讨论
//var AttachmentContainer = require('./../../../attachment/index.jsx');//任务附件


//编辑正常的任务弹框
var EditTask = React.createClass({
    getInitialState: function() {
        return {
            toggleContent: true//是否处于编辑内容状态
        };
    },
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
            end,
            can_edit,
            can_pend,
            can_delete
        } = this.props.task
        //已完成和未完成p元素的样式类名区分
        var statusKlass = '';
        if(status == "0"){
            statusKlass += "onetask-content unfinish";
        }else if(status == "1"){
            statusKlass += "onetask-content finish";
        }

        if(this.state.toggleContent == true){
            statusKlass += " unedit";
        }else if(this.state.toggleContent == false){
            statusKlass += " edit";
        }

        return (

        <div>
            <div className="edittask-dialog in" data-taskid={taskid}>
                <div className="edittask-hd clearfix">
                    <div className="pull-right">
                        {
                            !can_pend && !can_delete ?
                                null :
                                <Opts 
                                    can_pend={can_pend}
                                    can_delete={can_delete}
                                    pendTask={this.pendTask} 
                                    deleteTask={this.deleteTask} />
                        }
                        <span className="edittask-close iconfont" onClick={this.close}>&#xe69d;</span>
                    </div>
                    <div className="edittask-title pull-left">
                        任务详情
                    </div>
                </div>
                <div className="edittask-bd preventScroll">
                    <form className="form-horizontal">
                        <div className="control-group task-content-container">
                            {
                                this.state.toggleContent ? 
                                <Status forbid={!can_edit} data={status} toggleStatus={this.toggleStatus} /> : 
                                null
                            }
                            <div className={statusKlass}>
                                {
                                    this.state.toggleContent ? 
                                    <Content can_edit={can_edit} data={content} toggleContent={this.toggleContent} /> : 
                                    <ContentEdit 
                                        data={content} 
                                        setContent={this.setContent} 
                                        toggleContent={this.toggleContent} />
                                }
                            </div>
                        </div>
                        <div className="control-group">
                            <div className="inline">
                                <div className="onetask-title">执行者</div>
                                <Executor projId={proj_id} executor={executor} panelId={panel_id} taskId={taskid} />
                            </div>
                            <div className="inline">
                                <div className="onetask-title">重要等级</div>
                                <Level can_edit={can_edit} current={level} cb={this.editLevel} />
                            </div>
                            <div className="inline">
                                <div className="onetask-title">截止日期</div>
                                <DatePicker forbid={!can_edit} datefmt="date" datevalue={end} cb={this.editEnd} />
                            </div> 
                            <div className="inline">
                                <div className="onetask-title">移动至</div>
                                <BelongTo 
                                    projId={proj_id} 
                                    panelId={panel_id} 
                                    tasklistId={tasklist_id}
                                    forbid={!can_edit} 
                                    cb={this.editBelongTo} />
                            </div>
                        </div>
                        <div className="control-group">
                            <div className="onetask-title">参与者</div>
                            <Member projId={proj_id} member={member} panelId={panel_id} taskId={taskid} task={this.props.task} />
                        </div>
                        {/*<div className="control-group">
                                                     <div className="">
                                                         <div className="onetask-title">添加子任务</div>
                                                         <SubTask taskId={taskid} />
                                                     </div>
                                                 </div>*/}
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
    close: function(e){
        this.props.maskHandler()
        e.stopPropagation()
    },
    toggleContent: function(){//内容是否处于编辑状态
        const { can_edit} = this.props.task
        if(!can_edit) {
            return false
        }
        this.setState({
            toggleContent: !this.state.toggleContent
        });
    },
    toggleStatus: function(status){
        const { panel_id, taskid } = this.props.task
        let finish = ""
        if(status === "0") {
            finish = ""
        } else {
            //生成当前年月日时分秒格式
            finish = (() => {
                const date = new Date()
                const year = date.getFullYear()
                const month = date.getMonth() < 10 ? `0${date.getMonth()+1}` : (date.getMonth()+1)
                const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()
                const rest = date.toTimeString().split(" ")[0]
                return `${year}-${month}-${day} ${rest}`
            })()
        }
        this.props.editTask(panel_id, taskid, {...this.props.task, status, finish})
    },
    editBelongTo: function(id, name){//所属项目，所属面板

        /* ----- 绝对不要直接修改传进来的props ----- */

        const { task, editPanel, panels, panelId, taskId } = this.props
        this.props.resortAddTask(id, task)
        this.props.toggleTaskEditModal('show', id, taskId)
        this.props.resortDeleteTask(panelId, taskId)
        

        //更新两个面板的task_ids
        //为了获取两个面板更新后的task_ids，需要在原有的state基础上进行计算，
        //但是一定要注意，不要直接修改原有state，因此不能使用任何mutable的api
        //把需要用的数据复制一份，在副本上进行操作，然后把结果发送给action creator
        //再转交给reducer进行数据操作。
        //切记，任何的数据更改都需要发送给reducer来进行，不要私自修改任何state的数据对象
        //在react的组件中，通过select选出来的数据一般都是对state tree中数据的直接引用
        //因此，props本身也是禁止修改的。
        //切记一点：在flux/redux架构中，不要直接修改任何state相关的数据。。。
        const fromPanel = panels.find(item => item.panel_id === panelId)
        const toPanel = panels.find(item => item.panel_id === id)
        //filter函数会返回一个新数组，因此不会更改state
        const fromTaskIds = fromPanel.task_ids.filter(item => item !== taskId)
        //先用slice()复制一份数据出来，然后再副本上操作
        const toTaskIds = toPanel.task_ids.slice()
        toTaskIds.push(taskId)

        editPanel(panelId,{...fromPanel, task_ids: fromTaskIds})
        editPanel(id, {...toPanel, task_ids: toTaskIds})

        this.props.editTask(id, taskId , {...task, panel_id:id, panel_name:name})

    },
    setContent: function(content){//设置内容
        const { panel_id, taskid } = this.props.task
        this.props.editTask(panel_id, taskid, {...this.props.task, content})
    },
    // editStart: function(start){
    //     this.setState({start: start});
    // },
    editEnd: function(end){
        const { panel_id, taskid } = this.props.task
        this.props.editTask(panel_id, taskid, {...this.props.task, end}, true, true)
    },
    editLevel: function(level){
        const { panel_id, taskid } = this.props.task
        level = level + ""
        this.props.editTask(panel_id, taskid, {...this.props.task, level})
    },
    pendTask: function(){
        const { panel_id, taskid, status } = this.props.task
        const self = this
        if(status === '1') {

            Modal.error({
                title: '操作失败',
                content: '完成任务无需挂起。'
            })
            return false
        }
        Modal.confirm({
            title: '确定要挂起此任务吗？',
            onOk() {
                self.props.editTask(panel_id, taskid, {...self.props.task, status: "2"})
            }
        })
    },
    deleteTask: function(){
        const self = this

        Modal.confirm({
            title: '确定要删除此任务吗？',
            onOk() {
                const { tasklistId, panelId, taskId } = self.props
                self.props.deleteTask(tasklistId, panelId, taskId)
                self.props.maskHandler()
            }
        })
    },
    maskHandler: function(e) {
        this.props.maskHandler()
        e.stopPropagation()
    }
});

module.exports = EditTask;