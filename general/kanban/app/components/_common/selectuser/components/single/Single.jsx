var React = require('react');
var Filter = require('./components/Filter.jsx');
var User = require('./components/User.jsx');


var Single = React.createClass({
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
    clickCallback: function(uid){
    	var data = this.state.data;
    	$.each(data, function(key, item){
            if(item.uid == uid){
            	item.selected = true;
            }else{
            	item.selected = false;
            }
        });
        this.setState({data: data});
        this.props.destoryUserSelect()
        this.props.editSender({...this.props.data, executor: uid})
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
    formatData: function(){//将props的数据做处理后
        var executor = this.props.data.executor;
        var allusers = this.props.allusers.slice();
        var members = [];
        $.each(allusers, function(key, item){
            var selected = false;
            if(item.uid == executor){
                selected = true;
            }else{
                selected = false;
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

module.exports = Single;