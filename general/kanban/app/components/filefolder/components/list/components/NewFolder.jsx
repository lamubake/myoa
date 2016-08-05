var React = require('react');

var NewFolder = React.createClass({
    render: function() {
        return (
             <tr className="filefolder-addfolder">
                <td>
                    <span className="iconfont file-checkdisable">&#xe697;</span>
                </td>
                <td className="filefolder-itemtxt">
                    <span className="filefolder-foldericon iconfont">&#xe696;</span>
                    <input type="text" placeholder="文件夹名称" ref="foldername" />
                    <button type="button" className="btn btn-small btn-primary addfolderbtn" onClick={this.addFolder}>创建</button>
                    <button type="button" className="btn btn-small" onClick={this.cancel}>取消</button>
                </td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
            </tr>
        )
    },
    addFolder: function(){
        var foldername = this.refs.foldername.value;
        alert('保存新建文件夹' + foldername);
    },
    cancel: function(){
        alert('取消新建文件夹');
    }
});

module.exports = NewFolder; 