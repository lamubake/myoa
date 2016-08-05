var React = require('react');

var ItemShow = require('./components/ItemShow.jsx');
var ItemEdit = require('./components/ItemEdit.jsx');

var Item = React.createClass({
    render: function() {
        return (
            this.props.isRename ? <ItemEdit {...this.props} /> : <ItemShow {...this.props} />
        )
    }
});

module.exports = Item; 