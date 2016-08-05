var React = require('react');
require('./discuss.css');
var Discuss = require('./Discuss.jsx');

//讨论数据
var data = [
    {
        aid: 0,  //自增id
        content: "讨论1",  //内容
        sendtime: "2016-03-02 17:10", //时间
        attachmenet: "",  //附件
        taskid: "1", //所属任务id
        uid: 0, //用户id
        username: "田林", //用户名
        photo: "/inc/attach_old.php?attachment_id=avatar&attachment_name=1.gif&direct_view=1&r=15558" //头像
    },
    {
        aid: 1,  //自增id
        content: "讨论2",  //内容
        sendtime: "2016-03-02 17:15", //时间
        attachmenet: "",  //附件
        taskid: "1", //所属任务id
        uid: 1, //用户id
        username: "宋稀萌", //用户名
        photo: "/inc/attach_old.php?attachment_id=avatar&attachment_name=1.gif&direct_view=1&r=15558" //头像
    },
    {
        aid: 3,  //自增id
        content: "讨论3",  //内容
        sendtime: "2016-03-02 17:20", //时间
        attachmenet: "",  //附件
        taskid: "1", //所属任务id
        uid: 2, //用户id
        username: "李俊", //用户名
        photo: "/inc/attach_old.php?attachment_id=avatar&attachment_name=1.gif&direct_view=1&r=15558" //头像
    }
];

var DiscussContainer = React.createClass({
	render: function() {
        return (
        	<Discuss data={data} />
        )
    }
});

module.exports = DiscussContainer;