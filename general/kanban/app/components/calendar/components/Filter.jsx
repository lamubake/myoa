var React = require('react');

//查询容器
//filterCallback是选择项目或者全部项目后将要执行的加载数据的回调
var Filter = React.createClass({
    render: function() {
        return (
            <div className="calFilter">
                <FilterByProj data={this.props.data} setCalendarFilter={this.props.setCalendarFilter} />
            </div>
        )
    }
});

//按项目查询
var FilterByProj = React.createClass({
    getInitialState: function () {
        return {
            data: []
        };
    },
    componentWillMount: function(){
        var data = this.props.data.slice();
        $.each(data, function(k, v){
            v.selected = true;
        });
        this.setState({
            data: data
        });
    },
    componentWillReceiveProps: function(){

    },
    render: function() {
        var self = this;

        var selectedAll = true;
        $.each(this.state.data, function(k, v){
            if(v.selected == false){
                selectedAll = false;
            };
        });

        var projects = this.state.data.map(function (item, i) {
            return (
                <Project data={item} key={i} selectCallback={self.selectCallback} />
            );
        });
        var klass = selectedAll ? 'project-item all-projects selected' : 'project-item all-projects';
        return (
            <ul className="project-list">
                <li className={klass} onClick={this.toggleSelectAll}><a href="javascript:;"><span className="iconfont allicon">&#xe69c;</span><span>全部项目</span><i className="iconfont">&#xe687;</i></a></li>
                {projects}
            </ul>
        )
    },
    toggleSelectAll: function(){
        var data = this.state.data;
        var selectedAll = true;
        $.each(data, function(k, v){
            if(v.selected == false){
                selectedAll = false;
            }
        });

        $.each(data, function(k, v){
            v.selected = !selectedAll;
        });

        this.setState({data: data});
        this.filter();
    },
    selectCallback: function(proj_id, selected){
        var data = this.state.data;
        $.each(data, function(i, item){
            if(item.proj_id == proj_id) {
                item.selected = selected;
            }
        });
        this.setState({data: data});
        this.filter();
    },
    filter: function(proj_id, selected){
        var selectedstr = "";
        var data = this.state.data;
        $.each(data, function(i, item){
            if(item.selected) {
                selectedstr+=item.proj_id+',';
            }
        });
        console.log('当前选中的项目',selectedstr);
        this.props.setCalendarFilter(selectedstr);//返回已选中的项目ID串，为空不再默认加载全部项目的。
    }
});

//每条项目
var Project = React.createClass({
    render: function() {
        var klass = this.props.data.selected ? 'project-item selected' : 'project-item';
        return (
            <li className={klass} onClick={this.toggleSelect}><a><span>{this.props.data.proj_name}</span><i className="iconfont">&#xe687;</i></a></li>
        )
    },
    toggleSelect: function(){
        var selected = !this.props.data.selected;
        var proj_id = this.props.data.proj_id;
        this.props.selectCallback(proj_id, selected);
    }
});

module.exports = Filter;

