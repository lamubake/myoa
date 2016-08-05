var React = require('react');

import Modal from 'antd/lib/modal'

var Header = require('./components/Header.jsx');
var Body = require('./components/Body.jsx');
var Footer = require('./components/Footer.jsx');

var ProjectModal = React.createClass({

	getInitialState: function() {
		const { 
			proj_name, 
			desc
		} = this.props.project

		return {
			proj_name: proj_name || "",
			desc: desc || ""
		}
	},

	render: function(){
		return (
			<div>
				<div style={{zIndex:970}} className="modal-backdrop in" onClick={this.props.toggleProjEditModal}></div>
				<div style={{zIndex:980}} className="projects-modal modal" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
					<Header projId={this.props.projId} toggleProjEditModal={this.props.toggleProjEditModal} />
					<Body {...this.props } {...this.state} setName={this.setName} setDesc={this.setDesc} />
					<Footer {...this.props} saveProject={this.saveProject} hideModal={this.props.toggleProjEditModal} />
				</div>
			</div>
		);
	},

	setName: function(proj_name) {
		this.setState({
			proj_name
		})
	},

	setDesc: function(desc) {
		this.setState({desc})
	},

	setManager: function() {

	},

	setMember: function() {

	},

	saveProject: function() {

		if(!this.validate(this.state.proj_name, "name", 50)) {
			return false
		}
		if(!this.validate(this.state.desc, "desc", 500)) {
			return false
		}


		const manager = $('#new_manager')[0].value
		const member = $('#new_member')[0].value

		if(this.props.projId) {
			this.props.editProject({
				...this.props.project,
				...this.state,
				manager,
				member
			})
		} else {
			this.props.addProject({
				...this.state,
				manager,
				member
			})
		}

		this.props.toggleProjEditModal()
	},

	validate: function(data, type ,length) {
		if(type === "name" && data === "") {
                      Modal.error({
                          title: '保存失败',
                          content: '项目名称不能为空'
                      })
			return false
		}
		if(data.length > length) {
                    Modal.error({
                        title: '保存失败',
                        content: `项目${type === "name" ? "名称" : "简介"}不能多于${length}个字符。`
                    })
			return false
		}
		if(data.match(/['"<>\/\\]/g) !== null) {
                    Modal.error({
                        title: '保存失败',
                        content: `项目${type === "name" ? "名称" : "简介"}不能含有'，"，<，>，/，\\等非法字符`
                    })
                    return false
              }
		return true
	}
});

module.exports = ProjectModal

