var React = require('react');

var IsCheckContainer = require('./ischeck/index.jsx');
var IsFolderContainer = require('./isfolder/index.jsx');

var ItemShow = React.createClass({
    render: function() {
        return (
            <tr>
                <td>
                    <IsCheckContainer isCheck={this.props.data.isCheck} changeChecked={this.changeChecked} />
                </td>
                <td className="filefolder-itemtxt">
                    <IsFolderContainer isFolder={this.props.data.isFolder} />
                    <p>{this.props.data.attach_name}</p>
                </td>
                <td>{this.props.data.size}</td>
                <td>{this.props.data.creator.username}</td>
                <td>{this.props.data.create_time}</td>
                <td className="filefolder-handle">
                    <span className="iconfont file-move-icon" onClick={this.move} title="移动至">&#xe69b;</span>
                    <span className="iconfont file-rename-icon" onClick={this.rename} title="重命名">&#xe694;</span>
                    <span className="iconfont file-delete-icon" onClick={this.delete} title="删除">&#xe644;</span>
                </td>
            </tr>
        )
    },
    changeChecked: function(){
        this.props.changeChekced(this.props.data.attach_id, !this.props.data.isCheck );
    }, 
    delete: function(){
        alert('删除');
    },
    rename: function(){
        alert('重命名');
    },
    move: function(){
        $('#filefolder-modal').modal('show');
        console.log('为改成以状态控制显隐');
    }
});

module.exports = ItemShow; 