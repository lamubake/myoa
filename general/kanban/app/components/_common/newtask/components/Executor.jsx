var React = require('react');
var connect = require('react-redux').connect;
var createSelector = require('reselect').createSelector;

import Tooltip from 'antd/lib/tooltip'

import { setupUserSelect } from '../../../../actions/userselect'

var Executor = React.createClass({
    render: function(){
    	const { username, avatar } = this.props.executor
        return (
            <a className="onetask-executor">
                <img src={avatar} onClick={this.setupSelector} />
                <Tooltip placement="right" title="点击更换执行者">
                    <span onClick={this.setupSelector}>{username}</span>
                </Tooltip>
            </a>
        )
    },
    setupSelector: function(e) {
        this.props.setupUserSelect(this.props.setExecutor, {...e})
    }
})

const members = (state, ownProps) => state.members[ownProps.projId] || []
const executorId = (state, ownProps) => ownProps.executor

const mapStateToProps = createSelector(
	members,
	executorId,
	(members, executorId) => {
		return {
			executor: members.find(item => item.uid === executorId)
		}
	}
)

const mapDispatchToProps = (dispatch, ownProps) => {
    const { projId, executor } = ownProps
	return {
        setupUserSelect: (cb, event) => {
            dispatch(setupUserSelect({
                mode:'single', 
                proj_id: projId,
                cb,
                selected: executor,
                event
            }))
        }
	}
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(Executor)
