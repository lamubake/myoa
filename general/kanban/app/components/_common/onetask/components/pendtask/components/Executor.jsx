var React = require('react');
var connect = require('react-redux').connect;

var Executor = React.createClass({
    render: function(){
    	const { username, avatar } = this.props.executor
        return (
            <a className="onetask-executor">
                <img src={avatar} />
                <span>{username}</span>
            </a>
        )
    }
});

const mapStateToProps = (state, ownProps) => {
	const { projId, executor } = ownProps
	return {
		executor: state.members[projId].find(item => item.uid === executor) ||  {username:'待认领', avatar:'/static/images/avatar/0.gif'}
	}
}

module.exports = connect(mapStateToProps)(Executor)
