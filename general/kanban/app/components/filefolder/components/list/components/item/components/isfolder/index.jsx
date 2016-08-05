var React = require('react');
var IsFolder = require('./IsFolder.jsx');

var IsFolderContainer = React.createClass({
    render: function() {
        return (
           	<IsFolder {...this.props} />
        )
    }
});

module.exports = IsFolderContainer; 