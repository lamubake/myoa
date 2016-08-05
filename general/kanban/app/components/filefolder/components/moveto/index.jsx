//移动到文件夹的示例数据
var data = [
    {
        key: 'root',
        title: "文件库（即根目录）", 
        isFolder: true,
        children: [
            {
                key: '1',
                title: "文件夹1",
                isFolder: true,
                children: [
                ]
            },
            {
                key: '2',
                title: "文件夹2",
                isFolder: true,
                children: [
                ]
            }
        ]
    }
];

var React = require('react');
var MoveTo = require('./MoveTo.jsx');
var MoveToContainer = React.createClass({
	render: function() {
		return (
			<MoveTo data={data} />
		);
	}
});

module.exports = MoveToContainer;