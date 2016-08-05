var React = require('react');

var UserList = React.createClass({
    render: function(){
        var self = this;
        var userarr = this.props.data.split(',');
        var selectedarr = [];
        $.each(userarr, function(k, v){
            $.each(self.props.allmembers, function(m,n){
                if(n.uid == v){
                    selectedarr.push(n);
                }
            });
        });
        var users = selectedarr.map(function (item, i) {
            return (
                <User uid={item.uid} username={item.username} key={i} />
            );
        }, this);

        return (
            <div className="inline">
                {users}
            </div>
        )
    }
});
var User = React.createClass({
    render: function(){
        return (
            <span className="memberuser" data-uid={this.props.uid}>{this.props.username}</span>
        )
    }
});
module.exports = UserList;