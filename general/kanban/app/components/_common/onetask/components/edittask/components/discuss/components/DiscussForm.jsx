var React = require('react');

var DiscussForm = React.createClass({
    render: function() {
        return (
            <div className="discuss-form">
                <textarea ref="content" placeholder="请输入讨论内容"></textarea>
                <button type="button" className="btn btn-primary" onClick={this.submit}>发送</button>
            </div>
        )
    },
    submit: function(){
        var content = this.refs.content.value;
        this.props.save_cb(content);
    }
});

module.exports = DiscussForm;