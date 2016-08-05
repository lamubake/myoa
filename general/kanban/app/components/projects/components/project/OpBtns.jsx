var React = require('react')
import Modal from 'antd/lib/modal'
import message from 'antd/lib/message'
//项目操作
var OpBtns = React.createClass({
	render: function(){
		const { can_delete, can_archive, can_edit, status } = this.props.ops
		const archived = status === "0"
		return (
			<div className="project-handle pull-right" onClick={(e) => e.stopPropagation()}>
				{
					can_edit &&
					<ul className="task-dropdown">

		                <li className="dropdown">
			                <span className="dropdown-toggle iconfont" data-toggle="dropdown" >&#xe68f;</span>
			                <ul className="dropdown-menu" role="menu">
								{
									!archived && 
									can_edit && 
									<li role="presentation" onClick={this.props.ops.toggleProjEditModal}>
										<a role="menuitem" href="javascript:;">编辑</a>
									</li>
								}
								{
									!archived && 
									can_archive && 
									<li role="presentation" onClick={this.archive}>
										<a role="menuitem" href="javascript:;">归档</a>
									</li>
								}
								{
									archived && can_archive ?
									<li role="presentation" onClick={this.reactive}>
										<a role="menuitem" href="javascript:;">激活</a>
									</li> : 
									<li role="presentation">
										<a style={{color:'#bbb'}} role="menuitem" href="javascript:;">激活</a>
									</li>
								}
								{
									!archived && 
									can_delete && 
									<li role="presentation" onClick={this.deleteHandler}>
										<a role="menuitem" href="javascript:;">删除</a>
									</li>
								}
			                </ul>
		              	</li>
	                </ul>
				}
			</div>
		);
	},
	deleteHandler: function(e) {
            const self = this
            Modal.confirm({
                title: '您是否确认删除该项目？',
                content: '项目删除后不可恢复，如果您已完成该项目可以选择对其进行归档，归档后可在“归档项目”列表进行查看和激活。',
                onOk() {
                    self.props.ops.deleteProject()
                }
            })
		
		e.stopPropagation()
		e.preventDefault()
	},
	archive: function(e) {
            const self = this
            Modal.confirm({
                title: '您是否确认对该项目进行归档？',
                content: '项目归档后可在“归档项目”列表进行查看和激活。',
                onOk() {
                    self.props.ops.editProject({status:"0"})
                    message.success('该项目已归档')
                }
            })
		
		e.stopPropagation()
		e.preventDefault()
	},
	reactive: function(e) {
		this.props.ops.editProject({status:"1"})
              message.success('该项目已激活')
		e.stopPropagation()
		e.preventDefault()
	}
});

module.exports = OpBtns;

