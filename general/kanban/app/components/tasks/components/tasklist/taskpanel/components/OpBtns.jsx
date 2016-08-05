/*单个面板头部*/
var React = require('react');
import Modal from 'antd/lib/modal'

var TaskPanelInfo = React.createClass({
    getInitialState: function() {
        return {
            isEditName: false
        };
    },
    render: function() {
        var taskname;
        if (this.state.isEditName) {
          taskname = <TasknameEdit name={this.props.name} cb={this.saveRename} />;
        } else {
          taskname = <Taskname name={this.props.name} />;
        }
        return (
            <div className="task-panelinfo clearfix">  
            	<div className="task-panelname">
                    {taskname}
                </div>
            	<div className="task-handle">
            		<span className="task-count">{this.props.count}</span>
                    {
                        this.props.canEdit ? 
                        <ul className="task-dropdown">
                            <li className="dropdown">
                               <span className="dropdown-toggle iconfont" data-toggle="dropdown" >&#xe68f;</span>
                                    
                                    <ul className="dropdown-menu" role="menu">
                                        <li role="presentation"><a onClick={this.renamePanel}>重命名</a></li>
                                        <li role="presentation"><a onClick={this.deletePanel}>删除</a></li>
                                        {this.props.firstOne ? null : <li role="presentation"><a onClick={this.toTheLeft}>向左移</a></li>}
                                        {this.props.lastOne ? null : <li role="presentation"><a onClick={this.toTheRight}>向右移</a></li>}
                                    </ul>
                            </li>
                        </ul> : null
                    }
					
            	</div>
            </div>
        )
    },
    renamePanel: function(){
        this.setState({
            isEditName: true
        });
        this.props.startRenamePanel()
    },
    saveRename: function(desc){
        this.setState({
            isEditName: false
        });
        this.props.endRenamePanel()
        this.props.editPanel(desc);
    },
    deletePanel: function(){
        const self = this
        Modal.confirm({
            title: '确定要删除此面板吗？',
            onOk() {
                self.props.deletePanel()
            }
        })        
    },
    toTheLeft: function() {
        const { id, panelIds, tasklistId, reorderPanel, editTasklist } = this.props
        const indexSourcePanel = panelIds.indexOf(id)
        const indexTargetPanel = indexSourcePanel-1
        const targetPanelId = panelIds[indexTargetPanel]
        reorderPanel(tasklistId, id, targetPanelId)

        let nextPanelIds = [...panelIds]
        nextPanelIds.splice(indexSourcePanel, 1)
        nextPanelIds = [...nextPanelIds.slice(0, indexTargetPanel), id, ...nextPanelIds.slice(indexTargetPanel)]
        editTasklist({panel_ids: nextPanelIds})
    },
    toTheRight: function() {
        const { id, panelIds, tasklistId, reorderPanel, editTasklist } = this.props
        const indexSourcePanel = panelIds.indexOf(id)
        const indexTargetPanel = indexSourcePanel+1
        const targetPanelId = panelIds[indexTargetPanel]
        reorderPanel(tasklistId, id, targetPanelId)

        let nextPanelIds = [...panelIds]
        nextPanelIds.splice(indexSourcePanel, 1)
        nextPanelIds = [...nextPanelIds.slice(0, indexTargetPanel), id, ...nextPanelIds.slice(indexTargetPanel)]
        editTasklist({panel_ids: nextPanelIds})    }
});

var TasknameEdit = React.createClass({
    render: function() {
        return (
            <input type="text" ref="panelname" defaultValue={this.props.name} onBlur={this.rename} />
        )
    },
    componentDidMount: function(){
        $(this.refs.panelname).focus().select();
    },

    rename: function(){
        if(this.validate()) {
            this.props.cb({panel_name: this.refs.panelname.value.trim()})
        } else {
            this.refs.panelname.placeholder = "请输入面板名称..."
        }
    },
    validate: function() {
        if(this.refs.panelname.value.trim() === "") {
            Modal.error({
                title: '面板名称不能为空'
            })
            return false
        }
        if(this.refs.panelname.value.trim().length > 15) {

            Modal.error({
                title: '面板名称不能多于15个字符。'
            })
            return false
        }
        if(this.refs.panelname.value.match(/['"<>\/\\]/g) !== null) {

            Modal.error({
                title: '面板名称不能含有\'，"，<，>，/，\\等非法字符'
            })
            return false
        }
        return true
    }
});

var Taskname = React.createClass({
    render: function() {
        return (
            <span>{this.props.name}</span>
        )
    }
});

module.exports = TaskPanelInfo;

