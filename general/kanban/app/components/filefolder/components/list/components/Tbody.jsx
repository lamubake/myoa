var React = require('react');

var ItemContainer = require('./item/index.jsx');
var NewFolder = require('./NewFolder.jsx');

var Tbody = React.createClass({
    render: function() {
        var self = this;
        var filelist = this.props.data.files.map(function(file, i){
            return (
                <ItemContainer data={file} key={i} changeChekced={self.props.changeChekced} />
            )
        })
        return (
            <tbody className="filefolder-tbody">
            	<NewFolder />
            	{filelist}
            </tbody>
        )
    } 
});

module.exports = Tbody; 