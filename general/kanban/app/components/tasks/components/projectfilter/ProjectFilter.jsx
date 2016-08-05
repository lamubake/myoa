var React = require('react');


var ProjectFilter = React.createClass({
    toggleOption: function (i) {
        var current = this.props.projects[i].proj_id;
        this.props.setCurProject && this.props.setCurProject(current);
    },
    render: function(){
        var self = this;
        var options = this.props.projects.map(function (item, i) {
            var selected = item.proj_id === self.props.cur_project ? "iconfont pull-right active" : "hide";
            return (
                <li data-option={item.proj_id} onClick={this.toggleOption.bind(this, i)} key={i}>
                    <a>
                        {item.proj_name.length >= 10 ? item.proj_name.slice(0,7) + '...' : item.proj_name}
                        <i className={selected}>&#xe687;</i>
                    </a>
                </li>
            );
        }, this);
        var selectedValue = this.getSelected();
        return (

            <div className="btn-group">
                <button type="button" className="btn dropdown-toggle" data-toggle="dropdown">
                    <span>{selectedValue.length > 10 ? selectedValue.slice(0,10) + '...' : selectedValue}</span>
                    <b className="caret"></b>
                </button>
                <ul className="dropdown-menu">
                    {options}
                </ul>
            </div>
        )
    },
    getSelected: function(){
        var self = this;
        var selectedValue = '';
        this.props.projects.forEach(function(item){
            if(item.proj_id == self.props.cur_project){
                selectedValue = item.proj_name;
            }
        })
        return selectedValue;
    }
});




module.exports = ProjectFilter;


