var React = require('react');
import Modal from 'antd/lib/modal'

var ContentEdit = React.createClass({
    render: function() {
        return (
            <textarea ref="content" defaultValue={this.props.data} onBlur={this.blurHandler}></textarea>
        )
    },
    blurHandler: function(){

        if(!this.validate()) {
            this.refs.content.placeholder = "请填写任务内容..."
            //$(this.refs.content).focus();
            return false
        }

        this.props.toggleContent()
        if(this.props.data !== this.refs.content.value)
            this.props.setContent(this.refs.content.value.trim())
    },
    componentDidMount: function(){
        $(this.refs.content).focus();
    },
    validate: function() {
        if(this.refs.content.value.trim() === "") {
            return false
        }
        if(this.refs.content.value.match(/['"<>\/\\]/g) !== null) {
            Modal.error({
                title: '任务内容不能含有\'，"，<，>，/，\\等非法字符'
            })
            return false
        }
        return true
    }
});

module.exports = ContentEdit;