var React = require('react');
var $ = jQuery;

//默认props
// current: 0, //当前所属项目id
//所有项目信息
// items: [
//     {
//         proj_id: 0,
//         proj_name: '项目1',
//         panels: [0,1,2]
//     },
//     {
//         proj_id: 1,
//         proj_name: '项目2',
//         panels: [0,1,2]
//     },
//     {
//         proj_id: 2,
//         proj_name: '项目3',
//         panels: [0,1,2]
//     }
// ]

var ProjectDropdown = React.createClass({
    toggleOption: function (i) {
        var current = this.props.items[i].proj_id;
        this.props.cb && this.props.cb(current);
    },
    render: function(){
        var self = this;
        var options = this.props.items.map(function (item, i) {
            var selected = item.proj_id == self.props.current ? "iconfont pull-right active" : "hide";
            return (
                <li data-option={item.proj_id} onClick={this.toggleOption.bind(this, i)} key={i}>
                    <a>
                        {item.proj_name}
                        <i className={selected}>&#xe687;</i>
                    </a>
                </li>
            );
        }, this);
        var selectedValue = this.getSelected();
        return (

            <div className="btn-group">
                <button type="button" className="btn dropdown-toggle" data-toggle="dropdown">
                    <span>{selectedValue}</span>
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
        self.props.items.forEach(function(item){
            if(item.proj_id == self.props.current){
                selectedValue = item.proj_name;
            }
        })
        return selectedValue;
    }
});

module.exports = ProjectDropdown;