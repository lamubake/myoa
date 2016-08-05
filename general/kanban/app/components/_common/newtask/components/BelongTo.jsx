var React = require('react');

var BelongTo = React.createClass({
	getInitialState: function() {
        return {
            currentPanel: this.props.currentPanel,
            items: []
        }
    },
    toggleOption: function (i) {
        var currentPanel = this.props.items[i].panel_id;
        this.props.cb && this.props.cb(currentPanel);
    },
    render: function(){
        var self = this;
        var options = this.props.items.map(function (item, i) {
            var selected = item.panel_id == self.props.currentPanel ? "iconfont pull-right active" : "hide";
            return (
                <li data-option={item.panel_id} onClick={this.toggleOption.bind(this, i)} key={i}>
                    <a>
                        {item.panel_name.length >= 10 ? item.panel_name.slice(0,8) + '...' : item.panel_name}
                        <i className={selected}>&#xe687;</i>
                    </a>
                </li>
            );
        }, this);
        var selectedValue = this.getSelected();
        return (
            <div className="btn-group dropup">
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
        self.props.items.forEach(function(item){
            if(item.panel_id == self.props.currentPanel){
                selectedValue = item.panel_name;
            }
        })
        return selectedValue;
    }
});

module.exports = BelongTo;