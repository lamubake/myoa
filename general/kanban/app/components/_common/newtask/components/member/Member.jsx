var React = require('react');
var MemberList = require('./components/MemberList.jsx');

var Member = React.createClass({
    render: function(){
        return (
            <div className="onetask-member clearfix">
                <MemberList {...this.props} />
            </div>
        )
    }
});

module.exports = Member;