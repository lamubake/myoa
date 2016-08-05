var React = require('react');

var Thead = require('./components/Thead.jsx');
var Tbody = require('./components/Tbody.jsx');

var List = React.createClass({
    render: function() {
        console.log(this.props.data.isAllCheck);
        var Batch = this.props.data.isAllCheck == true ? <FileFolderBatch /> : '';
        return (
            <div className="filefolder-list">
                {Batch}
            	<table className="table table-hover">
                    <colgroup>
                        <col width="60" />
                        <col width="auto" />
                        <col width="100" />
                        <col width="100" />
                        <col width="120" />
                        <col width="120" />
                    </colgroup>
            		<Thead {...this.props} />
            		<Tbody {...this.props} />
            	</table>
            </div>
        )
    } 
});

var FileFolderBatch = React.createClass({
    render: function() {
        return (     
            <div className="filefolder-batch">
                <a href="javascript:;"><span className="iconfont file-move-icon">&#xe69b;</span>移动</a>
                <a href="javascript:;"><span className="iconfont file-delete-icon">&#xe644;</span>删除</a>
            </div>
        )
    } 
});


module.exports = List; 