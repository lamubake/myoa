var React = require('react');
var connect = require('react-redux').connect;

var Member = require('./Member.jsx');

import { setupUserSelect } from '../../../../../../../actions/userselect'
import { ajaxEditTask } from '../../../../../../../actions/tasks'

const mapStateToProps = (state, ownProps) => {
    const { projId, member, task } = ownProps
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
        members,
        task
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    const { projId, panelId, taskId } = ownProps
    return {
        setupUserSelect: (event) => {
            dispatch(setupUserSelect({
                mode:'mutil', 
                proj_id: projId, 
                panel_id: panelId, 
                taskid: taskId, 
                event
            }))
        },
        editTask: (desc) => {
            dispatch(ajaxEditTask(panelId, taskId, desc))
        }
    }
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(Member)
