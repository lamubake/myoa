var React = require('react');
var Attachment = require('./Attachment.jsx');
require('./attachment.css');

var AttachmentContainer = React.createClass({
	render: function() {
        return (
        	<Attachment />
        )
    }
});

module.exports = AttachmentContainer;