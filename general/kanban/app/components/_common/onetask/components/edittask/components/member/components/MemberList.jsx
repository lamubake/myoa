var React = require('react');

var MemberAdd = require('./MemberAdd.jsx');
var MemberItem = require('./MemberItem.jsx');

var MemberList = React.createClass({
    render: function(){
        var self = this;
        const { members } = this.props
    	var users = members.map(function (user, i) {
            return (
                <MemberItem key={user.uid} data={user} deleteMember={self.deleteMember} />
            );
        }, this);
        return (
            <ul className="onetask-memberlist">
                {users}
                <li onClick={this.setupSelector} className="onetask-memberadd pull-left"><MemberAdd {...this.props} /></li>
            </ul>
        )
    },
    deleteMember: function(uid){
        let member = this.props.task.member.slice()
        member = member.filter(item => item !== uid)
        this.props.editTask({...this.props.task, member})
    },
    setupSelector: function(e) {
        this.props.setupUserSelect({...e})
    }
});

module.exports = MemberList;