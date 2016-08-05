require('./filefolder.css');

var React = require('react');
var Filefolder = require('./Filefolder.jsx');

var FilefolderContainer = React.createClass({
    render: function() {
        return (
            <Filefolder />
        )
    } 
});

module.exports = FilefolderContainer; 