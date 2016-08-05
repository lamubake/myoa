var React = require('react');

var SelectUser = require('./../../../../_common/selectuser-sys/');

var Body = React.createClass({
	render: function(){
		const { project, members, userInfo } = this.props
		const creator = members.find(item => item.uid === project.creator) || userInfo
		const { 
			proj_name, 
			desc,
			setName,
			setDesc
		} = this.props

		const { manager, member } = project
		let managerNames = ""
		let memberNames = ""

		managerNames = (() => {
			let ret = []
			members.forEach(item => {
				manager.forEach(id => {
					if(id === item.uid) {
						ret.push(item.username)
					}
				})
			})
			return ret.join(",")
		})()

		memberNames = (() => {
			let ret = []
			members.forEach(item => {
				member.forEach(id => {
					if(id === item.uid) {
						ret.push(item.username)
					}
				})
			})
			return ret.join(",")
		})()

		return (
			<div className="modal-body">
				<form id="tester" className="form-horizontal">
					<div className="control-group">
						<label className="control-label">项目名称：</label>
						<div className="controls">
							<input type="text" 
								name="proj_name" 
								ref="projName" 
								placeholder="请输入项目名称..." 
								defaultValue={proj_name} 
								onChange={ this.setName } />
						</div>
					</div>
					<div className="control-group">
						<label className="control-label">项目简介：</label>
						<div className="controls">
							<textarea name="desc" 
								ref="projDesc" 
								placeholder="项目简介" 
								defaultValue={desc}
								onChange={ this.setDesc }>
							</textarea>
						</div>
					</div>
					<div className="control-group">
						<label className="control-label">项目创建人：</label>
						<div className="controls">
							<span>{creator.username}</span>
						</div>
					</div>
					<div className="control-group project-manager-select">
	                    <label className="control-label">项目管理员：</label>
	                    <div className="controls">
	                    	<SelectUser isCreator={userInfo.uid === creator.uid} module_id="new_manager" to_id="manager" to_name="manager_name" defaultuserid={manager ? manager+',' : ''} defaultusername={managerNames ? managerNames+',' : ''} />
	                    </div>	
	                </div>
	                <div className="control-group project-member-select">
	                    <label className="control-label">项目成员：</label>
	                    <div className="controls selectuser">
	                    	<SelectUser module_id="new_member" to_id="member" to_name="member_name" defaultuserid={member ? member+',' : ''} defaultusername={memberNames ? memberNames+',' : ''} />
						</div>
	                </div>
				</form>
			</div>
		);
	},

	setName: function() {
		const { 
			setName
		} = this.props
		setName(this.refs.projName.value.trim())
	},

	setDesc: function() {
		const { 
			setDesc
		} = this.props
		setDesc(this.refs.projDesc.value.trim())
	}
});

module.exports = Body;