var React = require('react');
//左侧文件路径
var FilefolderRoute = React.createClass({
    render: function() {
        return (
            <ul className="filefolder-route breadcrumb pull-left">
                <li><a href="#">文件库</a> <span className="divider">/</span></li>
                <li><a href="#">文件夹1</a> <span className="divider">/</span></li>
                <li className="active">文件夹2</li>
            </ul>
        )
    } 
});

module.exports = FilefolderRoute; 