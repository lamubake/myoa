var React = require('react');
var connect = require('react-redux').connect;

var Member = require('./Member.jsx');


const mapStateToProps = (state, ownProps) => {
    const { projId, member } = ownProps
    const membersInfo = state.members[projId]
    let members = []
    member.forEach(memId => {
        membersInfo.forEach(memInfo => {
            if(memInfo.uid === memId){
                members.push(memInfo)
            }
        })
    })
    return {
        members
    }
}

module.exports = connect(mapStateToProps)(Member)
