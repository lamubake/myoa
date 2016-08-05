var React = require('react');

var EditTask = React.createClass({
	render: function(){
		return (
			<ul className="edittask-hd-handle">
                <li className="dropdown">
                    <div className="dropdown-toggle" data-toggle="dropdown" ><span className="iconfont">&#xe68f;</span>更多</div>
                    <ul className="dropdown-menu" role="menu">
                        {
                            this.props.can_pend ? 
                            <li role="presentation" onClick={this.props.activateTask}>
                                <a role="menuitem" href="javascript:;">激活</a>
                            </li> : null 
                        }
                        {
                            this.props.can_delete ? 
                            <li role="presentation" onClick={this.props.deleteTask}>
                                <a role="menuitem" href="javascript:;">删除</a>
                            </li> : null
                        }
                    </ul>
                </li>
            </ul>
		);
	}
});

module.exports = EditTask;