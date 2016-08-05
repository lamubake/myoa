var React = require('react');
var SubTaskExecutor = require('./SubTaskExecutor.jsx');
//props
// subtaskid: 0,//子任务ID
//         status: 0,//子任务完成状态
//         start: '',//子任务开始时间
//         end: '',//子任务结束时间
//         content: '子任务1',//子任务内容
//         creator: '',//子任务创建人
//         member: '',//子任务成员
//         parent:''//父级任务ID

var SubTaskList = React.createClass({
    render: function() {
        var subtask = this.props.data.map(function (item, i) {
            return (
                <li className="subtask-item" key={i}>
                    <p>{item.content}</p>
                    <div className="subtask-bottom-l">
                        <SubTaskExecutor data={item} />
                        <span>{item.end}</span>
                    </div>
                </li>
            );
        }, this);
        return (
            <ul className="subtask-list">
                {subtask}
            </ul>
        )
    }
});

module.exports = SubTaskList;