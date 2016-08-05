var React = require('react');
var connect = require('react-redux').connect;

import Tooltip from 'antd/lib/tooltip'

import { setupUserSelect } from '../../../../../../actions/userselect'

var Executor = React.createClass({
    render: function(){
    	const { username, avatar } = this.props.executor
        return (
            <a className="onetask-executor">
                <img src={avatar} onClick={this.setupSelector} />
                <Tooltip placement="right" title="点击更换执行者">
                    <span  onClick={this.setupSelector}>{username}</span>
                </Tooltip>
            </a>
        )
    },
    setupSelector: function(e) {
        this.props.setupUserSelect({...e})
    }
});

const mapStateToProps = (state, ownProps) => {
	const { projId, executor } = ownProps
	return {
		executor: state.members[projId].find(item => item.uid === executor) ||  {username:'待认领', avatar:'/static/images/avatar/0.gif'}
	}
}
const mapDispatchToProps = (dispatch, ownProps) => {
    const { projId, panelId, taskId } = ownProps
	return {
        setupUserSelect: (event) => {
            dispatch(setupUserSelect({
                mode:'single', 
                proj_id: projId, 
                panel_id: panelId, 
                taskid: taskId, 
                event
            }))
        }
	}
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(Executor)
