var React = require('react');

var Attachment = React.createClass({
	render: function() {
        return (
        	<div className="attachment">
        		<AttachmentList />
        		<AttachmentUpload />
        	</div>
        )
    }
});

var AttachmentList = React.createClass({
	render: function() {
        return (
        	<ul className="attachment-list clearfix">
        		<AttachmentItem />
        		<AttachmentItem />
        		<AttachmentItem />
        	</ul>
        )
    }
});

var AttachmentItem = React.createClass({
	render: function() {
        return (
        	<li><a href="javascript:;" className="attachment-item">附件1</a></li>
        )
    }
});

var AttachmentUpload = React.createClass({
	render: function() {
        return (
    		<a href="javascript:;" ref="uploadbtn" className="attachment-add">
            <span className="iconfont">&#xe68e;</span>
    			{/*<span className="iconfont">&#xe684;</span>上传附件*/}
    		</a>
        )
    },
    componentDidMount: function(){
    	var self = this;
    	self.uploader = new WebUploader.Uploader({
            resize: false,
            duplicate: true,
            auto: true,
            swf: '/libs/webuploader/Uploader.swf',
            server: '',
            pick: self.refs.uploadbtn
        });
        self.uploader.on(' fileQueued ', function(file){
            console.log('上传中文件信息', file);
        });
        self.uploader.on( 'uploadProgress', function( file, percentage ) {
            console.log('上传进度', file, percentage);
        });
        self.uploader.on( 'uploadComplete', function( file ) {
            console.log('上传完毕', file);
        });
        self.uploader.on( 'uploadSuccess', function( file ) {
            console.log('上传成功', file);
        });
        self.uploader.on( 'uploadError', function( file ) {
            console.log('上传失败', file);
        });
    },
    componentWillUnmount: function(){
    	this.uploader.destroy();
    }
});

module.exports = Attachment;