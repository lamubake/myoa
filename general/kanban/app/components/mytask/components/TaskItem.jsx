var React = require('react');
var connect = require('react-redux').connect;

import { ajaxEditTask, fetchTasks } from '../../../actions/tasks'
import { fetchTasklists } from '../../../actions/tasklists'
import{ fetchPanels } from '../../../actions/panels'
import { toggleTaskEditModal } from '../../../actions/taskEditModal'

var TaskItem = React.createClass({

    componentDidMount: function() {
        const { dispatch } = this.props
        const { proj_id, tasklist_id, panel_id } = this.props.task
        dispatch(fetchTasklists(proj_id))
        dispatch(fetchPanels(tasklist_id, proj_id))
        dispatch(fetchTasks(panel_id, tasklist_id))
    },

    render: function() {
    	var self = this;
        const { status, time_status, level, end, content, finish } = this.props.task
    	var klass = status !== "0" ? 'task-item task-item-done ' : 'task-item ';
        klass = klass + ' task-item-level task-item-level'+ (status !== "1" ? level : "-done");
        var time_status_klass = "task-badges clearfix time_status-" + (status === "1" ? "2" : time_status);
        return (
            <div className={klass} onClick={self.editTask}>
            	<div className="task-info">
                    {
                        status === "2" ?
                        <span title="已挂起" className="iconfont task-pend">&#xe69e;</span> : null
                    }
                    {
                        status === "0" ?
                        <span title="完成状态" className="iconfont task-check" onClick={this.toggleFinish}>&#xe68d;</span> : null
                    }
                    {
                        status === "1" ?
                        <span title="完成状态" className="iconfont task-check" onClick={this.toggleFinish}>&#xe68c;</span> : null
                    }
            		<span className="task-title">{content}</span>
            	</div>
            	<div className={time_status_klass}>
                    {
                        end !== "" ? 
                        <div className="task-badges-info task-endtime pull-left">
                            <span className="iconfont">&#xe665;</span>
                            {
                                //完成的任务显示完成时间，否则显示截至时间
                                finish !== "" ? 
                                finish.split(" ")[0] : 
                                end
                            }
                        </div> : null
                    }
            	    {/*<div className="task-badges-info task-subtasks pull-left"><span className="iconfont">&#xe66d;</span>2/3</div>*/}
                    {/*<div className="task-badges-info task-discuss pull-left"><span className="iconfont">&#xe67c;</span></div>*/}
                </div>
            </div>
        )
    },
	toggleFinish: function(e){

        const { dispatch, task } = this.props
        const { taskid, panel_id, can_edit } = task

        if(!can_edit) {
            e.stopPropagation()
            return false
        }

        const status = task.status === "0" ? "1" : "0"
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
        // debugger
		dispatch(ajaxEditTask(panel_id, taskid, {...task, status, finish}))

        e.stopPropagation();
	},
	editTask: function(e){
        const { dispatch, task } = this.props
        const{ tasklist_id, panel_id, taskid } = task
		dispatch(toggleTaskEditModal('show', tasklist_id, panel_id, taskid))
		e.stopPropagation();
	}
});



module.exports = connect()(TaskItem)
