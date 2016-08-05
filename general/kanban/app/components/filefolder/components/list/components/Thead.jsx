var React = require('react');

var CheckAll= require('./CheckAll.jsx');
var UnCheckAll= require('./UnCheckAll.jsx');

var Thead = React.createClass({
    render: function() {
        return (
            <thead className="filefolder-thead">
            	<tr>
            		<th>
                        {this.props.data.isAllCheck ? <CheckAll changeAllCheck={this.changeAllCheck} />: <UnCheckAll changeAllCheck={this.changeAllCheck} />}
                    </th>
            		<th>名称</th>
            		<th>大小</th>
            		<th>创建者</th>
            		<th>上传时间</th>
            		<th>操作</th>
            	</tr>
            </thead>
        )
    },
    changeAllCheck: function(){
        this.props.changeAllCheck(!this.props.data.isAllCheck);
    }
});

module.exports = Thead; 