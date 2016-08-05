var React = require('react');
import Tooltip from 'antd/lib/tooltip'

var MemberAdd = React.createClass({
    render: function(){
        return (
            <Tooltip placement="right" title="点击添加参与者">
                <span className="iconfont pull-left">&#xe68e;</span>
            </Tooltip>
        )
    }
});

module.exports = MemberAdd;