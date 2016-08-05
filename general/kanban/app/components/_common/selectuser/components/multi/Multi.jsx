var React = require('react');

var Filter = require('./components/Filter.jsx');
var User = require('./components/User.jsx');

var Multi = React.createClass({
	getInitialState: function() {
        return {
            data: this.formatData()
        };
    },
    render: function() {
    	var self = this;
    	var users = $.map(self.state.data, function(item, i){
            return (
                <User data={item} key={i} clickCallback={self.clickCallback} />
            );
        },this);
        return (
            <div>
            	<div className="seluser-main">
            		<Filter filter={this.filter} />
                    <div className="seluser-handle">
                    	<a href="javascript:;" onClick={self.selectAll}>全选 | </a>
                    	<a href="javascript:;" onClick={self.cancelAll}>取消</a>
                    </div>
                    <ul className="seluser-list preventScroll">
                        {users}
                    </ul>
            	</div>
                <div className="userselect-mask" onClick={this.maskHandler}></div>
            </div>
        )
    },
    maskHandler: function(e) {
        this.props.destoryUserSelect()
        e.stopPropagation()
    },
    clickCallback: function(uid, selected){
    	var data = this.state.data;
    	$.each(data, function(key, item){
            if(item.uid == uid){
            	item.selected = selected;
            }
        });
        this.setState({data: data});
        this.update();
    },
    update: function(){
    	var data = this.state.data
        var selected = this.getSelected(data)
        this.props.editTask({...this.props.task, member: selected})
    },
    filter: function(keyword){
        var ret = [];
        var data = this.state.data;
        if(keyword == ""){
            $.each(data, function(key, item){
                item.visible = true;
            });
        }else{
            $.each(data, function(key, item){
                if(item.userid.indexOf(keyword) != -1 || item.username.indexOf(keyword) != -1){
                    item.visible = true;
                }else{
                    item.visible = false;
                }
            });
        }
        this.setState({data: data});
    },
    selectAll: function(e){
        var data = this.state.data;
        $.each(data, function(key, item){
        	if(item.visible == true){
        		item.selected = true;	
        	}
        });
        this.setState({data: data});
        this.update();
        e.stopPropagation()
    },
    cancelAll: function(e){
        var data = this.state.data;
        $.each(data, function(key, item){
        	if(item.visible == true){
            	item.selected = false;
        	}
        });
        this.setState({data: data});
        this.update();
        e.stopPropagation()
    },
    getSelected: function(data){
    	var self = this;
    	var selectedusers = [];
    	$.each(self.state.data, function(key, item){
            if(item.selected == true){
            	selectedusers.push(item.uid);
            }
        });
        return selectedusers;
    },
    formatData: function(){//将props的数据做处理后
        var selectedusers = this.props.selected.slice();
        var allusers = this.props.allusers.slice();
        var members = [];
        $.each(allusers, function(key, item){
            var selected = false;
            if($.inArray(item.uid, selectedusers) == -1){
                selected = false;
            }else{
                selected = true;
            }
            var item = {
                uid: item.uid,
                userid: item.userid,
                username: item.username,
                visible: true,
                selected: selected
            };
            members.push(item); 
        });
        return members;
    }
});

module.exports = Multi;