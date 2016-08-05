var React = require('react');

var IsCheckContainer = require('./ischeck/index.jsx');
var IsFolderContainer = require('./isfolder/index.jsx');

var ItemEdit = React.createClass({
    render: function() {
        return (
            <tr className="filefolder-edit">
                <td><IsCheckContainer isCheck={this.props.data.isCheck} changeChecked={this.changeChecked} /></td>
                <td className="filefolder-itemtxt">
                    <IsFolderContainer isFolder={this.props.data.isFolder} />
                    <input type="text" defaultValue={this.props.data.attach_name} />
                    <button type="button" className="btn btn-small btn-primary savefilebtn" onClick={this.save}>保存</button>
                    <button type="button" className="btn btn-small" onClick={this.cancel}>取消</button>
                </td>
                <td>{this.props.data.size}</td>
                <td>{this.props.data.creator.username}</td>
                <td>{this.props.data.create_time}</td>
                <td></td>
            </tr>
        )
    },
    changeChecked: function(){
        this.props.changeChekced(this.props.data.attach_id, !this.props.data.isCheck );
    }, 
    save: function(){
        alert('保存重命名');
    },
    cancel: function(){
        alert('退出重命名');
    }
});

module.exports = ItemEdit; 