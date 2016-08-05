var React = require('react');

var MyTaskFilter = React.createClass({
	getInitialState: function() {
    	return {cur_id: this.props.filter};
  	},
  	getDefaultProps: function() {
		return {
			filters: [
		        {id:'uncomplete', name:'未完成的'},
                {id:'complete', name:'已完成的'},
		        {id:'member', name:'我参与的'},
		        {id:'creator', name:'我创建的'}
	        ]
		}
   	},
    toggleOption: function (i) {
        var current = this.props.filters[i].id;
        this.setState({
        	cur_id: current
        });
        //在这里回调
        this.props.setMyTaskFilter(current)
    },
    render: function(){
        var self = this;
        var options = this.props.filters.map(function (item, i) {
            var selected = item.id === self.state.cur_id ? "iconfont pull-right active" : "hide";
            return (
                <li data-option={item.id} onClick={() => self.toggleOption(i)} key={i}>
                    <a>
                        {item.name}
                        <i className={selected}>&#xe687;</i>
                    </a>
                </li>
            );
        }, this);
        var selectedValue = this.getSelected();
        return (

            <div className="mytaskfilter btn-group">
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
        this.props.filters.forEach(function(item){
            if(item.id == self.state.cur_id){
                selectedValue = item.name;
            }
        })
        return selectedValue;
    }
});


module.exports = MyTaskFilter;

