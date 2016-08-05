var React = require('react');

var AddTaskBtn = React.createClass({
    render: function() {
        return (
            <div className="task-addbtn" onClick={this.toggleActive}>
                <span className="task-addicon iconfont">&#xe688;</span>新建任务
            </div>  
        )
    },
    toggleActive: function(){
        this.props.toggleActive();
    }
});

module.exports = AddTaskBtn;