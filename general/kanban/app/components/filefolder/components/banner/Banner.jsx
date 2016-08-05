var React = require('react');

var FilefolderRoute= require('./components/FilefolderRoute.jsx');
var FilefolderAdd= require('./components/FilefolderAdd.jsx');

var Banner = React.createClass({
    render: function() {
        return (
            <div className="filefolder-banner clearfix">
            	<FilefolderRoute />
	        	<FilefolderAdd />
            </div>
        )
    } 
});

module.exports = Banner; 