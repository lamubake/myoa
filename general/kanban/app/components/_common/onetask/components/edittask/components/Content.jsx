var React = require('react');

var Content = React.createClass({
    render: function() {
        return (
            <p data-placement="top" ref="content" data-toggle="tooltip" title="" data-original-title={this.props.can_edit ? "点击即可编辑" : "暂无编辑权限"} onClick={this.props.toggleContent}>{this.props.data}</p>
        )
    },
    componentDidMount: function(){
        jQuery('[data-toggle="tooltip"]').tooltip({
            container: 'body'
        });
    },
    componentWillUnmount: function(){
    	$(this.refs.content).tooltip('hide');
    }
});

module.exports = Content;