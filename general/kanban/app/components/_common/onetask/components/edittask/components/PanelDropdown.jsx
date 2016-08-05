var React = require('react');
var $ = jQuery;

var PanelDropdown = React.createClass({
/*    getInitialState: function() {
        return {
            currentPanel: this.props.panelId,
            items: []
        }
    },

    componentWillReceiveProps: function(nextProps){
        var self = this;
        var panels = [];
        this.props.items.map(function(item, i){
            if(item.belongto == nextProps.current){
                panels.push(item);
            }
        });
        this.setState({
            currentPanel: nextProps.currentPanel,
            items:panels
        });
    },
    componentDidMount: function(){
        var self = this;
        var panels = [];
        this.props.items.map(function(item, i){
            if(item.belongto == self.props.current){
                panels.push(item);
            }
        });
        this.setState({items:panels});
    },*/
    render: function(){
        var self = this;
        const { panelId, panels, forbid } = this.props
        var options = panels.map(function (item, i) {
            var selected = item.panel_id == panelId ? "iconfont pull-right active" : "hide";
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
            <div className="btn-group">
                {
                    forbid ?
                    <button disabled type="button" className="btn dropdown-toggle" data-toggle="dropdown">
                        <span>{selectedValue.length > 10 ? selectedValue.slice(0,10) + '...' : selectedValue}</span>
                        <b className="caret"></b>
                    </button> :
                    <button type="button" className="btn dropdown-toggle" data-toggle="dropdown">
                        <span>{selectedValue.length > 10 ? selectedValue.slice(0,10) + '...' : selectedValue}</span>
                        <b className="caret"></b>
                    </button>
                }
                <ul className="dropdown-menu">
                    {options}
                </ul>
            </div>
        )
    },
    getSelected: function(){
        const { panelId, panels } = this.props
        let selectedValue = ''
        panels.forEach(function(item){
            if(item.panel_id == panelId){
                selectedValue = item.panel_name;
            }
        })
        return selectedValue;
    },
    toggleOption: function (i) {
        const { panelId, panels } = this.props
        var curPanel = panels[i].panel_id;
        var curPanelName = panels[i].panel_name;
        // this.setState({'currentPanel': currentPanel});
        this.props.cb && this.props.cb(curPanel, curPanelName);
    }
});

module.exports = PanelDropdown;
