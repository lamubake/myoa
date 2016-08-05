//文件列表

var React = require('react');
var List = require('./List.jsx');

//一行文件信息的模拟数据
var data = [
	{
		attach_id: '0',//文件id
		attach_name: '任务管理',//文件名称
		size:'20kb',//文件大小
		creator: {
			uid: '0',
			userid: 'tl',
			username: '田林'
		},//创建者
		taskid:'0',//所属任务ID
		proj_id:'0',//所属项目ID
		create_time: '2016-03-09',//创建时间
		isFolder: true,//是否是文件夹
		isCheck: false//未勾选
	},
	{
		attach_id: '1',//文件id
		attach_name: '产品研发管理',//文件名称
		size:'40kb',//文件大小
		creator: {
			uid: '0',
			userid: 'tl',
			username: '田林'
		},//创建者
		taskid:'0',//所属任务ID
		proj_id:'0',//所属项目ID
		create_time: '2016-03-09',//创建时间
		isFolder: true,//是否是文件夹
		isCheck: false
	},
	{
		attach_id: '2',//文件id
		attach_name: '任务管理开发文档.doc',//文件名称
		size:'10kb',//文件大小
		creator: {
			uid: '1',
			userid: 'lj',
			username: '李俊'
		},//创建者
		taskid:'0',//所属任务ID
		proj_id:'1',//所属项目ID
		create_time: '2016-03-10',//创建时间
		isFolder: false,//是否是文件夹
		isCheck: false
	}
];


var ListContainer = React.createClass({
	getInitialState: function() {
    	return {
    		files: data,
    		isAllCheck: false
    	};
  	},
    render: function() {
        return (
            <List data={this.state} changeChekced={this.changeChekced} changeAllCheck={this.changeAllCheck} />
        )
    },
    allChecked: function(){//切换某一文件选择时同步全选状态
    	var isAllCheck = true;
    	this.state.files.map(function(item, i){
    		if(item.isCheck == false){
    			isAllCheck = false;
    		}
    	});
    	this.setState({isAllCheck: isAllCheck});
    },
    changeAllCheck: function(isAllCheck){//切换全选
		var files = this.state.files.slice();
    	files.map(function(item, i){
    		item.isCheck = isAllCheck;
    	});
		this.setState({
			files: files,
			isAllCheck: isAllCheck
		});
		console.log('切换全选和取消全选');
    },
    changeChekced: function(attach_id, isCheck){//切换某一文件选择
    	var files = this.state.files.slice();
    	files.map(function(item, i){
    		if(item.attach_id == attach_id){
    			item.isCheck = isCheck;
    		}
    	});
    	this.setState({files: files});
    	this.allChecked();
    	console.log('切换选择某一文件');
    }
});

module.exports = ListContainer; 