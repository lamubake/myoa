//此组件为oa系统公共选人
var React = require('react');
var SelectUserSys = require('./SelectUserSys.jsx');

//uidstr="" usernamestr="" defaultuid="" defaultusername=""

var SelectUserSysContainer = React.createClass({

	shouldComponentUpdate: function() {
		//因为系统选人用的是原有的老组件，它采用的是直接操作dom的方式
		//为了能保存住dom上的数据状态，而不被react的rerender干扰导致组件重新渲染丢失数据
		//因此，在这里显示的返回false，来阻止所有的rerender.
		return false
	},

    render: function() {
        return (
            <SelectUserSys {...this.props} />
        )
    }
});

module.exports = SelectUserSysContainer;