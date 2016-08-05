var React = require('react');

var Folder = require('./Folder.jsx');
var File = require('./File.jsx');

var IsFolder = React.createClass({
    render: function() {
        return (
            this.props.isFolder ? <Folder /> : <File />
        )
    }
});

module.exports = IsFolder; 