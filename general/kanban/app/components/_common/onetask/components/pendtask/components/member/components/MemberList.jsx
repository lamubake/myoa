var React = require('react');
var MemberItem = require('./MemberItem.jsx');

var MemberList = React.createClass({
    render: function(){
        const { members } = this.props
        var users = members.map(function (user, i) {
            return (
                <MemberItem key={i} data={user} />
            );
        }, this);
        return (
            <ul className="onetask-memberlist pull-left">
                {users}
            </ul>
        )
    }
});

module.exports = MemberList;