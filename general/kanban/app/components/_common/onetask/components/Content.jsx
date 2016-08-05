var React = require('react');

var Content = React.createClass({
	getInitialState: function() {
        return {
            done: this.props.status || false,//是否已完成
            text: this.props.text || ''//任务内容
        };
    },
	render: function() {
    	var self = this;
        return (
        	<div className="control-group">
                <label className="control-label">任务内容</label>
                <div className="controls">
                    <textarea defaultValue={this.state.text}></textarea>
                </div>
            </div>
        )
    }
});

module.exports = Content;