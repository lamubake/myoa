var React = require('react');

var ItemFinish = require('./components/ItemFinish.jsx');
var ItemUnfinish = require('./components/ItemUnfinish.jsx');
var ItemAddIcon = require('./components/ItemAddIcon.jsx');
var ItemText = require('./components/ItemText.jsx');
var ItemEditText = require('./components/ItemEditText.jsx');
var ItemEndTime = require('./components/ItemEndTime.jsx');
var ItemExecutor = require('./components/ItemExecutor.jsx');

// var data = {
// 	subtaskid:"0",
// 	status:"0",//子任务完成状态，0未完成，1已完成
// 	start:"2016-03-03",//子任务开始时间
// 	end:"2016-03-03",//子任务结束时间
// 	content:"子任务内容",
// 	creator:{
// 		uid: '0',
// 		userid: 'tl',
// 		username: '田林',
// 		avatar: ''
// 	},
// 	executor:{
// 		uid: '',
// 		userid: '',
// 		username: '',
// 		avatar: ''
// 	},
// 	parent:"0",//父级任务id
// 	can_delete:false,
// 	can_edit:true,
// 	created_at:"2016-03-05 21:55:00" //子任务创建时间  
// };

var Item = React.createClass({
	render: function() {
		//console.log(this.props);
		//icon是新建还是编辑，编辑是已完成还是未完成状态
		var icon = null;
		if(this.props.data.subtaskid == ""){
			icon = <ItemAddIcon />
		}else{
			if(this.props.data.status == "0"){
				icon = <ItemUnfinish />
			}else if(this.props.data.status == "1"){
				icon = <ItemFinish />
			}
		}
		//文字部分是显示状态（新建和展示已有数据）还是编辑
		var itemText = null;
			itemText = <ItemText data={this.props.data.content} cb={this.props.cb.changeToEdit} />

		return (
			<div className="subtask-item clearfix">
				{icon}
				{itemText}
				<div className="subtask-bottom-l">
					<ItemEndTime data={this.props.data.end} />
					<ItemExecutor />
					<span className="iconfont subtask-delete">&#xe644;</span>
				</div>
				{/*
				<div className="subtask-bottom-r">
					<button type="button" className="btn btn-mini btn-primary">保存</button>
                    <button type="button" className="btn btn-mini">取消</button>
				</div>
				*/}
			</div>
		);
	}
});

module.exports = Item;