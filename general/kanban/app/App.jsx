// require('antd/lib/index.css')

var React = require('react');
var Header = require('./components/Header.jsx');
var OneTask = require('./components/_common/onetask');
var NewTask = require('./components/_common/newtask');

var SelectUser = require('./components/_common/selectuser')

var App = React.createClass({
    render: function() {
        return (
            <div>
                <Header />{/* 应用的头部导航和快速新建、查询 */}
                
                <div className="app-main">
                	{this.props.children}
                </div>
                {/* 几个弹层：新建任务，任务编辑，选人控件 */}
                <NewTask />
                <OneTask />
                <SelectUser />
            </div>
        )
    }
});

module.exports = App;