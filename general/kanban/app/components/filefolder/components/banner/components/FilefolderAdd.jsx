var React = require('react');

//新建文件夹和上传文件
var FilefolderAdd = React.createClass({
    render: function() {
        return (
            <div className="filefolder-add pull-right">
            	<a href="javascript:;" onClick={this.showAddFolder}>
            		<span className="iconfont">&#xe688;</span>新建文件夹
            	</a>
            	<a href="javascript:;" ref="uploadbtn">
            		<span className="iconfont">&#xe684;</span>上传文件
            	</a>
            </div>
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
    },
    showAddFolder: function(){
    	alert('showAddFolder');
    }
});

module.exports = FilefolderAdd; 