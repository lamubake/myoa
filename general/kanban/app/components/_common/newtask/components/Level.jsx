var React = require('react');
var $ = jQuery;
/*
    默认props包含:
    current 当前选中级别id
    cb 选中后回调，返回参数为当前选中id
*/
var Level = React.createClass({
    getDefaultProps: function() {
        return {
            current: 0,
            items: [
                {
                    id: 0,
                    value: '普通'
                },
                {
                    id: 1,
                    value: '紧急'
                },
                {
                    id: 2,
                    value: '非常紧急'
                }
            ]
        };
    },
    toggleOption: function (i) {
        var current = this.props.items[i].id;
        this.props.cb && this.props.cb(current);
    },
    render: function(){
        var self = this;
        var options = this.props.items.map(function (item, i) {
            var iconClass = "iconfont level level-" + item.id;
            var selected = item.id == self.props.current ? "iconfont pull-right active" : "hide";
            return (
                <li data-option={item.id} onClick={this.toggleOption.bind(this, i)} key={i}>
                    <a>
                        <i className={iconClass}>&#xe68b;</i>
                        {item.value}
                        <i className={selected}>&#xe687;</i>
                    </a>
                </li>
            );
        }, this);

        var iconClass = this.props.current!=null ? "iconfont level level-" + this.props.current : '';
        var selectedValue = this.getSelected();

        return (
            <div className="btn-group levelContainer">
                <button type="button" className="btn dropdown-toggle" data-toggle="dropdown">
                    <i className={iconClass}>&#xe68b;</i>
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
            if(item.id == self.props.current){
                selectedValue = item.value;
            }
        })
        return selectedValue;
    }
});

module.exports = Level;