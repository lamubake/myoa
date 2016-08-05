var React = require('react');
var connect = require('react-redux').connect;

var Member = require('./Member.jsx');

import { setupUserSelect } from '../../../../../actions/userselect'

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
const mapDispatchToProps = (dispatch, ownProps) => {
    const { projId, setMember, member } = ownProps
    return {
        setupUserSelect: (event) => {
            dispatch(setupUserSelect({
                mode:'mutil', 
                proj_id: projId, 
                selected: member,
                cb: setMember,
                event
            }))
        }
    }
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(Member)
