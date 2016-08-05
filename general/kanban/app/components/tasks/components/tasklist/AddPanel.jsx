/*新建面板*/
var React = require('react');
import Modal from 'antd/lib/modal'

var AddTaskPanel = React.createClass({
    getInitialState: function() {
        return {
            isActive: false
        };
    },
    render: function() {
        var klass = this.state.isActive ? 'task-panel task-panel-add active' : 'task-panel task-panel-add';
        return (
            <div className={klass}>
                <div className="task-panel-addbtn" onClick={this.handleActive}><span className="task-panel-addicon iconfont">&#xe688;</span>新建面板</div>              
                
                <div className="task-panel-addinfo clearfix">
                    <input type="text" ref="panelname" className="task-panel-addname" placeholder="面板名称" />
                    <div className="panel-add-confirm">
                        <button type="button" className="btn btn-info task-panel-save" onClick={this.addPanel}>保存</button>
                        <button type="button" className="btn" onClick={this.handleActive}>取消</button>
                    </div> 
                </div>
            </div>
        )
    },
    componentDidUpdate: function(){
        if(this.state.isActive){
            $(this.refs.panelname).focus();
        }
    },
    handleActive: function(){
        this.setState({isActive:!this.state.isActive});
    },
    addPanel: function(){
        if(this.validate()) {
            this.setState({isActive:!this.state.isActive});
            this.props.addPanel({panel_name: this.refs.panelname.value.trim()});
            this.refs.panelname.value = "";
        } else {
            this.refs.panelname.placeholder = "请输入面板名称..."
            this.refs.panelname.focus()
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

module.exports = AddTaskPanel;