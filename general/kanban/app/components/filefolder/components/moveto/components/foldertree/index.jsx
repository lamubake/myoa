var React = require('react');
var FolderTree = require('./FolderTree.jsx');

var FolderTreeContainer = React.createClass({
    render: function() {
        return (
            <FolderTree {...this.props} />
        )
    }
});

module.exports = FolderTreeContainer; 